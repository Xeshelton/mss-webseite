document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback unten versuchen
    }
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    return false;
  }
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = document.getElementById("contactFormNote");
    if (note) note.hidden = false;
  });
}

document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const ok = await copyText(btn.dataset.copy);
    if (!ok) return;
    btn.classList.add("copied");
    clearTimeout(btn._copyTimeout);
    btn._copyTimeout = setTimeout(() => btn.classList.remove("copied"), 1500);
  });
});

// Streckt jede Logo-Zeile per Letter-Spacing auf die Breite der laengsten
// Zeile, damit "marvelous / software / solutions" wie im Referenzbild
// buendig gleich lang enden.
function equalizeHeroLogo() {
  const lines = document.querySelectorAll(".hero-logo-line");
  const underline = document.querySelector(".hero-logo-underline");
  if (!lines.length) return;

  lines.forEach((line) => {
    line.style.letterSpacing = "normal";
    line.style.transform = "";
  });

  let maxWidth = 0;
  lines.forEach((line) => {
    maxWidth = Math.max(maxWidth, line.getBoundingClientRect().width);
  });

  lines.forEach((line) => {
    const width = line.getBoundingClientRect().width;
    const charCount = line.textContent.trim().length;
    const diff = maxWidth - width;
    if (diff > 0.5 && charCount > 1) {
      line.style.letterSpacing = diff / charCount + "px";
    }
  });

  // Die Kastenbreiten sind jetzt zwar rechnerisch gleich, aber je nach
  // Endbuchstabe (z. B. das runde "e" bei "software") wirkt eine Zeile durch
  // die Glyphenform trotzdem nicht ganz buendig mit den anderen, die auf "s"
  // enden. Manuelle Fein-Korrektur fuer den optischen Ausgleich.
  const MANUAL_NUDGE = { software: 10, solutions: 4 };
  lines.forEach((line) => {
    const key = line.textContent.trim().toLowerCase();
    const nudge = MANUAL_NUDGE[key];
    if (nudge) {
      line.style.transform = `translateX(${nudge}px)`;
    }
  });

  if (underline) {
    underline.style.width = maxWidth + "px";
  }
}

// Zieht die Unterstriche unter "Ueber uns" / "Projekte" / "Kontakt" auf
// exakt die Breite der Ueberschrift.
function equalizeSectionUnderlines() {
  document.querySelectorAll(".section h2").forEach((heading) => {
    const underline = heading.nextElementSibling;
    if (underline && underline.classList.contains("underline")) {
      underline.style.width = heading.getBoundingClientRect().width + "px";
    }
  });
}

function refreshLayoutWidths() {
  equalizeHeroLogo();
  equalizeSectionUnderlines();
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(refreshLayoutWidths);
} else {
  refreshLayoutWidths();
}
window.addEventListener("load", refreshLayoutWidths);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(refreshLayoutWidths, 150);
});
