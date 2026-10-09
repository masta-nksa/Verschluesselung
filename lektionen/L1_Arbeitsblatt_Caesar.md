---
lektion: 1
zielgruppe: sus
art: arbeitsblatt
titel: "Caesar-Verschlüsselung"
kurz: "Fachbegriffe, Caesar von Hand und mit dem Werkzeug, Knacken durch Durchprobieren, Prinzip von Kerckhoffs"
reihenfolge: 20
---

# Caesar-Verschlüsselung

## Ziel

Sie verwenden die Fachbegriffe der Kryptologie korrekt, ver- und entschlüsseln mit Caesar und
knacken einen Caesar-Text ohne Schlüssel. Sie erklären, warum die Sicherheit nie auf einem
geheimen Verfahren beruhen darf.

## Die Idee

Caesar soll seine Nachrichten so verschlüsselt haben: Jeder Buchstabe wird durch den Buchstaben
ersetzt, der eine feste Anzahl Stellen weiter hinten im Alphabet steht; nach Z geht es bei A
weiter. Bei Verschiebung 3 wird aus *caesar* **FDHVDU** (Klartext klein, Geheimtext GROSS).

| Klartext | a | b | c | d | e | f | g | … | w | x | y | z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Geheimtext | D | E | F | G | H | I | J | … | Z | A | B | C |

### Aufgabe 1 – Fachbegriffe

**Klartext:** lesbare Nachricht · **Geheimtext:** verschlüsselte Nachricht · **Algorithmus:**
die Rechenvorschrift («verschiebe jeden Buchstaben») · **Schlüssel:** das Geheimnis, das den
Algorithmus steuert («um 3») · **ver-/entschlüsseln:** mit Schlüssel · **knacken:** ohne Schlüssel.

Beim Verschlüsseln wird mithilfe eines <span class="luecke" data-antwort="Algorithmus;Verfahrens;Verfahren" data-breite="13"></span>
und eines <span class="luecke" data-antwort="Schlüssels;Schlüssel" data-breite="11"></span> der
<span class="luecke" data-antwort="Klartext" data-breite="11"></span> in den
<span class="luecke" data-antwort="Geheimtext" data-breite="11"></span> verwandelt. Den
umgekehrten Vorgang nennt man <span class="luecke" data-antwort="Entschlüsseln" data-breite="13"></span>.
Liest eine Drittperson die Nachricht ohne Schlüssel, hat sie die Verschlüsselung
<span class="luecke" data-antwort="geknackt;gebrochen" data-breite="11"></span>.

<div class="krypto" data-tool="caesar" data-text="NUBSWRORJLH LVW GLH ZLVVHQVFKDIW GHU JHKHLPVFKULIWHQ" data-shift="3" data-mode="ent"></div>

### Aufgabe 2 – Entschlüsseln (Schlüssel 3)

Entschlüsseln Sie das erste Wort von Hand, den Rest mit dem Werkzeug:
`NUBSWRORJLH LVW GLH ZLVVHQVFKDIW GHU JHKHLPVFKULIWHQ`

Klartext: <span class="luecke" data-antwort="Kryptologie ist die Wissenschaft der Geheimschriften" data-breite="voll"></span>

### Aufgabe 3 – Verschlüsseln

Verschlüsseln Sie Ihren Vornamen von Hand mit Verschiebung 13: <span class="luecke" data-breite="16"></span>
Verschlüsseln Sie das Ergebnis nochmals mit 13. Was stellen Sie fest – und warum gerade bei 13?

<div class="antwort" data-zeilen="1"></div>

### Aufgabe 4 – Knacken (Schlüssel unbekannt)

Knacken Sie mit «Alle 26 Schlüssel durchprobieren»:
`HPC OPY DNSWFPDDPW YTNSE VPYYE, ACZMTPCE PTYQLNS LWWP LFD`

Klartext: <span class="luecke" data-antwort="Wer den Schluessel nicht kennt, probiert einfach alle aus" data-breite="voll"></span>

Schlüssel: <span class="luecke" data-typ="zahl" data-antwort="11" data-breite="5"></span>
Wie viele Versuche braucht man bei Caesar höchstens? <span class="luecke" data-typ="zahl" data-antwort="25;26" data-breite="5"></span>

### Aufgabe 5 – Das Prinzip von Kerckhoffs

> Ein Verschlüsselungsverfahren muss auch dann sicher sein, wenn der Gegner das Verfahren
> kennt. Geheim bleiben muss nur der Schlüssel. *(Auguste Kerckhoffs, 1883)*

Die Römer hielten das Caesar-Verfahren geheim. Warum reicht das nicht (denken Sie an Aufgabe 4)?
Nennen Sie einen weiteren Grund, warum man ein Verfahren nicht lange geheim halten kann.

<div class="antwort" data-zeilen="3"></div>

### Aufgabe 6 – Codierung oder Verschlüsselung? *(früh fertig)*

Übersetzen Sie mit einer [Morsetabelle](https://de.wikipedia.org/wiki/Morsecode#Standard-Codetabelle):
`··· ·- -- ··- · ·-··` = <span class="luecke" data-antwort="Samuel" data-breite="10"></span>
Morse, Braille und ASCII ersetzen auch Zeichen – und sind trotzdem keine Verschlüsselung.
Was fehlt ihnen? <span class="luecke" data-antwort="Schlüssel;ein Schlüssel;der Schlüssel" data-breite="16"></span>

<div class="nur-online" markdown="1">

## Früh fertig? Die Rätselkette

Jeder Text verrät den Schlüssel für den nächsten. Den ersten müssen Sie knacken.

| Text | Schlüssel |
|---|---|
| `LZY LJRFHMY. IJW SFJHMXYJ YJCY BZWIJ ZR SJZSEJMS AJWXHMTGJS` | <span class="luecke" data-typ="zahl" data-antwort="5" data-breite="4"></span> |
| `YTLM ZXLVATYYM. YNXK WXG EXMSMXG MXQM ZBEM WXK LVAENXLLXE SPXB` | <span class="luecke" data-typ="zahl" data-antwort="19" data-breite="4"></span> |
| `MGTEMJQHHU UCIV: FKG UKEJGTJGKV NKGIV KO UEJNWGUUGN, PKEJV KO XGTHCJTGP` | <span class="luecke" data-typ="zahl" data-antwort="2" data-breite="4"></span> |

Noch mehr Übung: [Hour of Code «Encryption»](https://studio.code.org/s/hoc-encryption) (englisch).

</div>
