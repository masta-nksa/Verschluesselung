---
lektion: 3
zielgruppe: sus
art: auftrag
titel: "Vigenère knacken"
kurz: "Erst die Schlüssellänge, dann jede Spalte einzeln: So knackten Babbage und Kasiski die «unentzifferbare» Chiffre."
reihenfolge: 10
---

# Vigenère knacken

**Lektion 3 – Partnerarbeit | ca. 13 Min.**

## Ziel

Sie beschreiben in zwei Schritten, wie man eine Vigenère-Verschlüsselung knackt, und wenden
das Verfahren mit dem Werkzeug an.

## Die Idee in zwei Schritten

**Schritt 1 – Schlüssellänge finden (Kasiski-Test).** Kommt ein Wort im Klartext mehrmals vor
und trifft es zufällig auf dieselbe Stelle im Schlüsselwort, entsteht im Geheimtext zweimal
dieselbe Buchstabenfolge. Der Abstand zwischen den Wiederholungen ist dann ein **Vielfaches der
Schlüssellänge**. Findet man mehrere solche Abstände, ist die Schlüssellänge ein gemeinsamer
Teiler davon.

Beispiel: Wiederholungen im Abstand 18, 30 und 42 → gemeinsame Teiler 2, 3 und 6 → die
Schlüssellänge ist vermutlich 6 (oder 3).

**Schritt 2 – Spaltenweise knacken.** Kennt man die Länge, z. B. 6, wurden der 1., 7., 13., …
Buchstabe alle mit demselben Schlüsselbuchstaben verschoben. Jede dieser «Spalten» ist also
nur eine **Caesar-Verschlüsselung** – und die knackt man mit der Häufigkeitsanalyse: Der
häufigste Buchstabe einer Spalte ist vermutlich ein e.

## Auftrag

Den folgenden Geheimtext haben Sie abgefangen. Er handelt von genau dem, was Sie gerade tun.

<div class="krypto" data-tool="vigenere-knacken" data-text="ERRYS XTCXV WVOZK WBVKV ZWFJV YPMSJ LVPMB XTCWM BBGRG CPRKD EFBRG EXWGZ XJSYO IWZIM BVGKD ATWXI FSFVV YMXTI XVVKH LFUEK XRAIE UVKSV LFVLG UIJHW NVRXN ZZWEF RTARV DSJUR FTOXX VMFSE PVKKW VSLFJ STAVR VCTAV VNSIH VJXSE MCMUV KXJIA BVFVX ZCUXE MWSZG ZKWXR AIIKD RXKIJ PVLTL JWVUU IJDIX LWKWJ VYIGT WBQMW FWKZI VFZVY OSGZL BMVOJ LVPTS MXIJS VIXEH ASZWV IAGKX ZRXOT ANIFB VBEAG FKBDO DOIMV BLAVA IQSZJ OFVCC DFKYF RQNWE WZCBX EFRVK JIDPV GJXWZ CXUIK GTACY WGJXC AGFKX JFWUZ GEXVO EGVRL GKXYX AAXXY IAAKX OXRKV BDEDR ZXJID PVULG ZGKTS IFTFE XIVSI TSWLO EWQAA GTAVR VWVLV ROWVW VVZCC NEKWB ZLKIA BMBVP XOTAV WVSIL TLDIV LJIDZ RXEKW YVGEX EOEWZ IKQYE LIKGV ECEWB XXQIJ ZVZKQ SBUXE KWVVB DXWLK BEWHO CMVRB SUXJT SZKXZ WLBLK ESUVV BEIWW EYRGZ STTVW SFMXI WUVCN VWKSC NEKMB UWZIC BRVBX EOEFZ XWWEX ILSSL YZKCS ZMJEF OCRJI"></div>

Für die Arbeit auf Papier:

