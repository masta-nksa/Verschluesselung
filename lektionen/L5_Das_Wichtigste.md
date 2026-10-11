---
lektion: 5
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Hashfunktionen, Signaturen und Zertifikate"
kurz: "Besprechung am Ende der Lektion und Lernzusammenfassung: Eigenschaften von Hashfunktionen, Signaturablauf, Zertifikat und Vertrauenskette"
reihenfolge: 80
---

# Das Wichtigste: Hashfunktionen, Signaturen und Zertifikate

## Lernziele dieser Lektion

Sie können …

- [ ] die Eigenschaften einer kryptografischen Hashfunktion nennen und Anwendungen beschreiben
- [ ] den Ablauf einer digitalen Signatur skizzieren und erklären, welche Schutzziele sie sichert
- [ ] Verschlüsseln und Signieren vergleichen
- [ ] erklären, was ein Zertifikat bestätigt, welche Aufgabe eine CA hat und wie die Vertrauenskette aufgebaut ist
- [ ] ein Zertifikat im Browser finden und lesen

Haken Sie ab, was Sie sicher können. Wo es noch hapert, hilft die Zusammenfassung unten.

<div class="nur-online" markdown="1">

## Zum Besprechen

1. Was ist der Unterschied zwischen *verschlüsseln* und *signieren*?
2. Warum signiert man den Hashwert und nicht das ganze Dokument?
3. Woher weiss Ihr Browser, dass er wirklich mit Ihrer Bank spricht?

</div>

## Hashfunktionen

Eine Hashfunktion berechnet aus beliebigen Daten einen «Fingerabdruck» fester Länge
(SHA-256: 256 Bit = 64 Hexziffern).

| Eigenschaft | Bedeutung |
|---|---|
| feste Länge | ob ein Wort oder ein Film: der Hashwert ist immer gleich lang |
| deterministisch | gleiche Eingabe → gleicher Hashwert |
| Lawineneffekt | eine winzige Änderung ändert rund die Hälfte aller Bits |
| Einwegfunktion | aus dem Hashwert kann man die Eingabe nicht zurückrechnen (nur raten) |
| kollisionsresistent | praktisch unmöglich, zwei Eingaben mit gleichem Hashwert zu finden |

Anwendungen: Downloads prüfen, Passwörter speichern (mit Salt und langsamen Hashfunktionen),
Signaturen. MD5 und SHA-1 gelten als gebrochen.

## Die digitale Signatur

Alice **signiert** und verschickt Dokument und Signatur:

<div class="ablauf" role="group" aria-label="Schema: Alice berechnet mit der Hashfunktion den Hashwert h des Dokuments und daraus mit ihrem privaten Schlüssel die Signatur.">
<div class="ablauf-knoten"><b>Dokument</b></div>
<div class="ablauf-schritt"><b>Hashfunktion</b></div>
<div class="ablauf-knoten"><b>Hashwert h</b></div>
<div class="ablauf-schritt"><b>signieren</b><span>mit Alices <strong>privatem</strong> Schlüssel</span></div>
<div class="ablauf-knoten"><b>Signatur</b></div>
</div>

Bob **prüft**: Sind h<sub>1</sub> und h<sub>2</sub> gleich, ist die Signatur gültig. Sonst wurde
das Dokument verändert oder die Signatur gefälscht.

<div class="ablauf ablauf-paar" role="group" aria-label="Schema: Bob berechnet mit der Hashfunktion den Hashwert h1 des erhaltenen Dokuments. Die Signatur rechnet er mit Alices öffentlichem Schlüssel zurück zum Hashwert h2. Dann vergleicht er h1 und h2.">
<div class="ablauf-knoten"><b>Dokument</b></div>
<div class="ablauf-schritt"><b>Hashfunktion</b></div>
<div class="ablauf-knoten"><b>Hashwert h<sub>1</sub></b></div>
<div class="ablauf-vergleich">= ?</div>
<div class="ablauf-knoten"><b>Signatur</b></div>
<div class="ablauf-schritt"><b>zurückrechnen</b><span>mit Alices <strong>öffentlichem</strong> Schlüssel</span></div>
<div class="ablauf-knoten"><b>Hashwert h<sub>2</sub></b></div>
</div>

Man signiert den Hashwert, weil er kurz ist (asymmetrische Verfahren sind langsam) und trotzdem
jede Änderung am Dokument verrät.

| | Verschlüsseln | Signieren |
|---|---|---|
| privater Schlüssel benutzt von | Empfänger (entschlüsseln) | Absender (signieren) |
| öffentlicher Schlüssel benutzt von | Absender | Prüfer |
| sichert | Vertraulichkeit | Integrität, Authentizität, Verbindlichkeit |

**Merksatz:** Eine Signatur macht ein Dokument nicht geheim – sie macht es fälschungssicher.

## Zertifikate und Vertrauenskette

Eine Signatur ist nur so viel wert wie die Gewissheit, dass der öffentliche Schlüssel der
richtigen Person gehört. Ein **Zertifikat** enthält den öffentlichen Schlüssel, den Namen
(z. B. *www.ubs.com*) und eine Gültigkeitsdauer – signiert von einer **Zertifizierungsstelle
(CA)**.

<div class="ablauf" role="group" aria-label="Schema der Vertrauenskette: Das Root-Zertifikat ist im Browser vorinstalliert. Es signiert das Zwischenzertifikat der CA, dieses signiert das Zertifikat der Website.">
<div class="ablauf-knoten"><b>Root-Zertifikat</b><span>im Browser vorinstalliert</span></div>
<div class="ablauf-schritt"><b>signiert</b></div>
<div class="ablauf-knoten"><b>Zwischenzertifikat</b><span>der CA</span></div>
<div class="ablauf-schritt"><b>signiert</b></div>
<div class="ablauf-knoten"><b>Zertifikat</b><span>der Website</span></div>
</div>

Seit März 2026 gelten Zertifikate höchstens 200 Tage, ab 2029 nur noch 47 Tage. Warnt der
Browser (abgelaufen, falscher Name, unbekannte CA): nicht weiterklicken.

**Merksatz:** Zertifikat = öffentlicher Schlüssel + Name, signiert von einer CA, der der Browser
vertraut.

## Das Gesamtbild

**Merksatz:** Verschlüsselung sichert die Vertraulichkeit, Hashwert und Signatur die Integrität,
Signatur plus Zertifikat die Authentizität, die Signatur die Verbindlichkeit (vgl. die
Schutzziel-Tabelle aus Lektion 1).
