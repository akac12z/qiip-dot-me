# this was created by KimiK2

This element was created by KIMI K2 as a beta.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generador de UTM - Marketing Tracker</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          "Segoe UI",
          system-ui,
          -apple-system,
          sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 20px;
        color: #333;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }

      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        text-align: center;
      }

      .header h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
        font-weight: 700;
      }

      .header p {
        opacity: 0.9;
        font-size: 1.1rem;
      }

      .content {
        padding: 40px;
      }

      .form-group {
        margin-bottom: 25px;
        position: relative;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #555;
        font-size: 0.95rem;
      }

      label .required {
        color: #e74c3c;
      }

      label .optional {
        color: #95a5a6;
        font-weight: 400;
        font-size: 0.85rem;
      }

      input[type="text"],
      input[type="url"] {
        width: 100%;
        padding: 14px 16px;
        border: 2px solid #e1e8ed;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: #fafbfc;
      }

      input[type="text"]:focus,
      input[type="url"]:focus {
        outline: none;
        border-color: #667eea;
        background: white;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .help-text {
        font-size: 0.85rem;
        color: #7f8c8d;
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .result-box {
        background: #f8f9fa;
        border: 2px dashed #667eea;
        border-radius: 12px;
        padding: 20px;
        margin-top: 30px;
        position: relative;
      }

      .result-label {
        font-weight: 600;
        color: #667eea;
        margin-bottom: 10px;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      #resultUrl {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-family: "Courier New", monospace;
        font-size: 0.9rem;
        background: white;
        word-break: break-all;
        min-height: 50px;
        color: #2c3e50;
      }

      .button-group {
        display: flex;
        gap: 10px;
        margin-top: 15px;
      }

      button {
        flex: 1;
        padding: 14px 24px;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      }

      .btn-secondary {
        background: #ecf0f1;
        color: #2c3e50;
      }

      .btn-secondary:hover {
        background: #dfe6e9;
      }

      .btn-copy {
        background: #27ae60;
        color: white;
      }

      .btn-copy:hover {
        background: #229954;
      }

      .history {
        margin-top: 40px;
        border-top: 2px solid #ecf0f1;
        padding-top: 30px;
      }

      .history h3 {
        margin-bottom: 20px;
        color: #2c3e50;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .history-item {
        background: #f8f9fa;
        border-left: 4px solid #667eea;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
      }

      .history-item:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .history-url {
        font-family: monospace;
        font-size: 0.9rem;
        color: #555;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 15px;
      }

      .delete-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.8rem;
      }

      .empty-state {
        text-align: center;
        color: #95a5a6;
        padding: 40px;
        font-style: italic;
      }

      .toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2c3e50;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: none;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        z-index: 1000;
      }

      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .toast.show {
        display: flex;
      }

      @media (max-width: 600px) {
        .grid {
          grid-template-columns: 1fr;
        }

        .header h1 {
          font-size: 1.8rem;
        }

        .content {
          padding: 20px;
        }
      }

      .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🔗 Generador de UTM</h1>
        <p>Crea URLs de seguimiento para tus campañas de marketing</p>
      </div>

      <div class="content">
        <form id="utmForm">
          <div class="form-group">
            <label for="baseUrl">
              URL Base <span class="required">*</span>
            </label>
            <input
              type="url"
              id="baseUrl"
              placeholder="https://ejemplo.com/pagina"
              required
            />
            <div class="help-text">
              La página a la que quieres dirigir tráfico
            </div>
          </div>

          <div class="grid">
            <div class="form-group">
              <label for="utmSource">
                utm_source <span class="required">*</span>
              </label>
              <input
                type="text"
                id="utmSource"
                placeholder="google, facebook, newsletter"
                required
              />
              <div class="help-text">Fuente del tráfico</div>
            </div>

            <div class="form-group">
              <label for="utmMedium">
                utm_medium <span class="required">*</span>
              </label>
              <input
                type="text"
                id="utmMedium"
                placeholder="cpc, email, social, banner"
                required
              />
              <div class="help-text">Medio de marketing</div>
            </div>
          </div>

          <div class="form-group">
            <label for="utmCampaign">
              utm_campaign <span class="required">*</span>
            </label>
            <input
              type="text"
              id="utmCampaign"
              placeholder="verano_2024, lanzamiento_producto"
              required
            />
            <div class="help-text">Nombre de la campaña promocional</div>
          </div>

          <div class="grid">
            <div class="form-group">
              <label for="utmTerm">
                utm_term <span class="optional">(opcional)</span>
              </label>
              <input
                type="text"
                id="utmTerm"
                placeholder="zapatos_running, keyword"
              />
              <div class="help-text">Palabras clave pagadas</div>
            </div>

            <div class="form-group">
              <label for="utmContent">
                utm_content <span class="optional">(opcional)</span>
              </label>
              <input
                type="text"
                id="utmContent"
                placeholder="banner_top, link_footer, version_a"
              />
              <div class="help-text">Diferencia entre anuncios</div>
            </div>
          </div>

          <div class="button-group">
            <button type="submit" class="btn-primary">
              <span>⚡ Generar URL</span>
            </button>
            <button type="button" class="btn-secondary" onclick="resetForm()">
              <span>🔄 Limpiar</span>
            </button>
          </div>
        </form>

        <div class="result-box" id="resultBox" style="display: none;">
          <div class="result-label">URL Generada</div>
          <div id="resultUrl"></div>
          <div class="button-group">
            <button class="btn-copy" onclick="copyToClipboard()">
              <span>📋 Copiar URL</span>
            </button>
            <button class="btn-secondary" onclick="testUrl()">
              <span>🌐 Probar URL</span>
            </button>
          </div>
        </div>

        <div class="history">
          <h3>
            <span>📚</span>
            Historial Reciente
          </h3>
          <div id="historyList">
            <div class="empty-state">No hay URLs generadas aún</div>
          </div>
          <button
            class="btn-secondary"
            style="margin-top: 15px; width: 100%;"
            onclick="clearHistory()"
          >
            🗑️ Borrar Historial
          </button>
        </div>
      </div>
    </div>

    <div class="toast" id="toast">
      <span>✅</span>
      <span id="toastMessage">URL copiada al portapapeles</span>
    </div>

    <script>
      // Cargar historial al iniciar
      let history = JSON.parse(localStorage.getItem("utmHistory")) || [];
      updateHistoryDisplay();

      document
        .getElementById("utmForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          generateUrl();
        });

      function generateUrl() {
        const baseUrl = document.getElementById("baseUrl").value.trim();
        const source = document.getElementById("utmSource").value.trim();
        const medium = document.getElementById("utmMedium").value.trim();
        const campaign = document.getElementById("utmCampaign").value.trim();
        const term = document.getElementById("utmTerm").value.trim();
        const content = document.getElementById("utmContent").value.trim();

        if (!baseUrl || !source || !medium || !campaign) {
          showToast("Por favor completa los campos obligatorios", "error");
          return;
        }

        // Validar URL base
        let url;
        try {
          url = new URL(baseUrl);
        } catch (e) {
          showToast("URL base no válida", "error");
          return;
        }

        // Añadir parámetros UTM
        url.searchParams.set("utm_source", source);
        url.searchParams.set("utm_medium", medium);
        url.searchParams.set("utm_campaign", campaign);

        if (term) url.searchParams.set("utm_term", term);
        if (content) url.searchParams.set("utm_content", content);

        const finalUrl = url.toString();

        // Mostrar resultado
        document.getElementById("resultUrl").textContent = finalUrl;
        document.getElementById("resultBox").style.display = "block";

        // Guardar en historial
        saveToHistory(finalUrl);

        // Scroll suave al resultado
        document
          .getElementById("resultBox")
          .scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      function saveToHistory(url) {
        // Evitar duplicados al principio
        history = history.filter((item) => item !== url);
        history.unshift(url);

        // Mantener solo últimos 10
        if (history.length > 10) history = history.slice(0, 10);

        localStorage.setItem("utmHistory", JSON.stringify(history));
        updateHistoryDisplay();
      }

      function updateHistoryDisplay() {
        const container = document.getElementById("historyList");

        if (history.length === 0) {
          container.innerHTML =
            '<div class="empty-state">No hay URLs generadas aún</div>';
          return;
        }

        container.innerHTML = history
          .map(
            (url, index) => `
                <div class="history-item">
                    <div class="history-url" title="${url}">${url}</div>
                    <div>
                        <button class="btn-copy" style="padding: 6px 12px; font-size: 0.8rem;" onclick="copySpecificUrl('${url}')">
                            📋
                        </button>
                        <button class="delete-btn" onclick="deleteFromHistory(${index})">
                            🗑️
                        </button>
                    </div>
                </div>
            `,
          )
          .join("");
      }

      function deleteFromHistory(index) {
        history.splice(index, 1);
        localStorage.setItem("utmHistory", JSON.stringify(history));
        updateHistoryDisplay();
      }

      function clearHistory() {
        if (confirm("¿Seguro que quieres borrar todo el historial?")) {
          history = [];
          localStorage.removeItem("utmHistory");
          updateHistoryDisplay();
          showToast("Historial borrado");
        }
      }

      function copyToClipboard() {
        const url = document.getElementById("resultUrl").textContent;
        copySpecificUrl(url);
      }

      function copySpecificUrl(url) {
        navigator.clipboard
          .writeText(url)
          .then(() => {
            showToast("URL copiada al portapapeles");
          })
          .catch(() => {
            // Fallback para navegadores antiguos
            const textarea = document.createElement("textarea");
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            showToast("URL copiada al portapapeles");
          });
      }

      function testUrl() {
        const url = document.getElementById("resultUrl").textContent;
        window.open(url, "_blank");
      }

      function resetForm() {
        document.getElementById("utmForm").reset();
        document.getElementById("resultBox").style.display = "none";
      }

      function showToast(message, type = "success") {
        const toast = document.getElementById("toast");
        const toastMessage = document.getElementById("toastMessage");

        toastMessage.textContent = message;
        toast.style.background = type === "error" ? "#e74c3c" : "#2c3e50";
        toast.classList.add("show");

        setTimeout(() => {
          toast.classList.remove("show");
        }, 3000);
      }

      // Validación en tiempo real de la URL
      document.getElementById("baseUrl").addEventListener("blur", function (e) {
        let url = e.target.value.trim();
        if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
          url = "https://" + url;
          e.target.value = url;
        }
      });
    </script>
  </body>
</html>
```
