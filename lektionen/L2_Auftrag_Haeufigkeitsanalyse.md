---
lektion: 2
zielgruppe: sus
art: auftrag
titel: "Knack-Wettbewerb: Ein Brief aus dem Jahr 1586"
kurz: "Eine allgemeine Ersetzung hat 400 Quadrillionen Schlüssel – und ist trotzdem in 20 Minuten geknackt."
reihenfolge: 10
---

# Knack-Wettbewerb: Ein Brief aus dem Jahr 1586

## Ziel

Sie knacken eine monoalphabetische Verschlüsselung mit einer Häufigkeitsanalyse und erklären,
warum ein riesiger Schlüsselraum allein noch keine Sicherheit garantiert.

## Monoalphabetische Verschlüsselung

Bei Caesar wird jeder Buchstabe **immer durch dasselbe Zeichen** ersetzt: Aus e wird immer H.
Verfahren mit nur einem einzigen Ersatzalphabet heissen **monoalphabetisch**. Caesar hat nur
26 Schlüssel. Bei der **allgemeinen Ersetzung** darf jeder Buchstabe durch einen *beliebigen*
anderen ersetzt werden: 26 · 25 · … · 1 = 26! ≈ 4 · 10²⁶ Schlüssel. Bei einer Milliarde
Versuchen pro Sekunde dauert das Durchprobieren rund **13 Milliarden Jahre**. Also sicher?

## Die Schwachstelle: Häufigkeitsanalyse

Buchstaben kommen in jeder Sprache verschieden oft vor. Bei monoalphabetischen Verfahren bleiben
diese Häufigkeiten erhalten – sie gehören nur zu anderen Zeichen. Ist im Geheimtext zum
Beispiel das Q am häufigsten, steht es vermutlich für e. Man findet den Schlüssel so Buchstabe
für Buchstabe, statt ihn durchzuprobieren. Diese **Häufigkeitsanalyse** beschrieb der arabische
Gelehrte al-Kindi schon im 9. Jahrhundert.

| e | n | i | s | r | a | t | d | h | u |
|---|---|---|---|---|---|---|---|---|---|
| 17 % | 10 % | 8 % | 7 % | 7 % | 7 % | 6 % | 5 % | 5 % | 4 % |

- Ist Caesar monoalphabetisch? <span class="luecke" data-optionen="ja;nein" data-antwort="ja"></span>
- Hilft die Häufigkeitsanalyse auch bei Caesar? <span class="luecke" data-optionen="ja;nein" data-antwort="ja"></span>

## Der Auftrag

Der folgende Brief wurde 1586 abgefangen. Jeder Buchstabe wurde durch einen anderen ersetzt,
immer durch denselben; Leer- und Satzzeichen sind unverändert. Knacken Sie ihn!

**So gehen Sie vor:** Beginnen Sie mit dem häufigsten Zeichen (→ e). Häufige Wörter:
*der, die, das, und, ein, den, im, zu*.
Häufige Folgen: *sch, ch, ei, ie, er, en, ss*. Ersetzte Buchstaben erscheinen im Werkzeug klein
und farbig – so sehen Sie sofort, ob Wörter entstehen.

<div class="krypto" data-tool="haeufigkeit" data-text="NG FTBZ 1586 DTDD GTZNT DVATZV, XNI PHIENWNE LHE DRBHVVMTEX, NE IEWMNDRBIZ WISTEWIEDRBTSV. NBZI TEBTIEWIZ JMTEVIE, PHIENWNE IMNDTQIVB CA IZGHZXIE AEX GTZNT TAS XIE VBZHE CA DIVCIE. XNI QZNISI CYNDRBIE GTZNT AEX XIE LIZDRBYHIZIZE YAZXIE NE QNIZSTIDDIZE TAD XIG WISTIEWEND WIDRBGAWWIMV. DNI YTZIE LIZDRBMAIDDIMV: FIXIZ QARBDVTQI YTZ XAZRB INE TEXIZID CINRBIE IZDIVCV. GTZNT SAIBMVI DNRB XIDBTMQ DNRBIZ AEX DRBZNIQ HSSIE AIQIZ XIE GHZXJMTE. XHRB XIZ QHVI TZQINVIVI SAIZ XIE WIBINGXNIEDV LHE IMNDTQIVB. FIXIZ QZNIS YAZXI BINGMNRB PHJNIZV AEX XIG RHXIPETRPIZ VBHGTD JBIMNJJID LHZWIMIWV. IZ CTIBMVI, YNI HSV FIXID CINRBIE LHZPTG, AEX LIZWMNRB XTD IZWIQEND GNV XIZ QIPTEEVIE BTIASNWPINV XIZ QARBDVTQIE. DRBHE ETRB PAZCIZ CINV PHEEVI IZ XNI QZNISI MIDIE. NG SIQZATZ 1587 YAZXI GTZNT DVATZV BNEWIZNRBVIV. NBZI LIZDRBMAIDDIMAEW BTVVI DNI ENRBV WIDRBAIVCV, DHEXIZE NBZ INEI STMDRBI DNRBIZBINV WIWIQIE."></div>

