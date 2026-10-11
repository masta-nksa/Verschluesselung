# Verschlüsselung – Unterrichtseinheit (6 + 1 Lektionen)

Materialien zur Unterrichtseinheit «Verschlüsselung».
Die Website wird von GitHub Pages direkt aus diesem Repository mit Jekyll gebaut –
**die Markdown-Dateien sind die Quelle, generiertes HTML wird nie eingecheckt.**

## Aufbau

```
├── _config.yml            Konfiguration (Titel, baseurl, Badge-Beschriftungen, Signet, Kopfzeile, Besucherstatistik, Lektionsuhr)
├── index.md               Startseite
├── lektion-1.md …         Lektionsseiten: Metadaten + Ablauf als Aufträge für die SuS
├── lektionen/             Arbeitsblätter (SuS) und Ablaufpläne (Lehrperson)
├── lsg/                   Musterlösungen  →  /lsg/
├── lp.md                  Bereich für die Lehrperson  →  /LP/
├── konzept.md             didaktisches Gesamtkonzept (inkl. Änderungen gegenüber dem alten Dossier)
├── werkzeuge.md           alle interaktiven Krypto-Werkzeuge  →  /werkzeuge.html
├── dossier.md             alle SuS-Unterlagen zum Drucken  →  /dossier.html
├── lp-dossier.md          Ablaufpläne + Unterlagen + Lösungen zum Drucken  →  /LP/dossier.html
├── _layouts/              HTML-Gerüst (default / startseite / lektion / material)
├── assets/js/krypto.js    interaktive Werkzeuge (Caesar … Diffie-Hellman), laufen lokal im Browser
├── assets/js/dossier.js   sammelt Seiten für die Dossiers
├── assets/js/uebungen.js  interaktive Übungen (Lücken, Auswahl, Prüfen-Knopf)
├── assets/js/lektionsuhr.js  Lektionsuhr: wann der nächste Schritt der Lektion spätestens beginnt
├── assets/fonts/          Schriften (Inter, IBM Plex Mono), lokal statt von fremden Servern
└── assets/css/unterricht.css   Gestaltung inkl. Dark Mode und Druckansicht; Werkzeuge (Abschnitt 5), Übungen (Abschnitt 6), Lektionsuhr (Abschnitt 7)
```

## Wer sieht was

| Adresse | Inhalt | verlinkt von |
|---|---|---|
| `/` und `/lektion-N.html` | Ablauf und Unterlagen für die SuS | Navigation |
| `/lsg/` | alle Musterlösungen | nirgends – Link selbst weitergeben |
| `/LP/` | Konzept, Ablaufpläne, Gesamtstruktur | nirgends – Lesezeichen setzen |

`/lsg/` und `/LP/` sind öffentlich erreichbar, aber weder verlinkt noch für
Suchmaschinen freigegeben (`noindex` + kein Eintrag in der `sitemap.xml`). Beides
steht als `noindex: true` / `sitemap: false` im Frontmatter bzw. in den `defaults`
von `_config.yml`. **Achtung:** GitHub Pages unterscheidet Gross- und Kleinschreibung –
`/LP/` funktioniert, `/lp/` nicht.

## Inhalte bearbeiten

Text ändern: einfach die `.md`-Datei bearbeiten (lokal oder direkt auf github.com über
den Stift-Button) und committen. Ein paar Minuten später ist die Seite aktualisiert.

Jede Inhaltsdatei beginnt mit einem kleinen YAML-Block, aus dem sich Navigation und
Einordnung ergeben – der Rest der Datei ist normales Markdown:

```yaml
---
lektion: 3              # zu welcher Lektion gehört die Datei
zielgruppe: sus         # sus | lehrperson  → bestimmt den Bereich auf der Lektionsseite
art: auftrag            # Badge; mögliche Werte siehe art_labels in _config.yml
titel: "Vigenère knacken"                  # Titel in Navigation und Browser-Tab
kurz: "Erst die Schlüssellänge, dann jede Spalte einzeln"   # Kurzbeschrieb auf der Lektionsseite
reihenfolge: 10         # Sortierung innerhalb der Lektion = Reihenfolge im Unterricht
---
```

Für `zielgruppe` gilt: `sus` erscheint auf der Lektionsseite, `lehrperson` nur unter
`/LP/`. Musterlösungen brauchen kein `zielgruppe` – dafür genügt es, die Datei in
`lsg/` abzulegen, den Rest setzen die `defaults` in `_config.yml`.

**Neues Material hinzufügen:** Datei in `lektionen/` (bzw. `lsg/`) anlegen, obigen
Block anpassen, committen – sie erscheint automatisch an der richtigen Stelle. Es muss
kein HTML und keine Navigation angefasst werden.

