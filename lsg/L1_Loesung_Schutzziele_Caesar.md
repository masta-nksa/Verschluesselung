---
lektion: 1
titel: "Musterlösung: Schutzziele und Caesar"
kurz: "Lösungen zum Einstieg, zu den Schutzzielen und zum Caesar-Arbeitsblatt inkl. Rätselkette"
---

# Musterlösung: Schutzziele und Caesar

## Einstieg: Geheimbotschaft

Verschiebung 7: *Treffpunkt heute nach der Schule beim Brunnen. Das Passwort lautet Rubikon.*
Das Passwort spielt auf Caesar an, der 49 v. Chr. den Grenzfluss Rubikon überschritt.

## Schutzziele

| Nr. | Szenario | Schutzziel(e) |
|---|---|---|
| 1 | Krankenakte nur für die Ärztin | Vertraulichkeit |
| 2 | Kontonummer in der Überweisung geändert | Integrität |
| 3 | Mail «von der Bank» stammt von Betrügern | Authentizität |
| 4 | Kundin bestreitet die Bestellung | Verbindlichkeit |
| 5 | Mitlesen im Gratis-WLAN | Vertraulichkeit |
| 6 | Note in der Notenliste geändert | Integrität |
| 7 | Update angeblich von Microsoft | Authentizität (und Integrität: unverändert?) |
| 8 | Mieter bestreitet die Unterschrift | Verbindlichkeit |

Bei 3 und 7 ist auch «Integrität» vertretbar, bei 2 auch «Authentizität» (wer hat die
Überweisung wirklich ausgelöst?). Entscheidend ist die Begründung.

**Aufgabe 2:** Verschlüsselung allein sichert nur die **Vertraulichkeit**. Bei Szenario 6
könnte der Schüler die verschlüsselte Notenliste zwar nicht lesen, aber trotzdem Bits
verändern oder eine ganz andere Datei schicken – ob der Inhalt unverändert ist und vom
richtigen Absender stammt, verrät die Verschlüsselung nicht. Dafür braucht es Hashwerte und
Signaturen (Lektion 5). Moderne Verfahren wie AES-GCM kombinieren beides.

## Caesar

**Aufgabe 1 (Lückentext):** Algorithmus (Verfahren) · Schlüssels · Klartext · Geheimtext ·
Entschlüsseln · geknackt.

**Aufgabe 2:** *Kryptologie ist die Wissenschaft der Geheimschriften.*

**Aufgabe 3:** Mit Verschiebung 13 ergibt das zweimalige Verschlüsseln wieder den Klartext,
weil 13 + 13 = 26 einmal um das ganze Alphabet herum ist. Dieses Verfahren heisst ROT13.
Beispiel: *anna* → NAAN → anna.

**Aufgabe 4:** *Wer den Schluessel nicht kennt, probiert einfach alle aus.* Schlüssel: 11.
Höchstens 25 Versuche (Verschiebung 0 ist keine Verschlüsselung; mit ihr 26).

**Aufgabe 5 (Kerckhoffs):** Wer das Verfahren kennt, probiert die 25 Schlüssel in Sekunden
durch – die Geheimhaltung des Verfahrens war also der einzige Schutz. Verfahren lassen sich
nicht lange geheim halten: Sie stecken in Geräten und Programmen, die man untersuchen kann,
viele Menschen kennen sie (Boten, Offiziere, Programmierer), und ein einziger Verrat oder
Diebstahl genügt. Ein öffentliches Verfahren kann zudem von vielen Fachleuten geprüft werden.

**Aufgabe 6:** ··· ·- -- ··- · ·-·· = **SAMUEL**. Codierungen haben **keinen Schlüssel** –
die Tabelle ist öffentlich und für alle gleich. Sie dienen der Darstellung, nicht der
Geheimhaltung.

**Exit-Frage:** 26 Schlüssel (25 sinnvolle). Auch 1000 Schlüssel wären unsicher: Ein Computer
probiert sie in Mikrosekunden durch. Und selbst mit sehr vielen Schlüsseln bliebe die Schwäche,
dass jeder Buchstabe immer gleich ersetzt wird (→ Häufigkeitsanalyse, Lektion 2).

## Rätselkette

1. Schlüssel 5: *Gut gemacht. Der naechste Text wurde um neunzehn verschoben.*
2. Schlüssel 19: *Fast geschafft. Fuer den letzten Text gilt der Schluessel zwei.*
3. Schlüssel 2: *Kerckhoffs sagt: Die Sicherheit liegt im Schluessel, nicht im Verfahren.*
