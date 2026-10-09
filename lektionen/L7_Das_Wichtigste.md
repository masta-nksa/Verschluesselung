---
lektion: 7
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Wie sicher ist RSA? Verschlüsselung und Überwachung"
kurz: "Besprechung am Ende der Lektion und Lernzusammenfassung: RSA knacken, Aufwand, Padding, Argumente der Debatte"
reihenfolge: 80
---

# Das Wichtigste: Wie sicher ist RSA? Verschlüsselung und Überwachung

## Lernziele dieser Lektion

Sie können …

- [ ] RSA mit kleinen Zahlen knacken und das Vorgehen beschreiben
- [ ] erklären, wie der Aufwand mit der Schlüssellänge wächst
- [ ] erklären, warum Textbook-RSA angreifbar ist und wozu Padding dient
- [ ] je zwei Argumente für und gegen staatlichen Zugriff auf verschlüsselte Kommunikation nennen

Haken Sie ab, was Sie sicher können. Wo es noch hapert, hilft die Zusammenfassung unten.

<div class="nur-online" markdown="1">

## Zum Besprechen

1. Wie knackt man RSA – und warum gelingt das bei echten Schlüsseln nicht?
2. Warum braucht echtes RSA ein zufälliges «Padding»?
3. Welches Argument aus der Debatte hat Sie am meisten überzeugt?

</div>

## RSA knacken

1. n in p und q zerlegen (faktorisieren)
2. φ = (p − 1)(q − 1) berechnen
3. d mit (e · d) mod φ = 1 bestimmen
4. m = cᵈ mod n

Bei der Probedivision braucht man bis zu √n Versuche. Jede zusätzliche Stelle von n verlängert
das um den Faktor 3. Bei RSA-2048 (617 Stellen) wären es rund 10³⁰⁸ Versuche – 10²⁹² Jahre.
Bessere Verfahren (Zahlkörpersieb) schafften 2020 eine 250-stellige Zahl mit rund 2700
Prozessorjahren; RSA-2048 bleibt ausser Reichweite. Gefährlich wären erst grosse
Quantencomputer (Shor-Algorithmus).

**Merksatz:** Die Sicherheit von RSA wächst exponentiell mit der Schlüssellänge – solange niemand
ein schnelles Faktorisierungsverfahren findet.

## Textbook-RSA ist angreifbar

Ohne Zusatz ergibt dieselbe Nachricht immer denselben Geheimtext (1ᵉ = 1, 0ᵉ = 0). Eve kann
dann Blöcke wiedererkennen, Häufigkeiten auswerten oder kurze Nachrichten selbst verschlüsseln
und vergleichen. Echtes RSA mischt darum vor dem Verschlüsseln **Zufallsbits** in die Nachricht
(*Padding*, z. B. OAEP).

## Verschlüsselung und Überwachung

| Pro Zugriff für Behörden | Contra |
|---|---|
| Ermittlungen gegen schwere Kriminalität (Missbrauch, Terror) werden möglich | Eine Hintertür «nur für die Guten» gibt es nicht – sie kann gestohlen oder missbraucht werden |
| Früher durfte man Telefone mit richterlicher Bewilligung abhören | Automatisches Scannen erzeugt viele Fehlalarme und kann ausgeweitet werden |
| Opferschutz ist ein Grundrecht | Privatsphäre ist ein Grundrecht (Art. 13 BV); Vertrauen und Wirtschaftsstandort leiden |

Wichtig für die Debatte: Wer das **Endgerät** kontrolliert, muss die Verschlüsselung gar nicht
brechen (gezieltes Hacken, in der Schweiz bei schweren Straftaten erlaubt). Und **Metadaten**
sind auch bei Ende-zu-Ende-Verschlüsselung sichtbar.
