---
lektion: 6
zielgruppe: sus
art: arbeitsblatt
titel: "Selbsttest zur ganzen Einheit"
kurz: "Hausaufgabe: zwölf Fragen von Caesar bis Post-Quanten – allein lösen, danach mit der Lösung vergleichen."
reihenfolge: 20
---

# Selbsttest: Verschlüsselung

**Hausaufgabe nach Lektion 6 – Einzelarbeit | ca. 15 Min.**

## Ziel

Sie überprüfen, welche Lernziele der Einheit Sie schon sicher erreichen und wo Sie nochmals
nachschauen sollten. Der Test wird nicht benotet.

### 1 · Schutzziele

Eine Bank schickt Ihnen einen signierten, aber unverschlüsselten Kontoauszug. Welche
Schutzziele sind erfüllt? (Mehrere Antworten möglich.)

- [ ] Vertraulichkeit
- [ ] Integrität
- [ ] Authentizität
- [ ] Verbindlichkeit

### 2 · Caesar

Entschlüsseln Sie `FDHVDU` (Verschiebung 3) und nennen Sie die Anzahl möglicher Schlüssel.

Klartext: <span class="fill-line"></span> Anzahl Schlüssel: <span class="fill-line"></span>

### 3 · Kerckhoffs

Formulieren Sie das Prinzip von Kerckhoffs in einem Satz.

<span class="fill-line breit"></span>

### 4 · Häufigkeitsanalyse

Warum lässt sich eine allgemeine monoalphabetische Ersetzung knacken, obwohl sie rund 4 · 10²⁶
Schlüssel hat?

<span class="fill-line breit"></span>

### 5 · Vigenère

Verschlüsseln Sie *abc* mit dem Schlüsselwort BB. Wie unterscheidet sich Vigenère grundsätzlich
von Caesar?

Geheimtext: <span class="fill-line"></span> Unterschied: <span class="fill-line"></span>

### 6 · Schlüsselraum

Ein Verfahren hat 2⁴⁰ ≈ 10¹² Schlüssel. Ein Angreifer schafft 10⁹ Versuche pro Sekunde. Wie
lange dauert es höchstens? Ist das Verfahren sicher?

<span class="fill-line breit"></span>

### 7 · Schlüsselaustausch

Welches Problem der symmetrischen Verschlüsselung löst die asymmetrische Verschlüsselung?

<span class="fill-line breit"></span>

### 8 · RSA

Gegeben: p = 3, q = 11, e = 7. Berechnen Sie n, φ und d. Verschlüsseln Sie m = 2.

n = <span class="fill-line"></span> φ = <span class="fill-line"></span> d = <span class="fill-line"></span> c = <span class="fill-line"></span>

### 9 · Einwegfunktion

Was ist bei RSA die Einwegfunktion, und was ist die «Falltür»?

<span class="fill-line breit"></span>

### 10 · Signatur

Ordnen Sie zu: Alice signiert mit ihrem <span class="fill-line"></span> Schlüssel, Bob prüft mit Alices
<span class="fill-line"></span> Schlüssel. Signiert wird nicht das ganze Dokument, sondern sein
<span class="fill-line"></span>.

### 11 · Zertifikate

Was bestätigt eine Zertifizierungsstelle mit einem Zertifikat? Warum vertraut Ihr Browser
dieser Stelle?

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### 12 · Alltag

Welche Aussagen stimmen? (Mehrere Antworten möglich.)

- [ ] Bei HTTPS werden die Daten mit RSA verschlüsselt.
- [ ] Ende-zu-Ende-Verschlüsselung schützt auch die Metadaten.
- [ ] Ein Passkey überträgt beim Anmelden nie ein Geheimnis an den Server.
- [ ] Ein Quantencomputer würde AES-256 genauso leicht brechen wie RSA.
- [ ] Die Schweizer E-ID ist ein vom Bund signierter Nachweis in einer App.
