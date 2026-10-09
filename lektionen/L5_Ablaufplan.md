---
lektion: 5
zielgruppe: lehrperson
art: ablaufplan
titel: "Ablaufplan Lektion 5"
kurz: "Zeitraster, Hash-Experimente, Signatur-Werkzeug, Zertifikat im Browser"
reihenfolge: 1
---

# Ablaufplan Lektion 5: Hashfunktionen, Signaturen und Zertifikate

**45 Min. | Partnerarbeit mit kurzen Plenumsphasen**

## Vorbereitung

- Vorab selbst prüfen, ob die Zertifikatsansicht in den Browsern der Schulgeräte erreichbar ist (bei verwalteten Geräten manchmal eingeschränkt). Notfalls die Zertifikatsansicht am Beamer zeigen.
- Prüfen, ob badssl.com im Schulnetz erreichbar ist (Filter).

## Zeitraster

| Zeit | Phase | Was passiert | Material |
|---|---|---|---|
| 0–2 | Problem | Rückgriff auf L4: «Woher weiss ich, dass der Schlüssel von Lea stammt?» | – |
| 2–10 | Hashfunktionen | Partnerarbeit Aufgaben 1–3. | Arbeitsblatt Hash |
| 10–22 | Signaturen | Ablaufschema allein, dann Werkzeug (Aufgaben 2–3). | Arbeitsblatt Signaturen |
| 22–35 | Zertifikate | Partnerarbeit Aufgaben 1–3. | Auftrag Zertifikat |
| 35–44 | Besprechung | Das Wichtigste: Hash-Eigenschaften, Signaturablauf, Verschlüsseln vs. Signieren, Vertrauenskette, Gesamtbild Schutzziele ↔ Bausteine. | Das Wichtigste L5 |

## Besprechung «Das Wichtigste»

Leitfragen der Seite «Das Wichtigste» projizieren → 1 Min. zu zweit murmeln → Antworten
sammeln → Merksätze auf der Seite zeigen und kurz kommentieren. Die SuS müssen nichts
abschreiben: Die Seite ist ihre Lernzusammenfassung (auch im Dossier).

**Worauf achten:**

- **Signatur ≠ Verschlüsselung:** Ein signiertes Dokument ist lesbar. Die Vergleichstabelle unbedingt gemeinsam durchgehen – das wird in Prüfungen regelmässig verwechselt.
- **Aufgabe 3 der Signaturen** (Eves gültige Signatur) ist die Brücke zum Zertifikat: «Die Mathematik stimmt – aber der Schlüssel gehört der falschen Person.»
- **Gesamtbild:** Die Tabelle «Schutzziel ↔ Baustein» schliesst den Bogen zu Lektion 1. Gute Gelegenheit, die Tabelle aus L1 nochmals zu zeigen.

## Hinweise

- **Stolperstein «Signieren = mit dem privaten Schlüssel verschlüsseln»:** Diese Formulierung ist bei RSA mathematisch fast richtig und als Merkhilfe brauchbar, bei anderen Signaturverfahren (ECDSA, ML-DSA) aber falsch. Besser: «Mit dem privaten Schlüssel eine Signatur *berechnen*, die man mit dem öffentlichen Schlüssel *prüfen* kann.»
- **Das Werkzeug ist ein Spielzeug:** Der Hashwert wird «mod n» auf eine kleine Zahl reduziert; mit so kleinen Schlüsseln könnte man Kollisionen leicht finden. Echte Signaturen verwenden 2048-Bit-RSA oder elliptische Kurven.
- **Zertifikate in der Praxis:** Viele Schweizer Websites nutzen Let's Encrypt, DigiCert, Sectigo oder SwissSign; Google-Dienste nutzen Google Trust Services. Die Laufzeiten liegen bei Let's Encrypt bei 90 Tagen, bei kommerziellen CAs inzwischen bei höchstens 200 Tagen (seit 15. März 2026). Ältere Zertifikate, die vor diesem Datum ausgestellt wurden, können noch bis 398 Tage laufen – das kann in Aufgabe 3 zu Diskussionen führen und ist korrekt.
- **Weitere Anwendungen von Zertifikaten** (Lernziel aus dem bisherigen Dossier): Code-Signing (Updates, Apps), signierte E-Mails (S/MIME), Passkeys (L6), E-ID (L6), qualifizierte elektronische Signatur. In L6 werden zwei davon vertieft; der Rest steht im «Früh fertig?».
- **Puffer:** Aufgabe 4 der Zertifikate (badssl) ist «früh fertig»; alternativ in der Besprechung kurz am Beamer zeigen.
