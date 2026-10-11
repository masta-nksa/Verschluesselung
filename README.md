# Verschlüsselung – Unterrichtseinheit (6 + 1 Lektionen)

Materialien zur Unterrichtseinheit «Verschlüsselung».
Die Website wird von GitHub Pages direkt aus diesem Repository mit Jekyll gebaut –
**die Markdown-Dateien sind die Quelle, generiertes HTML wird nie eingecheckt.**

## Aufbau

```
├── _config.yml            Konfiguration (Titel, baseurl, Badge-Beschriftungen, Signet, Kopfzeile)
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
├── assets/fonts/          Schriften (Inter, IBM Plex Mono), lokal statt von fremden Servern
└── assets/css/unterricht.css   Gestaltung inkl. Dark Mode und Druckansicht; Werkzeuge (Abschnitt 5), Übungen (Abschnitt 6)
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
automatisch formatiert.

**Externe Links** als normale Markdown-Links schreiben. Sie öffnen von selbst in einem
neuen Tab (Skript in `_layouts/default.html`), interne Links bleiben im selben Tab.

## Konventionen der Unterlagen

- **Reihenfolge:** `reihenfolge` folgt dem Ablauf der Lektion – die Unterlagen stehen auf der
  Lektionsseite und im Dossier so, wie sie im Unterricht gebraucht werden.
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
- **«Das Wichtigste»** (`art: zusammenfassung`, eine Seite pro Lektion): beginnt mit
  `## Lernziele dieser Lektion` als Task-Liste zum Abhaken, dann `## Zum Besprechen` mit zwei
  bis drei Leitfragen (in `nur-online`, also nur am Beamer), danach die Kernkonzepte mit
  Merksätzen. Sie ist Grundlage der Besprechung im Plenum (8–10 Min.) und Lernzusammenfassung.

## Gestaltung

Es gibt genau ein Design. Es ist als gemeinsames Design aller Unterrichtseinheiten gedacht
und steckt so auch im Gerüst für neue Einheiten: Tinte auf Papier, Schreibmaschinenschrift (IBM Plex Mono) für Titel, Nummern und Etiketten, Inter für
den Lesetext, Leuchtstift-Gelb als einzige Farbe. Dark Mode folgt der Einstellung des Geräts.
Die Schriften liegen in `assets/fonts/`, es wird nichts von fremden Servern geladen.

Was diese Einheit von anderen unterscheidet, steht nicht im Stylesheet, sondern hier:

| Angabe | Wo | Wirkung |
|---|---|---|
| `signet` | `_config.yml` | Zeichenleiste unter dem Titel der Startseite (hier: der Titel als Caesar-Chiffre) |
| `hauptnav` | `_config.yml` | Zusatzeinträge in der Kopfzeile, hinter den Lektionsnummern |
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

Ein Werkzeug darf beim Laden keine Lösung zeigen, die die SuS selbst finden sollen: nicht mit
dem Geheimtext einer Aufgabe und dem passenden Schlüssel vorbelegen, sondern mit einem neutralen
Beispiel.

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
| nur im Druck | `class="nur-druck"` (z. B. Geheimtext-Kopie für Papier, wenn das Werkzeug nicht gedruckt wird) |

Trennzeichen ist immer das **Semikolon** – ein `|` würde in Markdown-Tabellen die Spalten
trennen. Schreiblinien nie als Unterstriche `____` setzen (kramdown macht daraus Fett/Kursiv).
Die Kontrolle ist formativ: Wer den Seitenquelltext liest, sieht die Antworten.

**Lösungen einblenden (Easter Egg):** «kerckhoffs» tippen oder 5× auf den Seitentitel klicken.

Seiten, die nicht ins Dossier sollen (z. B. eine Projektionsseite): `drucken: false` im
Frontmatter.

**Druck und eigene Eingaben:** Ein einzelnes Arbeitsblatt druckt mit, was am Bildschirm
schon ausgefüllt ist. Das Dossier druckt als leere Vorlage; wer seine Eingaben auf Papier
will, setzt dort das Häkchen «Eigene Eingaben mitdrucken».