<p class="kt-mono nur-druck" style="line-height:1.75; letter-spacing:.03em;">NG FTBZ 1586 DTDD GTZNT DVATZV, XNI PHIENWNE LHE DRBHVVMTEX, NE IEWMNDRBIZ WISTEWIEDRBTSV. NBZI TEBTIEWIZ JMTEVIE, PHIENWNE IMNDTQIVB CA IZGHZXIE AEX GTZNT TAS XIE VBZHE CA DIVCIE. XNI QZNISI CYNDRBIE GTZNT AEX XIE LIZDRBYHIZIZE YAZXIE NE QNIZSTIDDIZE TAD XIG WISTIEWEND WIDRBGAWWIMV. DNI YTZIE LIZDRBMAIDDIMV: FIXIZ QARBDVTQI YTZ XAZRB INE TEXIZID CINRBIE IZDIVCV. GTZNT SAIBMVI DNRB XIDBTMQ DNRBIZ AEX DRBZNIQ HSSIE AIQIZ XIE GHZXJMTE. XHRB XIZ QHVI TZQINVIVI SAIZ XIE WIBINGXNIEDV LHE IMNDTQIVB. FIXIZ QZNIS YAZXI BINGMNRB PHJNIZV AEX XIG RHXIPETRPIZ VBHGTD JBIMNJJID LHZWIMIWV. IZ CTIBMVI, YNI HSV FIXID CINRBIE LHZPTG, AEX LIZWMNRB XTD IZWIQEND GNV XIZ QIPTEEVIE BTIASNWPINV XIZ QARBDVTQIE. DRBHE ETRB PAZCIZ CINV PHEEVI IZ XNI QZNISI MIDIE. NG SIQZATZ 1587 YAZXI GTZNT DVATZV BNEWIZNRBVIV. NBZI LIZDRBMAIDDIMAEW BTVVI DNI ENRBV WIDRBAIVCV, DHEXIZE NBZ INEI STMDRBI DNRBIZBINV WIWIQIE.</p>

## Nach dem Knacken

### Aufgabe 1 – Auswertung

- Der häufigste Geheimtextbuchstabe ist <span class="luecke" data-antwort="I" data-breite="4"></span>
  und steht für <span class="luecke" data-antwort="e" data-breite="4"></span>.
- Um welche Königin geht es? <span class="luecke" data-antwort="Maria Stuart;Maria;Stuart" data-breite="16"></span>
- Wer hat ihre Briefe geknackt? <span class="luecke" data-antwort="Thomas Phelippes;Phelippes" data-breite="18"></span>

### Aufgabe 2 – Warum hat der riesige Schlüsselraum nicht geholfen?

Erklären Sie in zwei Sätzen, warum Sie den Schlüssel *nicht* durch Ausprobieren gefunden
haben und es trotzdem so schnell ging.

<div class="antwort" data-loesung="Man probiert nicht alle Schlüssel durch, sondern findet den Schlüssel Buchstabe für Buchstabe. Weil jeder Buchstabe immer durch dasselbe Zeichen ersetzt wird, bleiben die Häufigkeiten der Sprache (e, n, i …) und typische Wörter (der, und) im Geheimtext sichtbar." data-zeilen="2"></div>

### Aufgabe 3 – Was hätte Maria Stuart besser machen können?

Nennen Sie zwei Massnahmen, die die Häufigkeitsanalyse erschwert hätten.

<div class="antwort" data-loesung="Zum Beispiel: Leer- und Satzzeichen weglassen; häufige Buchstaben durch mehrere verschiedene Zeichen ersetzen; Füllzeichen einstreuen; Codewörter für häufige Begriffe; mehrere Alphabete abwechselnd verwenden (→ Vigenère)." data-zeilen="2"></div>
