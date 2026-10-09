---
lektion: 1
zielgruppe: sus
art: arbeitsblatt
titel: "Die vier Schutzziele"
kurz: "Acht Szenarien – welches Schutzziel ist jeweils betroffen?"
reihenfolge: 10
---

# Die vier Schutzziele

## Ziel

Sie können die vier Schutzziele der Informationssicherheit unterscheiden und an Beispielen
erklären. Sie wissen, welches davon Verschlüsselung allein sicherstellt.

## Die vier Schutzziele

| Schutzziel | Leitfrage | Beispiel |
|---|---|---|
| **Vertraulichkeit** | Können nur Berechtigte die Information lesen? | Niemand ausser Ihnen und Ihrer Ärztin kennt den Befund. |
| **Integrität** | Ist die Information unverändert? | Die Kontonummer in der Überweisung ist noch dieselbe. |
| **Authentizität** | Stammt sie wirklich von dem, der sie zu senden vorgibt? | Die Mail stammt wirklich von Ihrer Bank. |
| **Verbindlichkeit** | Kann der Absender nicht abstreiten, sie gesendet zu haben? | Wer digital unterschreibt, kann es nicht leugnen. |

In der Fachsprache will *Alice* ihrem Kollegen *Bob* eine Nachricht schicken, und *Eve*
(von englisch *eavesdropper*, Lauscherin) hört mit oder manipuliert.

### Aufgabe 1 – Szenarien zuordnen

Welches Schutzziel wird **verletzt** oder soll **geschützt** werden? Wählen Sie an – manchmal
passen zwei. (Auf Papier: einkreisen.)

| Nr. | Szenario | Schutzziel(e) |
|---|---|---|
| 1 | Ihre Krankenakte soll nur Ihre Ärztin lesen können. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Vertraulichkeit"></span> |
| 2 | Jemand ändert in einer Online-Überweisung unbemerkt die Kontonummer des Empfängers. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Integrität" data-auch="Authentizität"></span> |
| 3 | Sie erhalten eine Mail «von Ihrer Bank» – in Wahrheit stammt sie von Betrügern. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Authentizität" data-auch="Integrität"></span> |
| 4 | Eine Kundin bestellt online ein teures Velo und behauptet danach, sie habe nie bestellt. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Verbindlichkeit"></span> |
| 5 | Im Gratis-WLAN am Bahnhof liest jemand Ihre Nachrichten mit. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Vertraulichkeit"></span> |
| 6 | Ein Schüler fängt die Notenliste ab und ändert seine Note, bevor sie weitergeleitet wird. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Integrität"></span> |
| 7 | Ihr Laptop installiert ein Update, das angeblich von Microsoft stammt. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Authentizität" data-auch="Integrität"></span> |
| 8 | Ein Mietvertrag wird digital unterschrieben. Später will der Mieter nichts davon wissen. | <span class="wahl" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Verbindlichkeit"></span> |

### Aufgabe 2 – Was leistet Verschlüsselung?

Verschlüsselung macht eine Nachricht für Unbefugte unlesbar. Welches Schutzziel stellt sie
damit **allein** sicher? <span class="luecke" data-optionen="Vertraulichkeit;Integrität;Authentizität;Verbindlichkeit" data-antwort="Vertraulichkeit"></span>

Begründen Sie an Szenario 3 oder 6, warum die anderen Schutzziele nicht automatisch erfüllt sind.

<div class="antwort" data-zeilen="2"></div>

<div class="kasten" markdown="1">

**Gut zu wissen:** Oft wird ein fünftes Schutzziel genannt: **Verfügbarkeit** – die Daten
sollen da sein, wenn man sie braucht. Dagegen hilft nicht Kryptografie, sondern z. B. ein Backup.
In den Lektionen 1–4 geht es um die **Vertraulichkeit**, in Lektion 5 um Integrität,
Authentizität und Verbindlichkeit.

</div>
