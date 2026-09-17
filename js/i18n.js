// Ganz einfaches, framework-freies i18n: Texte stehen hier als Woerterbuch,
// nicht hart im HTML. Elemente mit data-i18n="schluessel" bekommen den Text,
// Elemente mit data-i18n-placeholder="schluessel" den Placeholder.
const translations = {
  de: {
    "nav.home": "Home",
    "nav.ueberUns": "Über uns",
    "nav.projekte": "Projekte",
    "nav.kontakt": "Kontakt",
    "hero.copy":
      "Wir entwickeln Software und digitale Produkte — von E-Learning über Serious Games bis hin zu individuellen Lösungen für Training, Coaching und Wissensvermittlung.",
    "hero.cta": "Kontakt aufnehmen",
    "ueberUns.heading": "Über uns",
    "ueberUns.text":
      "Hier entsteht in Kürze mehr über Marvelous Software Solutions — wer wir sind, was uns antreibt und woran wir arbeiten. Inhalte folgen.",
    "projekte.heading": "Projekte",
    "projekte.subtitle": "Eine Auswahl unserer Arbeit — folgt in Kürze.",
    "kontakt.heading": "Kontakt",
    "kontakt.firma": "Firma",
    "kontakt.anschrift": "Anschrift",
    "kontakt.telefon": "Telefon",
    "kontakt.email": "E-Mail",
    "kontakt.emailPending": "folgt in Kürze",
    "form.name": "Name",
    "form.namePlaceholder": "Dein Name",
    "form.email": "E-Mail",
    "form.emailPlaceholder": "deine@email.de",
    "form.message": "Nachricht",
    "form.messagePlaceholder": "Deine Nachricht an uns",
    "form.submit": "Absenden",
    "form.note":
      "Danke für deine Nachricht! Die technische Anbindung ans Postfach folgt in Kürze — bitte melde dich bis dahin telefonisch oder per E-Mail.",
    "footer.impressum": "Impressum",
    "footer.datenschutz": "Datenschutz",
  },
  en: {
    "nav.home": "Home",
    "nav.ueberUns": "About us",
    "nav.projekte": "Projects",
    "nav.kontakt": "Contact",
    "hero.copy":
      "We develop software and digital products — from e-learning and serious games to tailored solutions for training, coaching and knowledge transfer.",
    "hero.cta": "Get in touch",
    "ueberUns.heading": "About us",
    "ueberUns.text":
      "More about Marvelous Software Solutions is coming soon — who we are, what drives us and what we're working on.",
    "projekte.heading": "Projects",
    "projekte.subtitle": "A selection of our work — coming soon.",
    "kontakt.heading": "Contact",
    "kontakt.firma": "Company",
    "kontakt.anschrift": "Address",
    "kontakt.telefon": "Phone",
    "kontakt.email": "Email",
    "kontakt.emailPending": "coming soon",
    "form.name": "Name",
    "form.namePlaceholder": "Your name",
    "form.email": "Email",
    "form.emailPlaceholder": "you@email.com",
    "form.message": "Message",
    "form.messagePlaceholder": "Your message to us",
    "form.submit": "Send",
    "form.note":
      "Thanks for your message! Email delivery is being set up — please reach us by phone or email in the meantime.",
    "footer.impressum": "Legal Notice",
    "footer.datenschutz": "Privacy Policy",
  },
};

function applyLanguage(lang) {
  const dict = translations[lang] ? lang : "de";
  const strings = translations[dict];

  document.documentElement.lang = dict;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!strings[key]) return;
    el.textContent = strings[key];
    if (el.hasAttribute("data-text")) {
      el.setAttribute("data-text", strings[key]);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (strings[key]) el.setAttribute("placeholder", strings[key]);
  });

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === dict);
  });

  try {
    localStorage.setItem("mss-lang", dict);
  } catch (err) {
    // Storage nicht verfuegbar (z. B. privater Modus) - einfach ignorieren.
  }

  // Breiten der Unterstriche neu berechnen, falls sich die Textlaenge
  // durch den Sprachwechsel geaendert hat.
  if (typeof refreshLayoutWidths === "function") {
    refreshLayoutWidths();
  }
}

(function initI18n() {
  let lang = "de";
  try {
    lang = localStorage.getItem("mss-lang") || "de";
  } catch (err) {
    // ignore
  }
  applyLanguage(lang);

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
})();