**Ablauf einer Lektion ändern:** Der Ablauf steht als nummerierte Liste im Textteil von
`lektion-N.md` – die Nummerierung und die Zeitangaben (`*(ca. 15 Min.)*`) werden
automatisch formatiert. Ein Schritt, zu dem es eine Unterlage gibt, endet mit einem Link
darauf, auf einer eigenen eingerückten Zeile:

```markdown
2. **Vier Schutzziele** *(ca. 10 Min., zu zweit)* – Ordnen Sie die Szenarien …
   →&nbsp;[Arbeitsblatt]({{ '/lektionen/L1_Arbeitsblatt_Schutzziele.html' | relative_url }})
```

Als Linktext dient die Beschriftung des Badges (Arbeitsblatt, Auftrag, Theorie-Input, Das
Wichtigste). `&nbsp;` hält Pfeil und Link auf derselben Zeile.

**Lektionsuhr:** Mit `lektionsuhr: true` in `_config.yml` startet eine Uhr, sobald jemand eine
Lektionsseite öffnet. Eine Leiste am unteren Rand zeigt danach auf jeder Seite der Einheit,
welcher Schritt nach Plan dran ist und wann man spätestens zum nächsten wechselt («weiter
spätestens um 10:32 (noch 9 Min.)»). Ist die Zeit eines Schritts um, färbt sie sich gelb und
verlinkt die Unterlage des nächsten. Im Ablauf der Lektionsseite steht hinter jeder Richtzeit die
Uhrzeit, der aktuelle Schritt ist markiert; die Zeile «Lektionsuhr» darüber startet die Uhr neu
oder blendet sie aus.

- Die Zeiten kommen aus dem Ablauf in `lektion-N.md`: die Minuten aus `*(ca. 13 Min., …)*`
  direkt hinter dem fetten Schrittnamen, die Unterlage aus dem Link des Schritts. Wer dort eine
  Zeit ändert, ändert die Uhr – eine zweite Stelle gibt es nicht. Ein Schritt ohne Minutenangabe
  zählt mit 0 Minuten.
- Die Uhr läuft im Browser der SuS (nur lokal, wie die Eingaben der Übungen), also auf jedem
  Gerät für sich ab dem Moment, in dem die Lektionsseite geöffnet wird. Die Zeiten sind
  Richtzeiten – den Takt gibt die Lehrperson an.
- Sie läuft bis zehn Minuten nach der letzten Richtzeit und verschwindet dann. Läuft noch die
  Uhr einer anderen Lektion, startet beim Öffnen einer Lektionsseite nichts von selbst; die
  Zeile über dem Ablauf bietet den Wechsel an.
- Gedruckt wird nichts davon.

**Externe Links** als normale Markdown-Links schreiben. Sie öffnen von selbst in einem
neuen Tab (Skript in `_layouts/default.html`), interne Links bleiben im selben Tab.

