---
lektion: 3
zielgruppe: sus
art: auftrag
titel: "Vigenère knacken"
kurz: "Erst die Schlüssellänge, dann jede Spalte einzeln: So knackten Babbage und Kasiski die «unentzifferbare» Chiffre."
reihenfolge: 10
---

# Vigenère knacken

## Ziel

Sie beschreiben in zwei Schritten, wie man eine Vigenère-Verschlüsselung knackt, und wenden
das Verfahren mit dem Werkzeug an.

## Die Idee in zwei Schritten

**Schritt 1 – Schlüssellänge finden (Kasiski-Test).** Kommt ein Wort im Klartext mehrmals vor
und trifft es zufällig auf dieselbe Stelle im Schlüsselwort, entsteht im Geheimtext zweimal
dieselbe Buchstabenfolge. Der Abstand ist dann ein **Vielfaches der Schlüssellänge**. Bei
mehreren Abständen ist die Länge ein gemeinsamer Teiler: Abstände 18, 30 und 42 → gemeinsame
Teiler 2, 3, 6 → Länge vermutlich 6.

**Schritt 2 – Spaltenweise knacken.** Bei Länge 6 wurden der 1., 7., 13., … Buchstabe mit
demselben Schlüsselbuchstaben verschoben. Jede dieser «Spalten» ist eine
**Caesar-Verschlüsselung** – und die knackt man mit der Häufigkeitsanalyse.

## Auftrag

Den folgenden Geheimtext haben Sie abgefangen. Er handelt von genau dem, was Sie gerade tun.
Arbeiten Sie mit dem Werkzeug.

<div class="krypto" data-tool="vigenere-knacken" data-text="ERRYS XTCXV WVOZK WBVKV ZWFJV YPMSJ LVPMB XTCWM BBGRG CPRKD EFBRG EXWGZ XJSYO IWZIM BVGKD ATWXI FSFVV YMXTI XVVKH LFUEK XRAIE UVKSV LFVLG UIJHW NVRXN ZZWEF RTARV DSJUR FTOXX VMFSE PVKKW VSLFJ STAVR VCTAV VNSIH VJXSE MCMUV KXJIA BVFVX ZCUXE MWSZG ZKWXR AIIKD RXKIJ PVLTL JWVUU IJDIX LWKWJ VYIGT WBQMW FWKZI VFZVY OSGZL BMVOJ LVPTS MXIJS VIXEH ASZWV IAGKX ZRXOT ANIFB VBEAG FKBDO DOIMV BLAVA IQSZJ OFVCC DFKYF RQNWE WZCBX EFRVK JIDPV GJXWZ CXUIK GTACY WGJXC AGFKX JFWUZ GEXVO EGVRL GKXYX AAXXY IAAKX OXRKV BDEDR ZXJID PVULG ZGKTS IFTFE XIVSI TSWLO EWQAA GTAVR VWVLV ROWVW VVZCC NEKWB ZLKIA BMBVP XOTAV WVSIL TLDIV LJIDZ RXEKW YVGEX EOEWZ IKQYE LIKGV ECEWB XXQIJ ZVZKQ SBUXE KWVVB DXWLK BEWHO CMVRB SUXJT SZKXZ WLBLK ESUVV BEIWW EYRGZ STTVW SFMXI WUVCN VWKSC NEKMB UWZIC BRVBX EOEFZ XWWEX ILSSL YZKCS ZMJEF OCRJI"></div>

### Aufgabe 1 – Schlüssellänge

Welche Schlüssellänge vermuten Sie? <span class="luecke" data-typ="zahl" data-antwort="6" data-breite="4"></span>
Begründen Sie mit den Abständen – und warum nicht 2 oder 3?

<div class="antwort" data-loesung="Fast alle Abstände (z. B. 72, 108, 240, 300) sind durch 6 teilbar. Sie sind zwar auch durch 2 und 3 teilbar, das folgt aber automatisch aus der Teilbarkeit durch 6. Die grösste Zahl mit fast so vielen Treffern wie 2 und 3 ist die 6." data-zeilen="2"></div>

### Aufgabe 2 – Schlüsselwort

Tragen Sie die Länge ein und schieben Sie in jeder Spalte mit − und +, bis die blauen Balken
zu den orangen Linien passen. «Vorschlag» erst benutzen, wenn Sie es selbst versucht haben.

Schlüsselwort: <span class="luecke" data-antwort="TRESOR" data-breite="10"></span>

### Aufgabe 3 – Wer hat's erfunden?

Laut Klartext knackte zuerst <span class="luecke" data-antwort="Babbage;Charles Babbage" data-breite="16"></span>
die Chiffre, benannt ist der Test aber nach <span class="luecke" data-antwort="Kasiski;Friedrich Kasiski" data-breite="16"></span>.

### Aufgabe 4 – Sicherheit

Nennen Sie zwei Dinge, die den Angriff deutlich schwieriger machen würden.

<div class="antwort" data-loesung="Zum Beispiel: ein langes Schlüsselwort (im Idealfall so lang wie der Text), ein zufälliges statt eines echten Worts, kurze Nachrichten, einen Schlüssel nie wiederverwenden – zu Ende gedacht ist das der One-Time-Pad." data-zeilen="2"></div>

<div class="nur-online" markdown="1">

## Früh fertig?

Dieser Text ist kürzer, die Schlüssellänge unbekannt. Kopieren Sie ihn ins Werkzeug.

<p class="kt-mono" style="line-height:1.8; letter-spacing:.04em;">NWWFZ GFDXS NTIZX OEBFI XTDXS AVITN FALFT GOQVI BXJVS FTGFJ NDPLU IUFVL PVWFZ GHIGA MUMWX DSXWW GCQMT RXEMK CTHDS PJZWJ VFFPK FZXOZ NOLXO LNSKA NQLDP MVVWN QMEMF TKAMC XTAXM DXSSG VMIGB WBLNS KAWMK TKAXQ GEMGE QXIIX VNBHS XJBXO LXSAI SIVIM OPTET BTFVW JONOL XJVXI IXVNB HSXJB LBVTM GLFJK JVZUV BDPMT UXIZW BAXJV SJOXX ILBVZ SMBGM KOJEF QUUQL ULTTI NTXKP JBFZX OIEMM KTKAM CXTAX MCGEL TWWGH QUUML CMBBM LNMAS IETAT OLDPM KOMKB CYEMK FZWF</p>

Schlüsselwort: <span class="luecke" data-antwort="BIT" data-breite="8"></span>

Zum Weiterlesen: [Kasiski-Test auf Wikipedia](https://de.wikipedia.org/wiki/Kasiski-Test) ·
[Kryptoanalyse bei inf-schule](https://www.inf-schule.de/kryptologie/historischechiffriersysteme/station_kryptoanalysevigenereverfahren)

</div>
