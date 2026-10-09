---
lektion: 3
titel: "Musterlösung: Vigenère knacken, AES und Kistenrätsel"
kurz: "Schlüsselwort und Klartext, Schlüsselraum-Rechnungen und die Lösungen des Kistenrätsels"
---

# Musterlösung: Vigenère knacken, AES und Kistenrätsel

## Vigenère knacken

**Aufgabe 1:** Schlüssellänge **6**. Fast alle Abstände der Wiederholungen sind durch 6 teilbar
(z. B. 72, 108, 240, 300). Sie sind auch durch 2 und 3 teilbar – das folgt aber automatisch
aus der Teilbarkeit durch 6. Die grösste Zahl mit fast so vielen Treffern wie 2 und 3 ist die 6.

**Aufgabe 2:** Schlüsselwort **TRESOR**. Klartext:

> Lange galt die Vigenere-Verschluesselung als unknackbar. Man nannte sie sogar die
> unentzifferbare Chiffre. Erst um das Jahr achtzehnhundertfuenfzig fand Charles Babbage einen
> Weg, sie zu brechen, doch er veroeffentlichte seine Methode nie. Einige Jahre spaeter
> beschrieb der preussische Offizier Friedrich Kasiski dasselbe Verfahren. Die Idee ist
> einfach: Wenn ein Wort im Klartext mehrmals vorkommt und zufaellig an derselben Stelle des
> Schluesselwortes beginnt, dann entsteht im Geheimtext zweimal dieselbe Buchstabenfolge. Der
> Abstand zwischen diesen Wiederholungen ist ein Vielfaches der Schluessellaenge. Kennt man die
> Schluessellaenge, zerlegt man den Geheimtext in Spalten. Jede Spalte ist nur noch eine
> einfache Caesar-Verschluesselung, und die knackt man mit einer Haeufigkeitsanalyse.

**Aufgabe 3:** Charles Babbage um 1850; er veröffentlichte seine Methode nicht. Friedrich
Kasiski publizierte das Verfahren 1863, darum heisst es *Kasiski-Test*.

**Aufgabe 4** (verschiedene Antworten richtig): ein langes Schlüsselwort (im Idealfall so lang
wie der Text), ein zufälliges Schlüsselwort statt eines Worts, kurze Nachrichten, Schlüssel nie
wiederverwenden – konsequent zu Ende gedacht ergibt das den One-Time-Pad.

**Früh fertig:** Schlüssel **BIT** (Länge 3). Klartext: *Moderne Verfahren wie AES verschluesseln
nicht einzelne Buchstaben, sondern ganze Bloecke von Bits. …*

## Von Vigenère zu AES

**Aufgabe 1:**

| Verfahren | Anzahl Schlüssel | Zeit bei 10⁹ Versuchen/s |
|---|---|---|
| Caesar | 26 | 26 ns |
| Vigenère, 6 Buchstaben | 26⁶ = 308 915 776 ≈ 3,1 · 10⁸ | ≈ 0,3 s |
| allgemeine Ersetzung | ≈ 4 · 10²⁶ | ≈ 1,3 · 10¹⁰ Jahre |
| AES-128 | ≈ 3,4 · 10³⁸ | ≈ 1,1 · 10²² Jahre |
| AES-256 | ≈ 1,2 · 10⁷⁷ | ≈ 3,7 · 10⁶⁰ Jahre |

Rechenweg AES-128: 3,4 · 10³⁸ / 10⁹ = 3,4 · 10²⁹ s; / 3,2 · 10⁷ s pro Jahr ≈ 1,1 · 10²² Jahre.

**Aufgabe 2:** 10⁹ · 10¹² = 10²¹ Versuche pro Sekunde. 3,4 · 10³⁸ / 10²¹ = 3,4 · 10¹⁷ s ≈
1,1 · 10¹⁰ Jahre – also etwa 80 % des Alters des Universums. Im Durchschnitt findet man den
Schlüssel nach der Hälfte der Zeit, das sind immer noch rund 5 Milliarden Jahre.

**Aufgabe 3:** Nach Kerckhoffs darf die Sicherheit nur vom Schlüssel abhängen. Weil AES
öffentlich ist, haben Tausende Fachleute weltweit über Jahre versucht, es zu knacken – ohne
Erfolg. Das schafft viel mehr Vertrauen als ein Geheimverfahren, das niemand prüfen konnte.
Zudem können alle AES einsetzen und kompatible Programme bauen.

**Aufgabe 4:** Sie und der Shop müssten vorher denselben geheimen Schlüssel besitzen. Ihn über
das Internet zu schicken, wäre unsicher (Eve liest mit), ihn persönlich zu übergeben,
unpraktisch. Das ist das **Schlüsselaustauschproblem**.

## Kistenrätsel

**Aufgabe 1 (drei Fahrten):**
1. Alice legt den Ring in die Kiste, hängt **ihr** Schloss daran und schickt sie zu Bob.
2. Bob hängt **sein** Schloss zusätzlich daran und schickt die Kiste zurück.
3. Alice entfernt ihr Schloss (die Kiste bleibt durch Bobs Schloss verschlossen) und schickt
   sie wieder zu Bob. Bob öffnet sein Schloss.

Die Kiste ist auf jeder Fahrt verschlossen, und es wurde nie ein Schlüssel verschickt.

**Aufgabe 2:** Alice drückt eines von Bobs offenen Schnappschlössern an die Kiste und schickt
sie ab – **eine** Fahrt. Öffentlich ist das offene Schloss (jede Person kann damit
verschliessen), privat ist Bobs Schlüssel (nur er kann öffnen). Das ist genau die Idee von
öffentlichem und privatem Schlüssel.

**Aufgabe 3:** Der Bote liefert Alice *seine eigenen* Schnappschlösser und behauptet, sie seien
von Bob. Alice verschliesst damit, der Bote öffnet, nimmt den Ring und schickt (mit einem
echten Schloss von Bob) eine andere Kiste weiter. Verletzt ist die **Authentizität**: Alice
kann nicht prüfen, ob das Schloss wirklich von Bob stammt. In der Kryptografie heisst das
*Man-in-the-Middle-Angriff*; die Lösung sind Zertifikate (Lektion 5).
