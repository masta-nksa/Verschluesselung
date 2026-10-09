---
lektion: 4
zielgruppe: sus
art: input
titel: "Asymmetrische Verschlüsselung, Einwegfunktionen und RSA"
kurz: "Öffentlicher und privater Schlüssel, Einwegfunktionen, RSA in drei Schritten – mit einem Beispiel zum Nachrechnen."
reihenfolge: 10
---

# Asymmetrische Verschlüsselung und RSA

**Lektion 4 – Einzelarbeit | Abschnitte 1–2 zu Beginn, Abschnitt 3 zum Nachschlagen während des Experiments**

## Ziel

Sie beschreiben die Idee von öffentlichem und privatem Schlüssel, erklären, was eine
Einwegfunktion ist, und können RSA mit kleinen Zahlen durchführen.

## 1 · Vom Schnappschloss zum Schlüsselpaar

Im Kistenrätsel hat Bob offene Schnappschlösser verteilt. Jede Person kann damit eine Kiste
verschliessen, aber nur Bob kann sie öffnen. Genau so funktioniert die **asymmetrische
Verschlüsselung**:

- Der **öffentliche Schlüssel** (*public key*) entspricht dem offenen Schnappschloss. Bob
  veröffentlicht ihn – alle dürfen ihn kennen und damit Nachrichten an Bob verschlüsseln.
- Der **private Schlüssel** (*private key*) entspricht Bobs Schlüssel zum Schloss. Nur Bob hat
  ihn. Nur damit lassen sich die Nachrichten wieder entschlüsseln.

Das Schlüsselaustauschproblem verschwindet: Es muss nie ein Geheimnis übertragen werden.

### Aufgabe 1 – Vergleich

Ergänzen Sie die Tabelle in eigenen Worten.

| | symmetrisch | asymmetrisch |
|---|---|---|
| Anzahl Schlüssel | | |
| Wer kennt welchen Schlüssel? | | |
| Schlüsselaustausch | | |
| Geschwindigkeit | sehr schnell | rund 1000-mal langsamer |
| Beispiele | | |

## 2 · Einwegfunktionen

Wie baut man ein mathematisches Schnappschloss? Man braucht eine Funktion, die in eine
Richtung leicht und in die andere Richtung sehr schwer zu berechnen ist – eine
**Einwegfunktion**.

### Aufgabe 2 – Leicht und schwer

1. Berechnen Sie 19 · 31 von Hand. Zeit: <span class="fill-line"></span> Sekunden. Ergebnis: <span class="fill-line"></span>
2. Welche zwei Primzahlen ergeben multipliziert 731? Zeit: <span class="fill-line"></span> Sekunden. Ergebnis: <span class="fill-line"></span>

Multiplizieren ist leicht, **Faktorisieren** (eine Zahl in ihre Primfaktoren zerlegen) ist
schwer. Bei Zahlen mit 600 Stellen ist es selbst für alle Computer der Welt praktisch
unmöglich.

Eine zweite Einwegfunktion verwendet den **Rest bei der Division** (*modulo*, kurz *mod*):
17 mod 5 = 2, weil 17 = 3 · 5 + 2.

3. Berechnen Sie 4³ mod 29. Ergebnis: <span class="fill-line"></span>
4. Für welche ganze Zahl x zwischen 0 und 28 gilt x³ mod 29 = 2? Wie gehen Sie vor?
   Ergebnis: <span class="fill-line"></span> Vorgehen: <span class="fill-line"></span>

Eine Einwegfunktion allein nützt noch nichts – auch der Empfänger könnte die Nachricht nicht
zurückrechnen. Man braucht eine **Falltür**: eine geheime Zusatzinformation, mit der das
Umkehren plötzlich leicht wird. Bei RSA ist die Falltür die Kenntnis der beiden Primzahlen.

## 3 · RSA in drei Schritten

RSA wurde 1977 von Ronald **R**ivest, Adi **S**hamir und Leonard **A**dleman veröffentlicht.
(Beim britischen Geheimdienst GCHQ hatte man ein ähnliches Verfahren schon einige Jahre zuvor
entdeckt, aber geheim gehalten.)

| Schritt | Wer | Was |
|---|---|---|
| 1 · Schlüssel erzeugen | Empfänger/in | Zwei Primzahlen p und q wählen. n = p · q und φ = (p − 1) · (q − 1) berechnen. Eine Zahl e wählen, die mit φ keinen gemeinsamen Teiler hat. Die Zahl d suchen, für die (e · d) mod φ = 1 gilt. **Öffentlich: (e, n). Privat: (d, n).** p, q und φ vernichten. |
| 2 · Verschlüsseln | Sender/in | Nachricht in Zahlen m umwandeln (jede kleiner als n). Geheimtext: **c = mᵉ mod n** |
| 3 · Entschlüsseln | Empfänger/in | Klartext: **m = cᵈ mod n** |

### Beispiel zum Nachrechnen

- p = 5, q = 11 → n = 55, φ = 4 · 10 = 40
- e = 3 (3 und 40 haben keinen gemeinsamen Teiler)
- d = 27, denn 3 · 27 = 81 und 81 mod 40 = 1
- Öffentlicher Schlüssel (3, 55), privater Schlüssel (27, 55)
- Verschlüsseln von m = 7: 7³ = 343, 343 mod 55 = 13 → **c = 13**
- Entschlüsseln: 13²⁷ mod 55 = **7** ✓ (13²⁷ hat 31 Stellen – das rechnet man mit dem
  Werkzeug)

### Warum ist RSA sicher?

Eve kennt n und e. Um d zu berechnen, bräuchte sie φ – und dafür p und q. Sie müsste also n
faktorisieren. Für n mit 617 Dezimalstellen (2048 Bit), wie es heute üblich ist, ist **kein
Verfahren bekannt**, das dies in vernünftiger Zeit schafft. Bewiesen ist das allerdings nicht –
und Quantencomputer könnten es ändern (Lektion 6).

<div class="kasten" markdown="1">

**In der Praxis: hybrid.** Asymmetrische Verfahren sind rund tausendmal langsamer als AES.
Darum vereinbart man asymmetrisch nur einen geheimen Sitzungsschlüssel und verschlüsselt die
eigentlichen Daten dann symmetrisch mit AES. So funktionieren HTTPS und alle modernen
Messenger.

</div>

## Früh fertig?

Verschlüsseln Sie m = 2 von Hand mit dem öffentlichen Schlüssel (3, 55). Kontrollieren Sie
das Entschlüsseln mit dem RSA-Werkzeug (p = 5, q = 11, e = 3).

c = <span class="fill-line"></span>
