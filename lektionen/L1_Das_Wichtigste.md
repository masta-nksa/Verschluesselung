---
lektion: 1
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Schutzziele und Caesar"
kurz: "Besprechung am Ende der Lektion und Lernzusammenfassung: Schutzziele, Fachbegriffe, Caesar, Kerckhoffs, Codierung"
reihenfolge: 80
---

# Das Wichtigste: Schutzziele und Caesar

## Lernziele dieser Lektion

Sie können …

- [ ] die Schutzziele Vertraulichkeit, Integrität, Authentizität und Verbindlichkeit an Beispielen erklären und unterscheiden
- [ ] die Fachbegriffe Klartext, Geheimtext, Algorithmus, Schlüssel, ver-/entschlüsseln und knacken korrekt verwenden
- [ ] Texte mit dem Caesar-Verfahren von Hand und mit dem Werkzeug ver- und entschlüsseln
- [ ] einen Caesar-Text ohne Schlüssel knacken und erklären, warum das so leicht geht
- [ ] erklären, was ein symmetrisches Verfahren ist
- [ ] das Prinzip von Kerckhoffs formulieren und begründen
- [ ] Codierung und Verschlüsselung unterscheiden

Haken Sie ab, was Sie sicher können. Wo es noch hapert, hilft die Zusammenfassung unten.

<div class="nur-online" markdown="1">

## Zum Besprechen

1. Welches Schutzziel sichert eine Verschlüsselung – und welche nicht?
2. Die Römer hielten das Caesar-Verfahren geheim. Warum war es trotzdem unsicher?
3. Ist Morsecode eine Verschlüsselung?

</div>

## Die vier Schutzziele

| Schutzziel | Leitfrage | Womit gesichert? |
|---|---|---|
| **Vertraulichkeit** | Können nur Berechtigte lesen? | Verschlüsselung (Lektionen 1–4) |
| **Integrität** | Ist der Inhalt unverändert? | Hashwert, Signatur (Lektion 5) |
| **Authentizität** | Stammt es wirklich vom angegebenen Absender? | Signatur, Zertifikat (Lektion 5) |
| **Verbindlichkeit** | Kann der Absender es nicht abstreiten? | Signatur (Lektion 5) |

**Merksatz:** Verschlüsselung allein sichert nur die Vertraulichkeit.

## Die Fachbegriffe

```
klartext ──verschlüsseln──▶ GEHEIMTEXT ──entschlüsseln──▶ klartext
          (Algorithmus +                (Algorithmus +
           Schlüssel)                    Schlüssel)
                                 │
                       Eve: knacken (ohne Schlüssel)
```

- Der **Algorithmus** ist die Rechenvorschrift (z. B. «verschiebe jeden Buchstaben»).
- Der **Schlüssel** ist das Geheimnis, das den Algorithmus steuert (z. B. «um 3»).
- Bei Caesar dient derselbe Schlüssel zum Ver- und Entschlüsseln: Das Verfahren ist
  **symmetrisch**.

## Caesar und das Durchprobieren

Caesar verschiebt jeden Buchstaben um eine feste Zahl. Es gibt nur 26 Schlüssel – wer das
Verfahren kennt, probiert sie in Sekunden alle durch (**Brute Force**).

**Merksatz:** Ein kleiner Schlüsselraum lässt sich durchprobieren.

## Das Prinzip von Kerckhoffs

**Merksatz:** Ein Verfahren muss auch dann sicher sein, wenn der Gegner es kennt. Geheim ist
nur der Schlüssel.

Warum? Verfahren stecken in Geräten und Programmen, die man untersuchen kann. Viele Menschen
kennen sie, ein einziger Verrat genügt. Und nur ein öffentliches Verfahren kann von vielen
Fachleuten auf Schwächen geprüft werden. Das Gegenteil – sich auf ein geheimes Verfahren zu
verlassen – nennt man *Security by Obscurity*.

## Codierung ist keine Verschlüsselung

Morsecode, Brailleschrift oder ASCII ersetzen ebenfalls Zeichen durch andere Zeichen. Aber sie
haben **keinen Schlüssel**: Die Tabelle ist öffentlich und für alle gleich. Eine Codierung dient
der Darstellung, nicht der Geheimhaltung.
