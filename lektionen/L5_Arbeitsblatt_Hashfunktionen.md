---
lektion: 5
zielgruppe: sus
art: arbeitsblatt
titel: "Hashfunktionen: der digitale Fingerabdruck"
kurz: "Mit dem SHA-256-Werkzeug die Eigenschaften einer Hashfunktion herausfinden – und warum Passwörter als Hash gespeichert werden."
reihenfolge: 10
---

# Hashfunktionen: der digitale Fingerabdruck

## Ziel

Sie nennen die Eigenschaften einer kryptografischen Hashfunktion, weisen sie mit dem Werkzeug
nach und kennen Anwendungen davon.

## Die Idee

Eine **Hashfunktion** berechnet aus beliebigen Daten – einem Wort, einem Vertrag, einem Film –
einen kurzen Wert fester Länge, den **Hashwert**: eine Art Fingerabdruck. Die verbreitetste
heisst **SHA-256**; sie liefert immer 256 Bit, geschrieben als 64 Hexadezimalziffern.

<div class="krypto" data-tool="sha256"></div>

### Aufgabe 1 – Eigenschaften herausfinden

Führen Sie die Experimente durch und wählen Sie die passende Eigenschaft.

| Experiment | Eigenschaft |
|---|---|
| a) Hashen Sie «a» und danach einen langen Absatz. Vergleichen Sie die Länge der Hashwerte. | <span class="luecke" data-optionen="feste Länge;deterministisch;Lawineneffekt;Einwegfunktion" data-antwort="feste Länge"></span> |
| b) Hashen Sie denselben Text zweimal. | <span class="luecke" data-optionen="feste Länge;deterministisch;Lawineneffekt;Einwegfunktion" data-antwort="deterministisch"></span> |
| c) Ändern Sie in Text B nur ein Zeichen. Wie viele der 256 Bits ändern sich ungefähr? <span class="luecke" data-typ="groesse" data-toleranz="0.2" data-antwort="128" data-breite="5"></span> | <span class="luecke" data-optionen="feste Länge;deterministisch;Lawineneffekt;Einwegfunktion" data-antwort="Lawineneffekt"></span> |
| d) `f5538dfab339f14dd4564c7a733475ed5a74e55a5b33cc8846f72520b2c4a6b1` gehört zu einem Tier (deutsch, klein geschrieben). Rückrechnen geht nicht – finden Sie es trotzdem: <span class="luecke" data-antwort="pinguin" data-breite="12"></span> | <span class="luecke" data-optionen="feste Länge;deterministisch;Lawineneffekt;Einwegfunktion" data-antwort="Einwegfunktion"></span> |

### Aufgabe 2 – Kollisionen

Es gibt unendlich viele Texte, aber «nur» 2²⁵⁶ ≈ 10⁷⁷ Hashwerte – also muss es verschiedene
Texte mit gleichem Hashwert geben (**Kollision**). Warum ist das trotzdem kein praktisches
Problem? (Tipp: Schlüsselraum von AES.)

<div class="antwort" data-loesung="Um zwei Texte mit gleichem SHA-256-Wert zu finden, müsste man rund 2¹²⁸ ≈ 3,4 · 10³⁸ Hashwerte berechnen – so viele, wie AES-128 Schlüssel hat. Kollisionen existieren also, aber niemand kann sie finden (Kollisionsresistenz)." data-zeilen="2"></div>

### Aufgabe 3 – Wofür braucht man das?

Welches Schutzziel sichert der Hashwert jeweils?

| Anwendung | Schutzziel |
|---|---|
| Neben einer Download-Datei steht ihr SHA-256-Wert. Nach dem Download vergleichen Sie. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Integrität"></span> |
| Eine Website speichert nur den Hashwert Ihres Passworts und vergleicht beim Anmelden. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Vertraulichkeit"></span> |
| Bei einer digitalen Signatur wird der Hashwert des Dokuments signiert. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Integrität+Authentizität+Verbindlichkeit"></span> |

<div class="kasten" markdown="1">

**Passwörter richtig speichern:** Aufgabe 1d zeigt das Problem – kurze oder häufige Passwörter
findet man durch Ausprobieren. Websites hängen darum eine zufällige Zeichenfolge an (*Salt*) und
verwenden absichtlich langsame Hashfunktionen wie *Argon2*. MD5 und SHA-1 gelten als gebrochen.

</div>
