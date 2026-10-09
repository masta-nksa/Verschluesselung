---
lektion: 4
zielgruppe: sus
art: auftrag
titel: "RSA im Klassenkanal"
kurz: "Eigenes Schlüsselpaar erzeugen, öffentlichen Schlüssel posten, geheime Nachrichten über einen Kanal austauschen, den alle lesen können."
reihenfolge: 20
---

# RSA im Klassenkanal

## Ziel

Sie erzeugen ein RSA-Schlüsselpaar und tauschen verschlüsselte Nachrichten über einen Kanal
aus, den alle mitlesen können. Sie wissen danach aus eigener Erfahrung, welcher Schlüssel
wofür gebraucht wird.

**Spielregel:** Im Teams-Kanal **«Verschlüsselung»** dürfen alle alles lesen. Der Kanal ist
das Internet – und alle anderen könnten Eve sein.

1. **Schlüsselpaar erzeugen** *(5 Min.)* – Im Werkzeug auf **«Zufällige Primzahlen wählen»**
   klicken und den Rechenweg anschauen. Notieren Sie Ihren **privaten Schlüssel**:
   (d, n) = <span class="luecke" data-breite="18"></span> – niemals posten! Posten Sie den
   **öffentlichen Schlüssel**, z. B. *Öffentlicher Schlüssel von Lea: (17, 323663)*.
2. **Verschlüsseln** *(7 Min.)* – Öffentlichen Schlüssel Ihrer Banknachbarin aus dem Kanal in
   Teil 2 kopieren, kurze Nachricht schreiben (höchstens 30 Zeichen, ohne Satzzeichen), den
   Geheimtext posten: *An Lea: 214877 98012 301455 …*
3. **Entschlüsseln** *(5 Min.)* – Die Zahlen einer Nachricht an Sie in Teil 3 kopieren (Ihr
   privater Schlüssel ist dort eingetragen) und verschlüsselt antworten.
4. **Eve spielen** *(3 Min.)* – Eine Nachricht, die **nicht** an Sie gerichtet ist, mit Ihrem
   eigenen privaten Schlüssel entschlüsseln. Was passiert?

<div class="krypto" data-tool="rsa"></div>

## Fragen zum Experiment

### Aufgabe 1 – Wer braucht was?

Um Lea eine Nachricht zu schicken, verschlüssle ich mit
<span class="luecke" data-optionen="Leas öffentlichem Schlüssel;Leas privatem Schlüssel;meinem öffentlichen Schlüssel;meinem privaten Schlüssel" data-antwort="Leas öffentlichem Schlüssel"></span>.
Lea entschlüsselt mit
<span class="luecke" data-optionen="ihrem privaten Schlüssel;ihrem öffentlichen Schlüssel;meinem öffentlichen Schlüssel" data-antwort="ihrem privaten Schlüssel"></span>.
Eve kennt
<span class="luecke" data-optionen="den öffentlichen Schlüssel und den Geheimtext;den privaten Schlüssel;den Klartext" data-antwort="den öffentlichen Schlüssel und den Geheimtext"></span>,
kann die Nachricht aber nicht lesen, weil
<span class="luecke" data-optionen="sie dafür n faktorisieren müsste;der Geheimtext zu lang ist;RSA geheim gehalten wird" data-antwort="sie dafür n faktorisieren müsste"></span>.

### Aufgabe 2 – Gleiche Nachricht, gleicher Geheimtext?

Verschlüsseln Sie zweimal dieselbe Nachricht mit demselben öffentlichen Schlüssel. Ist der
Geheimtext gleich? <span class="luecke" data-optionen="ja;nein" data-antwort="ja"></span>
Warum könnte das ein Problem sein?

<div class="antwort" data-zeilen="1"></div>

### Aufgabe 3 – Vertrauen

Woher wissen Sie, dass der Schlüssel «von Lea» im Kanal wirklich von Lea stammt? Was könnte
passieren, wenn ihn jemand anderes gepostet hat?

<div class="antwort" data-zeilen="2"></div>

<div class="kasten" markdown="1">

**Grössenordnung:** Ihre Primzahlen haben drei Stellen, n hat sechs. Echte RSA-Schlüssel
verwenden Primzahlen mit über 300 Stellen; n hat dann 617 Dezimalstellen (2048 Bit).
Alternative zum Werkzeug: [RSA-Interactive von oinf.ch](https://oinf.ch/interactive/rsa/).

</div>
