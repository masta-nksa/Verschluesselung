---
lektion: 2
zielgruppe: sus
art: auftrag
titel: "Knack-Wettbewerb: Ein Brief aus dem Jahr 1586"
kurz: "Eine allgemeine Ersetzung hat 400 Quadrillionen Schlüssel – und ist trotzdem in 20 Minuten geknackt."
reihenfolge: 10
---

# Knack-Wettbewerb: Ein Brief aus dem Jahr 1586

**Lektion 2 – Zweiergruppen | ca. 17 Min.**

## Ziel

Sie knacken eine monoalphabetische Verschlüsselung mit einer Häufigkeitsanalyse und können
erklären, warum ein riesiger Schlüsselraum allein noch keine Sicherheit garantiert.

## Das Problem

Caesar hat nur 26 Schlüssel. Was, wenn man jeden Buchstaben durch einen *beliebigen* anderen
ersetzt? Für das A gibt es dann 26 Möglichkeiten, für das B noch 25, für das C noch 24 …

Anzahl Schlüssel: 26 · 25 · 24 · … · 1 = 26! ≈ 403 000 000 000 000 000 000 000 000

Ein Computer, der eine Milliarde Schlüssel pro Sekunde ausprobiert, bräuchte dafür rund
**13 Milliarden Jahre** – etwa so lange, wie das Universum existiert. Also sicher?

## Der Auftrag

Der folgende Brief wurde 1586 abgefangen. Jeder Buchstabe wurde durch einen anderen ersetzt,
immer durch denselben. Leerzeichen, Satzzeichen und Zahlen sind unverändert. Knacken Sie ihn!

<div class="krypto" data-tool="haeufigkeit" data-text="NG FTBZ 1586 DTDD GTZNT DVATZV, XNI PHIENWNE LHE DRBHVVMTEX, NE IEWMNDRBIZ WISTEWIEDRBTSV. NBZI TEBTIEWIZ JMTEVIE, PHIENWNE IMNDTQIVB CA IZGHZXIE AEX GTZNT TAS XIE VBZHE CA DIVCIE. XNI QZNISI CYNDRBIE GTZNT AEX XIE LIZDRBYHIZIZE YAZXIE NE QNIZSTIDDIZE TAD XIG WISTIEWEND WIDRBGAWWIMV. DNI YTZIE LIZDRBMAIDDIMV: FIXIZ QARBDVTQI YTZ XAZRB INE TEXIZID CINRBIE IZDIVCV. GTZNT SAIBMVI DNRB XIDBTMQ DNRBIZ AEX DRBZNIQ HSSIE AIQIZ XIE GHZXJMTE. XHRB XIZ QHVI TZQINVIVI SAIZ XIE WIBINGXNIEDV LHE IMNDTQIVB. FIXIZ QZNIS YAZXI BINGMNRB PHJNIZV AEX XIG RHXIPETRPIZ VBHGTD JBIMNJJID LHZWIMIWV. IZ CTIBMVI, YNI HSV FIXID CINRBIE LHZPTG, AEX LIZWMNRB XTD IZWIQEND GNV XIZ QIPTEEVIE BTIASNWPINV XIZ QARBDVTQIE. DRBHE ETRB PAZCIZ CINV PHEEVI IZ XNI QZNISI MIDIE. NG SIQZATZ 1587 YAZXI GTZNT DVATZV BNEWIZNRBVIV. NBZI LIZDRBMAIDDIMAEW BTVVI DNI ENRBV WIDRBAIVCV, DHEXIZE NBZ INEI STMDRBI DNRBIZBINV WIWIQIE."></div>

**So gehen Sie vor:**

- Welcher Buchstabe ist im Geheimtext am häufigsten? Im Deutschen ist es mit grossem Abstand
  das **e** (rund 17 %), danach folgen n, i, s, r, a, t.
- Häufige kurze Wörter: *der, die, das, und, ein, den, im, in, zu, es*.
- Häufige Buchstabenfolgen: *sch, ch, ei, ie, er, en, ss*.
- Tragen Sie Ihre Vermutungen in die Ersetzungstabelle ein. Ersetzte Buchstaben erscheinen
  klein und farbig – so sehen Sie sofort, ob sinnvolle Wörter entstehen.

Für die Arbeit auf Papier – der vollständige Geheimtext:

<p class="kt-mono" style="line-height:1.9; letter-spacing:.04em;">NG FTBZ 1586 DTDD GTZNT DVATZV, XNI PHIENWNE LHE DRBHVVMTEX, NE IEWMNDRBIZ WISTEWIEDRBTSV. NBZI TEBTIEWIZ JMTEVIE, PHIENWNE IMNDTQIVB CA IZGHZXIE AEX GTZNT TAS XIE VBZHE CA DIVCIE. XNI QZNISI CYNDRBIE GTZNT AEX XIE LIZDRBYHIZIZE YAZXIE NE QNIZSTIDDIZE TAD XIG WISTIEWEND WIDRBGAWWIMV. DNI YTZIE LIZDRBMAIDDIMV: FIXIZ QARBDVTQI YTZ XAZRB INE TEXIZID CINRBIE IZDIVCV. GTZNT SAIBMVI DNRB XIDBTMQ DNRBIZ AEX DRBZNIQ HSSIE AIQIZ XIE GHZXJMTE. XHRB XIZ QHVI TZQINVIVI SAIZ XIE WIBINGXNIEDV LHE IMNDTQIVB. FIXIZ QZNIS YAZXI BINGMNRB PHJNIZV AEX XIG RHXIPETRPIZ VBHGTD JBIMNJJID LHZWIMIWV. IZ CTIBMVI, YNI HSV FIXID CINRBIE LHZPTG, AEX LIZWMNRB XTD IZWIQEND GNV XIZ QIPTEEVIE BTIASNWPINV XIZ QARBDVTQIE. DRBHE ETRB PAZCIZ CINV PHEEVI IZ XNI QZNISI MIDIE. NG SIQZATZ 1587 YAZXI GTZNT DVATZV BNEWIZNRBVIV. NBZI LIZDRBMAIDDIMAEW BTVVI DNI ENRBV WIDRBAIVCV, DHEXIZE NBZ INEI STMDRBI DNRBIZBINV WIWIQIE.</p>

## Nach dem Knacken

### Aufgabe 1 – Auswertung

Welcher Geheimtextbuchstabe war am häufigsten, und für welchen Klartextbuchstaben stand er?

<span class="fill-line breit"></span>

### Aufgabe 2 – Warum hat der riesige Schlüsselraum nicht geholfen?

Erklären Sie in zwei Sätzen, warum Sie den Schlüssel *nicht* durch Ausprobieren gefunden
haben und es trotzdem so schnell ging.

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 3 – Was hätte Maria Stuart besser machen können?

Nennen Sie zwei Massnahmen, die die Häufigkeitsanalyse erschwert hätten.

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

<div class="kasten" markdown="1">

**Merke:** Ein grosser Schlüsselraum ist *notwendig*, aber nicht *hinreichend*. Solange
Eigenschaften der Sprache (wie Buchstabenhäufigkeiten) im Geheimtext sichtbar bleiben, lässt
sich ein Verfahren ohne Durchprobieren knacken.

</div>
