# Tasks — URL Shortener

Acortador de URLs con tracking de clicks. La idea es que `qiip.me/tu_slug` redirija a la URL completa. Necesita backend, base de datos y lógica de redirección que no interfiera con las rutas de Astro.

---

## Estado actual

| Qué existe                                                     | Estado        |
| -------------------------------------------------------------- | ------------- |
| `src/pages/shorten-urls.astro`                                 | ✅ Existe      |
| `src/features/urlShortener/components/MainSort.astro`          | ✅ Placeholder |
| `src/features/urlShortener/components/sortener.module.css`     | ✅ Existe (básico) |
| `tools.ts` — entrada registrada con `onAir: false`             | ✅ Existe      |
| `siteInfo.ts` — SEO data (label, title, desc, faqs, howTo…)   | ✅ Existe      |
| `public/og-tools/og-image-su.webp`                             | ✅ Existe      |
| Hooks, interfaces, React components                            | ❌ No existen  |
| Backend API routes                                             | ❌ No existen  |
| Vercel KV (Upstash)                                            | ❌ No configurado |

---

## Librerías / Infraestructura

| Capa       | Qué                        | Por qué                                                           |
| ---------- | -------------------------- | ----------------------------------------------------------------- |
| Database   | Vercel KV (Upstash Redis)  | Serverless Redis, integración nativa con Vercel, free tier amplio |
| Backend    | `@vercel/kv` (npm)         | Cliente oficial para Vercel KV — simple key-value                 |
| Backend    | Vercel Functions (TS)      | `api/` folder en root, despliega como serverless functions        |
| Frontend   | Sin librerías extra        | Solo React + fetch nativo                                         |
| Routing    | `vercel.json` rewrites     | Redirigir `/:slug` al API handler sin SSR                         |

---

## 1. Infraestructura — Vercel KV

- [ ] Ir a Vercel Dashboard → Storage → Create Store → KV (Upstash)
- [ ] Nombrar el store (ej. `qiip-kv`) y conectarlo al proyecto
- [ ] Vercel inyecta automáticamente estas env vars en el proyecto:
  - `KV_URL`
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
  - `KV_REST_API_READ_ONLY_TOKEN`
- [ ] Copiar esas vars al `.env` local (Vercel CLI: `vercel env pull`)
- [ ] Instalar el cliente: `pnpm add @vercel/kv`

---

## 2. Infraestructura — Vercel Rewrites

El problema: si usamos slug cortos como `qiip.me/abc123`, esas rutas colisionan con las páginas de Astro. La solución es usar `vercel.json` rewrites para interceptar la ruta ANTES de que llegue al output de Astro.

**Estrategia recomendada:** usar prefijo `/r/{slug}` para los links cortos → `qiip.me/r/abc123`. Simple, sin colisiones, claro.

Si en el futuro se quiere `qiip.me/{slug}` sin prefijo, habría que activar SSR (Astro middleware) — documentado abajo como alternativa.

- [ ] Añadir rewrite en `vercel.json`:

```json
{
  "trailingSlash": false,
  "rewrites": [
    { "source": "/r/:slug", "destination": "/api/redirect?slug=:slug" }
  ]
}
```

> **Alternativa SSR (sin prefijo):** Activar `output: 'hybrid'` en `astro.config.mjs` + añadir `adapter: vercel()` → permite Astro middleware que intercepta cualquier ruta antes del router. Más potente pero cambia el build pipeline. Dejarlo para v2.

---

## 3. Backend — API Routes (`api/` en root)

### `api/shorten.ts` — `POST /api/shorten`

- [ ] Crear el archivo `api/shorten.ts`
- [ ] Aceptar `{ url: string, customSlug?: string }` en el body (JSON)
- [ ] Validar que `url` es una URL válida (usar `new URL(url)`)
- [ ] Si `customSlug`: validar que solo contiene `[a-zA-Z0-9_-]`, max 30 chars
- [ ] Si no `customSlug`: generar un slug de 6 chars (nanoid o crypto.randomBytes)
- [ ] Verificar en KV que el slug no existe ya (si existe y es custom → devolver 409)
- [ ] Guardar en KV:
  - `kv.set(`url:${slug}`, longUrl)` — la URL original
  - `kv.set(`clicks:${slug}`, 0)` — contador de clicks (inicializar a 0)
- [ ] Devolver `{ shortUrl: "https://qiip.me/r/{slug}", slug, originalUrl }`
- [ ] Manejo de errores: URL inválida (400), slug duplicado (409), error KV (500)

```ts
// Estructura de respuesta
interface ShortenResponse {
  shortUrl: string;  // "https://qiip.me/r/abc123"
  slug: string;      // "abc123"
  originalUrl: string;
}
```

