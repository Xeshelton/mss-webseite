// Ganz einfaches, framework-freies i18n: Texte stehen hier als Woerterbuch,
// nicht hart im HTML. Elemente mit data-i18n="schluessel" bekommen den Text,
// Elemente mit data-i18n-placeholder="schluessel" den Placeholder.
const translations = {
  de: {
    "nav.home": "Home",
    "nav.ueberUns": "Über uns",
    "nav.projekte": "Projekte",
    "nav.team": "Team",
    "nav.kontakt": "Kontakt",
    "team.heading": "Team",
    "team.roleLead": "Geschäftsleitung",
    "team.roleDev": "Softwareentwicklung",
    "hero.cta": "Kontakt aufnehmen",
    "ueberUns.heading": "Über uns",
    "ueberUns.text":
      "Wir entwickeln Software und digitale Produkte — von E-Learning über Serious Games bis hin zu individuellen Lösungen für Training, Coaching und Wissensvermittlung.",
    "projekte.heading": "Projekte",
    "kontakt.heading": "Kontakt",
    "kontakt.firma": "Firma",
    "kontakt.anschrift": "Anschrift",
    "kontakt.telefon": "Telefon",
    "kontakt.email": "E-Mail",
    "footer.impressum": "Impressum",
    "footer.datenschutz": "Datenschutz",
    "project.back": "← Zurück zu Projekten",
    "projectA.title": "KI-Avatar für therapeutische Erstgespräche",
    "projectA.card":
      "Ein KI-Avatar führt das therapeutische Erstgespräch und erfasst in 12 Minuten das Wohlbefinden — entwickelt für das Zentrum Moyland.",
    "projectA.summary":
      "Ein KI-Avatar führt das therapeutische Erstgespräch und prüft, wie es um das Wohlbefinden des Patienten steht.",
    "projectA.p1":
      "Für das Zentrum Moyland und einen Therapeuten entwickeln wir einen KI-Avatar, der das therapeutische Erstgespräch führt. Im Gespräch werden verschiedene Profilbereiche angesprochen, unter anderem Stress und Schlaf, aber auch weitere Bereiche, um das Wohlbefinden des Patienten einzuschätzen.",
    "projectA.p2":
      "Das Gespräch dauert 12 Minuten. Danach wird in einem Dashboard eine Analyse erstellt: Die Aussagen aus dem gesamten Gespräch werden zusammengefasst und visuell sowie grafisch dargestellt. Dazu kommt eine Auswertung des Verhaltens des Patienten über die Kamera.",
    "projectA.factsTitle": "Auf einen Blick",
    "projectA.factClient": "Auftraggeber: Zentrum Moyland und ein Therapeut",
    "projectA.factDuration": "Dauer des Gesprächs: 12 Minuten",
    "projectA.factTopics": "Profilbereiche: unter anderem Stress und Schlaf sowie weitere",
    "projectA.factResult": "Ergebnis: Dashboard mit Zusammenfassung, Grafiken und Verhaltensauswertung per Kamera",
    "projectA.cta": "Zur Anwendung",
    "projectB.title":
      "Creativity Engine",
    "projectB.card":
      "Eine KI-gestützte Plattform, die Ideen über längere Zeit entwickelt: mit sechs klar getrennten Rollen von der Recherche bis zur Roadmap.",
    "projectB.summary":
      "Eine KI-gestützte Plattform für die nachhaltige Entwicklung von Ideen, die gründlicher und methodischer vorgeht als ein gewöhnlicher KI-Chat.",
    "projectB.p1":
      "Die Creativity Engine richtet sich an Gründerinnen und Gründer, Solo-Builder und alle, die beim Entwickeln von Ideen mehr Sorgfalt brauchen, als ein Chat-Fenster bietet, ohne dass ein ganzes Team bereitsteht, das jeden Entwurf hinterfragt.",
    "projectB.p2":
      "Gängige KI-Chats vermischen Generieren, Bewerten und Entscheiden in einem einzigen Gesprächsfluss. Das ist schnell, schwächt aber oft die Reflexion: Antworten wirken selbstsicher, Kritik wird zur Zustimmung, und wie sich eine Idee verändert hat, lässt sich kaum noch nachvollziehen. Die Creativity Engine behandelt deshalb jede Idee als dauerhaftes Objekt statt als flüchtige Nachricht und teilt die Arbeit auf sechs Rollen auf: Entdecker, Ideengeber, Weiterentwickler, Jury, Theoriebildner und Roadmap-Planer. Jede Rolle übernimmt eine andere Denkaufgabe. Die Recherche bleibt belegt, das Generieren bewusst, die Kritik unabhängig vom Entwurf, der sie ausgelöst hat, und die Bewertung erfolgt aus mehreren Perspektiven statt in einem einzigen Urteil.",
    "projectB.p3":
      "Das Produkt wird vom Menschen gesteuert. Die Oberfläche ist um eine Arbeitsfläche aufgebaut, auf der Nutzerinnen und Nutzer Elemente bewusst platzieren, verbinden und ausführen. Das System darf unterstützen und Vorschläge machen, führt aber nie unbemerkt einen kompletten Plan aus: Die KI stärkt das Urteilsvermögen, sie ersetzt es nicht. Technisch ist die Plattform eine Webanwendung in TypeScript mit Next.js (App Router), API-Routen als Backend und OpenAI-Modellen über ein gemeinsames Gateway. Das Design ist bewusst zurückhaltend und professionell: flache Flächen, helle strukturelle Linien und Farbe nur sparsam für aktive oder markierte Zustände.",
    "projectB.fact1":
      "Zielgruppe: Gründerinnen und Gründer, Solo-Builder und alle, die Ideen sorgfältig entwickeln wollen",
    "projectB.fact2":
      "Sechs Rollen: Entdecker, Ideengeber, Weiterentwickler, Jury, Theoriebildner, Roadmap-Planer",
    "projectB.fact3":
      "Prinzip: Der Mensch steuert, die KI unterstützt und schlägt vor",
    "projectB.fact4":
      "Technik: TypeScript, Next.js und OpenAI-Modelle",
    "projectC.title":
      "Learning Engine für Migrantinnen und Migranten",
    "projectC.card":
      "Eine Lernplattform, die beim Deutschlernen hilft und vor allem dabei, sich im Alltag zurechtzufinden und alles zu erledigen, was nötig ist.",
    "projectC.summary":
      "Eine Lernplattform für Migrantinnen und Migranten: Deutsch lernen und im Alltag zurechtkommen.",
    "projectC.p1":
      "Neu in einem Land anzukommen heißt, vieles gleichzeitig zu lernen: die Sprache, aber auch, wie der Alltag und die Behörden funktionieren. Die Learning Engine verbindet beides. Sie unterstützt Migrantinnen und Migranten dabei, Deutsch zu lernen, und zwar von Anfang an in Situationen, die im Alltag wirklich vorkommen.",
    "projectC.p2":
      "Im Mittelpunkt steht, sich im Alltag zurechtzufinden und selbstständig zu erledigen, was nötig ist, etwa Behördengänge, Formulare oder Arzttermine. Statt abstrakter Übungen steht das im Vordergrund, was die Lernenden konkret brauchen. So wächst mit dem Wortschatz auch das Selbstvertrauen, den eigenen Alltag selbst zu meistern.",
    "projectC.fact1":
      "Zielgruppe: Migrantinnen und Migranten",
    "projectC.fact2":
      "Ziel: Deutsch lernen und im Alltag zurechtkommen",
    "projectC.fact3":
      "Fokus: konkrete Alltagssituationen statt abstrakter Übungen",
    "projectD.title":
      "FUTURIA – Sonderausstellung zum Thema Zukunft",
    "projectD.card":
      "Interaktive Sonderausstellung im Kindermuseum mondo mio! in Dortmund: Erfindungen entwerfen, Erinnerungen bewahren, Ideen teilen.",
    "projectD.summary":
      "Eine interaktive Sonderausstellung im Dortmunder Kindermuseum mondo mio!, die sich mit der Zukunft beschäftigt.",
    "projectD.p1":
      "FUTURIA ist eine interaktive Sonderausstellung im Kindermuseum mondo mio! in Dortmund. Sie widmet sich dem Thema Zukunft und richtet sich an kleine und große Besucherinnen und Besucher.",
    "projectD.p2":
      "Im Zukunftsatelier entwerfen Gäste Erfindungen, die Menschen in 100 Jahren brauchen könnten; Skizzen und Modelle werden ausgestellt. Im Zeitarchiv erscheinen Nachrichten von Zukunftsreisenden in einem Liveticker, und Besuchende können Erinnerungen für die Zukunft bewahren. Die Galerie der Zukunft zeigt Ideen von Kindern und Jugendlichen aus aller Welt.",
    "projectD.fact1":
      "Ort: Kindermuseum mondo mio!, Dortmund",
    "projectD.fact2":
      "Bereiche: Zukunftsatelier, Zeitarchiv und Galerie der Zukunft",
    "projectD.fact3":
      "Zielgruppe: kleine und große Besucherinnen und Besucher",
    "projectD.cta":
      "Zur Ausstellung",
    "projectE.title":
      "„Mein Heerich“ – Computerspiel im Museum Schloss Moyland",
    "projectE.card":
      "Ein Computerspiel in der Heerich-Ausstellung im Museum Schloss Moyland macht die Kunst von Erwin Heerich spielerisch erlebbar.",
    "projectE.summary":
      "Ein Computerspiel, das in der Ausstellung zu Erwin Heerich im Museum Schloss Moyland dessen Werk interaktiv erklärt.",
    "projectE.p1":
      "„Mein Heerich“ ist ein Computerspiel, das in der Ausstellung zum Künstler Erwin Heerich im Museum Schloss Moyland gezeigt wurde und dessen Werk interaktiv erklärt. Entwickelt wurde es von Birgit Mosler gemeinsam mit Prof. Ido Iurgel von der Hochschule Rhein-Waal, der als Berater beteiligt war.",
    "projectE.p2":
      "Am großen Bildschirm im ersten Eckraum der Heerich-Ausstellung im Erdgeschoss von Schloss Moyland konnten Besucherinnen und Besucher einen fein ausgeschnittenen Würfel aus Pappe virtuell Stück für Stück zerlegen. In seiner Mitte sitzt ein blau schimmernder Diamant, den es nur im Spiel gibt.",
    "projectE.fact1":
      "Ort: Museum Schloss Moyland",
    "projectE.fact2":
      "Entwicklung: Birgit Mosler",
    "projectE.fact3":
      "Beratung: Prof. Ido Iurgel, Hochschule Rhein-Waal",
    "projectE.cta":
      "Zum Artikel (Rheinische Post)",
    "project.factsTitle": "Auf einen Blick",
  },
  en: {
    "nav.home": "Home",
    "nav.ueberUns": "About us",
    "nav.projekte": "Projects",
    "nav.team": "Team",
    "nav.kontakt": "Contact",
    "team.heading": "Team",
    "team.roleLead": "Management",
    "team.roleDev": "Software development",
    "hero.cta": "Get in touch",
    "ueberUns.heading": "About us",
    "ueberUns.text":
      "We develop software and digital products — from e-learning and serious games to tailored solutions for training, coaching and knowledge transfer.",
    "projekte.heading": "Projects",
    "kontakt.heading": "Contact",
    "kontakt.firma": "Company",
    "kontakt.anschrift": "Address",
    "kontakt.telefon": "Phone",
    "kontakt.email": "Email",
    "footer.impressum": "Legal Notice",
    "footer.datenschutz": "Privacy Policy",
    "project.back": "← Back to projects",
    "projectA.title": "AI avatar for therapeutic intake conversations",
    "projectA.card":
      "An AI avatar conducts the initial therapeutic conversation and assesses well-being in 12 minutes — developed for Zentrum Moyland.",
    "projectA.summary":
      "An AI avatar conducts the initial therapeutic conversation and checks how the patient is doing.",
    "projectA.p1":
      "For Zentrum Moyland and a therapist, we are developing an AI avatar that conducts the initial therapeutic conversation. It covers a range of profile areas, including stress and sleep but also others, to assess the patient's well-being.",
    "projectA.p2":
      "The conversation takes 12 minutes. Afterwards, a dashboard presents an analysis: statements from the entire conversation are summarized and shown visually and graphically, together with an evaluation of the patient's behavior via the camera.",
    "projectA.factsTitle": "At a glance",
    "projectA.factClient": "Client: Zentrum Moyland and a therapist",
    "projectA.factDuration": "Conversation length: 12 minutes",
    "projectA.factTopics": "Profile areas: including stress and sleep, among others",
    "projectA.factResult": "Result: dashboard with summary, charts and camera-based behavior evaluation",
    "projectA.cta": "Open the application",
    "projectB.title":
      "Creativity Engine",
    "projectB.card":
      "An AI-assisted platform for sustained idea development, built around six clearly separated roles from research to roadmap.",
    "projectB.summary":
      "An AI-assisted platform for sustained idea development, with more rigor than a conversational chat window.",
    "projectB.p1":
      "Creativity Engine is intended for founders, solo builders, and others who need more rigor than a conversational chat window, without assuming a full team is available to challenge every draft.",
    "projectB.p2":
      "Most general-purpose AI chat tools collapse generation, evaluation, and decision-making into a single continuous exchange. That speed is useful, but it often weakens reflection: responses arrive with confidence, critique collapses into agreement, and the history of how an idea changed becomes difficult to recover. Creativity Engine addresses that problem by treating each idea as a persistent object, not a transient message, and by separating the work into six distinct roles: Explorer, Generator, Evolution Engine, Jury, Theory Builder, and Roadmapper. Each role performs a different cognitive task. Research stays grounded, generation stays deliberate, critique stays independent of the draft that produced it, and scoring is multi-perspective rather than collapsed into a single verdict.",
    "projectB.p3":
      "The product is user-directed. The interface is built around a manual-first canvas where people place, connect, and run operations deliberately. The system may assist and propose, but it does not silently execute an end-to-end plan on the user’s behalf: the AI supports judgment, it does not replace it. Technically, it is a single-stack web application in TypeScript using the Next.js App Router, with API routes as the backend and OpenAI models reached through a shared gateway. The interface follows a restrained professional design language: flat surfaces, light structural borders, and color used sparingly for active or flagged states.",
    "projectB.fact1":
      "Audience: founders, solo builders and anyone who wants to develop ideas rigorously",
    "projectB.fact2":
      "Six roles: Explorer, Generator, Evolution Engine, Jury, Theory Builder, Roadmapper",
    "projectB.fact3":
      "Principle: the human directs, the AI assists and proposes",
    "projectB.fact4":
      "Technology: TypeScript, Next.js and OpenAI models",
    "projectC.title":
      "Learning engine for migrants",
    "projectC.card":
      "A learning platform that helps with learning German and, above all, with finding one’s way around everyday life and getting everything done that needs doing.",
    "projectC.summary":
      "A learning platform for migrants: learn German and cope with everyday life.",
    "projectC.p1":
      "Arriving in a new country means learning many things at once: the language, but also how everyday life and the authorities work. The learning engine combines both. It supports migrants in learning German, right from the start and in situations that really occur in everyday life.",
    "projectC.p2":
      "The focus is on finding one’s way around and independently getting done what needs to be done, such as dealing with authorities, filling in forms or making doctor’s appointments. Instead of abstract exercises, it centers on what learners actually need. As their vocabulary grows, so does their confidence in managing their own everyday lives.",
    "projectC.fact1":
      "Audience: migrants",
    "projectC.fact2":
      "Goal: learn German and cope with everyday life",
    "projectC.fact3":
      "Focus: concrete everyday situations instead of abstract exercises",
    "projectD.title":
      "FUTURIA – special exhibition on the future",
    "projectD.card":
      "An interactive special exhibition at the mondo mio! children’s museum in Dortmund: design inventions, preserve memories, share ideas.",
    "projectD.summary":
      "An interactive special exhibition at the mondo mio! children’s museum in Dortmund, dedicated to the future.",
    "projectD.p1":
      "FUTURIA is an interactive special exhibition at the mondo mio! children’s museum in Dortmund. It is dedicated to the future and addresses visitors both young and old.",
    "projectD.p2":
      "In the future atelier, guests design inventions that people might need in 100 years; sketches and models are put on display. In the time archive, messages from time travellers appear in a live ticker, and visitors can preserve memories for the future. The gallery of the future shows ideas from children and young people from all over the world.",
    "projectD.fact1":
      "Location: mondo mio! children’s museum, Dortmund",
    "projectD.fact2":
      "Areas: future atelier, time archive and gallery of the future",
    "projectD.fact3":
      "Audience: visitors both young and old",
    "projectD.cta":
      "Visit the exhibition page",
    "projectE.title":
      "“Mein Heerich” – computer game at Museum Schloss Moyland",
    "projectE.card":
      "A computer game in the Heerich exhibition at Museum Schloss Moyland makes the art of Erwin Heerich playfully accessible.",
    "projectE.summary":
      "A computer game that interactively explains the work of Erwin Heerich in the exhibition at Museum Schloss Moyland.",
    "projectE.p1":
      "“Mein Heerich” is a computer game that was shown in the exhibition on the artist Erwin Heerich at Museum Schloss Moyland and explains his work interactively. It was developed by Birgit Mosler together with Prof. Ido Iurgel of Rhine-Waal University of Applied Sciences, who contributed as an advisor.",
    "projectE.p2":
      "At the large screen in the first corner room of the Heerich exhibition on the ground floor of Schloss Moyland, visitors could take a finely cut cardboard cube apart virtually, piece by piece. At its center sits a blue, shimmering diamond that exists only in the game.",
    "projectE.fact1":
      "Location: Museum Schloss Moyland",
    "projectE.fact2":
      "Development: Birgit Mosler",
    "projectE.fact3":
      "Advice: Prof. Ido Iurgel, Rhine-Waal University of Applied Sciences",
    "projectE.cta":
      "Read the article (Rheinische Post)",
    "project.factsTitle": "At a glance",
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
