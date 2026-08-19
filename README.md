# Banana Split Protocol

## Die Story

Am Ende des Tages soll sich euer Team an einem geheimen Ort treffen, doch die
Zielkoordinaten wurden in drei digitale Anteile zerlegt. Jeder Anteil ist hinter
einer anderen Spur verborgen, die digitale Recherche und eine echte Beobachtung
vor Ort verbindet. Ein OpenCode-Agent kann Dateien durchsuchen, MCP-Werkzeuge
bedienen und euch bei der Analyse unterstützen. Er kann jedoch keine physische
Karte sehen und darf keine menschliche Entscheidung ersetzen. Nur zwei
verschiedene Stationsanteile ergeben den Schlüssel zum finalen Rendezvous-MCP.
Eure Aufgabe ist es, als Team sauber zu recherchieren, kritisch zu prüfen und
den Treffpunkt zu finden.

## So startet ihr

1. Entpackt das Teilnehmerpaket in ein eigenes Verzeichnis.
2. Öffnet dort ein Terminal und führt `npm install` sowie
   `npm run check:archive` aus.
3. Prüft, dass `check:archive` `Archive MCP reachable` meldet.
4. Startet OpenCode aus genau diesem Verzeichnis neu.
5. Gebt `/start-game` ein.

## Euer Ziel

- Untersucht die Dateien im Repository und prüft Quellen, Status, Gültigkeit und Freigaben.
- Entscheidet als Menschen, welchen Belegen ihr vertraut.
- Folgt den validierten Hinweisen zu zwei verschiedenen Stationen.
- Verbindet digitale Hinweise mit einer sichtbaren Beobachtung vor Ort.
- Sammelt zwei Stationsanteile und ruft damit den finalen Treffpunkt ab.
- Wenn ihr die optionale Spiral-Station wählt, bearbeitet zuerst `SPIRAL-TASK.md`; dort schreibt ein Mensch den fehlenden OpenCode-Skill selbst.

## Wichtig

- Der Agent darf keine Beobachtung vor Ort erfinden.
- Codes und Zugangsdaten nicht erraten, teilen oder committen.
- Bei einer Konfigurationsänderung OpenCode vollständig neu starten.
- Die Projektberechtigungen verweigern dem Agenten gewöhnliche Dateiänderungen und Bash. Nur der Banana-Split-Zusammenführen darf die Schlüsseldatei schreiben; lockert diese Berechtigungen nicht.
- Für das Zusammenführen der Shares nutzt ihr die Banana-Split-Funktion. Sie schreibt den Schlüssel in die Datei `.opencode/.rendezvous-key`; der finale MCP ist bereits vorkonfiguriert.

Eine vollständige technische Anleitung ist nicht nötig, um zu beginnen. Fragt
OpenCode nach dem nächsten belegbaren Schritt und entscheidet als Team.