<p class="kt-mono" style="line-height:1.9; letter-spacing:.04em;">ERRYS XTCXV WVOZK WBVKV ZWFJV YPMSJ LVPMB XTCWM BBGRG CPRKD EFBRG EXWGZ XJSYO IWZIM BVGKD ATWXI FSFVV YMXTI XVVKH LFUEK XRAIE UVKSV LFVLG UIJHW NVRXN ZZWEF RTARV DSJUR FTOXX VMFSE PVKKW VSLFJ STAVR VCTAV VNSIH VJXSE MCMUV KXJIA BVFVX ZCUXE MWSZG ZKWXR AIIKD RXKIJ PVLTL JWVUU IJDIX LWKWJ VYIGT WBQMW FWKZI VFZVY OSGZL BMVOJ LVPTS MXIJS VIXEH ASZWV IAGKX ZRXOT ANIFB VBEAG FKBDO DOIMV BLAVA IQSZJ OFVCC DFKYF RQNWE WZCBX EFRVK JIDPV GJXWZ CXUIK GTACY WGJXC AGFKX JFWUZ GEXVO EGVRL GKXYX AAXXY IAAKX OXRKV BDEDR ZXJID PVULG ZGKTS IFTFE XIVSI TSWLO EWQAA GTAVR VWVLV ROWVW VVZCC NEKWB ZLKIA BMBVP XOTAV WVSIL TLDIV LJIDZ RXEKW YVGEX EOEWZ IKQYE LIKGV ECEWB XXQIJ ZVZKQ SBUXE KWVVB DXWLK BEWHO CMVRB SUXJT SZKXZ WLBLK ESUVV BEIWW EYRGZ STTVW SFMXI WUVCN VWKSC NEKMB UWZIC BRVBX EOEFZ XWWEX ILSSL YZKCS ZMJEF OCRJI</p>

### Aufgabe 1 – Schlüssellänge

Schauen Sie sich die gefundenen Wiederholungen und ihre Abstände an. Welche Schlüssellänge
vermuten Sie? Begründen Sie mit den Abständen.

Schlüssellänge: <span class="fill-line"></span> Begründung: <span class="fill-line"></span>

### Aufgabe 2 – Schlüsselwort

Tragen Sie die Länge ein. Schieben Sie in jeder Spalte mit − und + so lange, bis die blauen
Balken zu den orangen Linien (Deutsch) passen. Den Knopf «Vorschlag» dürfen Sie erst benutzen,
wenn Sie es selbst versucht haben.

Schlüsselwort: <span class="fill-line"></span>

### Aufgabe 3 – Wer hat's erfunden?

Wer knackte die Vigenère-Verschlüsselung zuerst, und warum ist sie nach jemand anderem
benannt? Die Antwort steht im Klartext.

<span class="fill-line breit"></span>

### Aufgabe 4 – Sicherheit

Nennen Sie zwei Dinge, die den Angriff deutlich schwieriger machen würden.

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

## Früh fertig?

Dieser Text ist kürzer und die Schlüssellänge ist unbekannt. Kopieren Sie ihn ins Werkzeug.

<p class="kt-mono" style="line-height:1.9; letter-spacing:.04em;">NWWFZ GFDXS NTIZX OEBFI XTDXS AVITN FALFT GOQVI BXJVS FTGFJ NDPLU IUFVL PVWFZ GHIGA MUMWX DSXWW GCQMT RXEMK CTHDS PJZWJ VFFPK FZXOZ NOLXO LNSKA NQLDP MVVWN QMEMF TKAMC XTAXM DXSSG VMIGB WBLNS KAWMK TKAXQ GEMGE QXIIX VNBHS XJBXO LXSAI SIVIM OPTET BTFVW JONOL XJVXI IXVNB HSXJB LBVTM GLFJK JVZUV BDPMT UXIZW BAXJV SJOXX ILBVZ SMBGM KOJEF QUUQL ULTTI NTXKP JBFZX OIEMM KTKAM CXTAX MCGEL TWWGH QUUML CMBBM LNMAS IETAT OLDPM KOMKB CYEMK FZWF</p>

Zum Weiterlesen: [Kasiski-Test auf Wikipedia](https://de.wikipedia.org/wiki/Kasiski-Test) ·
[Interaktive Kryptoanalyse bei inf-schule](https://www.inf-schule.de/kryptologie/historischechiffriersysteme/station_kryptoanalysevigenereverfahren)
