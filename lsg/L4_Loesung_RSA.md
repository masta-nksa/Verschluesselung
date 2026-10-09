---
lektion: 4
titel: "Musterlösung: Asymmetrische Verschlüsselung und RSA"
kurz: "Vergleichstabelle, Einwegfunktionen, RSA-Beispiel und Fragen zum Klassen-Experiment"
---

# Musterlösung: Asymmetrische Verschlüsselung und RSA

## Input

**Aufgabe 1 – Vergleich** (eigene Formulierungen sind erwünscht):

| | symmetrisch | asymmetrisch |
|---|---|---|
| Anzahl Schlüssel | einer, für beide Richtungen | ein Schlüsselpaar pro Empfänger/in |
| Wer kennt welchen Schlüssel? | Sender und Empfänger kennen denselben geheimen Schlüssel | alle kennen den öffentlichen, nur der Empfänger den privaten |
| Schlüsselaustausch | muss vorher geheim erfolgen – das Problem | entfällt; der öffentliche Schlüssel darf offen verschickt werden |
| Geschwindigkeit | sehr schnell | rund 1000-mal langsamer |
| Beispiele | Caesar, Vigenère, AES | RSA, Diffie-Hellman, ML-KEM |

**Aufgabe 2 – Einwegfunktionen:**
1. 19 · 31 = **589** (wenige Sekunden).
2. 731 = **17 · 43** (man muss Teiler durchprobieren: 2, 3, 5, 7, 11, 13, 17 ✓ – dauert deutlich länger).
3. 4³ = 64 = 2 · 29 + 6 → **6**.
4. **x = 26** (26³ = 17 576 = 606 · 29 + 2). Ohne Zusatzwissen bleibt nur Durchprobieren von x = 0, 1, 2, …

**Früh fertig:** m = 2: 2³ = 8, 8 mod 55 = **8**, also c = 8. Entschlüsseln: 8²⁷ mod 55 = 2 ✓.

## RSA im Klassenkanal

**Aufgabe 1:** Um Lea eine Nachricht zu schicken, verschlüssle ich mit **Leas öffentlichem
Schlüssel**. Lea entschlüsselt mit **ihrem privaten Schlüssel**. Eve kennt **den öffentlichen
Schlüssel und den Geheimtext**, kann die Nachricht aber nicht lesen, weil **sie den privaten
Schlüssel nicht hat und ihn nur durch Faktorisieren von n berechnen könnte**.

**Schritt 4 (Eve spielen):** Mit dem falschen privaten Schlüssel entsteht Zeichensalat oder
«?» – die Zahlen ergeben keinen sinnvollen Text.

**Aufgabe 2:** Ja, der Geheimtext ist jedes Mal derselbe (RSA ohne Zusatz ist
*deterministisch*). Eve erkennt dadurch, wenn dieselbe Nachricht mehrmals gesendet wird, und
kann kurze Nachrichten erraten: Sie verschlüsselt selbst «ja» und «nein» mit dem öffentlichen
Schlüssel und vergleicht. Echtes RSA mischt deshalb Zufallsbits in die Nachricht (*Padding*).

**Aufgabe 3:** Gar nicht – jede Person hätte den Schlüssel unter Leas Namen posten können.
Dann würde sie alle Nachrichten an «Lea» lesen und könnte sie, mit Leas echtem Schlüssel neu
verschlüsselt, unbemerkt weiterleiten (*Man-in-the-Middle*). Die Lösung sind Zertifikate
(Lektion 5).
