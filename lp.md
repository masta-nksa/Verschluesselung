---
layout: default
typ: uebersicht
titel: "Bereich für die Lehrperson"
kurz: "Konzept, Ablaufpläne und die vollständige Struktur der Website"
permalink: /LP/
noindex: true
sitemap: false
---

{%- assign lektionen = site.pages | where: "layout", "lektion" | sort: "lektion" -%}
{%- assign konzept = site.pages | where: "typ", "konzept" | first -%}

<div class="wrap">

<nav class="breadcrumb" aria-label="Sie sind hier">
  <a href="{{ '/' | relative_url }}">Übersicht</a> <span aria-hidden="true">/</span> Lehrperson
</nav>

<div class="prose" markdown="1">

# Bereich für die Lehrperson

Diese Seite bündelt alles, was auf den öffentlichen Lektionsseiten bewusst nicht
auftaucht: das didaktische Gesamtkonzept, die Ablaufpläne und die Musterlösungen.
Sie ist nirgends verlinkt und für Suchmaschinen gesperrt – erreichbar bleibt sie
über die Adresse `/LP/`. Setzen Sie am besten ein Lesezeichen.

## Wie die Website aufgebaut ist

| Bereich | Adresse | Inhalt |
|---|---|---|
| Startseite | `/` | Einstieg und Liste der Lektionen – das sehen die SuS |
| Lektion 1–7 | `/lektion-1.html` … | Ablauf als Aufträge mit Richtzeiten + Unterlagen der Lektion |
| Musterlösungen | `/lsg/` | alle Lösungen, nicht verlinkt – Link selbst weitergeben |
| Lehrperson | `/LP/` | diese Seite |

Die Inhalte stammen aus Markdown-Dateien im Repository: `lektionen/` enthält alle
Unterlagen, `lsg/` die Lösungen, `lektion-1.md` bis `lektion-7.md` die
Lektionsseiten samt Ablauf für die SuS. Änderungen an einer `.md`-Datei erscheinen
ein bis zwei Minuten nach dem Push automatisch auf der Website.

**Lösungen direkt im Arbeitsblatt (Easter Egg):** Auf jeder Unterlage «kerckhoffs» tippen
(nicht in einem Eingabefeld) oder fünfmal schnell auf den Seitentitel klicken. Dann erscheinen
alle Lösungen: Marken neben den Lücken, Musterlösungen unter den offenen Fragen, markierte Chips
und Multiple-Choice-Antworten. Nochmals auslösen blendet sie aus. Wer in diesem Zustand druckt,
erhält einen Lösungsschlüssel. Ob und wann Sie den Trick der Klasse verraten, entscheiden Sie.
Passend zum Thema: Das Verfahren steht im öffentlichen Quelltext, das Geheimnis ist das Wort.

## Grundlagen

</div>

<ul class="card-list">
  {%- if konzept %}
  <li class="card">
    <a href="{{ konzept.url | relative_url }}">
      <span class="badge badge-konzept">Konzept</span>
      <strong>{{ konzept.titel }}</strong>
      <span class="card-kurz">{{ konzept.kurz }}</span>
    </a>
  </li>
  {%- endif %}
  <li class="card">
    <a href="{{ '/LP/dossier.html' | relative_url }}">
      <span class="badge badge-dossier">Dossier</span>
      <strong>Dossier für die Lehrperson</strong>
      <span class="card-kurz">Ablaufpläne, Unterlagen und Musterlösungen aller Lektionen zum Ausdrucken</span>
    </a>
  </li>
  <li class="card">
    <a href="{{ '/werkzeuge.html' | relative_url }}">
      <span class="badge badge-werkzeug">Werkzeug</span>
      <strong>Krypto-Werkzeuge</strong>
      <span class="card-kurz">Alle interaktiven Werkzeuge auf einer Seite</span>
    </a>
  </li>
  <li class="card">
    <a href="{{ '/lsg/' | relative_url }}">
      <span class="badge badge-musterloesung">Lösungen</span>
      <strong>Alle Musterlösungen</strong>
      <span class="card-kurz">Sammelseite unter <code>/lsg/</code> – Link nach Bedarf an die Klasse weitergeben</span>
    </a>
  </li>
</ul>

{%- for l in lektionen %}
{%- assign material = site.pages | where: "typ", "material" | where: "lektion", l.lektion | sort: "reihenfolge" -%}
{%- assign fuer_lp = material | where: "zielgruppe", "lehrperson" -%}
{%- assign fuer_sus = material | where: "zielgruppe", "sus" -%}
{%- assign loesungen = site.pages | where: "zielgruppe", "loesung" | where: "lektion", l.lektion -%}

<section class="material-block block-lehrperson">
  <h2><span class="block-icon" aria-hidden="true">&#128218;</span> Lektion {{ l.lektion }}: {{ l.titel }}</h2>
  <p class="block-hint">{{ l.methode }} · {{ l.output }} · <a href="{{ l.url | relative_url }}">Lektionsseite ansehen</a></p>
  <ul class="card-list">
    {%- for m in fuer_lp %}
    <li class="card">
      <a href="{{ m.url | relative_url }}">
        <span class="badge badge-{{ m.art }}">{{ site.art_labels[m.art] }}</span>
        <strong>{{ m.titel }}</strong>
        <span class="card-kurz">{{ m.kurz }}</span>
      </a>
    </li>
    {%- endfor %}
    {%- for m in fuer_sus %}
    <li class="card">
      <a href="{{ m.url | relative_url }}">
        <span class="badge badge-{{ m.art }}">{{ site.art_labels[m.art] }}</span>
        <strong>{{ m.titel }}</strong>
        <span class="card-kurz">{{ m.kurz }}</span>
      </a>
    </li>
    {%- endfor %}
    {%- for m in loesungen %}
    <li class="card">
      <a href="{{ m.url | relative_url }}">
        <span class="badge badge-musterloesung">Musterlösung</span>
        <strong>{{ m.titel }}</strong>
        <span class="card-kurz">{{ m.kurz }}</span>
      </a>
    </li>
    {%- endfor %}
  </ul>
</section>
{%- endfor %}

<nav class="pager">
  <a class="pager-prev" href="{{ '/' | relative_url }}"><span>&larr; Zurück</span>Zur Startseite</a>
</nav>

</div>
