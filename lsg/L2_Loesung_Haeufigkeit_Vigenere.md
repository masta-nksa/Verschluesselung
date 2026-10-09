---
lektion: 2
titel: "Musterlösung: Häufigkeitsanalyse und Vigenère"
kurz: "Klartext und Ersetzungstabelle des Briefs von 1586, Lösungen zum Vigenère-Arbeitsblatt"
---

# Musterlösung: Häufigkeitsanalyse und Vigenère

## Der Brief von 1586

> Im Jahr 1586 sass Maria Stuart, die Koenigin von Schottland, in englischer Gefangenschaft.
> Ihre Anhaenger planten, Koenigin Elisabeth zu ermorden und Maria auf den Thron zu setzen.
> Die Briefe zwischen Maria und den Verschwoerern wurden in Bierfaessern aus dem Gefaengnis
> geschmuggelt. Sie waren verschluesselt: Jeder Buchstabe war durch ein anderes Zeichen
> ersetzt. Maria fuehlte sich deshalb sicher und schrieb offen ueber den Mordplan. Doch der
> Bote arbeitete fuer den Geheimdienst von Elisabeth. Jeder Brief wurde heimlich kopiert und
> dem Codeknacker Thomas Phelippes vorgelegt. Er zaehlte, wie oft jedes Zeichen vorkam, und
> verglich das Ergebnis mit der bekannten Haeufigkeit der Buchstaben. Schon nach kurzer Zeit
> konnte er die Briefe lesen. Im Februar 1587 wurde Maria Stuart hingerichtet. Ihre
> Verschluesselung hatte sie nicht geschuetzt, sondern ihr eine falsche Sicherheit gegeben.

**Ersetzungstabelle** (Geheimtext → Klartext):

| Geheim | A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Klar | u | h | z | s | n | j | m | o | e | p | y | v | l |

| Geheim | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Klar | i | q | k | b | c | f | a | x | t | g | d | w | r |

(K, O und U kommen im Geheimtext nicht vor.)

**Aufgabe 1:** Häufigster Geheimtextbuchstabe ist **I** (132-mal, rund 18 %) → **e**.

**Aufgabe 2:** Man probiert nicht die Schlüssel durch, sondern ermittelt den Schlüssel Buchstabe
für Buchstabe. Weil jeder Klartextbuchstabe immer durch dasselbe Zeichen ersetzt wird, bleiben
die Häufigkeiten der Sprache (e, n, i …) und typische Wörter (der, und) im Geheimtext sichtbar.
Damit schrumpft das Problem von 4 · 10²⁶ Möglichkeiten auf wenige gezielte Vermutungen.

**Aufgabe 3** (verschiedene Antworten richtig): Leerzeichen und Satzzeichen weglassen; häufige
Buchstaben durch mehrere verschiedene Zeichen ersetzen (*homophone* Verschlüsselung); Füllzeichen
einstreuen; mehrere Alphabete abwechselnd verwenden (→ Vigenère); Codewörter für häufige
Begriffe.

## Vigenère

**Aufgabe 1:** januar mit NKSA → **WKFUNB** (j+N = W, a+K = K, n+S = F, u+A = U, a+N = N, r+K = B).

**Aufgabe 2:** RYMXTGSBD mit LUFT → **geheimnis**.

**Aufgabe 3:**
1. *eeeeee* mit ABC ergibt **EFGEFG**: Der gleiche Klartextbuchstabe wird je nach Position zu
   verschiedenen Geheimtextbuchstaben. Die Häufigkeit des e verteilt sich auf mehrere Zeichen –
   die einfache Häufigkeitsanalyse findet kein klares «e» mehr.
2. Ein Schlüsselwort aus einem Buchstaben ist eine Caesar-Verschlüsselung.
3. *eeeeeeeeeeee* mit ABCD ergibt EFGHEFGHEFGH: Das Muster wiederholt sich alle 4 Zeichen –
   ein Hinweis auf die Länge des Schlüsselworts. Genau das nutzt man in Lektion 3 zum Knacken.

**Exit-Frage:** Weil jeder Buchstabe abwechselnd mit verschiedenen Verschiebungen verschlüsselt
wird, mischen sich die Häufigkeiten. Im Geheimtext sind alle Buchstaben ähnlich häufig; man
erkennt das e nicht mehr direkt.

**Früh fertig:** SLKEZVTHQSUGQUAAUNMBUE mit ZUG → *treffpunkt aarau bahnhof*.
