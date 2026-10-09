---
lektion: 2
zielgruppe: sus
art: arbeitsblatt
titel: "Vigenère-Verschlüsselung"
kurz: "Mehrere Alphabete statt einem: von Hand mit dem Vigenère-Quadrat, Kontrolle mit dem Werkzeug"
reihenfolge: 20
---

# Vigenère-Verschlüsselung

**Lektion 2 – Einzelarbeit | ca. 13 Min.**

## Ziel

Sie ver- und entschlüsseln einen Text mit dem Vigenère-Verfahren von Hand und erklären,
warum gleiche Klartextbuchstaben dabei zu verschiedenen Geheimtextbuchstaben werden.

## Die Idee

Die Häufigkeitsanalyse funktioniert, weil jeder Buchstabe immer gleich ersetzt wird. Abhilfe:
mehrere Alphabete abwechselnd verwenden (**polyalphabetische** Verschlüsselung). Die
bekannteste Variante ist nach dem Franzosen Blaise de Vigenère (1586) benannt:

- Man wählt ein **Schlüsselwort**, z. B. NKSA, und schreibt es so oft unter den Klartext, bis
  dieser abgedeckt ist.
- Jeder Schlüsselbuchstabe gibt eine Caesar-Verschiebung an: A = 0, B = 1, C = 2, … K = 10,
  N = 13, S = 18.
- Jeder Klartextbuchstabe wird mit «seinem» Schlüsselbuchstaben verschoben.

| Klartext | j | a | n | u | a | r |
|---|---|---|---|---|---|---|
| Schlüssel | N | K | S | A | N | K |
| Geheimtext | W | K | ? | ? | ? | ? |

**Mit dem Vigenère-Quadrat** geht es ohne Rechnen: Zeile des Klartextbuchstabens (links) und
Spalte des Schlüsselbuchstabens (oben) suchen – im Kreuzungsfeld steht der Geheimtextbuchstabe.
Beispiel: Zeile *j*, Spalte *N* → **W**.

**Entschlüsseln:** In der Spalte des Schlüsselbuchstabens den Geheimtextbuchstaben suchen und
ganz links in dieser Zeile den Klartextbuchstaben ablesen.

<div class="quadrat">
<table>
<thead><tr><th>Klartext ↓ / Schlüssel →</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th><th>K</th><th>L</th><th>M</th><th>N</th><th>O</th><th>P</th><th>Q</th><th>R</th><th>S</th><th>T</th><th>U</th><th>V</th><th>W</th><th>X</th><th>Y</th><th>Z</th></tr></thead>
<tbody>
<tr><th>a</th><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td></tr>
<tr><th>b</th><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td></tr>
<tr><th>c</th><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td></tr>
<tr><th>d</th><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td></tr>
<tr><th>e</th><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td></tr>
<tr><th>f</th><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td></tr>
<tr><th>g</th><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr>
<tr><th>h</th><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td></tr>
<tr><th>i</th><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td></tr>
<tr><th>j</th><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td></tr>
<tr><th>k</th><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td></tr>
<tr><th>l</th><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td></tr>
<tr><th>m</th><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td></tr>
<tr><th>n</th><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td></tr>
<tr><th>o</th><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td></tr>
<tr><th>p</th><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td></tr>
<tr><th>q</th><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td></tr>
<tr><th>r</th><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td></tr>
<tr><th>s</th><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td></tr>
<tr><th>t</th><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td></tr>
<tr><th>u</th><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td></tr>
<tr><th>v</th><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td></tr>
<tr><th>w</th><td>W</td><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td></tr>
<tr><th>x</th><td>X</td><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td></tr>
<tr><th>y</th><td>Y</td><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td></tr>
<tr><th>z</th><td>Z</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td></tr>
</tbody>
</table>
</div>

### Aufgabe 1 – Verschlüsseln von Hand

Verschlüsseln Sie *januar* mit dem Schlüsselwort NKSA fertig (Tabelle oben).

Geheimtext: W K <span class="fill-line"></span>

### Aufgabe 2 – Entschlüsseln von Hand

Entschlüsseln Sie `RYMXTGSBD` mit dem Schlüsselwort LUFT.

Klartext: <span class="fill-line"></span>

### Aufgabe 3 – Beobachten mit dem Werkzeug

<div class="krypto" data-tool="vigenere" data-text="eeeeee" data-key="ABC"></div>

1. Verschlüsseln Sie *eeeeee* mit dem Schlüssel ABC. Was beobachten Sie? Was bedeutet das
   für die Häufigkeitsanalyse?
2. Was passiert, wenn das Schlüsselwort nur aus einem einzigen Buchstaben besteht?
3. Welcher Teil des Geheimtexts wiederholt sich, wenn Sie *eeeeeeeeeeee* (12-mal e) mit ABCD
   verschlüsseln? Was könnte ein Angreifer daraus über den Schlüssel lernen?

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>
<span class="fill-line breit"></span>


## Früh fertig?

Ihre Kollegin hat Ihnen mit dem Schlüssel ZUG eine Nachricht geschickt:
`SLKEZVTHQSUGQUAAUNMBUE`. Wo treffen Sie sich?

Ort: <span class="fill-line"></span>

Vigenère galt rund 300 Jahre lang als *le chiffre indéchiffrable* – die unentzifferbare
Chiffre. In der nächsten Lektion knacken Sie sie trotzdem.