### `api/redirect.ts` — `GET /api/redirect?slug={slug}`

- [ ] Crear el archivo `api/redirect.ts`
- [ ] Leer `slug` de `req.query` (o `new URL(req.url).searchParams`)
- [ ] Buscar en KV: `kv.get(`url:${slug}``)`
- [ ] Si existe: incrementar clicks (`kv.incr(`clicks:${slug}`)`) y redirigir con 302
- [ ] Si no existe: redirigir a `/404` o devolver 404 con HTML mínimo
- [ ] Cabeceras de no-caché en la respuesta para que Vercel no cachee el redirect

### `api/stats.ts` — `GET /api/stats?slug={slug}` (opcional, para el UI)

- [ ] Crear el archivo `api/stats.ts`
- [ ] Leer el slug, buscar `clicks:{slug}` en KV
- [ ] Devolver `{ slug, clicks: number, originalUrl: string }`
- [ ] 404 si el slug no existe

---

## 4. Feature Folder — Reglas e Interfaces

- [ ] Crear `src/features/urlShortener/rules/urlShortener.interfaces.ts`:

```ts
export interface ShortenRequest {
  url: string;
  customSlug?: string;
}

export interface ShortenResult {
  shortUrl: string;
  slug: string;
  originalUrl: string;
}

export type ShortenStatus = "idle" | "loading" | "success" | "error";

export interface ShortenState {
  status: ShortenStatus;
  result: ShortenResult | null;
  error: string | null;
  history: ShortenResult[];  // historial de sesión
}
```

- [ ] Crear `src/features/urlShortener/rules/urlShortener.config.ts`:
  - Constante `MAX_CUSTOM_SLUG_LENGTH = 30`
  - Regex de validación de URL y slug
  - `API_BASE = "/api"`

---

## 5. Feature Folder — Hook

- [ ] Crear `src/features/urlShortener/hooks/useUrlShortener.ts`:
  - Estado: `url`, `customSlug`, `status`, `result`, `error`, `history`
  - `handleShorten()` — llama `POST /api/shorten`, actualiza estado y agrega al historial
  - `handleCopy(text: string)` — copia al portapapeles con feedback visual (2s)
  - `handleClear()` — resetea el formulario
  - Historial de sesión: array de resultados (no persistido, solo en memoria del componente)

---

## 6. Componentes UI

- [ ] `UrlInput.tsx` — campo de URL larga con validación inline
  - Estados visuales: idle, invalid (rojo), valid (verde sutil)
  - Botón de "Shorten" o Enter para enviar
- [ ] `CustomSlugInput.tsx` — input opcional para slug personalizado
  - Toggle para mostrarlo/ocultarlo
  - Validación: solo `[a-zA-Z0-9_-]`, max 30 chars
- [ ] `ShortenResult.tsx` — muestra la URL corta resultante
  - URL corta destacada en grande
  - Botón "Copiar" con feedback visual ("Copiado ✓")
  - Link a la URL original (truncado)
- [ ] `ClickStats.tsx` — (si se implementa stats endpoint) muestra clicks totales
- [ ] `SessionHistory.tsx` — lista de links acortados en esta sesión
  - Cada item: URL corta + botón copiar + clicks (si se implementa)
- [ ] `UrlShortener.tsx` — componente raíz que orquesta todo (usa `client:only="react"`)

### Actualizar `MainSort.astro`

- [ ] Reemplazar el `<ComingSoon />` placeholder por el componente React principal:

```astro
---
import HeroTool from "@/layout/toolsPage/HeroTool.astro";
import UrlShortener from "./UrlShortener.tsx";
---

<HeroTool href="/shorten-urls">
  <UrlShortener client:only="react" />
</HeroTool>
```

---

## 7. Registro de la tool

- [ ] En `tools.ts`: cambiar `onAir: false` a `onAir: true` para la entrada `su`

---

## 8. Dependencias a instalar

```bash
pnpm add @vercel/kv
```

> **Nota:** `nanoid` o usar `crypto.getRandomValues` nativo en Node para generar slugs — preferir el nativo para no añadir dependencia.

---

## Schema KV — Referencia

```
url:{slug}     → string  (la URL larga)
clicks:{slug}  → number  (contador de clicks)
```

Simple y efectivo. Si en el futuro se necesita metadata (fecha de creación, autor), se puede serializar un JSON en `url:{slug}`.

---

## Flujo completo

```
Usuario pega URL → POST /api/shorten → KV guarda {slug → url}
→ Devuelve qiip.me/r/{slug}

Visita qiip.me/r/{slug}
→ vercel.json rewrite → GET /api/redirect?slug={slug}
→ KV lookup + incr clicks → 302 → URL original
```
