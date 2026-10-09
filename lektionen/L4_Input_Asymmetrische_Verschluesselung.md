---
lektion: 4
zielgruppe: sus
art: input
titel: "Asymmetrische Verschlüsselung, Einwegfunktionen und RSA"
kurz: "Öffentlicher und privater Schlüssel, Einwegfunktionen, RSA in drei Schritten – mit einem Beispiel zum Nachrechnen."
reihenfolge: 10
---

# Asymmetrische Verschlüsselung und RSA

## Ziel

Sie beschreiben die Idee von öffentlichem und privatem Schlüssel, erklären, was eine
Einwegfunktion ist, und können RSA mit kleinen Zahlen durchführen.

## 1 · Vom Schnappschloss zum Schlüsselpaar

Im Kistenrätsel hat Bob offene Schnappschlösser verteilt: Jede Person kann damit verschliessen,
nur Bob kann öffnen. Genau so funktioniert die **asymmetrische Verschlüsselung**:

- Der **öffentliche Schlüssel** (*public key*) = das offene Schnappschloss. Alle dürfen ihn
  kennen und damit Nachrichten an Bob verschlüsseln.
- Der **private Schlüssel** (*private key*) = Bobs Schlüssel zum Schloss. Nur damit lassen sich
  die Nachrichten entschlüsseln.

Das Schlüsselaustauschproblem verschwindet: Es muss nie ein Geheimnis übertragen werden.

### Aufgabe 1 – Vergleich

Ergänzen Sie in eigenen Worten.

| | symmetrisch | asymmetrisch |
|---|---|---|
| Anzahl Schlüssel | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |
| Wer kennt welchen Schlüssel? | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |
| Schlüsselaustausch | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |
| Geschwindigkeit | sehr schnell | rund 1000-mal langsamer |
| Beispiele | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |

## 2 · Einwegfunktionen

Für ein mathematisches Schnappschloss braucht man eine Funktion, die in eine Richtung leicht und
in die andere sehr schwer zu berechnen ist – eine **Einwegfunktion**.

### Aufgabe 2 – Leicht und schwer

19 · 31 = <span class="luecke" data-typ="zahl" data-antwort="589" data-breite="6"></span>
(Zeit: <span class="luecke" data-breite="5"></span> s) ·
731 = <span class="luecke" data-typ="menge" data-antwort="17 43" data-breite="9"></span> (zwei Primzahlen, z. B. «a · b»; Zeit: <span class="luecke" data-breite="5"></span> s)

Multiplizieren ist leicht, **Faktorisieren** schwer – bei Zahlen mit 600 Stellen selbst für
alle Computer der Welt. Eine zweite Einwegfunktion nutzt den **Rest bei der Division**
(*modulo*): 17 mod 5 = 2, weil 17 = 3 · 5 + 2.

4³ mod 29 = <span class="luecke" data-typ="zahl" data-antwort="6" data-breite="4"></span> ·
Für welches x zwischen 0 und 28 gilt x³ mod 29 = 2? x = <span class="luecke" data-typ="zahl" data-antwort="26" data-breite="4"></span>
Wie sind Sie vorgegangen? <span class="luecke" data-breite="28"></span>

Eine Einwegfunktion allein nützt nichts – auch die Empfängerin könnte nicht zurückrechnen. Man
braucht eine **Falltür**: eine geheime Zusatzinformation, mit der das Umkehren leicht wird. Bei
RSA ist das die Kenntnis der beiden Primzahlen.

## 3 · RSA in drei Schritten

RSA wurde 1977 von **R**ivest, **S**hamir und **A**dleman veröffentlicht (beim britischen
Geheimdienst GCHQ kannte man ein ähnliches Verfahren schon früher, hielt es aber geheim).

| Schritt | Wer | Was |
|---|---|---|
| 1 · Schlüssel erzeugen | Empfängerin | Primzahlen p, q wählen. n = p · q, φ = (p − 1) · (q − 1). e wählen ohne gemeinsamen Teiler mit φ. d suchen mit (e · d) mod φ = 1. **Öffentlich: (e, n). Privat: (d, n).** |
| 2 · Verschlüsseln | Sender | Nachricht in Zahlen m < n umwandeln. **c = mᵉ mod n** |
| 3 · Entschlüsseln | Empfängerin | **m = cᵈ mod n** |

**Beispiel:** p = 5, q = 11 → n = 55, φ = 40; e = 3; d = 27, denn 3 · 27 = 81 und 81 mod 40 = 1.
Verschlüsseln von m = 7: 7³ = 343, 343 mod 55 = **13**. Entschlüsseln: 13²⁷ mod 55 = **7**
(13²⁷ hat 31 Stellen – das rechnet das Werkzeug).

**Warum sicher?** Eve kennt n und e. Für d bräuchte sie φ – also p und q. Für n mit 617
Dezimalstellen (2048 Bit) ist **kein Verfahren bekannt**, das das in vernünftiger Zeit schafft.
Bewiesen ist das nicht – und Quantencomputer könnten es ändern (Lektion 6).

<div class="kasten" markdown="1">

**In der Praxis: hybrid.** Asymmetrische Verfahren sind rund tausendmal langsamer als AES. Man
vereinbart asymmetrisch nur einen geheimen Sitzungsschlüssel und verschlüsselt die Daten dann
mit AES. So funktionieren HTTPS und alle modernen Messenger.

</div>

## Früh fertig?

Verschlüsseln Sie m = 2 von Hand mit dem öffentlichen Schlüssel (3, 55):
c = <span class="luecke" data-typ="zahl" data-antwort="8" data-breite="5"></span>
Kontrollieren Sie das Entschlüsseln im RSA-Werkzeug (p = 5, q = 11, e = 3).
