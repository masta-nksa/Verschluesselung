---
lektion: 7
titel: "Musterlösung: Eve-Modus und Aufwandsabschätzung"
kurz: "Geknackte Nachrichten, Vorgehen und Aufwandstabelle bis RSA-2048"
---

# Musterlösung: Eve-Modus und Aufwandsabschätzung

## Aufgabe 1 – Knacken

| | (e, n) | p, q | φ | d | Klartext |
|---|---|---|---|---|---|
| a | (9, 667) | 23, 29 | 616 | 137 | ja |
| b | (43, 5561) | 67, 83 | 5412 | 4531 | exakt |
| c | (5, 301201) | 359, 839 | 300 004 | 60 001 | sehr gut |

## Aufgabe 2 – Das Rezept

1. n faktorisieren: n = p · q (z. B. durch Probedivision bis √n).
2. φ = (p − 1) · (q − 1) berechnen.
3. d so bestimmen, dass (e · d) mod φ = 1.
4. Jeden Geheimtextblock entschlüsseln: m = cᵈ mod n, dann die Zahlen in Buchstaben umwandeln.

## Aufgabe 3 – Aufwand

| n | √n (Versuche) | Zeit bei 10⁹ Versuchen/s |
|---|---|---|
| 667 | 26 | 26 ns |
| 54 501 301 | ≈ 7400 | ≈ 7 µs |
| 68 490 271 405 273 | ≈ 8,3 · 10⁶ | ≈ 8 ms |
| RSA-2048 (n ≈ 10⁶¹⁷) | ≈ 10³⁰⁸ | ≈ 10²⁹⁹ s ≈ **10²⁹² Jahre** |

Das Universum ist rund 1,4 · 10¹⁰ Jahre alt. Im Browser dauern die ersten drei Beispiele je nach
Gerät Millisekunden bis wenige Sekunden (das Werkzeug rechnet mit BigInt und ist langsamer als
10⁹ Versuche/s). Faktoren: 54 501 301 = 6553 · 8317, 68 490 271 405 273 = 6 852 077 · 9 995 549.

Wichtig: Jede zusätzliche Dezimalstelle von n verlängert die Probedivision um den Faktor √10 ≈
3,2. Der Aufwand wächst also exponentiell mit der Länge des Schlüssels.

## Aufgabe 4 – Das verräterische Muster

A = 01 → 1ᵉ mod n = 1 für jedes e; ein Leerzeichen = 00 → 0ᵉ = 0. Beide bleiben also im
Geheimtext erkennbar. Allgemein ergibt bei «Textbook-RSA» der gleiche Klartextblock immer den
gleichen Geheimtextblock. Bei kurzen Blöcken (hier ein Buchstabe) kann Eve deshalb eine
**Häufigkeitsanalyse** wie bei Caesar machen oder alle möglichen Blöcke selbst verschlüsseln und
vergleichen – ganz ohne Faktorisieren. Echtes RSA verhindert das mit zufälligem Padding (OAEP).
