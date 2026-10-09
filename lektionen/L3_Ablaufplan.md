---
lektion: 3
zielgruppe: lehrperson
art: ablaufplan
titel: "Ablaufplan Lektion 3"
kurz: "Zeitraster, Vigenère knacken, AES-Input, Kistenrätsel als Cliffhanger"
reihenfolge: 1
---

# Ablaufplan Lektion 3: Vigenère knacken, AES und das Schlüsselproblem

**45 Min. | Partnerarbeit, Einzelarbeit, Dreiergruppen**

## Vorbereitung

- Optional, aber wirkungsvoll: eine kleine Kiste (Schuhschachtel genügt) und zwei Vorhängeschlösser für die Auflösung zu Beginn von Lektion 4 bereitlegen.
- Taschenrechner (oder Rechner im Browser) für die Schlüsselraum-Aufgaben.

## Zeitraster

| Zeit | Phase | Was passiert | Material |
|---|---|---|---|
| 0–13 | Vigenère knacken | Partnerarbeit mit dem Werkzeug. Nach 5 Min. kurzer Halt: Was zeigen die Abstände? (→ 6) | Auftrag Vigenère knacken |
| 13–27 | Von Vigenère zu AES | 6 Min. lesen (mit XOR-Werkzeug), 8 Min. Rechenaufgaben 1–2. | Input AES |
| 27–35 | Besprechung | Das Wichtigste: Kasiski in zwei Schritten, One-Time-Pad, AES und Kerckhoffs, Schlüsselraum. Endet mit dem Schlüsselaustauschproblem. | Das Wichtigste L3 |
| 35–43 | Kistenrätsel | Dreiergruppen. Lösung **nicht** auflösen – Einstieg in L4. | Auftrag Kistenrätsel |
| 43–45 | Puffer | – | – |

## Besprechung «Das Wichtigste»

Leitfragen der Seite «Das Wichtigste» projizieren → 1 Min. zu zweit murmeln → Antworten
sammeln → Merksätze auf der Seite zeigen und kurz kommentieren. Die SuS müssen nichts
abschreiben: Die Seite ist ihre Lernzusammenfassung (auch im Dossier).

**Worauf achten:**

- **Besprechung vor dem Rätsel:** Hier steht die Besprechung bewusst nicht am Schluss. Sie endet mit der Frage «Wie kommt der Schlüssel zum Online-Shop?» – das Kistenrätsel ist dann die direkte Fortsetzung und bleibt als Cliffhanger offen.
- **Schlüsselraum-Tabelle:** Die Ergebnisse von Aufgabe 1 an der Wandtafel vergleichen, dann die Tabelle auf der Seite zeigen. Wichtig ist die Grössenordnung, nicht die Nachkommastelle.
- **AES nicht vertiefen:** Runden und Operationen nur als Idee; entscheidend sind «öffentlich geprüft» und «keine Muster».

## Hinweise

- **Vigenère-Text:** Schlüssel TRESOR (Länge 6), 675 Buchstaben, also gut 110 pro Spalte – die Vorschläge des Werkzeugs (Chi-Quadrat-Vergleich mit der deutschen Verteilung) treffen in allen sechs Spalten. Das Balkendiagramm «durch n teilbar» zeigt bei 2, 3 und 6 hohe Werte; die SuS sollen begründen, warum 6 und nicht 2 oder 3 die Länge ist (alle Vielfachen von 6 sind auch durch 2 und 3 teilbar, aber nicht umgekehrt).
- **Stolperstein:** Einige tragen die Länge 3 ein. Das ist nicht falsch, aber dann passen die Spalten nicht zur deutschen Verteilung (jede Spalte mischt zwei Verschiebungen). Gute Gelegenheit, die Idee zu vertiefen.
- **Früh fertig:** Der zweite Text hat den Schlüssel BIT (Länge 3, 364 Buchstaben). Wegen der Kürze sind die Wiederholungen weniger deutlich – das ist Absicht.
- **Kistenrätsel:** Die SuS finden meist die Lösung mit drei Fahrten (Doppelschloss-Protokoll). Die Schnappschloss-Variante (Aufgabe 2) ist genau die Idee der asymmetrischen Verschlüsselung. Aufgabe 3 (der Bote verteilt seine eigenen Schnappschlösser = Man-in-the-Middle) zeigt bereits das Authentizitätsproblem, das in L5 mit Zertifikaten gelöst wird. Lösungen in L4 einsammeln und dort auflösen.
- **Puffer:** Aufgaben 3–4 des Inputs sind bereits «früh fertig»; ihr Inhalt kommt in der Besprechung vor. Wird es trotzdem knapp, das Kistenrätsel als Hausaufgabe geben und in L4 auflösen.
