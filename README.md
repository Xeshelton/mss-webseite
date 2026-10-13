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

## Deployment (GitHub Pages)

Dieses Projekt braucht keinen Build-Schritt. Die Seite wird über GitHub Pages
direkt aus dem Branch `main` (Ordner `/ (root)`) veröffentlicht, jeder Push
aktualisiert sie automatisch. Die Domain `www.marvelous-software-solutions.de`
steht in der Datei `CNAME`; die DNS-Einträge liegen bei IONOS
(CNAME `www` → `xeshelton.github.io`, vier A-Records für die Hauptdomain).
Die Mail-Einträge (MX, SPF, DKIM) und der TXT-Eintrag für die Google Search
Console dürfen nicht gelöscht werden.

## Offene Punkte

- Datenschutzerklärung erweitern, sobald Formulare/Analytics dazukommen
