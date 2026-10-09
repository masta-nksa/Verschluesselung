---
lektion: 3
zielgruppe: sus
art: auftrag
titel: "Das Kistenrätsel"
kurz: "Ein Ring, eine Kiste, ein neugieriger Bote – und kein gemeinsamer Schlüssel."
reihenfolge: 30
---

# Das Kistenrätsel

## Ziel

Sie finden eine Lösung für das Schlüsselaustauschproblem und beschreiben damit die Grundidee,
auf der die asymmetrische Verschlüsselung beruht.

## Die Situation

Alice in Aarau will Bob in Genf einen wertvollen Ring schicken. Die beiden haben sich nie
getroffen.

- Alice hat eine stabile **Kiste**, die man mit Vorhängeschlössern verschliessen kann.
- Alice und Bob besitzen je ein eigenes **Vorhängeschloss** mit **Schlüssel**. Niemand sonst
  hat einen passenden Schlüssel.
- Der einzige Weg ist ein **Bote**, der beliebig oft hin- und herfährt. Er öffnet jede Kiste,
  die *nicht* verschlossen ist, und nimmt den Inhalt. Schlösser aufbrechen kann er nicht.
- Schlüssel verschicken ist sinnlos – der Bote würde sie kopieren.

### Aufgabe 1 – Lösen Sie das Rätsel

Beschreiben oder skizzieren Sie jede Fahrt des Boten.

<div class="antwort" data-loesung="1. Alice hängt ihr Schloss an die Kiste und schickt sie zu Bob. 2. Bob hängt zusätzlich sein Schloss daran und schickt sie zurück. 3. Alice entfernt ihr Schloss und schickt die Kiste wieder zu Bob, der sein Schloss öffnet. Die Kiste ist auf jeder Fahrt verschlossen, und nie wird ein Schlüssel verschickt." data-zeilen="4"></div>

Wie viele Fahrten braucht Ihre Lösung? <span class="luecke" data-typ="zahl" data-antwort="3" data-breite="4"></span>

### Aufgabe 2 – Eine Verbesserung

Bob kauft hundert gleiche **Schnappschlösser**, die man ohne Schlüssel zudrücken, aber nur mit
seinem Schlüssel öffnen kann. Er verteilt sie offen an alle, die ihm etwas schicken wollen.
Wie viele Fahrten braucht Alice jetzt? <span class="luecke" data-typ="zahl" data-antwort="1" data-breite="4"></span>
Was ist am Schnappschloss «öffentlich», was bleibt «privat»?

<div class="antwort" data-loesung="Alice drückt eines von Bobs offenen Schnappschlössern an die Kiste und schickt sie ab – eine einzige Fahrt. Öffentlich ist das offene Schloss (alle können damit verschliessen), privat bleibt Bobs Schlüssel (nur er kann öffnen). Genau das ist die Idee von öffentlichem und privatem Schlüssel." data-zeilen="2"></div>

### Aufgabe 3 – Wo ist der Haken?

Der Bote liefert die Schnappschlösser aus. Wie könnte er Alice trotzdem überlisten?

<div class="antwort" data-loesung="Der Bote liefert Alice seine eigenen Schnappschlösser und behauptet, sie stammten von Bob. Er öffnet die Kiste, nimmt den Ring und schickt mit einem echten Schloss von Bob eine andere Kiste weiter. Alice kann nicht prüfen, ob das Schloss wirklich von Bob ist (Man-in-the-Middle) – die Lösung sind Zertifikate (Lektion 5)." data-zeilen="2"></div>

Welches Schutzziel aus Lektion 1 ist dann verletzt? <span class="luecke" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Authentizität"></span>
