# Tasks — PDF → Markdown

Conversión de PDFs a Markdown limpio usando MarkItDown (Microsoft). Incluye comparativa de tokens antes/después para mostrar al usuario cuánto ha ahorrado de cara a usar el contenido con LLMs.

---

## Estado actual

| Qué existe                                             | Estado       |
| ------------------------------------------------------ | ------------ |
| `src/features/pdfToMarkdown/`                          | ❌ No existe  |
| `src/pages/pdf-to-markdown.astro`                      | ❌ No existe  |
| Entrada en `tools.ts`                                  | ❌ No existe  |
| SEO data en `siteInfo.ts`                              | ❌ No existe  |
| `public/og-tools/og-image-pm.webp`                     | ❌ No existe  |
| `api/convert.py`                                       | ❌ No existe  |
| `requirements.txt`                                     | ❌ No existe  |

Todo es nuevo en esta feature.

---

## Librerías / Infraestructura

| Capa      | Qué                       | Por qué                                                              |
| --------- | ------------------------- | -------------------------------------------------------------------- |
| Backend   | `markitdown` (pip)        | Conversión PDF → Markdown, mantenida por Microsoft                   |
| Backend   | `tiktoken` (pip)          | Contar tokens (encoding `cl100k_base`, compatible GPT y Claude)      |
| Backend   | Python Vercel Function    | MarkItDown es Python — el runtime del endpoint tiene que ser Python  |
| Frontend  | `react-dropzone` (npm)    | Drag & drop de archivos con buena UX                                 |
| Frontend  | `react-markdown` (npm)    | Renderizar el Markdown resultante en el UI                           |

> **Nota importante:** Vercel soporta Python runtime solo para functions en `api/` — NO para el resto del proyecto. El archivo `api/convert.py` necesita un `requirements.txt` en la raíz para que Vercel instale las dependencias Python. El resto del proyecto sigue siendo Node/Astro.

---

## 1. Infraestructura — Python Runtime en Vercel

- [ ] Crear `requirements.txt` en la raíz del proyecto:

```txt
markitdown[all]
tiktoken
```

- [ ] Actualizar `vercel.json` para declarar el runtime Python en el endpoint:

```json
{
  "trailingSlash": false,
  "functions": {
    "api/convert.py": {
      "runtime": "vercel-python@0.1.0",
      "maxDuration": 30
    }
  }
}
```

> `maxDuration: 30` porque la conversión de PDFs grandes puede tardar. Free plan de Vercel permite hasta 60s en funciones.

- [ ] Verificar que `@astrojs/vercel` en `astro.config.mjs` NO está activado como adapter SSR — el site sigue siendo estático. Solo las funciones en `api/` son serverless.

---

## 2. Backend — `api/convert.py`

Endpoint: `POST /api/convert` — acepta `multipart/form-data` con el PDF.

- [ ] Crear `api/convert.py`
- [ ] Parsear el `multipart/form-data` del request (usando `cgi.FieldStorage` o `email.parser`)
- [ ] Validar que el archivo recibido tiene extensión `.pdf` (y MIME `application/pdf`)
- [ ] Validar tamaño máximo: **10 MB** (comparar `Content-Length` o el tamaño del archivo)
- [ ] Guardar el PDF en `/tmp/{uuid}.pdf` (Vercel Functions tienen `/tmp` efímero)
- [ ] Convertir con MarkItDown:
  ```python
  from markitdown import MarkItDown
  md = MarkItDown()
  result = md.convert(tmp_path)
  markdown_text = result.text_content
  ```
- [ ] Extraer el texto plano del PDF para contar tokens "antes":
  - Usar MarkItDown para extraer solo el texto raw (sin formato Markdown)
  - O usar `pdfplumber` / texto de MarkItDown pre-conversión si está disponible
  - Alternativa simple: contar sobre el texto del PDF extraído por MarkItDown antes de enriquecer con sintaxis MD
- [ ] Contar tokens con `tiktoken`:
  ```python
  import tiktoken
  enc = tiktoken.get_encoding("cl100k_base")
  tokens_raw = len(enc.encode(raw_text))
  tokens_markdown = len(enc.encode(markdown_text))
  ```
- [ ] Responder con JSON:
  ```json
  {
    "markdown": "...",
    "tokensRaw": 4200,
    "tokensMarkdown": 3100,
    "tokensSaved": 1100,
    "savingsPercent": 26
  }
  ```
