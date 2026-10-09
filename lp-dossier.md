---
layout: material
art: dossier
zielgruppe: lehrperson
titel: "Dossier für die Lehrperson"
kurz: "Ablaufpläne, alle Unterlagen und Musterlösungen der Einheit in einem Dokument"
permalink: /LP/dossier.html
noindex: true
sitemap: false
---

# Dossier für die Lehrperson

Pro Lektion: Ablauf der SuS-Seite, Ablaufplan, alle Unterlagen der Klasse und die
Musterlösungen – zum Ausdrucken als Unterrichtsordner. Diese Seite ist wie `/LP/` nirgends
verlinkt.

<div class="kasten dossier-steuerung" markdown="1">

**Lektionen auswählen:** <span id="dossier-auswahl" class="dossier-auswahl"></span>

<span id="dossier-status" class="dossier-status">Unterlagen werden geladen …</span>

</div>

<div id="dossier-inhalt"></div>

{%- assign lektionen = site.pages | where: "layout", "lektion" | sort: "lektion" %}
<script type="application/json" id="dossier-daten">
[{%- for l in lektionen -%}
{%- assign material = site.pages | where: "typ", "material" | where: "lektion", l.lektion | sort: "reihenfolge" -%}
{%- assign fuer_lp = material | where: "zielgruppe", "lehrperson" -%}
{%- assign fuer_sus = material | where: "zielgruppe", "sus" -%}
{%- assign loesungen = material | where: "zielgruppe", "loesung" -%}
{%- assign alle = fuer_lp | concat: fuer_sus | concat: loesungen -%}
{"lektion": {{ l.lektion }}, "titel": {{ l.titel | jsonify }}, "url": {{ l.url | relative_url | jsonify }}, "seiten": [{%- for m in alle -%}{"url": {{ m.url | relative_url | jsonify }}, "titel": {{ m.titel | jsonify }}}{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}]}{%- unless forloop.last -%},{%- endunless -%}
{%- endfor -%}]
</script>
<script src="{{ '/assets/js/dossier.js' | relative_url }}" defer></script>
