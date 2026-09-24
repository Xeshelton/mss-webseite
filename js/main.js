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

// Baut das Hero-Logo wie im Referenzbild: erste Buchstaben (m/s/s) stehen
// mittig in einer gemeinsamen Spalte, die Wortreste beginnen alle an derselben
// Stelle und enden per Letter-Spacing auch alle an derselben Stelle. Ausgerichtet
// wird an der sichtbaren Buchstabenkontur (Canvas-Messung), nicht an den
// Layout-Boxen, damit z. B. das runde "e" von "software" trotzdem buendig wirkt.
function equalizeHeroLogo() {
  const lines = document.querySelectorAll(".hero-logo-line");
  const underline = document.querySelector(".hero-logo-underline");
  if (!lines.length) return;

  const parts = Array.from(lines).map((line) => ({
    line,
    accent: line.querySelector(".accent"),
    rest: line.querySelector(".logo-rest"),
  }));
  if (parts.some((p) => !p.accent || !p.rest)) return;

  parts.forEach(({ line, accent, rest }) => {
    line.style.width = "";
    accent.style.width = "";
    accent.style.transform = "";
    rest.style.letterSpacing = "";
    rest.style.marginLeft = "";
  });

  const style = getComputedStyle(parts[0].line);
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const ink = (text) => {
    const m = ctx.measureText(text);
    return { left: -m.actualBoundingBoxLeft, right: m.actualBoundingBoxRight };
  };

  // Spalte der Anfangsbuchstaben: so breit wie der breiteste (das "m"),
  // die schmaleren "s" werden optisch mittig darunter gesetzt.
  const colWidth = Math.max(...parts.map((p) => p.accent.getBoundingClientRect().width));
  const refAccent = parts.reduce((a, b) =>
    b.accent.getBoundingClientRect().width > a.accent.getBoundingClientRect().width ? b : a
  );
  const refInk = ink(refAccent.accent.textContent);
  const refCenter = (refInk.left + refInk.right) / 2;
  parts.forEach(({ accent }) => {
    const i = ink(accent.textContent);
    accent.style.width = colWidth + "px";
    accent.style.transform = `translateX(${refCenter - (i.left + i.right) / 2}px)`;
  });

  // Wortreste: gleiche sichtbare Breite, gleicher sichtbarer Startpunkt.
  const restInk = parts.map(({ rest }) => ink(rest.textContent));
  const widths = restInk.map((i) => i.right - i.left);
  const target = Math.max(...widths);
  const maxLeft = Math.max(...restInk.map((i) => i.left));
  parts.forEach(({ rest }, idx) => {
    const n = rest.textContent.length;
    if (n > 1) rest.style.letterSpacing = (target - widths[idx]) / (n - 1) + "px";
    rest.style.marginLeft = maxLeft - restInk[idx].left + "px";
  });

  const total = colWidth + maxLeft + target;
  parts.forEach(({ line }) => {
    line.style.width = total + "px";
  });
  if (underline) underline.style.width = total + "px";
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
if (document.fonts && document.fonts.load) {
  document.fonts.load('400 1em "Poppins"').then(refreshLayoutWidths);
}
window.addEventListener("load", refreshLayoutWidths);

// Auch auf Groessenaenderungen reagieren, die kein window-resize ausloesen
// (z. B. Seite wird zuerst in einem versteckten/0-px-Container geladen).
if (window.ResizeObserver) {
  const hero = document.querySelector(".hero");
  if (hero) new ResizeObserver(() => refreshLayoutWidths()).observe(hero);
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(refreshLayoutWidths, 150);
});
