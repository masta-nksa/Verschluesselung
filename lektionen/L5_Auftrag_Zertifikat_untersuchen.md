---
lektion: 5
zielgruppe: sus
art: auftrag
titel: "Zertifikate: ein echtes Zertifikat untersuchen"
kurz: "Wer bestätigt, dass ein öffentlicher Schlüssel wirklich zu einer Website gehört? Untersuchung im Browser inkl. Vertrauenskette und Laufzeit."
reihenfolge: 30
---

# Zertifikate: ein echtes Zertifikat untersuchen

**Lektion 5 – Partnerarbeit | ca. 13 Min. (Aufgaben 1–3; Aufgabe 4 für Schnelle)**

## Ziel

Sie erklären, was ein digitales Zertifikat bestätigt und welche Rolle eine
Zertifizierungsstelle (CA) spielt. Sie lesen ein Zertifikat im Browser und rekonstruieren die
Vertrauenskette.

## Die Idee

Aufgabe 3 zu den Signaturen hat gezeigt: Eine Signatur ist nur so viel wert wie die Gewissheit,
dass der öffentliche Schlüssel wirklich der richtigen Person gehört. Diese Gewissheit liefert
ein **Zertifikat**:

- Ein Zertifikat enthält den **öffentlichen Schlüssel** einer Website, ihren **Namen**
  (z. B. *www.admin.ch*) und eine **Gültigkeitsdauer**.
- Eine **Zertifizierungsstelle** (*Certificate Authority*, CA) prüft, dass der Antragsteller die
  Domain wirklich kontrolliert, und **signiert** das Ganze mit ihrem privaten Schlüssel.
- Ihr Browser prüft diese Signatur mit dem öffentlichen Schlüssel der CA. Dieser steckt
  wiederum in einem Zertifikat, signiert von einer übergeordneten CA – bis zu einem
  **Root-Zertifikat**, das in Ihrem Betriebssystem oder Browser vorinstalliert ist. Das ist die
  **Vertrauenskette**.

Vergleich aus dem Alltag: Ein Fairtrade-Label auf der Schokolade nützt nur, weil Sie der
Organisation dahinter vertrauen – und darauf, dass das Label nicht gefälscht ist.

### Aufgabe 1 – Zertifikat lesen

Öffnen Sie zwei der folgenden Websites:
[www.nksa.ch](https://www.nksa.ch) · [www.admin.ch](https://www.admin.ch) ·
[www.srf.ch](https://www.srf.ch) · [www.galaxus.ch](https://www.galaxus.ch)

So finden Sie das Zertifikat:
- **Chrome / Edge:** Symbol links neben der Adresse → «Verbindung ist sicher» → «Zertifikat ist gültig» → Register «Details»
- **Firefox:** Schloss → «Verbindung sicher» → «Weitere Informationen» → «Zertifikat anzeigen»
- **Safari:** Schloss → «Zertifikat einblenden»

| | Website 1: ______________ | Website 2: ______________ |
|---|---|---|
| Ausgestellt für (Name/Domain) | | |
| Ausgestellt von (CA) | | |
| Root-Zertifikat (oberstes Glied der Kette) | | |
| Gültig von – bis | | |
| Laufzeit in Tagen (ungefähr) | | |
| Art des öffentlichen Schlüssels (RSA oder EC) | | |

### Aufgabe 2 – Vertrauenskette zeichnen

Zeichnen Sie die Kette für Website 1 als drei Kästchen mit Pfeilen. Schreiben Sie an jeden
Pfeil: *Wer signiert wen?*

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 3 – Immer kürzere Laufzeiten

Die Browser-Hersteller und CAs haben 2025 beschlossen, die maximale Laufzeit von
Zertifikaten schrittweise zu verkürzen: von 398 Tagen auf **200 Tage** (seit 15. März 2026),
**100 Tage** (ab März 2027) und **47 Tage** (ab März 2029). Quelle:
[CA/Browser Forum, Ballot SC-081](https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/)

Passt die Laufzeit Ihrer Websites dazu? Warum könnten kurze Laufzeiten die Sicherheit
erhöhen? Was bedeutet das für die Betreiber der Websites?

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

### Aufgabe 4 – Wenn etwas nicht stimmt *(früh fertig)*

Öffnen Sie diese absichtlich fehlerhaften Testseiten, aber **klicken Sie nicht weiter**:
[expired.badssl.com](https://expired.badssl.com) ·
[wrong.host.badssl.com](https://wrong.host.badssl.com) ·
[self-signed.badssl.com](https://self-signed.badssl.com)

Was meldet der Browser jeweils? Welches Glied der Vertrauenskette ist verletzt? Was sollten Sie
bei einer solchen Warnung auf einer echten Website tun?

<span class="fill-line breit"></span>
<span class="fill-line breit"></span>

## Früh fertig?

Seit einigen Jahren müssen CAs jedes ausgestellte Zertifikat in öffentlichen Logbüchern
eintragen (*Certificate Transparency*). Suchen Sie auf [crt.sh](https://crt.sh/?q=nksa.ch)
alle Zertifikate, die je für *nksa.ch* ausgestellt wurden. Wozu ist das gut?

<div class="kasten" markdown="1">

**Gratis und automatisch:** Früher kosteten Zertifikate Geld. Seit 2015 stellt die
gemeinnützige CA *Let's Encrypt* Zertifikate kostenlos und vollautomatisch aus und ist heute
die grösste CA der Welt ([Statistik](https://letsencrypt.org/stats/)).

**Wenn CAs versagen:** 2011 wurde die niederländische CA DigiNotar gehackt; die Angreifer
stellten gefälschte Zertifikate für google.com aus, mit denen Nutzende im Iran abgehört
wurden. DigiNotar wurde aus allen Browsern entfernt und ging Konkurs.

</div>
