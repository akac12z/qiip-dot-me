
  // Cargar historial al iniciar
  let utmHistory: string[] = JSON.parse(
    localStorage.getItem("utmHistory") || "[]",
  );

  // Selectores
  const utmForm = document.getElementById("utmForm") as HTMLFormElement | null;
  const resultBox = document.getElementById("resultBox") as HTMLElement | null;
  const resultUrl = document.getElementById("resultUrl") as HTMLElement | null;
  const historyList = document.getElementById(
    "historyList",
  ) as HTMLElement | null;
  const resetBtn = document.getElementById(
    "resetBtn",
  ) as HTMLButtonElement | null;
  const copyBtn = document.getElementById(
    "copyBtn",
  ) as HTMLButtonElement | null;
  const testBtn = document.getElementById(
    "testBtn",
  ) as HTMLButtonElement | null;
  const clearHistoryBtn = document.getElementById(
    "clearHistoryBtn",
  ) as HTMLButtonElement | null;

  // Inicialización
  if (historyList) updateHistoryDisplay();

  // Event Listeners
  if (utmForm) {
    utmForm.addEventListener("submit", function (e: Event) {
      e.preventDefault();
      generateUrl();
    });
  }

  if (resetBtn) resetBtn.addEventListener("click", resetForm);
  if (copyBtn) copyBtn.addEventListener("click", copyToClipboard);
  if (testBtn) testBtn.addEventListener("click", testUrl);
  if (clearHistoryBtn) clearHistoryBtn.addEventListener("click", clearHistory);

  // Event Delegation para el historial (botones de copiar y borrar)
  if (historyList) {
    historyList.addEventListener("click", function (e: Event) {
      const target = e.target as HTMLElement;
      const item = target.closest("button");
      if (!item) return;

      if (item.classList.contains("btn-copy")) {
        const url = item.getAttribute("data-url");
        if (url) copySpecificUrl(url);
      } else if (item.classList.contains("delete-btn")) {
        const indexStr = item.getAttribute("data-index");
        if (indexStr !== null) {
          const index = parseInt(indexStr);
          deleteFromHistory(index);
        }
      }
    });
  }

  function generateUrl(): void {
    const baseUrlEl = document.getElementById(
      "baseUrl",
    ) as HTMLInputElement | null;
    const sourceEl = document.getElementById(
      "utmSource",
    ) as HTMLInputElement | null;
    const mediumEl = document.getElementById(
      "utmMedium",
    ) as HTMLInputElement | null;
    const campaignEl = document.getElementById(
      "utmCampaign",
    ) as HTMLInputElement | null;
    const termEl = document.getElementById(
      "utmTerm",
    ) as HTMLInputElement | null;
    const contentEl = document.getElementById(
      "utmContent",
    ) as HTMLInputElement | null;

    if (!baseUrlEl || !sourceEl || !mediumEl || !campaignEl) return;

    const baseUrl = baseUrlEl.value.trim();
    const source = sourceEl.value.trim();
    const medium = mediumEl.value.trim();
    const campaign = campaignEl.value.trim();
    const term = termEl ? termEl.value.trim() : "";
    const content = contentEl ? contentEl.value.trim() : "";

    if (!baseUrl || !source || !medium || !campaign) {
      showToast("Por favor completa los campos obligatorios", "error");
      return;
    }

    // Validar URL base
    let url: URL;
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
    if (resultUrl) resultUrl.textContent = finalUrl;
    if (resultBox) {
      resultBox.style.display = "block";
      // Scroll suave al resultado
      resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Guardar en historial
    saveToHistory(finalUrl);
  }

  function saveToHistory(url: string): void {
    // Evitar duplicados al principio
    utmHistory = utmHistory.filter((item: string) => item !== url);
    utmHistory.unshift(url);

    // Mantener solo últimos 10
    if (utmHistory.length > 10) utmHistory = utmHistory.slice(0, 10);

    localStorage.setItem("utmHistory", JSON.stringify(utmHistory));
    updateHistoryDisplay();
  }

  function updateHistoryDisplay(): void {
    if (!historyList) return;

    if (utmHistory.length === 0) {
      historyList.innerHTML =
        '<div class="empty-state">No hay URLs generadas aún</div>';
      return;
    }

    historyList.innerHTML = utmHistory
      .map(
        (url: string, index: number) => `
                <div class="history-item">
                    <div class="history-url" title="${url}">${url}</div>
                    <div>
                        <button class="btn-copy" style="padding: 6px 12px; font-size: 0.8rem;" data-url="${url}">
                            📋
                        </button>
                        <button class="delete-btn" data-index="${index}">
                            🗑️
                        </button>
                    </div>
                </div>
            `,
      )
      .join("");
  }

  function deleteFromHistory(index: number): void {
    utmHistory.splice(index, 1);
    localStorage.setItem("utmHistory", JSON.stringify(utmHistory));
    updateHistoryDisplay();
  }

  function clearHistory(): void {
    if (confirm("¿Seguro que quieres borrar todo el historial?")) {
      utmHistory = [];
      localStorage.removeItem("utmHistory");
      updateHistoryDisplay();
      showToast("Historial borrado");
    }
  }

  function copyToClipboard(): void {
    if (resultUrl) {
      const url = resultUrl.textContent;
      if (url) copySpecificUrl(url);
    }
  }

  function copySpecificUrl(url: string): void {
    if (!navigator.clipboard) {
      // Fallback para navegadores que no soportan navigator.clipboard
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        showToast("URL copiada al portapapeles");
      } catch (err) {
        console.error("Error al copiar", err);
      }
      document.body.removeChild(textarea);
      return;
    }

    navigator.clipboard
      .writeText(url)
      .then(() => {
        showToast("URL copiada al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar: ", err);
      });
  }

  function testUrl(): void {
    if (resultUrl) {
      const url = resultUrl.textContent;
      if (url) window.open(url, "_blank");
    }
  }

  function resetForm(): void {
    if (utmForm) utmForm.reset();
    if (resultBox) resultBox.style.display = "none";
  }

  function showToast(
    message: string,
    type: "success" | "error" = "success",
  ): void {
    const toast = document.getElementById("toast") as HTMLElement | null;
    const toastMessage = document.getElementById(
      "toastMessage",
    ) as HTMLElement | null;

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.style.background = type === "error" ? "#e74c3c" : "#2c3e50";
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  }

  // Validación en tiempo real de la URL
  const baseUrlInput = document.getElementById(
    "baseUrl",
  ) as HTMLInputElement | null;
  if (baseUrlInput) {
    baseUrlInput.addEventListener("blur", function (e: Event) {
      const target = e.target as HTMLInputElement;
      let url = target.value.trim();
      if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
        target.value = url;
      }
    });
  }
