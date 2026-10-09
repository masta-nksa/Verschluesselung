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

## Zum Besprechen

1. Was ist der Unterschied zwischen *verschlüsseln* und *signieren*?
2. Warum signiert man den Hashwert und nicht das ganze Dokument?
3. Woher weiss Ihr Browser, dass er wirklich mit Ihrer Bank spricht?

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

```
Alice:  Dokument ──Hash──▶ h ──mit Alices PRIVATEM Schlüssel──▶ Signatur
        verschickt Dokument + Signatur

Bob:    Dokument ──Hash──▶ h₁
        Signatur ──mit Alices ÖFFENTLICHEM Schlüssel──▶ h₂
        h₁ = h₂ ?  → gültig : verändert oder gefälscht
```

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

```
Root-Zertifikat (im Browser vorinstalliert)
   └─ signiert ─▶ Zwischenzertifikat der CA
                     └─ signiert ─▶ Zertifikat der Website
```

Seit März 2026 gelten Zertifikate höchstens 200 Tage, ab 2029 nur noch 47 Tage. Warnt der
Browser (abgelaufen, falscher Name, unbekannte CA): nicht weiterklicken.

**Merksatz:** Zertifikat = öffentlicher Schlüssel + Name, signiert von einer CA, der der Browser
vertraut.

## Das Gesamtbild

**Merksatz:** Verschlüsselung sichert die Vertraulichkeit, Hashwert und Signatur die Integrität,
Signatur plus Zertifikat die Authentizität, die Signatur die Verbindlichkeit (vgl. die
Schutzziel-Tabelle aus Lektion 1).
