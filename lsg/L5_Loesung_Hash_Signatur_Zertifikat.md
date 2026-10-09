---
lektion: 5
titel: "Musterlösung: Hashfunktionen, Signaturen und Zertifikate"
kurz: "Eigenschaften von Hashfunktionen, Ablaufschema der Signatur, Erwartungen zur Zertifikatsuntersuchung"
---

# Musterlösung: Hashfunktionen, Signaturen und Zertifikate

## Hashfunktionen

**Aufgabe 1:**

| Experiment | Eigenschaft |
|---|---|
| a) | **Feste Länge:** Egal wie lang die Eingabe ist, der Hashwert hat immer 64 Hexziffern (256 Bit). |
| b) | **Deterministisch:** Gleiche Eingabe ergibt immer denselben Hashwert. |
| c) | **Lawineneffekt:** Eine winzige Änderung verändert rund die Hälfte aller Bits (etwa 128 von 256); die Hashwerte haben keine erkennbare Ähnlichkeit. |
| d) | **Einwegfunktion:** Aus dem Hashwert lässt sich die Eingabe nicht zurückrechnen. Man findet sie nur durch Raten und Vergleichen. Das Tier ist **pinguin**. Bei kleinen Eingabemengen (Tiere, kurze Passwörter) funktioniert Raten – darum Salt und langsame Hashfunktionen. |

**Aufgabe 2:** Um zwei Texte mit gleichem SHA-256-Wert zu finden, müsste man rund 2¹²⁸ ≈
3,4 · 10³⁸ Hashwerte berechnen (so viele wie AES-128-Schlüssel) – das ist praktisch unmöglich.
Kollisionen existieren also, aber niemand kann sie finden (*Kollisionsresistenz*).

**Aufgabe 3:** Download prüfen → **Integrität** · Passwort als Hash speichern →
**Vertraulichkeit** des Passworts (auch bei einem Datenleck kennt der Angreifer das Passwort
nicht direkt) · Signatur über den Hashwert → **Integrität, Authentizität, Verbindlichkeit**.

## Signaturen

**Aufgabe 1:** Hashwert · privaten · Signatur · öffentlichen · gleich · verändert.

**Aufgabe 2:**
1. «Signatur ungültig» – der Hashwert des veränderten Texts passt nicht mehr zur Signatur.
2. Ebenfalls ungültig – die Signatur ergibt zurückgerechnet einen anderen Wert.
3. **Integrität** (und Authentizität).

**Aufgabe 3:** Die Signatur ist **gültig**! Mathematisch passt sie ja zu Eves öffentlichem
Schlüssel. Bob fehlt die Gewissheit, dass der öffentliche Schlüssel wirklich Alice gehört.
Eine Signatur beweist nur: «Wer den zu *diesem* öffentlichen Schlüssel passenden privaten
Schlüssel besitzt, hat das signiert.» → Zertifikate.

**Aufgabe 4:**

| | Verschlüsseln | Signieren |
|---|---|---|
| Wer verwendet seinen privaten Schlüssel? | Empfänger (zum Entschlüsseln) | Absender (zum Signieren) |
| Wer verwendet einen öffentlichen Schlüssel? | Absender (den des Empfängers) | Prüfer (den des Absenders) |
| Gesicherte Schutzziele | Vertraulichkeit | Integrität, Authentizität, Verbindlichkeit |
| Kann Eve das Dokument lesen? | nein | ja – eine Signatur verschlüsselt nicht |

## Zertifikate

**Aufgabe 1:** Die Werte hängen von der Website und vom Datum ab. Typisch: «Ausgestellt für»
enthält die Domain (z. B. *www.admin.ch*), «Ausgestellt von» eine Zwischen-CA (z. B. *R12* von
Let's Encrypt, *DigiCert*, *Sectigo*, *SwissSign*), oben in der Kette ein Root-Zertifikat
(z. B. *ISRG Root X1*). Laufzeiten: Let's Encrypt 90 Tage, andere CAs höchstens 200 Tage
(Ausstellung ab 15. März 2026) bzw. bis 398 Tage (ältere Zertifikate). Schlüssel: RSA (2048 Bit)
oder EC (elliptische Kurve, z. B. P-256).

**Aufgabe 2:** Root-Zertifikat (im Browser/Betriebssystem vorinstalliert, signiert sich selbst)
→ signiert → Zwischenzertifikat → signiert → Zertifikat der Website.

**Aufgabe 3:** Kurze Laufzeiten begrenzen den Schaden, wenn ein privater Schlüssel gestohlen
oder ein Zertifikat irrtümlich ausgestellt wurde: Es wird bald von selbst ungültig. Das ist
wichtig, weil das vorzeitige Sperren (*Widerruf*) in der Praxis schlecht funktioniert. Die
Betreiber müssen die Erneuerung automatisieren (z. B. mit dem ACME-Protokoll von Let's Encrypt).

**Aufgabe 4:**
- *expired:* Zertifikat abgelaufen – die Gültigkeitsdauer ist überschritten.
- *wrong.host:* Zertifikat gilt für einen anderen Namen – die Identität passt nicht.
- *self-signed:* Zertifikat ist von niemandem signiert, dem der Browser vertraut – die Kette
  endet nicht bei einer Root-CA.

Bei einer echten Website: **nicht weiterklicken**, keine Daten eingeben, die Adresse prüfen,
es später nochmals oder über ein anderes Netz versuchen. Im öffentlichen WLAN kann eine
Warnung auf einen Man-in-the-Middle-Angriff hindeuten.

**Früh fertig:** Certificate Transparency macht jedes ausgestellte Zertifikat öffentlich
sichtbar. Ein Domaininhaber bemerkt so, wenn eine CA (irrtümlich oder nach einem Hack) ein
Zertifikat für seine Domain ausgestellt hat. Browser akzeptieren Zertifikate nur, wenn sie in
solchen Logs eingetragen sind.
