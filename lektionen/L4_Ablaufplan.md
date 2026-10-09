---
lektion: 4
zielgruppe: lehrperson
art: ablaufplan
titel: "Ablaufplan Lektion 4"
kurz: "Zeitraster, Kistenrätsel-Auflösung, Klassen-Experiment im Teams-Kanal, Schlüssel der Lehrperson"
reihenfolge: 1
---

# Ablaufplan Lektion 4: Asymmetrische Verschlüsselung und RSA

**45 Min. | Plenum, Klassen-Experiment**

## Vorbereitung

- Im Klassen-Team einen Kanal **«Verschlüsselung»** anlegen (Standardkanal, für alle sichtbar). Alternative ohne Teams: Padlet oder einfach die Wandtafel.
- Kiste und zwei Vorhängeschlösser vom Ende der Lektion 3 bereitlegen (optional).
- **Eigenen öffentlichen Schlüssel der Lehrperson** zu Beginn im Kanal posten (siehe unten), damit die SuS der LP am Schluss eine verschlüsselte Nachricht schicken können (optional).

## Zeitraster

| Zeit | Phase | Was passiert | Material |
|---|---|---|---|
| 0–10 | Kistenrätsel, Einwegfunktion | 1–2 Gruppen stellen ihre Lösung vor (drei Fahrten). Variante Schnappschloss → öffentlich / privat. Wettrechnen 19 · 31 gegen «731 = ? · ?». | Kiste, Input Abschnitte 1–2 |
| 10–35 | Klassen-Experiment | Schritte 1–4 und Fragen gemäss Auftrag. LP liest im Kanal mit. | Auftrag, Werkzeug |
| 35–43 | Besprechung | Das Wichtigste: Schlüsselpaar, Einwegfunktion und Falltür, RSA in drei Schritten, hybrid. Offene Frage → L5. | Das Wichtigste L4 |
| 43–45 | Puffer | Optional: Jede Person schickt der LP eine verschlüsselte Nachricht. | – |

## Schlüssel der Lehrperson

Für die Exit-Nachrichten an die Lehrperson vor der Lektion im
[Werkzeug](L4_Auftrag_RSA_Klassenkanal.html) ein eigenes Schlüsselpaar erzeugen, den
öffentlichen Schlüssel im Kanal posten und den privaten Schlüssel **auf Papier** notieren.

Bewusst nicht hier eintragen: Diese Website liegt in einem öffentlichen Repository – ein hier
notierter privater Schlüssel wäre für alle lesbar. Genau das ist die Lektion des Tages.

Zum Testen des Werkzeugs vorab: Mit p = 211, q = 313 und e = 17 entsteht der öffentliche
Schlüssel (17, 66043); «HALLO KLASSE» ergibt dann `21555 50461 17617 35043 4526 59750`.

## Besprechung «Das Wichtigste»

Leitfragen der Seite «Das Wichtigste» projizieren → 1 Min. zu zweit murmeln → Antworten
sammeln → Merksätze auf der Seite zeigen und kurz kommentieren. Die SuS müssen nichts
abschreiben: Die Seite ist ihre Lernzusammenfassung (auch im Dossier).

**Worauf achten:**

- **Wer nimmt welchen Schlüssel?** Die Fehler aus dem Experiment (mit eigenem statt fremdem öffentlichem Schlüssel verschlüsselt, privaten Schlüssel gepostet) sind das beste Material für die Leitfrage 1.
- **«Faktorisieren ist NP-schwer»** nicht so formulieren – korrekt ist «es ist kein effizientes Verfahren bekannt».
- **Offene Frage stehen lassen:** «Woher weiss ich, dass der Schlüssel von Lea stammt?» ist der Einstieg in L5.

## Hinweise

- **Stolperstein Nr. 1 – privater Schlüssel gepostet:** Passiert fast immer jemandem. Nicht korrigieren, sondern nutzen: «Was bedeutet das jetzt?» → Alle Nachrichten an diese Person sind lesbar; Schlüsselpaar neu erzeugen, alten öffentlichen Schlüssel als ungültig markieren (Stichwort *Widerruf*, kommt bei Zertifikaten wieder).
- **Stolperstein Nr. 2 – falscher Schlüssel beim Verschlüsseln:** Wer mit dem *eigenen* öffentlichen Schlüssel verschlüsselt, kann die Nachricht selbst lesen, die Empfängerin nicht. Auch das gemeinsam auswerten.
- **Copy-Paste:** Das Werkzeug liest einfach alle Zahlen aus dem Feld. «(17, 323663)», «17 323663» oder «e=17 n=323663» funktionieren alle.
- **Umlaute und Satzzeichen:** Umlaute werden zu ae/oe/ue, Satzzeichen fallen weg. Das ist gewollt und gut zu erklären (Codierung A = 01 …).
- **Aufgabe 2 (deterministisch):** Gleiche Nachricht → gleicher Geheimtext. Eve kann so erkennen, wenn zweimal dieselbe Nachricht gesendet wird, oder einzelne Blöcke wiedererkennen. Echtes RSA ergänzt die Nachricht deshalb vor dem Verschlüsseln mit Zufallsbits (*Padding*, z. B. OAEP). Vertiefung in L7.
- **Aufgabe 3 (Vertrauen):** Das ist der Cliffhanger für L5 – unbedingt kurz stehen lassen.
- **«NP-schwer»:** Im bisherigen Folienmaterial stand, die Faktorisierung sei NP-schwer. Das ist nicht bewiesen und gilt sogar als unwahrscheinlich. Korrekt: «Es ist kein effizientes Verfahren bekannt.»
- **Puffer:** Wird es knapp, Schritt 4 (Eve spielen) überspringen; Aufgabe 1 dann als Hausaufgabe.
