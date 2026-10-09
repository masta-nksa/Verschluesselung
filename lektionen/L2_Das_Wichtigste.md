---
lektion: 2
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Häufigkeitsanalyse und Vigenère"
kurz: "Besprechung am Ende der Lektion und Lernzusammenfassung: mono- und polyalphabetisch, Schlüsselraum, Häufigkeitsanalyse, Vigenère"
reihenfolge: 80
---

# Das Wichtigste: Häufigkeitsanalyse und Vigenère

## Lernziele dieser Lektion

Sie können …

- [ ] erklären, was eine monoalphabetische Verschlüsselung ist, und Beispiele nennen
- [ ] eine monoalphabetische Verschlüsselung mit einer Häufigkeitsanalyse knacken
- [ ] begründen, warum ein grosser Schlüsselraum allein keine Sicherheit garantiert
- [ ] mono- und polyalphabetische Verfahren unterscheiden
- [ ] mit dem Vigenère-Quadrat von Hand ver- und entschlüsseln

Haken Sie ab, was Sie sicher können. Wo es noch hapert, hilft die Zusammenfassung unten.

<div class="nur-online" markdown="1">

## Zum Besprechen

1. Die allgemeine Ersetzung hat rund 4 · 10²⁶ Schlüssel. Warum haben Sie den Brief trotzdem in
   20 Minuten geknackt?
2. Was unterscheidet Vigenère grundsätzlich von Caesar?
3. Vigenère galt 300 Jahre als unknackbar. Haben Sie eine Idee, wo die Schwachstelle liegt?

</div>

## Monoalphabetische Verschlüsselung

Jeder Klartextbuchstabe wird **immer durch dasselbe Zeichen** ersetzt. Caesar ist ein
Spezialfall (Verschiebung), die allgemeine Ersetzung erlaubt jede beliebige Zuordnung.

| Verfahren | Anzahl Schlüssel | Durchprobieren? |
|---|---|---|
| Caesar | 26 | sofort |
| allgemeine Ersetzung | 26! ≈ 4 · 10²⁶ | unmöglich (≈ 13 Mrd. Jahre bei 10⁹/s) |

## Die Häufigkeitsanalyse

Im Deutschen sind die Buchstaben sehr ungleich verteilt:

| e | n | i | s | r | a | t | d | h | u |
|---|---|---|---|---|---|---|---|---|---|
| 17 % | 10 % | 8 % | 7 % | 7 % | 7 % | 6 % | 5 % | 5 % | 4 % |

Bei einer monoalphabetischen Verschlüsselung bleiben diese Häufigkeiten erhalten – sie gehören
nur zu anderen Zeichen. Der häufigste Geheimbuchstabe ist also vermutlich ein e. Dazu helfen
häufige Wörter (*der, die, und*) und Buchstabenfolgen (*sch, ch, ei*). So findet man den
Schlüssel Buchstabe für Buchstabe, statt alle Schlüssel durchzuprobieren.

**Merksatz:** Ein grosser Schlüsselraum ist notwendig, aber nicht hinreichend. Solange Muster
der Sprache im Geheimtext sichtbar bleiben, ist ein Verfahren angreifbar.

## Polyalphabetische Verschlüsselung: Vigenère

Mehrere Alphabete werden abwechselnd verwendet. Bei Vigenère bestimmt ein **Schlüsselwort**
die Verschiebungen (A = 0, B = 1, … Z = 25):

| Klartext | j | a | n | u | a | r |
|---|---|---|---|---|---|---|
| Schlüssel | N | K | S | A | N | K |
| Geheimtext | W | K | F | U | N | B |

Derselbe Klartextbuchstabe (hier das a) wird zu verschiedenen Geheimtextbuchstaben (K und N).
Die Häufigkeiten verwischen; die einfache Häufigkeitsanalyse findet kein klares e mehr.

**Merksatz:** Polyalphabetische Verfahren verwischen die Buchstabenhäufigkeiten. Ihre
Schwachstelle: Das Schlüsselwort wiederholt sich (→ Lektion 3).
