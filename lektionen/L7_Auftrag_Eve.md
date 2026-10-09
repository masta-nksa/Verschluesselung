---
lektion: 7
zielgruppe: sus
art: auftrag
titel: "Eve-Modus: RSA knacken"
kurz: "Drei abgefangene Nachrichten mit kleinen Schlüsseln knacken und abschätzen, wie der Aufwand mit der Schlüssellänge wächst."
reihenfolge: 10
---

# Eve-Modus: RSA knacken

## Ziel

Sie knacken RSA mit kleinen Schlüsseln durch Faktorisieren, beschreiben das Vorgehen
systematisch und begründen mit einer Aufwandsabschätzung, warum RSA mit 2048 Bit heute sicher
ist.

## Die Lage

Sie sind Eve und haben im Kanal drei öffentliche Schlüssel samt Geheimtexten mitgelesen. Die
Absender haben viel zu kleine Primzahlen gewählt.

<div class="krypto" data-tool="rsa-eve" data-pub="(9, 667)" data-cipher="250 1"></div>

### Aufgabe 1 – Knacken

Die erste Nachricht ist im Werkzeug schon eingetragen.

| | (e, n) | Geheimtext | p und q | d | Klartext |
|---|---|---|---|---|---|
| a | (9, 667) | 250 1 | <span class="luecke" data-typ="menge" data-antwort="23 29" data-breite="9"></span> | <span class="luecke" data-typ="zahl" data-antwort="137" data-breite="7"></span> | <span class="luecke" data-antwort="ja" data-breite="9"></span> |
| b | (43, 5561) | 1635 4570 1 2860 1841 | <span class="luecke" data-typ="menge" data-antwort="67 83" data-breite="9"></span> | <span class="luecke" data-typ="zahl" data-antwort="4531" data-breite="7"></span> | <span class="luecke" data-antwort="exakt" data-breite="9"></span> |
| c | (5, 301201) | 225375 101670 16807 242659 | <span class="luecke" data-typ="menge" data-antwort="359 839" data-breite="9"></span> | <span class="luecke" data-typ="zahl" data-antwort="60001" data-breite="7"></span> | <span class="luecke" data-antwort="sehr gut" data-breite="9"></span> |

### Aufgabe 2 – Das Rezept

Beschreiben Sie in drei bis vier Schritten, wie man RSA knackt, wenn man nur den öffentlichen
Schlüssel und den Geheimtext kennt.

<div class="antwort" data-loesung="1. n faktorisieren: n = p · q (z. B. Probedivision bis √n). 2. φ = (p − 1) · (q − 1) berechnen. 3. d so bestimmen, dass (e · d) mod φ = 1. 4. Jeden Block mit m = cᵈ mod n entschlüsseln und die Zahlen in Buchstaben umwandeln." data-zeilen="3"></div>

### Aufgabe 3 – Wie lange dauert das bei echten Schlüsseln?

Das Werkzeug probiert Teiler bis √n durch (*Probedivision*). Annahme: **10⁹ Versuche pro
Sekunde**. Schreibweise z. B. `7400` oder `8,3·10^6`.

| n | √n ≈ Anzahl Versuche | Zeit |
|---|---|---|
| 667 | 26 | 26 Nanosekunden |
| 54 501 301 | <span class="luecke" data-typ="groesse" data-toleranz="0.1" data-antwort="7400" data-breite="9"></span> | <span class="luecke" data-breite="12"></span> |
| 68 490 271 405 273 | <span class="luecke" data-typ="groesse" data-toleranz="0.1" data-antwort="8.3e6" data-breite="9"></span> | <span class="luecke" data-breite="12"></span> |
| RSA-2048: n ≈ 10⁶¹⁷ | <span class="luecke" data-typ="groesse" data-toleranz="0.6" data-antwort="1e308" data-breite="9"></span> | <span class="luecke" data-breite="12"></span> Jahre |

Probieren Sie (17, 54501301) und (85, 68490271405273) auch im Werkzeug aus.

<div class="kasten" markdown="1">

**Es geht schneller – aber nicht schnell genug.** Fachleute verwenden viel bessere Verfahren als
die Probedivision (*Zahlkörpersieb*). Rekord 2020: eine Zahl mit 250 Stellen (829 Bit) – mit
Rechenzeit, für die ein einzelner Prozessorkern rund 2700 Jahre gebraucht hätte. RSA-2048 ist
weit entfernt. Die eigentliche Gefahr sind Quantencomputer (Lektion 6, Thema E).

</div>

### Aufgabe 4 – Ein verräterisches Muster

In Nachricht b wird das «A» zu <span class="luecke" data-typ="zahl" data-antwort="1" data-breite="4"></span>.
Warum? Und warum ist es generell gefährlich, wenn gleiche Klartextblöcke immer gleiche
Geheimtextblöcke ergeben? (Denken Sie an Lektion 2.)

<div class="antwort" data-loesung="A = 01, und 1ᵉ = 1 für jedes e (ebenso Leerzeichen: 0ᵉ = 0). Allgemein ergeben gleiche Klartextblöcke immer gleiche Geheimtextblöcke. Bei kurzen Blöcken kann Eve dann wie bei Caesar eine Häufigkeitsanalyse machen oder alle möglichen Blöcke selbst verschlüsseln und vergleichen – ganz ohne Faktorisieren. Darum braucht echtes RSA Padding." data-zeilen="2"></div>

*Hinweis:* Echtes RSA hängt darum vor dem Verschlüsseln Zufallsbits an (*Padding*, z. B. OAEP).
Dieselbe Nachricht ergibt so jedes Mal einen anderen Geheimtext.
