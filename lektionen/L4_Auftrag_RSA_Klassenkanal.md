---
lektion: 4
zielgruppe: sus
art: auftrag
titel: "RSA im Klassenkanal"
kurz: "Eigenes Schlüsselpaar erzeugen, öffentlichen Schlüssel posten, geheime Nachrichten über einen Kanal austauschen, den alle lesen können."
reihenfolge: 20
---

# RSA im Klassenkanal

**Lektion 4 – Klassen-Experiment | ca. 25 Min.**

## Ziel

Sie erzeugen ein RSA-Schlüsselpaar und tauschen verschlüsselte Nachrichten über einen Kanal
aus, den alle mitlesen können. Sie wissen danach aus eigener Erfahrung, welcher Schlüssel
wofür gebraucht wird.

## Die Spielregeln

Im Teams-Kanal **«Verschlüsselung»** dürfen alle alles lesen. Sie stellen sich also vor, der
Kanal sei das Internet – und alle anderen könnten Eve sein.

## Schritt 1 – Schlüsselpaar erzeugen *(ca. 5 Min.)*

1. Klicken Sie im Werkzeug unten auf **«Zufällige Primzahlen wählen»**. Schauen Sie sich den
   Rechenweg an.
2. Notieren Sie Ihren **privaten Schlüssel** auf Papier: (d, n) = ________________________
   Er bleibt bei Ihnen – niemals posten!
3. Kopieren Sie Ihren **öffentlichen Schlüssel** und posten Sie ihn im Kanal, z. B.:
   *Öffentlicher Schlüssel von Lea: (17, 323663)*

## Schritt 2 – Eine Nachricht verschlüsseln *(ca. 7 Min.)*

1. Suchen Sie im Kanal den öffentlichen Schlüssel Ihrer Banknachbarin oder Ihres
   Banknachbarn und kopieren Sie ihn in Teil 2 des Werkzeugs.
2. Schreiben Sie eine kurze Nachricht (höchstens etwa 30 Zeichen, ohne Satzzeichen).
3. Posten Sie den Geheimtext im Kanal, z. B.: *An Lea: 214877 98012 301455 …*

## Schritt 3 – Entschlüsseln *(ca. 5 Min.)*

1. Suchen Sie im Kanal die Nachrichten, die an Sie gerichtet sind.
2. Kopieren Sie die Zahlen in Teil 3 des Werkzeugs. Ihr privater Schlüssel ist dort schon
   eingetragen (sonst von Ihrem Zettel abtippen).
3. Antworten Sie – natürlich verschlüsselt mit dem öffentlichen Schlüssel der Absenderin.

## Schritt 4 – Eve spielen *(ca. 3 Min.)*

Kopieren Sie eine Nachricht, die **nicht** an Sie gerichtet ist, und versuchen Sie, sie mit
Ihrem eigenen privaten Schlüssel zu entschlüsseln. Was passiert?

<div class="krypto" data-tool="rsa"></div>

## Fragen zum Experiment *(ca. 5 Min.)*

### Aufgabe 1 – Wer braucht was?

Ergänzen Sie: Um Lea eine Nachricht zu schicken, verschlüssle ich mit __________________.
Lea entschlüsselt mit __________________. Eve kennt __________________, kann die Nachricht
aber nicht lesen, weil __________________.

### Aufgabe 2 – Gleiche Nachricht, gleicher Geheimtext?

Verschlüsseln Sie zweimal hintereinander dieselbe Nachricht mit demselben öffentlichen
Schlüssel. Ist der Geheimtext gleich? Warum könnte das ein Problem sein?

<span class="fill-line breit"></span>

### Aufgabe 3 – Vertrauen

Im Kanal steht: *Öffentlicher Schlüssel von Lea: (17, 323663)*. Woher wissen Sie, dass dieser
Schlüssel wirklich von Lea stammt? Was könnte passieren, wenn ihn jemand anderes gepostet hat?

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

<div class="kasten" markdown="1">

**Grössenordnung:** Ihre Primzahlen haben drei Stellen, n hat sechs. Echte RSA-Schlüssel
verwenden Primzahlen mit über 300 Stellen; n hat dann 617 Dezimalstellen (2048 Bit).

**Alternative:** Dasselbe Experiment lässt sich mit dem
[RSA-Interactive von oinf.ch](https://oinf.ch/interactive/rsa/) durchführen (Codierung in Bits).

</div>
