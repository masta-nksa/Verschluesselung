---
lektion: 5
zielgruppe: sus
art: auftrag
titel: "Zertifikate: ein echtes Zertifikat untersuchen"
kurz: "Wer bestätigt, dass ein öffentlicher Schlüssel wirklich zu einer Website gehört? Untersuchung im Browser inkl. Vertrauenskette und Laufzeit."
reihenfolge: 30
---

# Zertifikate: ein echtes Zertifikat untersuchen

## Ziel

Sie erklären, was ein digitales Zertifikat bestätigt und welche Rolle eine Zertifizierungsstelle
(CA) spielt. Sie lesen ein Zertifikat im Browser und rekonstruieren die Vertrauenskette.

## Die Idee

Eine Signatur ist nur so viel wert wie die Gewissheit, dass der öffentliche Schlüssel der
richtigen Person gehört. Diese Gewissheit liefert ein **Zertifikat**: Es enthält den
**öffentlichen Schlüssel** einer Website, ihren **Namen** (z. B. *www.admin.ch*) und eine
**Gültigkeitsdauer**. Eine **Zertifizierungsstelle** (CA) prüft, dass der Antragsteller die Domain
kontrolliert, und **signiert** das Ganze. Ihr Browser prüft diese Signatur mit dem öffentlichen
Schlüssel der CA, der wiederum in einem Zertifikat steckt – bis zu einem **Root-Zertifikat**, das
im Betriebssystem oder Browser vorinstalliert ist: die **Vertrauenskette**.

### Aufgabe 1 – Zertifikat lesen

Öffnen Sie zwei dieser Websites: [www.nksa.ch](https://www.nksa.ch) ·
[www.admin.ch](https://www.admin.ch) · [www.srf.ch](https://www.srf.ch) ·
[www.galaxus.ch](https://www.galaxus.ch). Zertifikat anzeigen: **Chrome/Edge:** Symbol links
der Adresse → «Verbindung ist sicher» → «Zertifikat ist gültig» → «Details» ·
**Firefox:** Schloss → «Verbindung sicher» → «Weitere Informationen» → «Zertifikat anzeigen» ·
**Safari:** Schloss → «Zertifikat einblenden».

| | Website 1: <span class="luecke" data-breite="16"></span> | Website 2: <span class="luecke" data-breite="16"></span> |
|---|---|---|
| Ausgestellt für | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |
| Ausgestellt von (CA) | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |
| Root-Zertifikat | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |
| Gültig von – bis | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |
| Laufzeit in Tagen | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |
| Schlüssel (RSA oder EC) | <span class="luecke" data-breite="voll"></span> | <span class="luecke" data-breite="voll"></span> |

### Aufgabe 2 – Vertrauenskette

Ergänzen Sie die Kette für Website 1: Das Root-Zertifikat
<span class="luecke" data-breite="16"></span> signiert das Zwischenzertifikat
<span class="luecke" data-breite="16"></span>, dieses signiert das Zertifikat von
<span class="luecke" data-breite="16"></span>. Wem muss Ihr Browser am Ende vertrauen?
<span class="luecke" data-optionen="der Website;dem Root-Zertifikat;dem Zwischenzertifikat" data-antwort="dem Root-Zertifikat"></span>

### Aufgabe 3 – Immer kürzere Laufzeiten

Seit dem 15. März 2026 darf ein neues Zertifikat höchstens
<span class="luecke" data-typ="zahl" data-antwort="200" data-breite="5"></span> Tage gelten
(vorher 398; ab 2027: 100, ab 2029: 47 Tage –
[CA/Browser Forum](https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/)).
Warum erhöhen kurze Laufzeiten die Sicherheit, und was bedeutet das für die Betreiber?

<div class="antwort" data-zeilen="2"></div>

<div class="nur-online" markdown="1">

### Aufgabe 4 – Wenn etwas nicht stimmt *(früh fertig)*

Öffnen Sie diese absichtlich fehlerhaften Testseiten, aber **klicken Sie nicht weiter**:
[expired.badssl.com](https://expired.badssl.com) · [wrong.host.badssl.com](https://wrong.host.badssl.com) ·
[self-signed.badssl.com](https://self-signed.badssl.com). Was meldet der Browser, welches Glied
der Kette ist verletzt, und was tun Sie bei einer solchen Warnung auf einer echten Website?

<div class="antwort" data-zeilen="3"></div>

**Noch mehr?** CAs müssen jedes Zertifikat in öffentlichen Logbüchern eintragen (*Certificate
Transparency*). Suchen Sie auf [crt.sh](https://crt.sh/?q=nksa.ch) alle Zertifikate für
*nksa.ch*. Wozu ist das gut?

</div>

<div class="kasten" markdown="1">

**Gratis und automatisch:** Seit 2015 stellt die gemeinnützige CA *Let's Encrypt* Zertifikate
kostenlos und automatisch aus – heute die grösste CA der Welt. **Wenn CAs versagen:** 2011 wurde
die CA DigiNotar gehackt; mit gefälschten Zertifikaten für google.com wurden Nutzende im Iran
abgehört. DigiNotar flog aus allen Browsern und ging Konkurs.

</div>
