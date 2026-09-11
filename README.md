# Marvelous Software Solutions — Website

Einfache statische Website (reines HTML/CSS/JS, kein Build-Schritt nötig).

## Struktur

- `index.html` — Startseite (Home, Über uns, Projekte, Kontakt als Abschnitte)
- `impressum.html` — Impressum
- `datenschutz.html` — Datenschutzerklärung
- `css/style.css` — Styles (Farben oben unter `:root` anpassbar)
- `js/main.js` — Kleines Skript für Jahr im Footer & mobiles Menü

## Lokal ansehen

Einfach `index.html` im Browser öffnen, oder z. B. mit der VS-Code-Erweiterung
"Live Server" starten.

## Deployment (Vercel)

Dieses Projekt braucht keinen Build-Schritt — Vercel erkennt es automatisch als
statische Seite. Am einfachsten: Repo mit GitHub verbinden und in Vercel
importieren, dann deployt jeder Push automatisch.

## Offene Punkte

- Fehlende Angaben im Impressum ergänzen (Vertretungsberechtigte(r), Telefon,
  E-Mail, Handelsregister, USt-ID)
- Texte für "Über uns" und "Projekte" ergänzen
- Datenschutzerklärung erweitern, sobald Formulare/Analytics dazukommen
