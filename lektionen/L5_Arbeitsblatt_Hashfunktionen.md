---
lektion: 5
zielgruppe: sus
art: arbeitsblatt
titel: "Hashfunktionen: der digitale Fingerabdruck"
kurz: "Mit dem SHA-256-Werkzeug die Eigenschaften einer Hashfunktion herausfinden – und warum Passwörter als Hash gespeichert werden."
reihenfolge: 10
---

# Hashfunktionen: der digitale Fingerabdruck

**Lektion 5 – Partnerarbeit | ca. 8 Min.**

## Ziel

Sie nennen die Eigenschaften einer kryptografischen Hashfunktion, weisen sie mit dem Werkzeug
nach und kennen Anwendungen davon.

## Die Idee

Eine **Hashfunktion** berechnet aus beliebigen Daten – einem Wort, einem Vertrag, einem
ganzen Film – einen kurzen Wert fester Länge, den **Hashwert**. Er ist eine Art
Fingerabdruck der Daten. Die heute verbreitetste Hashfunktion heisst **SHA-256**: Sie liefert
immer 256 Bit, geschrieben als 64 Hexadezimalziffern.

<div class="krypto" data-tool="sha256"></div>

### Aufgabe 1 – Eigenschaften herausfinden

Führen Sie die Experimente durch und notieren Sie jeweils die Eigenschaft in einem Satz.

| Experiment | Beobachtung → Eigenschaft |
|---|---|
| a) Hashen Sie «a» und danach einen langen Absatz aus einem beliebigen Text. Vergleichen Sie die Länge der Hashwerte. | |
| b) Hashen Sie denselben Text zweimal. | |
| c) Ändern Sie in Text B nur ein Zeichen (z. B. Punkt → Ausrufezeichen). Wie viele Bits ändern sich? | |
| d) Der Hashwert `f5538dfab339f14dd4564c7a733475ed5a74e55a5b33cc8846f72520b2c4a6b1` gehört zu einem Tier (deutsch, klein geschrieben). Kann man aus dem Hashwert direkt zurückrechnen? Wie finden Sie das Tier trotzdem? | |

### Aufgabe 2 – Kollisionen

Es gibt unendlich viele mögliche Texte, aber «nur» 2²⁵⁶ ≈ 10⁷⁷ Hashwerte. Also muss es
verschiedene Texte mit gleichem Hashwert geben (eine **Kollision**). Warum ist das trotzdem
kein praktisches Problem? (Tipp: Vergleichen Sie mit dem Schlüsselraum von AES.)

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 3 – Wofür braucht man das?

Ordnen Sie jeder Anwendung das Schutzziel zu, das der Hashwert dort sichert.

| Anwendung | Schutzziel |
|---|---|
| Auf einer Download-Seite steht neben der Datei ihr SHA-256-Wert. Nach dem Download vergleichen Sie. | |
| Eine Website speichert nicht Ihr Passwort, sondern nur dessen Hashwert. Beim Anmelden wird Ihre Eingabe gehasht und verglichen. | |
| Bei einer digitalen Signatur wird nicht das ganze Dokument, sondern sein Hashwert signiert (gleich anschliessend). | |

<div class="kasten" markdown="1">

**Passwörter richtig speichern:** Aufgabe 1d zeigt das Problem: Kurze oder häufige Passwörter
findet man durch Ausprobieren, sogar mit vorberechneten Tabellen. Websites hängen darum vor
dem Hashen eine zufällige Zeichenfolge an (*Salt*) und verwenden absichtlich langsame
Hashfunktionen wie *Argon2* oder *bcrypt*. Lange Passwörter oder – noch besser – Passkeys
(Lektion 6) bleiben trotzdem die beste Verteidigung.

**Nicht mehr verwenden:** Die älteren Hashfunktionen MD5 und SHA-1 gelten als gebrochen –
für beide wurden Kollisionen gefunden (SHA-1: 2017).

</div>
