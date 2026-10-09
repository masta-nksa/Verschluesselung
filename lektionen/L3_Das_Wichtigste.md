---
lektion: 3
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Vigenère knacken, AES und das Schlüsselproblem"
kurz: "Besprechung vor dem Kistenrätsel und Lernzusammenfassung: Kasiski-Test, XOR, One-Time-Pad, AES, Schlüsselraum, Schlüsselaustausch"
reihenfolge: 25
---

# Das Wichtigste: Vigenère knacken, AES und das Schlüsselproblem

**Lektion 3 – Besprechung im Plenum | ca. 8 Min. (vor dem Kistenrätsel)**

## Zum Besprechen

1. In welchen zwei Schritten knackt man eine Vigenère-Verschlüsselung?
2. Jede Person kann den AES-Algorithmus nachlesen. Warum ist AES trotzdem sicher?
3. Was kann AES nicht lösen?

## Vigenère knacken (Kasiski-Test)

1. **Schlüssellänge finden:** Wiederholte Buchstabenfolgen im Geheimtext suchen. Ihre Abstände
   sind meist Vielfache der Schlüssellänge → gemeinsamer Teiler der Abstände.
2. **Spalten einzeln knacken:** Jede Spalte (1., 7., 13. … Buchstabe bei Länge 6) ist eine
   Caesar-Verschlüsselung → Häufigkeitsanalyse pro Spalte.

**Merksatz:** Ein sich wiederholender Schlüssel erzeugt Muster – und Muster sind Angriffspunkte.

## Bits und XOR

Computer verschlüsseln Bits. XOR (⊕) ergibt 1, wenn genau ein Bit 1 ist:
0⊕0 = 0, 0⊕1 = 1, 1⊕0 = 1, 1⊕1 = 0. Zweimal mit demselben Schlüssel angewendet, entsteht
wieder der Klartext: (k ⊕ s) ⊕ s = k.

**One-Time-Pad:** XOR mit einem Schlüssel, der *zufällig*, *so lang wie die Nachricht* und *nur
einmal verwendet* ist, ist beweisbar unknackbar – aber unpraktisch, weil man vorher ebenso viel
geheimen Schlüssel austauschen muss, wie man Daten senden will.

## AES – der Standard von heute

- 2001 nach einem öffentlichen, weltweiten Wettbewerb gewählt (Kerckhoffs!)
- verschlüsselt Blöcke von 128 Bit in 10–14 Runden aus Ersetzen, Verschieben, Mischen und XOR
  mit dem Schlüssel; Schlüssel mit 128 oder 256 Bit
- danach sind keine Muster mehr sichtbar: Es bleibt nur das Durchprobieren
- schützt WLAN, HTTPS, Festplatten, Messenger

| Verfahren | Schlüssel | Durchprobieren bei 10⁹ pro Sekunde |
|---|---|---|
| Caesar | 26 | 26 Nanosekunden |
| Vigenère (6 Buchstaben) | ≈ 3 · 10⁸ | 0,3 Sekunden |
| AES-128 | ≈ 3,4 · 10³⁸ | ≈ 10²² Jahre |
| AES-256 | ≈ 1,2 · 10⁷⁷ | ≈ 4 · 10⁶⁰ Jahre |

**Merksatz:** Ein Verfahren ist sicher, wenn es keine Muster verrät *und* der Schlüsselraum zu
gross zum Durchprobieren ist.

## Das Schlüsselaustauschproblem

Bei allen bisherigen Verfahren brauchen Sender und Empfänger **denselben geheimen Schlüssel**.
Wie kommt er zur anderen Person, wenn alle Leitungen abgehört werden können – etwa zu einem
Online-Shop, bei dem man zum ersten Mal einkauft?

**Merksatz:** Symmetrische Verfahren sind schnell und sicher, lösen aber das
Schlüsselaustauschproblem nicht. → Kistenrätsel und Lektion 4

## Das sollten Sie jetzt können

- [ ] die zwei Schritte zum Knacken von Vigenère beschreiben
- [ ] XOR berechnen und erklären, warum XOR symmetrisch ist
- [ ] die Bedingungen für einen sicheren One-Time-Pad nennen
- [ ] die Grösse eines Schlüsselraums abschätzen und die Zeit fürs Durchprobieren berechnen
- [ ] erklären, warum AES als sicher gilt, obwohl der Algorithmus öffentlich ist
- [ ] das Schlüsselaustauschproblem formulieren
