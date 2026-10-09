---
lektion: 7
zielgruppe: sus
art: auftrag
titel: "Eve-Modus: RSA knacken"
kurz: "Drei abgefangene Nachrichten mit kleinen Schlüsseln knacken und abschätzen, wie der Aufwand mit der Schlüssellänge wächst."
reihenfolge: 10
---

# Eve-Modus: RSA knacken

**Lektion 7 – Partnerarbeit | ca. 18 Min.**

## Ziel

Sie knacken RSA mit kleinen Schlüsseln durch Faktorisieren, beschreiben das Vorgehen
systematisch und begründen mit einer Aufwandsabschätzung, warum RSA mit 2048 Bit heute sicher
ist.

## Die Lage

Sie sind Eve. Sie haben im Kanal drei öffentliche Schlüssel und die zugehörigen
Geheimtexte mitgelesen. Die Absender haben leider (für sie) viel zu kleine Primzahlen gewählt.

<div class="krypto" data-tool="rsa-eve" data-pub="(9, 667)" data-cipher="250 1"></div>

### Aufgabe 1 – Knacken

Knacken Sie die Nachrichten. Die erste ist im Werkzeug schon eingetragen.

| | Öffentlicher Schlüssel (e, n) | Geheimtext | p, q | d | Klartext |
|---|---|---|---|---|---|
| a | (9, 667) | 250 1 | | | |
| b | (43, 5561) | 1635 4570 1 2860 1841 | | | |
| c | (5, 301201) | 225375 101670 16807 242659 | | | |

### Aufgabe 2 – Das Rezept

Beschreiben Sie in drei bis vier Schritten, wie man RSA knackt, wenn man nur den öffentlichen
Schlüssel und den Geheimtext kennt.

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 3 – Wie lange dauert das bei echten Schlüsseln?

Das Werkzeug probiert alle ungeraden Zahlen bis √n als Teiler durch (*Probedivision*). Nehmen
Sie an, ein Computer schafft **10⁹ Versuche pro Sekunde**.

| n | ungefähr √n (Anzahl Versuche) | Zeit |
|---|---|---|
| 667 | 26 | 26 Nanosekunden |
| 54 501 301 | | |
| 68 490 271 405 273 | | |
| RSA-2048: n hat 617 Stellen, also n ≈ 10⁶¹⁷ | | Jahre |

Probieren Sie die Schlüssel (17, 54501301) und (85, 68490271405273) auch im Werkzeug aus. Wie
lange braucht Ihr Browser?

<div class="kasten" markdown="1">

**Es geht schneller – aber nicht schnell genug.** Fachleute verwenden viel bessere Verfahren
als die Probedivision (das *Zahlkörpersieb*). Der aktuelle Rekord: 2020 wurde eine Zahl mit 250
Stellen (829 Bit) faktorisiert – mit Rechenzeit, für die ein einzelner Prozessorkern rund
2700 Jahre gebraucht hätte. RSA-2048 ist davon noch weit entfernt. Die eigentliche Gefahr sind
Quantencomputer (Lektion 6, Thema E).

</div>

### Aufgabe 4 – Ein verräterisches Muster

Schauen Sie sich Nachricht b an: Warum wird das «A» zu 1? Was würde mit einem Leerzeichen
passieren? Und warum ist es generell gefährlich, wenn gleiche Klartextblöcke immer gleiche
Geheimtextblöcke ergeben? (Denken Sie an Lektion 2.)

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

*Hinweis:* Echtes RSA hängt darum vor dem Verschlüsseln Zufallsbits an die Nachricht
(*Padding*, z. B. OAEP). Dieselbe Nachricht ergibt so jedes Mal einen anderen Geheimtext.