- [ ] Limpiar el archivo temporal (`os.remove(tmp_path)`)
- [ ] Manejo de errores:
  - 400: archivo no es PDF, o falta el archivo
  - 413: archivo mayor de 10 MB
  - 422: PDF corrupto o MarkItDown no puede procesarlo
  - 500: error inesperado (loggear e.message)
- [ ] Headers CORS mínimos (por si se llama desde el cliente):
  ```python
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://qiip.me"
  }
  ```

---

## 3. Feature Folder — Reglas e Interfaces

- [ ] Crear `src/features/pdfToMarkdown/` con subcarpetas: `components/`, `hooks/`, `rules/`, `seo/`
- [ ] Crear `src/features/pdfToMarkdown/rules/pdfToMarkdown.interfaces.ts`:

```ts
export interface ConversionResult {
  markdown: string;
  tokensRaw: number;
  tokensMarkdown: number;
  tokensSaved: number;
  savingsPercent: number;
}

export type ConversionStatus = "idle" | "uploading" | "converting" | "success" | "error";

export interface ConversionState {
  status: ConversionStatus;
  result: ConversionResult | null;
  error: string | null;
  fileName: string | null;
  fileSize: number | null;  // bytes
}
```

- [ ] Crear `src/features/pdfToMarkdown/rules/pdfToMarkdown.config.ts`:
  ```ts
  export const MAX_FILE_SIZE_MB = 10;
  export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
  export const ACCEPTED_MIME = "application/pdf";
  export const API_ENDPOINT = "/api/convert";
  ```

---

## 4. Feature Folder — Hook

- [ ] Crear `src/features/pdfToMarkdown/hooks/usePdfToMarkdown.ts`:
  - Estado: `status`, `result`, `error`, `fileName`, `fileSize`
  - `handleFile(file: File)` — valida el archivo (tipo, tamaño) antes de subir
  - `handleUpload()` — construye `FormData`, llama `POST /api/convert`, actualiza estado
  - `handleCopyMarkdown()` — copia el markdown al portapapeles con feedback
  - `handleDownload()` — genera un blob `.md` y dispara descarga
  - `handleReset()` — vuelve al estado inicial para procesar otro PDF

---

## 5. Componentes UI

- [ ] `FileDropzone.tsx` — zona de drag & drop para subir el PDF
  - Estados visuales: idle, dragover (highlight), uploading (spinner/barra de progreso)
  - Muestra nombre y tamaño del archivo seleccionado
  - Usa `react-dropzone` (`useDropzone` hook)
  - Acepta solo `.pdf`, rechaza otros tipos con mensaje de error
  - Límite de tamaño visible ("Max 10 MB")

- [ ] `ConversionProgress.tsx` — indicador de estado mientras procesa
  - "Uploading…" → "Converting…" con animación
  - Solo se muestra entre el drop y el resultado

- [ ] `MarkdownOutput.tsx` — resultado de la conversión
  - Dos tabs o toggle: "Preview" (renderizado con `react-markdown`) y "Raw" (textarea de solo lectura)
  - Botón "Copiar Markdown" con feedback visual
  - Botón "Descargar .md"

- [ ] `TokenSavings.tsx` — visualización del ahorro de tokens
  - Tres métricas: tokens del PDF original, tokens del Markdown, tokens ahorrados
  - Porcentaje de ahorro destacado visualmente
  - Contexto: "Menos tokens = menor coste al usar este contenido con un LLM"

- [ ] `PdfToMarkdown.tsx` — componente raíz que orquesta todo (usa `client:only="react"`)
  - Orquesta: si `status === 'idle'` → muestra Dropzone; si `success` → muestra Output + TokenSavings
  - Botón "Convertir otro PDF" para volver al inicio

- [ ] Crear `src/features/pdfToMarkdown/components/MainPdfToMarkdown.astro`:

```astro
---
import HeroTool from "@/layout/toolsPage/HeroTool.astro";
import PdfToMarkdown from "./PdfToMarkdown.tsx";
---

<HeroTool href="/pdf-to-markdown">
  <PdfToMarkdown client:only="react" />
</HeroTool>
```

- [ ] Crear `src/features/pdfToMarkdown/components/pdfToMarkdown.module.css` — estilos del feature

---

## 6. SEO Component