**Besucherstatistik:** Mit `goatcounter: "<code>"` in `_config.yml` zählt
[GoatCounter](https://www.goatcounter.com/) die Aufrufe jeder Seite – ohne Cookies und ohne
gespeicherte IP-Adressen, darum ohne Einwilligungsbanner; die Fusszeile weist darauf hin. Die
Auswertung steht unter `https://<code>.goatcounter.com` (Anmeldung nötig). Lokale Vorschauen
werden nicht gezählt. Das eigene Gerät nimmt man aus, indem man die Seite einmal mit
`#toggle-goatcounter` am Ende der Adresse aufruft. Ohne die Zeile in `_config.yml` wird
nichts gezählt.

## Konventionen der Unterlagen

- **Reihenfolge:** `reihenfolge` folgt dem Ablauf der Lektion – die Unterlagen stehen auf der
  Lektionsseite und im Dossier so, wie sie im Unterricht gebraucht werden. Daraus ergibt sich
  auch der Knopf «Nächste Unterlage» am Fuss jeder Unterlage (`_layouts/material.html`).
- **Kopf eines Arbeitsblatts:** Titel, dann `## Ziel` (ein bis zwei Sätze). Keine Zeile mit
  Lektion, Sozialform und Minuten – die Zeiten stehen im Ablauf der Lektionsseite und im
  Ablaufplan.
- **Eine A4-Seite pro Unterlage** (Ausnahmen: Glossar, Gruppenpuzzle). Nach Änderungen die
  Seite als PDF drucken und die Seitenzahl prüfen. Was nur am Gerät Sinn ergibt («Früh
  fertig?», Ausblicke), mit `nur-online` aus dem Druck nehmen.
- **Fachbegriffe** dort einführen, wo die SuS dem Verfahren zum ersten Mal begegnen
  (z. B. «symmetrisch» beim Caesar-Blatt, «monoalphabetisch» zusammen mit der
  Häufigkeitsanalyse) – nicht erst in der Zusammenfassung.
- **Einzelfragen untereinander:** Mehrere Eingabefelder in einem Absatz laufen in einer Zeile
  zusammen. Getrennte Fragen als Liste oder Tabelle setzen; Rechnungen, die zusammengehören,
  untereinander (Tabelle mit `{: .rechnung}`). Zusammenhängende Lückentexte bleiben Fliesstext.
- **«Rückblick»** (`art: rueckblick`, ab Lektion 2): drei Fragen zur vorangehenden Lektion
  mit automatischer Kontrolle, `reihenfolge: 2` (erste Karte der Lektion), `drucken: false`.
  Auf der Lektionsseite steht dazu vor dem Ablauf die Zeile «Zum Aufwärmen» – bewusst ohne
  Richtzeit, damit das Zeitraster der Lektion gleich bleibt.
- **«Das Wichtigste»** (`art: zusammenfassung`, eine Seite pro Lektion): beginnt mit
  `## Lernziele dieser Lektion` als Task-Liste zum Abhaken, dann `## Zum Besprechen` mit zwei
  bis drei Leitfragen (in `nur-online`, also nur am Beamer), danach die Kernkonzepte mit
  Merksätzen. Sie ist Grundlage der Besprechung im Plenum (8–10 Min.) und Lernzusammenfassung.

## Gestaltung

Es gibt genau ein Design. Es ist als gemeinsames Design aller Unterrichtseinheiten gedacht
und steckt so auch im Gerüst für neue Einheiten: Tinte auf Papier, Schreibmaschinenschrift (IBM Plex Mono) für Titel, Nummern und Etiketten, Inter für
den Lesetext, Leuchtstift-Gelb als einzige Farbe. Dark Mode folgt der Einstellung des Geräts.
Die Schriften liegen in `assets/fonts/`; von fremden Servern kommt einzig das Zählskript
der Besucherstatistik (siehe oben).

Was diese Einheit von anderen unterscheidet, steht nicht im Stylesheet, sondern hier:

| Angabe | Wo | Wirkung |
|---|---|---|
| `signet` | `_config.yml` | Zeichenleiste unter dem Titel der Startseite (hier: der Titel als Caesar-Chiffre) |
| `hauptnav` | `_config.yml` | Zusatzeinträge in der Kopfzeile, hinter den Lektionsnummern (auf dem Handy in einer eigenen Zeile darunter) |
| `stichwort` | Frontmatter von `lektion-N.md` | ein Wort rechts in der Lektionsliste der Startseite |

Alle drei sind optional; fehlt eine Angabe, entfällt das Element. Fett Gesetztes im
Einstiegstext von `index.md` bekommt den Leuchtstift – gedacht für die Leitfrage.

Farben, Linien und Schriften hängen an den Variablen in Abschnitt 2 von
`assets/css/unterricht.css`. Gedruckt wird in der Systemschrift des Geräts, schwarz auf weiss.

## Lokale Vorschau (optional)

Nicht nötig, um die Seite zu aktualisieren – GitHub baut serverseitig. Wer trotzdem
lokal schauen will, braucht Ruby:

```
gem install bundler
bundle install
bundle exec jekyll serve
```

Anschliessend läuft die Vorschau auf <http://localhost:4000>. Wichtig: `baseurl` in
`_config.yml` muss dem Repository-Namen entsprechen, sonst greifen die Links auf der
veröffentlichten Seite ins Leere.

## Interaktive Werkzeuge einbauen

Ein Werkzeug ist ein leerer Platzhalter im Markdown; `assets/js/krypto.js` baut es beim
Laden auf. Optionale `data-`-Attribute füllen es vor:

```html
<div class="krypto" data-tool="caesar" data-text="HALLO" data-shift="3" data-mode="ent"></div>
<div class="krypto" data-tool="haeufigkeit" data-text="GEHEIMTEXT"></div>
<div class="krypto" data-tool="vigenere" data-text="januar" data-key="NKSA"></div>
<div class="krypto" data-tool="vigenere-knacken" data-text="GEHEIMTEXT"></div>
<div class="krypto" data-tool="xor" data-text="HALLO" data-key="KEY"></div>
<div class="krypto" data-tool="sha256" data-text="A" data-text2="B"></div>
<div class="krypto" data-tool="rsa" data-p="5" data-q="11" data-e="3"></div>
<div class="krypto" data-tool="rsa-eve" data-pub="(9, 667)" data-cipher="250 1"></div>
<div class="krypto" data-tool="signatur"></div>
<div class="krypto" data-tool="diffie-hellman"></div>
```

Werkzeuge werden nicht gedruckt. Braucht es einen Geheimtext auch auf Papier, ihn zusätzlich
als Absatz mit `class="nur-druck"` ins Arbeitsblatt setzen – am Bildschirm bleibt er dann
ausgeblendet und steht nicht doppelt da.

Jedes Werkzeug zeigt neben dem Ergebnis auch, wie es entsteht: ein Bild des Verfahrens, in dem
das Angeklickte im Leuchtstift hervorgehoben ist, und eine Zeile, die nachrechnet.

| Werkzeug | Bild des Verfahrens | anklickbar |
|---|---|---|
| Caesar | Chiffrierscheibe, dreht mit dem Schieber | Buchstabe auf der Scheibe oder in der Tabelle |
| Häufigkeitsanalyse | Linie der deutschen Verteilung hinter den Balken (nur «nach Häufigkeit») | Balken: markiert den Buchstaben im Text |
| Vigenère | Vigenère-Quadrat, klein neben den Eingaben, unter der Maus gross | Buchstabe im Text, Zeile/Spalte/Feld im Quadrat |
| Vigenère knacken | Fundstellen einer Folge im Geheimtext; Text in Zeilen zur Schlüssellänge | Zeile der Wiederholungstabelle, Spalte |
| XOR | Wahrheitstabelle | einzelnes Bit |
| SHA-256 | ein Kästchen pro Bit für A, B und «A ≠ B» | Hex-Ziffer oder Kästchen |
| RSA | Rechenweg m^e mod n durch wiederholtes Quadrieren | Zeile der Blocktabelle |
| Eve-Modus | getestete Teiler und abgesuchter Anteil des Bereichs bis √n | – |
| Signatur | zwei Wege (Hash des Texts, s^e), die gleich oder ungleich enden | – |
| Diffie-Hellman | alle Potenzen 5^x mod 23 als Balken, a und b markiert | – |

Die gemeinsamen Bausteine dafür stehen in `krypto.js` (`ablesefeld`, `balkenSpalte`,
`rechnung26`, `weg`) und im CSS unter «Wie ein Ergebnis entsteht» (`.kt-mit-bild`, `.kt-marke`,
`.kt-gewaehlt`, `.kt-ablesen`).

Ein Werkzeug darf beim Laden keine Lösung zeigen, die die SuS selbst finden sollen: nicht mit
dem Geheimtext einer Aufgabe und dem passenden Schlüssel vorbelegen, sondern mit einem neutralen
Beispiel.

**Der Stand der Werkzeuge bleibt gespeichert** (im Browser der SuS, nur lokal – wie die
Eingaben der Übungen): Ein Neuladen der Seite löscht weder die Ersetzungstabelle noch das
RSA-Schlüsselpaar. «Zurücksetzen» im Titel des Werkzeugs stellt den Anfangszustand wieder her,
«Alle Eingaben auf dieser Seite löschen» setzt auch die Werkzeuge zurück. Gespeichert wird pro
Seite und Position des Werkzeugs; wer die Vorbelegung (`data-`-Attribute) ändert, macht den alten
Stand ungültig. Ein neues Werkzeug braucht dafür nichts zu tun, solange sein Zustand in
Eingabefeldern steht – sonst gibt die Werkzeugfunktion `{ lesen, setzen }` zurück (Beispiele:
«Vigenère knacken», «Signatur»).

## Aktualität

Welche Angaben vor jedem Durchlauf zu prüfen sind (E-ID-Start, Zertifikatslaufzeiten,
Post-Quanten-Anteil, VÜPF), steht als Kommentar in `index.md`.

## Interaktive Übungen schreiben

`assets/js/uebungen.js` macht aus Platzhaltern Eingabefelder mit Kontrolle. Auf Papier
erscheinen sie als Schreiblinien bzw. als Kästchen zum Ankreuzen. Pro Abschnitt (`##`/`###`)
mit prüfbaren Feldern erscheint automatisch ein Knopf «Prüfen»; Eingaben bleiben im Browser
der SuS gespeichert (nur lokal).

| Was | Markdown |
|---|---|
| Lücke mit Kontrolle | `<span class="luecke" data-antwort="Klartext;Klartexts"></span>` |
| Zahl / Grössenordnung / Zahlenmenge | `data-typ="zahl"` · `data-typ="groesse"` (z. B. 1,1·10^22) · `data-typ="menge"` (z. B. Faktoren) |
| freie Eingabe ohne Kontrolle | `<span class="luecke" data-breite="20"></span>` (`data-breite="voll"` in Tabellen) |
| Auswahlliste | `<span class="luecke" data-optionen="ja;nein" data-antwort="ja"></span>` |
| Chips (eine/mehrere) | `<span class="wahl" data-optionen="A;B;C" data-antwort="A+B" data-auch="C"></span>` |
| Antwort in Sätzen | `<div class="antwort" data-zeilen="2"></div>` (eigene Zeile, Leerzeilen rundherum) |
| Multiple Choice | Task-Liste `- [ ] …` und direkt darunter `{: .mc data-antwort="2 3"}` |
| nur am Bildschirm | `<div class="nur-online" markdown="1"> … </div>` (z. B. «Früh fertig?») |
| Musterlösung zu einem Antwortfeld | `<div class="antwort" data-zeilen="2" data-loesung="…"></div>` |
| … die erst im Unterricht aufgelöst wird | zusätzlich `data-vergleich="spaeter"` (kein Knopf «Mit Musterlösung vergleichen») |
| … die nur ein Hinweis ist | zusätzlich `data-vergleich="hinweis"` (Knopf «Hinweis zeigen», ohne Selbsteinschätzung) |
| Tipps in Stufen | Liste `- …` und direkt darunter `{: .tipps}` – ein Knopf deckt einen Tipp nach dem anderen auf |
| nur im Druck | `class="nur-druck"` (z. B. Geheimtext-Kopie für Papier, wenn das Werkzeug nicht gedruckt wird) |
| Ablaufschema | `<div class="ablauf">`, darin abwechselnd `<div class="ablauf-knoten"><b>Begriff</b><code>Beispiel</code></div>` und `<div class="ablauf-schritt"><b>Vorgang</b><span>womit</span></div>` |

**Ablaufschemas** (statt Zeichnungen aus Textzeichen): Eine Reihe hat drei Knoten und zwei
Schritte; auf schmalen Bildschirmen läuft sie von oben nach unten. Ein
`<div class="ablauf-abzweig">` am Ende hängt gestrichelt am mittleren Knoten (Eve in Lektion 1).
Mit `class="ablauf ablauf-paar"` stehen zwei kurze Reihen (Knoten – Schritt – Knoten)
untereinander; ein `<div class="ablauf-vergleich"><span>…</span></div>` nach der ersten Reihe
erscheint rechts neben einer Klammer um beide Reihen (Signaturprüfung in Lektion 5).
Der HTML-Block steht ohne Leerzeilen im Markdown und bekommt ein `aria-label`, das den Ablauf in
einem Satz beschreibt.

Trennzeichen ist immer das **Semikolon** – ein `|` würde in Markdown-Tabellen die Spalten
trennen. Schreiblinien nie als Unterstriche `____` setzen (kramdown macht daraus Fett/Kursiv).
Die Kontrolle ist formativ: Wer den Seitenquelltext liest, sieht die Antworten.

**Offene Fragen selbst kontrollieren:** Unter jedem Antwortfeld mit `data-loesung` steht der
Knopf «Mit Musterlösung vergleichen». Er wird erst aktiv, wenn etwas im Feld steht (mindestens
zehn Zeichen); danach schätzen die SuS ein, ob ihre Antwort das Wesentliche enthält (ja /
teilweise / noch nicht). Wo die Auflösung dem Unterricht gehört – Einstiegsrätsel, Kistenrätsel,
die offene Frage am Ende von Lektion 4 –, steht `data-vergleich="spaeter"`: Dort gibt es die
Lösung weiterhin nur über das Easter Egg und unter `/lsg/`.

**Tipps in Stufen** erscheinen nur am Bildschirm (nicht im Druck) und in der Reihenfolge der
Liste: zuerst der schwächste Hinweis, zuletzt der deutlichste.

**Lösungen einblenden (Easter Egg):** «kerckhoffs» tippen oder 5× auf den Seitentitel klicken.
Dann sind auch alle Tipps aufgedeckt.

Seiten, die nicht ins Dossier sollen (z. B. eine Projektionsseite): `drucken: false` im
Frontmatter.

**Druck und eigene Eingaben:** Ein einzelnes Arbeitsblatt druckt mit, was am Bildschirm
schon ausgefüllt ist. Das Dossier druckt als leere Vorlage; wer seine Eingaben auf Papier
will, setzt dort das Häkchen «Eigene Eingaben mitdrucken».
