---
lektion: 7
zielgruppe: lehrperson
art: ablaufplan
titel: "Ablaufplan Lektion 7 (optional)"
kurz: "Zeitraster Eve-Modus und Debatte, Rollenverteilung, Alternativen für die 7. Lektion"
reihenfolge: 1
---

# Ablaufplan Lektion 7 (optional): Wie sicher ist RSA? Verschlüsselung und Überwachung

**45 Min. | Partnerarbeit, Rollenspiel**

## Wann einsetzen?

Die Einheit ist auf sechs Lektionen ausgelegt. Diese siebte Lektion ist Vertiefung und Puffer.
Alternativen, falls die Zeit anders gebraucht wird:

- **Nur Eve-Modus** (20 Min.) und danach Repetition mit dem Selbsttest aus L6.
- **Nur Debatte** (20–25 Min.) – passt auch gut direkt nach Thema B in L6.
- **Lektion als Prüfung** – die Lernziele im [Konzept](../konzept.html) eignen sich direkt als Raster.

## Zeitraster

| Zeit | Phase | Was passiert | Material |
|---|---|---|---|
| 0–12 | Eve-Modus | Partnerarbeit Aufgaben 1–2 | Auftrag Eve |
| 12–18 | Aufwand | Aufgabe 3, Ergebnisse an der Wandtafel; Aufgabe 4 kurz im Plenum | Auftrag Eve |
| 18–35 | Debatte | Rollen verteilen, Vorbereitung 5 Min., Eröffnung 6 Min., freie Debatte 4 Min., Abstimmung 2 Min. | Rollenkarten |
| 35–43 | Besprechung | Das Wichtigste: Rezept und Aufwand, Padding, Pro/Contra der Debatte, eigene Position | Das Wichtigste L7 |
| 43–45 | Puffer | – | – |

## Rollenverteilung

Bei 24 SuS: Rollen 1–5 mit je 3 Personen, Jury mit 9 Personen. Die Politik-Gruppe moderiert –
dafür vorher kurz instruieren (Redezeit stoppen, alle Rollen drannehmen, Nachfragen stellen).

## Besprechung «Das Wichtigste»

Leitfragen der Seite «Das Wichtigste» projizieren → 1 Min. zu zweit murmeln → Antworten
sammeln → Merksätze auf der Seite zeigen und kurz kommentieren. Die SuS müssen nichts
abschreiben: Die Seite ist ihre Lernzusammenfassung (auch im Dossier).

**Worauf achten:**

- **Debatte auswerten, nicht wiederholen:** In der Besprechung nur die stärksten Argumente beider Seiten sammeln und mit der Tabelle auf der Seite vergleichen. Die Lehrperson gibt keine Position vor.
- **Endgerät und Metadaten:** Diese zwei Punkte gehen in Debatten oft unter, sind aber fachlich zentral.

## Hinweise

- **Lösungen Eve:** a) p = 23, q = 29, d = 137, «ja»; b) p = 67, q = 83, d = 4531, «exakt»; c) p = 359, q = 839, d = 60001, «sehr gut». Das sind dieselben Schlüssel und Antworten wie im bisherigen Dossier (dort mit Bit-Codierung).
- **Aufgabe 4:** 1ᵉ = 1 und 0ᵉ = 0 für jedes e – A und Leerzeichen bleiben also sichtbar. Allgemein: Textbook-RSA ist deterministisch, damit sind Blockhäufigkeiten (wie bei Caesar!) und Wiederholungen sichtbar. Darum Padding (OAEP).
- **Debatte ausgewogen halten:** Die Rollenkarten sind bewusst gemischt. Die Lehrperson sollte keine Position vorgeben; die Fachargumente (keine Hintertür nur für die Guten, Missbrauchsgefahr, Fehlalarme) kommen über die Rolle «IT-Sicherheitsforschung». Gleichzeitig ernst nehmen, dass Ermittlungsbehörden ein echtes Problem haben.
- **Aktualität prüfen:** Stand Februar 2026 hat der Bundesrat die VÜPF-Revision nach der Vernehmlassung zur grundlegenden Überarbeitung zurückgewiesen und eine zweite Vernehmlassung angekündigt. Die EU-Verhandlungen zur «Chatkontrolle» laufen seit 2022. Vor der Lektion den aktuellen Stand nachschlagen und in einem Satz einleiten.
- **Gezieltes Hacken:** Die Schweiz erlaubt den Einsatz von «besonderen Informatikprogrammen» (GovWare) bei schweren Straftaten mit richterlicher Genehmigung (Art. 269ter StPO). Gutes Beispiel dafür, dass man Verschlüsselung nicht brechen muss, wenn man das Endgerät kontrolliert.
