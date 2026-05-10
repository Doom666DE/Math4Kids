# Math4Kids

[![App starten](https://img.shields.io/badge/App%20starten-18A999?style=for-the-badge&logo=githubpages&logoColor=white)](https://doom666de.github.io/Math4Kids/)

Eine kleine Mathe-Übungs-App für Kinder. Sie läuft komplett im Browser und
braucht kein Backend.

## Starten

Math4Kids ist jetzt als React/Vite-Lernplattform geplant und umgesetzt. Lokal:

```powershell
npm install
npm run dev
```

Danach ist die App unter `http://localhost:5173` erreichbar. Ohne Supabase-Variablen läuft sie im Demo-Modus mit lokaler Browser-Speicherung.

## Supabase einrichten

1. Neues Supabase-Projekt erstellen.
2. `supabase/schema.sql` im SQL Editor ausführen.
3. `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` als GitHub Actions Repository Variables setzen.
4. Lokal optional `.env` aus `.env.example` erstellen.

## Online öffnen

Wenn GitHub Pages für dieses Repository aktiviert ist:

https://doom666de.github.io/Math4Kids/

Falls der Actions-Deploy nicht klappt, kann GitHub Pages auch ohne Build laufen:

1. `Settings > Pages`
2. Source: `Deploy from a branch`
3. Branch: `Home`
4. Folder: `/docs`
5. Save

## Funktionen

- Eltern/Lehrer-Login mit Supabase Auth oder Demo-Modus
- Kinderprofile mit PIN
- Module: Grundrechenarten, Brüche, Dezimalzahlen, Prozent, Geometrie, Maße, Textaufgaben, Gleichungen, Koordinaten, Statistik
- Generator-Aufgaben und feste Diagnose-/Abschlusstests
- Antwortprotokoll, Lernstand, Schwächen und Empfehlungen
