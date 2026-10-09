---
lektion: 1
zielgruppe: lehrperson
art: ablaufplan
titel: "Ablaufplan Lektion 1"
kurz: "Zeitraster, Einstiegsrätsel, Hinweise zu Schutzzielen und Kerckhoffs"
reihenfolge: 1
---

# Ablaufplan Lektion 1: Geheimnisse schützen

**45 Min. | Plenum, Partnerarbeit**

## Vorbereitung

- Seite [Einstieg: Geheimbotschaft](L1_Einstieg_Geheimbotschaft.html) projizieren, bevor die Klasse eintritt.
- Die Website-Adresse an die Wandtafel schreiben (oder als QR-Code zeigen).
- Arbeitsblatt Schutzziele für alle, die auf Papier arbeiten wollen, ausdrucken (1 Seite).

## Zeitraster

| Zeit | Phase | Was passiert | Material |
|---|---|---|---|
| 0–5 | Einstieg | Geheimbotschaft an der Wand. SuS versuchen ohne Hilfsmittel. Nach 3 Min. Tipp 1, bei Bedarf Tipp 2. Wer es hat, flüstert der LP das Passwort. | Einstiegsseite |
| 5–15 | Schutzziele | Partnerarbeit: 8 Szenarien zuordnen. Nur strittige Fälle kurz klären – die Sicherung folgt am Schluss. | Arbeitsblatt Schutzziele |
| 15–33 | Caesar | Partnerarbeit mit Werkzeug, Aufgaben 1–5. LP zirkuliert, v. a. bei Aufgabe 5 (Kerckhoffs). | Arbeitsblatt Caesar |
| 33–43 | Besprechung | Das Wichtigste: Schutzziele, Begriffe, Brute Force, Kerckhoffs, Codierung. | Das Wichtigste L1 |
| 43–45 | Puffer | – | – |

## Besprechung «Das Wichtigste»

Leitfragen der Seite «Das Wichtigste» projizieren → 1 Min. zu zweit murmeln → Antworten
sammeln → Merksätze auf der Seite zeigen und kurz kommentieren. Die SuS müssen nichts
abschreiben: Die Seite ist ihre Lernzusammenfassung (auch im Dossier).

**Worauf achten:**

- **Verschlüsselung = alle Schutzziele?** Die häufigste Fehlvorstellung. An Szenario 6 klären: Eve kann verschlüsselte Bits verändern, ohne sie lesen zu können.
- **Integrität vs. Authentizität:** Faustregel *«unverändert?»* vs. *«vom richtigen Absender?»*.
- **Kerckhoffs:** Wichtigster Gedanke der Lektion, kommt in L3 (AES) und L4 (öffentlicher Schlüssel) wieder. Notfalls bei den Schutzzielen kürzen, nicht hier.
- **Codierung:** Aufgabe 6 haben nicht alle gelöst – in der Besprechung einfach fragen «Ist Morse eine Verschlüsselung?» und die Begründung (kein Schlüssel) festhalten.

## Hinweise

- **Einstieg:** Das Rätsel ist mit Verschiebung 7 verschlüsselt. Das Passwort «Rubikon» spielt auf Caesar an (Überschreitung des Rubikon, 49 v. Chr.) – gut als Überleitung: «Wer war das noch mal?». Die Lösung erst nach Aufgabe 4 des Caesar-Arbeitsblatts (Knacken) auflösen, dann können es alle mit dem Werkzeug selbst knacken.
- **Stolperstein Schutzziele:** Integrität und Authentizität werden oft verwechselt. Faustregel für die SuS: *Integrität = Ist der Inhalt unverändert? Authentizität = Stammt er wirklich von der Person, die er vorgibt?* Bei Szenario 7 (Software-Update) sind beide betroffen – das ist gewollt.
- **Verfügbarkeit:** Wer die Cybersicherheits-Einheit erinnert, nennt evtl. «Verfügbarkeit». Das ist korrekt, wird aber nicht mit Kryptografie geschützt (sondern mit Backups, Redundanz). Darum ist es hier nur im Infokasten erwähnt.
- **Moderne Verfahren:** Falls jemand fragt, ob Verschlüsselung nicht auch die Integrität schützt: Moderne Verfahren (z. B. AES-GCM) kombinieren Verschlüsselung mit einer Prüfsumme. Das ist dann aber ein zusätzlicher Baustein – genau den lernen wir in Lektion 5 kennen.
- **Puffer:** Wenn die Zeit knapp wird, Aufgabe 5 (Kerckhoffs) in die Besprechung verlegen – die Leitfrage 2 deckt sie ab.

