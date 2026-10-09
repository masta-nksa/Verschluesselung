# Verschlüsselung – Unterrichtseinheit (6 + 1 Lektionen)

Materialien zur Unterrichtseinheit «Verschlüsselung».
Die Website wird von GitHub Pages direkt aus diesem Repository mit Jekyll gebaut –
**die Markdown-Dateien sind die Quelle, generiertes HTML wird nie eingecheckt.**

## Aufbau

```
├── _config.yml            Konfiguration (Titel, baseurl, Badge-Beschriftungen)
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
└── assets/css/unterricht.css   Gestaltung inkl. Dark Mode, Druckansicht, Werkzeuge (Abschnitt 7)
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
art: arbeitsblatt       # Badge; mögliche Werte siehe art_labels in _config.yml
titel: "Gruppenpuzzle: Schutzmassnahmen"   # Titel in Navigation und Browser-Tab
kurz: "Sechs Pakete zu den 11 Schutzmassnahmen"   # Kurzbeschrieb auf der Lektionsseite
reihenfolge: 2          # Sortierung innerhalb des Bereichs
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

Im Druck erscheint statt des Werkzeugs der Hinweis «nur auf der Website verfügbar».
Geheimtexte für den Druck deshalb zusätzlich als Text ins Arbeitsblatt setzen.

## Aktualität

Welche Angaben vor jedem Durchlauf zu prüfen sind (E-ID-Start, Zertifikatslaufzeiten,
Post-Quanten-Anteil, VÜPF), steht als Kommentar in `index.md`.

## Interaktive Übungen schreiben

`assets/js/uebungen.js` macht aus Platzhaltern Eingabefelder mit Kontrolle. Auf Papier
erscheinen sie als Schreiblinien bzw. als Optionen zum Einkreisen. Pro Abschnitt (`##`/`###`)
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

Trennzeichen ist immer das **Semikolon** – ein `|` würde in Markdown-Tabellen die Spalten
trennen. Schreiblinien nie als Unterstriche `____` setzen (kramdown macht daraus Fett/Kursiv).
Die Kontrolle ist formativ: Wer den Seitenquelltext liest, sieht die Antworten.

| Musterlösung zu einem Antwortfeld | `<div class="antwort" data-zeilen="2" data-loesung="…"></div>` |
| nur im Druck | `class="nur-druck"` (z. B. Geheimtext-Kopie für Papier, wenn das Werkzeug nicht gedruckt wird) |

**Lösungen einblenden (Easter Egg):** «kerckhoffs» tippen oder 5× auf den Seitentitel klicken.

Seiten, die nicht ins Dossier sollen (z. B. eine Projektionsseite): `drucken: false` im
Frontmatter.