- [ ] Crear `src/features/pdfToMarkdown/seo/HeadPdfToMarkdown.astro` si se necesita SEO personalizado (howTo schema, FAQs)

---

## 7. Registro de la tool

### `tools.ts`

- [ ] Extender el union type `ToolTag`:
  ```ts
  toolTag: "utm" | "qr" | "wc" | "su" | "pm";
  ```
- [ ] Añadir entrada en el array `TOOLS`:
  ```ts
  {
    toolName: "PDF to Markdown",
    titlePage: "Convert your PDF to Markdown",
    desc: "Turn any PDF into clean Markdown. See how many tokens you save for LLM use.",
    href: "/pdf-to-markdown",
    onAir: false,  // cambiar a true cuando esté listo
    number: 5,
    tag: { toolTag: "pm" },
    color: "var(--tool-pm)",
  }
  ```

### `src/styles/global.css`

- [ ] Añadir el color del tool (elegir un color apropiado — naranja, ámbar, etc.):
  ```css
  --tool-pm: #f59e0b;  /* amber-500, referencia — ajustar al gusto */
  ```

### `siteInfo.ts`

- [ ] Añadir entrada `pm` en el objeto `TOOLS`:
  ```ts
  pm: {
    label: "PDF to Markdown",
    howToTitle: "How to convert a PDF to Markdown",
    title: "Free PDF to Markdown Converter — Token-Efficient for LLMs | qiip.me",
    description: "Convert any PDF to clean Markdown in seconds. See exactly how many tokens you save — ideal for feeding content to ChatGPT, Claude, or any LLM.",
    ogImage: "/og-tools/og-image-pm.webp",
    ogImageAlt: "PDF to Markdown converter tool interface on qiip.me",
    keywords: [
      "pdf to markdown converter",
      "pdf to markdown free",
      "convert pdf to markdown online",
      "pdf to llm markdown",
      "reduce tokens pdf",
      "markitdown pdf converter",
    ],
    howTo: [
      { name: "Upload your PDF", text: "Drag and drop your PDF or click to select it." },
      { name: "Convert", text: "The tool converts your PDF to clean Markdown instantly." },
      { name: "Review the savings", text: "See how many tokens you saved versus the raw PDF text." },
      { name: "Copy or download", text: "Copy the Markdown or download it as a .md file." },
    ],
    faqs: [
      { question: "Is this PDF to Markdown converter free?", answer: "Yes, completely free with no sign-up required." },
      { question: "What is MarkItDown?", answer: "MarkItDown is an open-source library by Microsoft that converts documents — including PDFs — to clean Markdown." },
      { question: "Why does token count matter?", answer: "When using LLMs like ChatGPT or Claude, fewer tokens means lower cost and faster responses. Markdown is more token-efficient than raw PDF text." },
      { question: "Is my PDF stored on your servers?", answer: "No. Your file is processed and immediately deleted. Nothing is stored." },
    ],
  }
  ```

### Nueva página

- [ ] Crear `src/pages/pdf-to-markdown.astro`:

```astro
---
import MainPdfToMarkdown from "@/pdfToMarkdown/components/MainPdfToMarkdown.astro";
import Layout from "@/layouts/Layout.astro";
import ToolPageSEO from "@/seo/ToolPageSEO.astro";
import { TOOLS } from "@/global/siteInfo.ts";

const PDF = TOOLS.pm;
---

<Layout>
  <ToolPageSEO slot="head" tool={PDF} />
  <MainPdfToMarkdown />
</Layout>
```

### Path alias en `tsconfig.json`

- [ ] Añadir alias:
  ```json
  "@/pdfToMarkdown/*": ["src/features/pdfToMarkdown/*"]
  ```

---

## 8. Dependencias a instalar

```bash
pnpm add react-dropzone react-markdown
```

---

## 9. OG Image

- [ ] Crear `public/og-tools/og-image-pm.webp` (1200×630) — diseño consistente con los otros OG images del proyecto

---

## Flujo completo

```
Usuario arrastra PDF → FileDropzone valida (tipo + tamaño)
→ usePdfToMarkdown.handleUpload() → FormData → POST /api/convert
→ api/convert.py (Python) → MarkItDown → tiktoken
→ JSON { markdown, tokensRaw, tokensMarkdown, tokensSaved }
→ MarkdownOutput muestra el resultado
→ TokenSavings muestra el ahorro
→ Botón Copiar / Descargar .md
```
