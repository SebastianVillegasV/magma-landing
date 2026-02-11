// Año automático en el footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Botón de WhatsApp
const waBtn = document.getElementById("waBtn");
if (waBtn) {
  const phoneNumber = "573212712271"; // +57 321 271 2271
  const message = "Hola, quiero conocer MAGMA y solicitar una demo.";
  const encodedMessage = encodeURIComponent(message);

  waBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  waBtn.target = "_blank";
  waBtn.rel = "noopener noreferrer";
}

// Placeholder para eventos futuros (analytics / pixels)
const leadForm = document.getElementById("leadForm");
if (leadForm) {
  leadForm.addEventListener("submit", () => {
    // Aquí luego podemos disparar Google Analytics, LinkedIn Pixel, etc.
    console.log("Lead form submitted");
  });
}
// Botón de entrada (fase 1 -> fase 2)
const enterBtn = document.getElementById("enterBtn");
if (enterBtn) {
  enterBtn.addEventListener("click", () => {
    const onepage = document.getElementById("onepage");
    if (onepage) onepage.scrollIntoView({ behavior: "smooth" });
  });
}
// Bloquear scroll al inicio (solo hero)
document.documentElement.classList.add("locked");
document.body.classList.add("locked");

// Botón de entrada (fase 1 -> fase 2)
const enterBtn = document.getElementById("enterBtn");
if (enterBtn) {
  enterBtn.addEventListener("click", () => {
    // Desbloquear scroll y mostrar onepage
    document.documentElement.classList.remove("locked");
    document.body.classList.remove("locked");

    // Ir al onepage
    const onepage = document.getElementById("onepage");
    if (onepage) onepage.scrollIntoView({ behavior: "smooth" });
  });
}
