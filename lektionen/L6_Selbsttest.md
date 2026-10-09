---
lektion: 6
zielgruppe: sus
art: arbeitsblatt
titel: "Selbsttest zur ganzen Einheit"
kurz: "Hausaufgabe: zwölf Fragen von Caesar bis Post-Quanten – mit sofortiger Kontrolle."
reihenfolge: 20
---

# Selbsttest: Verschlüsselung

## Ziel

Sie überprüfen, welche Lernziele der Einheit Sie schon sicher erreichen und wo Sie nochmals
nachschauen sollten. Der Test wird nicht benotet. Offene Fragen vergleichen Sie mit den Seiten
«Das Wichtigste».

### 1 · Schutzziele

Eine Bank schickt Ihnen einen signierten, aber unverschlüsselten Kontoauszug. Welche
Schutzziele sind erfüllt?

- [ ] Vertraulichkeit
- [ ] Integrität
- [ ] Authentizität
- [ ] Verbindlichkeit
{: .mc data-antwort="2 3 4"}

### 2 · Caesar

`FDHVDU` (Verschiebung 3) heisst <span class="luecke" data-antwort="caesar" data-breite="10"></span>.
Anzahl möglicher Schlüssel: <span class="luecke" data-typ="zahl" data-antwort="26;25" data-breite="5"></span>

### 3 · Kerckhoffs

Formulieren Sie das Prinzip von Kerckhoffs in einem Satz.

<div class="antwort" data-loesung="Ein Verfahren muss auch dann sicher sein, wenn der Gegner es kennt; geheim ist nur der Schlüssel." data-zeilen="1"></div>

### 4 · Häufigkeitsanalyse

Warum lässt sich eine allgemeine Ersetzung knacken, obwohl sie rund 4 · 10²⁶ Schlüssel hat?

<div class="antwort" data-loesung="Jeder Buchstabe wird immer gleich ersetzt, darum bleiben die Buchstabenhäufigkeiten erhalten. Man findet den Schlüssel Buchstabe für Buchstabe, statt alle Schlüssel auszuprobieren." data-zeilen="1"></div>

### 5 · Vigenère

*abc* mit dem Schlüsselwort BB ergibt <span class="luecke" data-antwort="BCD" data-breite="6"></span>.
Vigenère ist im Gegensatz zu Caesar
<span class="luecke" data-optionen="polyalphabetisch;monoalphabetisch;asymmetrisch" data-antwort="polyalphabetisch"></span>.

### 6 · Schlüsselraum

2⁴⁰ ≈ 10¹² Schlüssel, 10⁹ Versuche pro Sekunde: höchstens
<span class="luecke" data-typ="groesse" data-toleranz="0.1" data-antwort="1000" data-breite="7"></span> Sekunden.
Das Verfahren ist <span class="luecke" data-optionen="sicher;unsicher" data-antwort="unsicher"></span>.

### 7 · Schlüsselaustausch

Welches Problem der symmetrischen Verschlüsselung löst die asymmetrische?
<span class="luecke" data-antwort="Schlüsselaustausch;Schlüsselaustauschproblem;das Schlüsselaustauschproblem;der Schlüsselaustausch" data-breite="28"></span>

### 8 · RSA

p = 3, q = 11, e = 7: n = <span class="luecke" data-typ="zahl" data-antwort="33" data-breite="4"></span>
φ = <span class="luecke" data-typ="zahl" data-antwort="20" data-breite="4"></span>
d = <span class="luecke" data-typ="zahl" data-antwort="3" data-breite="4"></span>
m = 2 verschlüsselt: c = <span class="luecke" data-typ="zahl" data-antwort="29" data-breite="4"></span>

### 9 · Einwegfunktion

Was ist bei RSA die Einwegfunktion, und was ist die «Falltür»?

<div class="antwort" data-loesung="Einwegfunktion: zwei grosse Primzahlen multiplizieren ist leicht, n wieder in p und q zerlegen (faktorisieren) ist praktisch unmöglich. Falltür: die Kenntnis von p und q – damit kann die Empfängerin d berechnen." data-zeilen="1"></div>

### 10 · Signatur

Alice signiert mit ihrem <span class="luecke" data-optionen="privaten;öffentlichen" data-antwort="privaten"></span>
Schlüssel, Bob prüft mit Alices <span class="luecke" data-optionen="privaten;öffentlichen" data-antwort="öffentlichen"></span>
Schlüssel. Signiert wird der <span class="luecke" data-optionen="Hashwert;Geheimtext;Schlüssel" data-antwort="Hashwert"></span> des Dokuments.

### 11 · Zertifikate

Was bestätigt eine CA mit einem Zertifikat, und warum vertraut Ihr Browser dieser Stelle?

<div class="antwort" data-loesung="Die CA bestätigt mit ihrer Signatur, dass ein öffentlicher Schlüssel zu einem bestimmten Namen (Domain) gehört. Der Browser vertraut ihr, weil ihr Root-Zertifikat (bzw. das der übergeordneten CA) im Browser oder Betriebssystem vorinstalliert ist." data-zeilen="2"></div>

### 12 · Alltag

Welche Aussagen stimmen?

- [ ] Bei HTTPS werden die Daten mit RSA verschlüsselt.
- [ ] Ende-zu-Ende-Verschlüsselung schützt auch die Metadaten.
- [ ] Ein Passkey überträgt beim Anmelden nie ein Geheimnis an den Server.
- [ ] Ein Quantencomputer würde AES-256 genauso leicht brechen wie RSA.
- [ ] Die Schweizer E-ID ist ein vom Bund signierter Nachweis in einer App.
{: .mc data-antwort="3 5"}
