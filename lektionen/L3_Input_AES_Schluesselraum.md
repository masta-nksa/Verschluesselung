---
lektion: 3
zielgruppe: sus
art: input
titel: "Von Vigenère zu AES: Bits, XOR und der Schlüsselraum"
kurz: "Wie moderne symmetrische Verfahren funktionieren und warum Durchprobieren bei AES aussichtslos ist – mit Rechenaufgaben."
reihenfolge: 20
---

# Von Vigenère zu AES

**Lektion 3 – Einzelarbeit | ca. 14 Min. (6 Min. lesen, 8 Min. Aufgaben 1–2; Aufgaben 3–4 für Schnelle)**

## Ziel

Sie erklären, wie moderne Verfahren mit Bits statt Buchstaben arbeiten, schätzen die Grösse
eines Schlüsselraums ab und begründen, warum AES als sicher gilt.

## 1 · Computer verschlüsseln Bits

Computer verschlüsseln keine Buchstaben, sondern Bits. Die wichtigste Grundoperation ist
**XOR** (⊕, «entweder–oder»): Das Ergebnis ist 1, wenn genau eines der beiden Bits 1 ist.

| a | b | a ⊕ b |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Das Besondere: Wendet man XOR zweimal mit demselben Schlüssel an, erhält man wieder den
Klartext: (Klartext ⊕ Schlüssel) ⊕ Schlüssel = Klartext. Verschlüsseln und Entschlüsseln sind
also dieselbe Operation – ein typisch **symmetrisches** Verfahren.

<div class="krypto" data-tool="xor" data-text="HALLO" data-key="KEY"></div>

<div class="kasten" markdown="1">

**Das One-Time-Pad – die perfekte Verschlüsselung.** Ist der Schlüssel *völlig zufällig*,
*genauso lang wie die Nachricht* und wird er *nur ein einziges Mal* verwendet, ist XOR
beweisbar nicht zu knacken: Jeder denkbare Klartext gleicher Länge wäre gleich
wahrscheinlich. Der heisse Draht zwischen Washington und Moskau wurde so gesichert.
Im Alltag ist das unpraktisch: Für jedes Gigabyte Daten bräuchten beide Seiten vorher ein
Gigabyte geheimen Schlüssel.

</div>

## 2 · AES – der Standard von heute

1997 schrieb das US-Normungsinstitut NIST einen **öffentlichen Wettbewerb** für ein neues
Verfahren aus. Fachleute aus aller Welt reichten Vorschläge ein und versuchten jahrelang, die
Vorschläge der anderen zu knacken. 2001 gewann *Rijndael* der beiden Belgier Joan Daemen und
Vincent Rijmen. Es heisst seither **AES** (Advanced Encryption Standard).

So funktioniert AES im Groben:

- Die Daten werden in Blöcke von 128 Bit (16 Byte) zerlegt.
- Jeder Block durchläuft 10 bis 14 **Runden**. In jeder Runde werden Bytes ersetzt (wie bei
  einer Substitution), verschoben und vermischt, und der Block wird mit einem Teil des
  Schlüssels per XOR verknüpft.
- Nach wenigen Runden hängt jedes Bit des Geheimtexts von *jedem* Bit des Klartexts und des
  Schlüssels ab. Buchstabenhäufigkeiten oder Wiederholungen sind nicht mehr zu erkennen.
- Der Schlüssel ist 128, 192 oder 256 Bit lang.

AES schützt heute Ihr WLAN (WPA2/WPA3), jede HTTPS-Verbindung, Ihre Festplatte (BitLocker,
FileVault) und die Nachrichten in Messengern wie Signal, Threema oder WhatsApp. Da kein
Angriff bekannt ist, der wesentlich besser ist als Durchprobieren, hängt die Sicherheit an
der Grösse des Schlüsselraums.

## 3 · Rechenaufgaben zum Schlüsselraum

Nehmen Sie an, ein Angreifer probiert **eine Milliarde (10⁹) Schlüssel pro Sekunde** aus.
Ein Jahr hat rund 3,2 · 10⁷ Sekunden. Rechnen Sie mit dem Taschenrechner.

### Aufgabe 1 – Tabelle ergänzen

| Verfahren | Anzahl Schlüssel | Zeit für alle Schlüssel |
|---|---|---|
| Caesar | 26 | 26 Nanosekunden |
| Vigenère, Schlüsselwort mit 6 Buchstaben | 26⁶ = ______________ | ______________ |
| allgemeine Ersetzung (L2) | 26! ≈ 4 · 10²⁶ | ≈ 1,3 · 10¹⁰ Jahre |
| AES-128 | 2¹²⁸ ≈ 3,4 · 10³⁸ | ______________ Jahre |
| AES-256 | 2²⁵⁶ ≈ 1,2 · 10⁷⁷ | ______________ Jahre |

### Aufgabe 2 – Mit der ganzen Welt

Angenommen, eine Milliarde Computer probieren je eine Billion (10¹²) Schlüssel pro Sekunde.
Wie lange dauert es dann für AES-128? Vergleichen Sie mit dem Alter des Universums
(rund 1,4 · 10¹⁰ Jahre).

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 3 – Kerckhoffs bei AES *(früh fertig)*

Der AES-Algorithmus ist vollständig veröffentlicht – jede Person kann ihn nachlesen. Warum ist
das ein *Vorteil* und keine Schwäche? Denken Sie an Lektion 1 und an den Wettbewerb.

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 4 – Das verbleibende Problem *(früh fertig – kommt auch in der Besprechung)*

AES ist praktisch nicht zu knacken. Trotzdem können Sie mit AES allein keine geheime
Nachricht an einen Online-Shop schicken, bei dem Sie zum ersten Mal einkaufen. Warum nicht?

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

<div class="kasten" markdown="1">

**Und Quantencomputer?** Ein Quantencomputer könnte das Durchprobieren mit dem
Grover-Algorithmus etwa so beschleunigen, als wäre der Schlüssel nur halb so lang. AES-256
bliebe damit so sicher wie AES-128 heute – also weiterhin sicher. Für die asymmetrischen
Verfahren der nächsten Lektion sieht es anders aus (Lektion 6).

</div>
