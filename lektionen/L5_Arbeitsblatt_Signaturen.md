---
lektion: 5
zielgruppe: sus
art: arbeitsblatt
titel: "Digitale Signaturen"
kurz: "RSA umgedreht: mit dem privaten Schlüssel signieren, mit dem öffentlichen prüfen – im Werkzeug und als Ablaufschema."
reihenfolge: 20
---

# Digitale Signaturen

## Ziel

Sie beschreiben den Ablauf einer digitalen Signatur, erklären, welche Schutzziele sie sichert,
und erkennen, wo sie an ihre Grenzen stösst.

## Die Idee

Bei RSA kann jede Person mit dem öffentlichen Schlüssel verschlüsseln, aber nur die
Besitzerin des privaten Schlüssels entschlüsseln. Umgedreht entsteht etwas Neues: Nur Alice
kann mit **ihrem privaten Schlüssel** eine **Signatur** berechnen – und jede Person kann sie mit
**Alices öffentlichem Schlüssel** prüfen. Damit es schnell geht, signiert Alice nur den
**Hashwert** des Dokuments.

### Aufgabe 1 – Ablaufschema ergänzen

**Alice signiert:** Sie berechnet den
<span class="luecke" data-optionen="Hashwert;privaten;Signatur;öffentlichen;gleich;verändert" data-antwort="Hashwert"></span>
des Dokuments und daraus mit ihrem
<span class="luecke" data-optionen="Hashwert;privaten;Signatur;öffentlichen;gleich;verändert" data-antwort="privaten"></span>
Schlüssel die
<span class="luecke" data-optionen="Hashwert;privaten;Signatur;öffentlichen;gleich;verändert" data-antwort="Signatur"></span>.
Sie verschickt Dokument und Signatur.

**Bob prüft:** Er berechnet selbst den Hashwert des erhaltenen Dokuments und rechnet die
Signatur mit Alices
<span class="luecke" data-optionen="Hashwert;privaten;Signatur;öffentlichen;gleich;verändert" data-antwort="öffentlichen"></span>
Schlüssel zurück. Sind beide Werte
<span class="luecke" data-optionen="Hashwert;privaten;Signatur;öffentlichen;gleich;verändert" data-antwort="gleich"></span>,
ist die Signatur gültig. Sonst wurde das Dokument
<span class="luecke" data-optionen="Hashwert;privaten;Signatur;öffentlichen;gleich;verändert" data-antwort="verändert"></span>
oder die Signatur stammt nicht von Alice.

<div class="krypto" data-tool="signatur"></div>

### Aufgabe 2 – Fälschen

Ändern Sie bei Bob «20 Franken» in «200 Franken». Die Signatur ist dann
<span class="luecke" data-optionen="gültig;ungültig" data-antwort="ungültig"></span>.
Ändern Sie stattdessen eine Ziffer der Signatur: <span class="luecke" data-optionen="gültig;ungültig" data-antwort="ungültig"></span>.
Gesichert wird damit vor allem: <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Integrität" data-auch="Authentizität+Verbindlichkeit"></span>

### Aufgabe 3 – Der schlaue Angreifer

Eve erzeugt ein eigenes Schlüsselpaar (Knopf «Neues Schlüsselpaar erzeugen»), schreibt «Ich,
Alice, schulde Eve 500 Franken.», signiert mit *ihrem* privaten Schlüssel und schickt Bob alles
mit *ihrem* öffentlichen Schlüssel – «das ist der Schlüssel von Alice». Die Signatur ist
<span class="luecke" data-optionen="gültig;ungültig" data-antwort="gültig"></span>. Was fehlt Bob?

<div class="antwort" data-zeilen="2"></div>

### Aufgabe 4 – Verschlüsseln oder signieren?

| | Verschlüsseln | Signieren |
|---|---|---|
| Wer verwendet seinen *privaten* Schlüssel? | <span class="luecke" data-optionen="Absender;Empfänger;Prüfer" data-antwort="Empfänger"></span> | <span class="luecke" data-optionen="Absender;Empfänger;Prüfer" data-antwort="Absender"></span> |
| Wer verwendet einen *öffentlichen* Schlüssel? | <span class="luecke" data-optionen="Absender;Empfänger;Prüfer" data-antwort="Absender"></span> | <span class="luecke" data-optionen="Absender;Empfänger;Prüfer" data-antwort="Prüfer"></span> |
| Gesicherte Schutzziele | <span class="wahl" data-optionen="V;I;A;Vb" data-antwort="V"></span> | <span class="wahl" data-optionen="V;I;A;Vb" data-antwort="I+A+Vb"></span> |
| Kann Eve das Dokument lesen? | <span class="luecke" data-optionen="ja;nein" data-antwort="nein"></span> | <span class="luecke" data-optionen="ja;nein" data-antwort="ja"></span> |

*V = Vertraulichkeit, I = Integrität, A = Authentizität, Vb = Verbindlichkeit*

<div class="kasten" markdown="1">

**Rechtlich verbindlich:** In der Schweiz ist die *qualifizierte elektronische Signatur* der
handschriftlichen Unterschrift gleichgestellt (Gesetz über die elektronische Signatur, ZertES),
z. B. von Swisscom Trust Services oder SwissSign.

</div>
