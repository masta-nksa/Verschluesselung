---
lektion: 5
zielgruppe: sus
art: arbeitsblatt
titel: "Digitale Signaturen"
kurz: "RSA umgedreht: mit dem privaten Schlüssel signieren, mit dem öffentlichen prüfen – im Werkzeug und als Ablaufschema."
reihenfolge: 20
---

# Digitale Signaturen

**Lektion 5 – Einzel- oder Partnerarbeit | ca. 12 Min.**

## Ziel

Sie beschreiben den Ablauf einer digitalen Signatur, erklären, welche Schutzziele sie sichert,
und erkennen, wo sie an ihre Grenzen stösst.

## Die Idee

Bei RSA kann jede Person mit dem öffentlichen Schlüssel verschlüsseln, aber nur die
Besitzerin des privaten Schlüssels entschlüsseln. Dreht man das um, entsteht etwas Neues:

- Nur Alice kann mit **ihrem privaten Schlüssel** etwas berechnen – das ist die **Signatur**.
- Jede Person kann mit **Alices öffentlichem Schlüssel** prüfen, ob die Signatur passt.

Damit es schnell geht, signiert Alice nicht das ganze Dokument, sondern nur seinen
**Hashwert**.

## Der Ablauf

### Aufgabe 1 – Ablaufschema ergänzen

Setzen Sie ein: *Hashwert, privaten, öffentlichen, Signatur, gleich, verändert*.

**Alice signiert:**

1. Alice berechnet den ________________ des Dokuments.
2. Sie berechnet daraus mit ihrem ________________ Schlüssel die ________________.
3. Sie verschickt das Dokument zusammen mit der Signatur.

**Bob prüft:**

1. Bob berechnet selbst den Hashwert des erhaltenen Dokuments.
2. Er rechnet die Signatur mit Alices ________________ Schlüssel zurück.
3. Sind beide Werte ________________, ist die Signatur gültig. Sonst wurde das Dokument
   ________________ oder die Signatur stammt nicht von Alice.

## Ausprobieren

<div class="krypto" data-tool="signatur"></div>

### Aufgabe 2 – Fälschen

1. Ändern Sie bei Bob im Dokument «20 Franken» in «200 Franken». Was meldet das Werkzeug?
2. Ändern Sie stattdessen eine einzige Ziffer der Signatur. Was passiert?
3. Welches Schutzziel wird damit gesichert?

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 3 – Der schlaue Angreifer

Eve erzeugt ein eigenes Schlüsselpaar, schreibt «Ich, Alice, schulde Eve 500 Franken.»,
signiert es mit *ihrem* privaten Schlüssel und schickt Bob Dokument, Signatur und *ihren*
öffentlichen Schlüssel – mit dem Hinweis «Das ist der Schlüssel von Alice».
Probieren Sie es aus (Knopf «Neues Schlüsselpaar»). Ist die Signatur gültig? Was fehlt Bob?

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 4 – Verschlüsseln oder signieren?

| | Verschlüsseln | Signieren |
|---|---|---|
| Wer verwendet seinen *privaten* Schlüssel? | | |
| Wer verwendet einen *öffentlichen* Schlüssel? | | |
| Gesicherte Schutzziele | | |
| Kann Eve das Dokument lesen? | | |

<div class="kasten" markdown="1">

**Rechtlich verbindlich:** In der Schweiz ist die *qualifizierte elektronische Signatur* der
handschriftlichen Unterschrift gleichgestellt (Bundesgesetz über die elektronische Signatur,
ZertES). Anbieter sind z. B. Swisscom Trust Services oder SwissSign. Damit lassen sich
Verträge rein digital abschliessen – Schutzziel **Verbindlichkeit**.

</div>
