---
layout: material
art: dossier
titel: "Dossier zum Ausdrucken"
kurz: "Alle Unterlagen der Einheit in einem Dokument – zum Drucken oder als PDF speichern"
permalink: /dossier.html
---

# Dossier: Verschlüsselung

Hier sind alle Arbeitsblätter, Aufträge und Inputs der Einheit auf einer Seite gesammelt.
Wählen Sie die Lektionen aus und klicken Sie oben rechts auf **Drucken**. Für eine PDF-Datei
wählen Sie im Druckdialog «Als PDF speichern».

<div class="kasten dossier-steuerung" markdown="1">

**Lektionen auswählen:** <span id="dossier-auswahl" class="dossier-auswahl"></span>

<span id="dossier-status" class="dossier-status">Unterlagen werden geladen …</span>

Tipp für den Druck: Im Druckdialog unter «Weitere Einstellungen» die Kopf- und Fusszeilen
ausschalten. Jedes Arbeitsblatt beginnt auf einer neuen Seite. Die interaktiven Werkzeuge
erscheinen auf Papier als Hinweis.

</div>

<div id="dossier-inhalt"></div>

{%- assign lektionen = site.pages | where: "layout", "lektion" | sort: "lektion" %}
<script type="application/json" id="dossier-daten">
[{%- for l in lektionen -%}
{%- assign material = site.pages | where: "typ", "material" | where: "lektion", l.lektion | where: "zielgruppe", "sus" | sort: "reihenfolge" -%}
{"lektion": {{ l.lektion }}, "titel": {{ l.titel | jsonify }}, "url": {{ l.url | relative_url | jsonify }}, "seiten": [{%- for m in material -%}{"url": {{ m.url | relative_url | jsonify }}, "titel": {{ m.titel | jsonify }}}{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}]}{%- unless forloop.last -%},{%- endunless -%}
{%- endfor -%}]
</script>
<script src="{{ '/assets/js/dossier.js' | relative_url }}" defer></script>
