---
lektion: 3
zielgruppe: sus
art: input
titel: "Von Vigenère zu AES: Bits, XOR und der Schlüsselraum"
kurz: "Wie moderne symmetrische Verfahren funktionieren und warum Durchprobieren bei AES aussichtslos ist – mit Rechenaufgaben."
reihenfolge: 20
---

# Von Vigenère zu AES

## Ziel

Sie erklären, wie moderne Verfahren mit Bits statt Buchstaben arbeiten, schätzen die Grösse
eines Schlüsselraums ab und begründen, warum AES als sicher gilt.

## 1 · Computer verschlüsseln Bits

Die wichtigste Grundoperation ist **XOR** (⊕, «entweder–oder»): Das Ergebnis ist 1, wenn genau
eines der beiden Bits 1 ist: 0⊕0 = 0, 0⊕1 = 1, 1⊕0 = 1, 1⊕1 = 0. Wendet man XOR zweimal mit
demselben Schlüssel an, erhält man wieder den Klartext: (Klartext ⊕ Schlüssel) ⊕ Schlüssel =
Klartext. Verschlüsseln und Entschlüsseln sind dieselbe Operation – typisch **symmetrisch**.

Kurz geprüft:

- 1 ⊕ 1 = <span class="luecke" data-typ="zahl" data-antwort="0" data-breite="3"></span>
- 1 ⊕ 0 = <span class="luecke" data-typ="zahl" data-antwort="1" data-breite="3"></span>
- 1011 ⊕ 0110 = <span class="luecke" data-antwort="1101" data-breite="6"></span>
- 1101 ⊕ 0110 = <span class="luecke" data-antwort="1011" data-breite="6"></span> (Was fällt Ihnen auf?)

<div class="krypto" data-tool="xor" data-text="HALLO" data-key="KEY"></div>

<div class="kasten" markdown="1">

**Das One-Time-Pad – die perfekte Verschlüsselung.** Ist der Schlüssel *völlig zufällig*,
*so lang wie die Nachricht* und wird er *nur einmal* verwendet, ist XOR beweisbar unknackbar:
Jeder Klartext gleicher Länge wäre gleich wahrscheinlich. Der heisse Draht Washington–Moskau
wurde so gesichert. Im Alltag unpraktisch: Für jedes Gigabyte Daten bräuchten beide Seiten
vorher ein Gigabyte geheimen Schlüssel.

</div>

## 2 · AES – der Standard von heute

1997 schrieb das US-Normungsinstitut NIST einen **öffentlichen Wettbewerb** aus; Fachleute aus
aller Welt versuchten jahrelang, die Vorschläge der anderen zu knacken. 2001 gewann *Rijndael*
der Belgier Joan Daemen und Vincent Rijmen – seither **AES** (Advanced Encryption Standard).

- Die Daten werden in Blöcke von 128 Bit zerlegt. Jeder Block durchläuft 10 bis 14 **Runden**:
  Bytes ersetzen, verschieben, vermischen und mit einem Teil des Schlüssels per XOR verknüpfen.
- Danach hängt jedes Bit des Geheimtexts von *jedem* Bit des Klartexts und des Schlüssels ab.
  Häufigkeiten oder Wiederholungen sind nicht mehr zu erkennen.
- Der Schlüssel ist 128, 192 oder 256 Bit lang.

**Alle bisherigen Verfahren sind symmetrisch:** Caesar, allgemeine Ersetzung, Vigenère,
One-Time-Pad und AES – Sender und Empfänger brauchen denselben geheimen Schlüssel.

AES schützt WLAN (WPA2/WPA3), HTTPS, Festplatten (BitLocker, FileVault) und Messenger. Da kein
Angriff bekannt ist, der wesentlich besser ist als Durchprobieren, hängt die Sicherheit an
der Grösse des Schlüsselraums.

## 3 · Rechenaufgaben zum Schlüsselraum

Annahme: **10⁹ Schlüssel pro Sekunde**, ein Jahr ≈ 3,2 · 10⁷ Sekunden. Schreibweise im Feld z. B.
`3.4e38` oder `3,4·10^38`.

### Aufgabe 1 – Tabelle ergänzen

| Verfahren | Anzahl Schlüssel | Zeit für alle Schlüssel |
|---|---|---|
| Caesar | 26 | 26 Nanosekunden |
| Vigenère, Schlüsselwort mit 6 Buchstaben | 26⁶ = <span class="luecke" data-typ="groesse" data-toleranz="0.02" data-antwort="308915776" data-breite="12"></span> | <span class="luecke" data-typ="groesse" data-toleranz="0.15" data-antwort="0.31" data-breite="8"></span> Sekunden |
| allgemeine Ersetzung (L2) | 26! ≈ 4 · 10²⁶ | ≈ 1,3 · 10¹⁰ Jahre |
| AES-128 | 2¹²⁸ ≈ 3,4 · 10³⁸ | <span class="luecke" data-typ="groesse" data-antwort="1.1e22" data-breite="10"></span> Jahre |
| AES-256 | 2²⁵⁶ ≈ 1,2 · 10⁷⁷ | <span class="luecke" data-typ="groesse" data-antwort="3.7e60" data-breite="10"></span> Jahre |

### Aufgabe 2 – Mit der ganzen Welt

Eine Milliarde Computer probieren je 10¹² Schlüssel pro Sekunde. Wie lange dauert es für
AES-128? <span class="luecke" data-typ="groesse" data-antwort="1.1e10" data-breite="10"></span> Jahre.
Vergleichen Sie mit dem Alter des Universums (1,4 · 10¹⁰ Jahre):

<div class="antwort" data-loesung="10⁹ · 10¹² = 10²¹ Versuche pro Sekunde → 3,4 · 10³⁸ / 10²¹ ≈ 3,4 · 10¹⁷ s ≈ 1,1 · 10¹⁰ Jahre, also rund 80 % des Alters des Universums. Im Durchschnitt findet man den Schlüssel nach der Hälfte der Zeit – immer noch rund 5 Milliarden Jahre." data-zeilen="1"></div>

<div class="nur-online" markdown="1">

### Aufgabe 3 – Kerckhoffs bei AES *(früh fertig)*

Der AES-Algorithmus ist vollständig veröffentlicht. Warum ist das ein *Vorteil*?

<div class="antwort" data-loesung="Nach Kerckhoffs darf die Sicherheit nur vom Schlüssel abhängen. Weil AES öffentlich ist, haben Fachleute weltweit jahrelang versucht, es zu knacken – ohne Erfolg. Das schafft mehr Vertrauen als ein geheimes Verfahren, das niemand prüfen konnte, und alle können kompatible Programme bauen." data-zeilen="2"></div>

### Aufgabe 4 – Das verbleibende Problem *(früh fertig)*

Warum können Sie mit AES allein keine geheime Nachricht an einen Online-Shop schicken, bei dem
Sie zum ersten Mal einkaufen?

<div class="antwort" data-loesung="Sie und der Shop bräuchten vorher denselben geheimen Schlüssel. Über das Internet verschickt, könnte Eve ihn mitlesen; ihn persönlich zu übergeben ist unpraktisch. Das ist das Schlüsselaustauschproblem." data-zeilen="2"></div>

</div>

<div class="kasten" markdown="1">

**Und Quantencomputer?** Sie könnten das Durchprobieren (Grover-Algorithmus) so beschleunigen,
als wäre der Schlüssel halb so lang. AES-256 bliebe so sicher wie AES-128 heute. Für die
asymmetrischen Verfahren der nächsten Lektion sieht es anders aus (Lektion 6).

</div>
