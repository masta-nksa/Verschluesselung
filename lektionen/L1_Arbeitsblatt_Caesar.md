---
lektion: 1
zielgruppe: sus
art: arbeitsblatt
titel: "Caesar-Verschlüsselung"
kurz: "Fachbegriffe, Caesar von Hand und mit dem Werkzeug, Knacken durch Durchprobieren, Prinzip von Kerckhoffs"
reihenfolge: 20
---

# Caesar-Verschlüsselung

**Lektion 1 – Partnerarbeit | ca. 18 Min. (Aufgaben 1–5; Aufgabe 6 für Schnelle)**

## Ziel

Sie verwenden die Fachbegriffe der Kryptologie korrekt, ver- und entschlüsseln mit dem
Caesar-Verfahren und knacken einen Caesar-Text, ohne den Schlüssel zu kennen. Sie können
erklären, warum die Sicherheit nie auf einem geheimen Verfahren beruhen darf.

## Die Idee

Gaius Julius Caesar soll seine militärischen Nachrichten so verschlüsselt haben: Jeder
Buchstabe wird durch den Buchstaben ersetzt, der im Alphabet eine feste Anzahl Stellen
weiter hinten steht. Am Ende des Alphabets geht es wieder vorne los. Bei einer Verschiebung
um 3 gilt:

| Klartext | a | b | c | d | e | f | g | … | w | x | y | z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Geheimtext | D | E | F | G | H | I | J | … | Z | A | B | C |

Aus *caesar* wird so **FDHVDU**. Konvention: Klartext schreibt man klein, Geheimtext GROSS.

### Aufgabe 1 – Fachbegriffe

- **Klartext** – die lesbare Nachricht
- **Geheimtext** (Chiffrat) – die verschlüsselte, unlesbare Nachricht
- **Algorithmus** (Verfahren) – die Rechenvorschrift, z. B. «verschiebe jeden Buchstaben»
- **Schlüssel** – das Geheimnis, das das Verfahren steuert, z. B. «um 3»
- **verschlüsseln / entschlüsseln** – Klartext → Geheimtext bzw. zurück, *mit* Schlüssel
- **knacken** (Kryptoanalyse) – den Klartext herausfinden, *ohne* den Schlüssel zu kennen

Füllen Sie die Lücken: Beim Verschlüsseln wird mithilfe eines <span class="fill-line"></span> und eines
<span class="fill-line"></span> der <span class="fill-line"></span> in den <span class="fill-line"></span> verwandelt. Den umgekehrten
Vorgang nennt man <span class="fill-line"></span>. Schafft es eine Drittperson, die Nachricht ohne
Schlüssel zu lesen, hat sie die Verschlüsselung <span class="fill-line"></span>.

## Das Caesar-Werkzeug

<div class="krypto" data-tool="caesar" data-text="NUBSWRORJLH LVW GLH ZLVVHQVFKDIW GHU JHKHLPVFKULIWHQ" data-shift="3" data-mode="ent"></div>

### Aufgabe 2 – Entschlüsseln (Schlüssel bekannt)

Der folgende Text wurde mit Verschiebung 3 verschlüsselt. Entschlüsseln Sie das erste Wort
**von Hand**, den Rest mit dem Werkzeug.

`NUBSWRORJLH LVW GLH ZLVVHQVFKDIW GHU JHKHLPVFKULIWHQ`

Klartext: <span class="fill-line"></span>

### Aufgabe 3 – Verschlüsseln

Verschlüsseln Sie Ihren Vornamen von Hand mit Verschiebung 13. Verschlüsseln Sie das
Ergebnis danach *nochmals* mit 13. Was stellen Sie fest – und warum ist das genau bei 13 so?

Vorname verschlüsselt: <span class="fill-line"></span>

Beobachtung: <span class="fill-line"></span>

### Aufgabe 4 – Knacken (Schlüssel unbekannt)

Diesen Text haben Sie abgefangen:

`HPC OPY DNSWFPDDPW YTNSE VPYYE, ACZMTPCE PTYQLNS LWWP LFD`

Kopieren Sie ihn ins Werkzeug und knacken Sie ihn mit dem Knopf «Alle 26 Schlüssel
durchprobieren». Wie heisst der Klartext, wie der Schlüssel?

Klartext: <span class="fill-line"></span> Schlüssel: <span class="fill-line"></span>

Wie viele Versuche braucht man bei Caesar *höchstens*? <span class="fill-line"></span>

### Aufgabe 5 – Das Prinzip von Kerckhoffs

1883 formulierte der Sprachwissenschaftler Auguste Kerckhoffs eine Regel, die bis heute gilt:

> Ein Verschlüsselungsverfahren muss auch dann sicher sein, wenn der Gegner das Verfahren
> kennt. Geheim bleiben muss nur der Schlüssel.

Die Römer hielten das Caesar-Verfahren geheim. Begründen Sie mit Aufgabe 4, warum das nicht
reicht. Nennen Sie einen weiteren Grund, warum man ein Verfahren nicht lange geheim halten
kann.

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 6 – Codierung oder Verschlüsselung? *(früh fertig)*

Übersetzen Sie mithilfe einer
[Morsetabelle](https://de.wikipedia.org/wiki/Morsecode#Standard-Codetabelle):
`··· ·- -- ··- · ·-··`

Klartext: <span class="fill-line"></span>

Morsecode, Brailleschrift und der Binärcode (ASCII) ersetzen ebenfalls Zeichen durch andere
Zeichen. Trotzdem nennt man sie *Codierungen*, nicht Verschlüsselungen. Was fehlt ihnen?

<span class="fill-line breit"></span>


## Früh fertig? Die Rätselkette

Jeder Text verrät den Schlüssel für den nächsten. Den ersten müssen Sie knacken.

- Text 1: `LZY LJRFHMY. IJW SFJHMXYJ YJCY BZWIJ ZR SJZSEJMS AJWXHMTGJS`
- Text 2: `YTLM ZXLVATYYM. YNXK WXG EXMSMXG MXQM ZBEM WXK LVAENXLLXE SPXB`
- Text 3: `MGTEMJQHHU UCIV: FKG UKEJGTJGKV NKGIV KO UEJNWGUUGN, PKEJV KO XGTHCJTGP`

Noch mehr Übung: [Hour of Code «Encryption»](https://studio.code.org/s/hoc-encryption)
(englisch, Level 1–6).
