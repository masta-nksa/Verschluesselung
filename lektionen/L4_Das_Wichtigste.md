---
lektion: 4
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Asymmetrische Verschlüsselung und RSA"
kurz: "Besprechung am Ende der Lektion und Lernzusammenfassung: Schlüsselpaar, Einwegfunktion, RSA, hybride Verschlüsselung"
reihenfolge: 80
---

# Das Wichtigste: Asymmetrische Verschlüsselung und RSA

## Zum Besprechen

1. Sie schicken Lea eine Nachricht. Welchen Schlüssel brauchen Sie, welchen braucht Lea, und
   was weiss Eve?
2. Was ist eine Einwegfunktion – und was ist bei RSA die «Falltür»?
3. Warum verschlüsselt man die eigentlichen Daten trotzdem mit AES?

## Das Schlüsselpaar

| | öffentlicher Schlüssel | privater Schlüssel |
|---|---|---|
| Wer besitzt ihn? | alle dürfen ihn kennen | nur die Empfängerin |
| Wozu? | verschlüsseln (Nachrichten *an* die Besitzerin) | entschlüsseln |
| Analogie | offenes Schnappschloss | Schlüssel zum Schloss |

**Merksatz:** Mit dem öffentlichen Schlüssel der Empfängerin verschlüsseln, mit ihrem privaten
Schlüssel entschlüsseln. Es muss nie ein Geheimnis übertragen werden – das
Schlüsselaustauschproblem ist gelöst.

## Einwegfunktion mit Falltür

Eine **Einwegfunktion** ist in eine Richtung leicht, in die andere praktisch unmöglich zu
berechnen: 19 · 31 = 589 ist leicht, 731 = ? · ? ist mühsam – bei 600-stelligen Zahlen
aussichtslos. Die **Falltür** ist ein Geheimnis, mit dem die Umkehrung doch leicht wird: Bei RSA
kennt nur die Empfängerin die beiden Primzahlen und kann daraus d berechnen.

## RSA in drei Schritten

| Wer | Was |
|---|---|
| Empfängerin | Primzahlen p, q wählen; n = p · q; φ = (p−1)(q−1); e teilerfremd zu φ; d mit (e · d) mod φ = 1. Öffentlich (e, n), privat (d, n). |
| Sender | c = mᵉ mod n |
| Empfängerin | m = cᵈ mod n |

Beispiel: p = 5, q = 11 → n = 55, φ = 40, e = 3, d = 27. Aus m = 7 wird c = 343 mod 55 = 13.

**Warum sicher?** Um d zu berechnen, müsste Eve n in p und q zerlegen. Für n mit 617 Stellen ist
**kein effizientes Verfahren bekannt** (bewiesen ist das aber nicht).

## Hybride Verschlüsselung

Asymmetrische Verfahren sind rund tausendmal langsamer als AES. In der Praxis vereinbart man
asymmetrisch nur einen geheimen Sitzungsschlüssel und verschlüsselt die Daten damit symmetrisch.

**Merksatz:** Asymmetrisch für den Schlüssel, symmetrisch für die Daten.

## Offene Frage

Woher weiss ich, dass der öffentliche Schlüssel im Kanal wirklich von Lea stammt? → Lektion 5

## Das sollten Sie jetzt können

- [ ] erklären, welcher Schlüssel von wem wofür verwendet wird
- [ ] symmetrische und asymmetrische Verschlüsselung vergleichen (mindestens drei Unterschiede)
- [ ] den Begriff Einwegfunktion an einem Beispiel erklären und mit RSA verbinden
- [ ] RSA mit kleinen Zahlen durchrechnen (n, φ, e, d, c, m)
- [ ] begründen, warum RSA sicher ist, und erklären, was hybride Verschlüsselung ist
