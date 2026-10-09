---
lektion: 2
zielgruppe: lehrperson
art: ablaufplan
titel: "Ablaufplan Lektion 2"
kurz: "Zeitraster, Knack-Wettbewerb, Tipps in Stufen, Vigenère von Hand"
reihenfolge: 1
---

# Ablaufplan Lektion 2: Häufigkeitsanalyse und Vigenère

**45 Min. | Plenum, Zweiergruppen**

## Vorbereitung

- Vigenère-Arbeitsblatt drucken (das Quadrat ist auf Papier deutlich angenehmer als am Bildschirm).
- Optional: kleiner Preis für das schnellste Team (Schoggi wirkt).

## Zeitraster

| Zeit | Phase | Was passiert | Material |
|---|---|---|---|
| 0–3 | Rückblick, Problem | «Wie viele Schlüssel gibt es, wenn man jeden Buchstaben beliebig ersetzt?» → 26! ≈ 4 · 10²⁶, bei 10⁹ Versuchen/s rund 13 Mrd. Jahre. «Also sicher?» | Auftrag Häufigkeitsanalyse |
| 3–20 | Knack-Wettbewerb | Zweiergruppen knacken den Brief mit dem Werkzeug. Tipps in Stufen (siehe unten). Erste Gruppe ruft «Phelippes!». | Häufigkeits-Werkzeug |
| 20–33 | Vigenère | Kurz im Plenum: Quadrat lesen (JANUAR/NKSA, zwei Buchstaben vormachen). Dann Aufgaben 1–3 einzeln. | Arbeitsblatt Vigenère |
| 33–43 | Besprechung | Das Wichtigste: Auflösung der Maria-Stuart-Geschichte, Schlüsselraum notwendig aber nicht hinreichend, mono vs. poly. | Das Wichtigste L2 |
| 43–45 | Puffer | – | – |

## Tipps in Stufen für den Wettbewerb

Nur geben, wenn eine Gruppe 5 Minuten feststeckt:

1. Der häufigste Geheimbuchstabe ist **I** (132-mal) → e.
2. Das häufige Wort `XIE` ist «den», `AEX` ist «und».
3. `GTZNT` kommt mehrmals vor und ist ein Name.
4. `DRB` kommt in vielen Wörtern vor → «sch».

Die vollständige Ersetzungstabelle steht in der Musterlösung.

## Besprechung «Das Wichtigste»

Leitfragen der Seite «Das Wichtigste» projizieren → 1 Min. zu zweit murmeln → Antworten
sammeln → Merksätze auf der Seite zeigen und kurz kommentieren. Die SuS müssen nichts
abschreiben: Die Seite ist ihre Lernzusammenfassung (auch im Dossier).

**Worauf achten:**

- **Geschichte auflösen:** Die Moral (falsche Sicherheit ist gefährlicher als keine) eignet sich als Einstieg in die Besprechung.
- **«Viele Schlüssel = sicher»:** Genau diese Fehlvorstellung soll die Lektion zerlegen. Merksatz «notwendig, aber nicht hinreichend» ausdrücklich festhalten.
- **Leitfrage 3 (Schwachstelle von Vigenère)** offen lassen – die Vermutungen der SuS sind der Einstieg in L3. Hinweis auf Aufgabe 3c (Wiederholung alle 4 Zeichen).

## Hinweise

- **Die Geschichte stimmt (vereinfacht):** Maria Stuart wurde 1587 hingerichtet, nachdem Thomas Phelippes ihre verschlüsselte Korrespondenz mit den Verschwörern um Anthony Babington entschlüsselt hatte (Babington-Komplott). Ihr Verfahren war eine Nomenklatur – Ersatzzeichen für Buchstaben plus Codezeichen für häufige Wörter. Die Moral der Geschichte ist das eigentliche Lernziel: Eine schwache Verschlüsselung ist gefährlicher als keine, weil sie falsche Sicherheit gibt.
- **Leerzeichen und Satzzeichen** sind im Geheimtext absichtlich erhalten geblieben – das macht die Aufgabe in 20 Minuten lösbar. Profis lassen sie weg; das kann man als Diskussionsfrage nachschieben.
- **Stolperstein Vigenère-Quadrat:** Manche SuS lesen Zeile und Spalte vertauscht. Das ist bei der Verschlüsselung egal (das Quadrat ist symmetrisch), beim Entschlüsseln aber nicht. Darum Entschlüsseln (Aufgabe 2) explizit am Beispiel zeigen: *In der Spalte des Schlüsselbuchstabens den Geheimtextbuchstaben suchen, dann am Zeilenanfang den Klartext ablesen.*
- **Puffer:** Wird es knapp, Aufgabe 3 des Vigenère-Blatts in die nächste Lektion verschieben – sie leitet ohnehin zu Lektion 3 über.
