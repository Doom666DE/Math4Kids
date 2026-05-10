# Math4Kids

[![App starten](https://img.shields.io/badge/App%20starten-18A999?style=for-the-badge&logo=githubpages&logoColor=white)](https://doom666de.github.io/Math4Kids/)

Eine Mathe-Lernplattform für Kinder in Grundschule und Sek I. Kinder üben in
Missionen mit Hilfe-Stufen, Sternen und Abzeichen; Erwachsene sehen Lernstand,
Fehlerarten, Empfehlungen und bei Lehrkräften detaillierte Klassenprotokolle.

## Starten

Math4Kids ist eine React/Vite-App. Lokal:

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

Das Schema legt `missions`, `mission_progress`, `attempts`, `child_profiles`,
`class_rooms`, `class_memberships` und die nötigen RLS-Policies an. Der
Service-Role-Key gehört nie ins Frontend.

## Online öffnen

Die App ist über GitHub Pages erreichbar:

https://doom666de.github.io/Math4Kids/

## Funktionen

- Eltern/Lehrer-Login mit Supabase Auth oder Demo-Modus
- Kinderprofile mit PIN
- Lehrer-Klassen mit Schülerzuordnung
- Detaillierte Antwortprotokolle: Aufgabe, Eingabe, richtige Lösung, Hilfen, Dauer, Fehlerart, Mission und Zeitpunkt
- Missionen: Zahlenwelt, Bruch-Pizza, Komma-Werkstatt, Prozent-Shop, Geometrie-Labor, Einheiten-Reise, Textaufgaben-Detektiv, Gleichungs-Dojo, Koordinaten-Karte, Statistik-Studio
- Module: Grundrechenarten, Brüche, Dezimalzahlen, Prozent, Geometrie, Maße, Textaufgaben, Gleichungen, Koordinaten, Statistik
- Schrittweise Tipps, Sterne, Mission-Abschluss und Abzeichen
- Generator-Aufgaben und feste Diagnose-/Abschlusstests
- Antwortprotokoll, Lernstand, Fehlerarten, Schwächen und Empfehlungen
