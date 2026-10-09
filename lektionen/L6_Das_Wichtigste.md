---
lektion: 6
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Kryptografie im Alltag"
kurz: "Besprechung nach den Kurzvorstellungen und Lernzusammenfassung aller fünf Themen – damit niemand nur sein eigenes Thema kennt"
reihenfolge: 15
---

# Das Wichtigste: Kryptografie im Alltag

## Lernziele dieser Lektion

Sie können …

- [ ] für HTTPS, Ende-zu-Ende-Verschlüsselung, Passkeys, E-ID und Post-Quanten-Kryptografie in einem Satz erklären, worum es geht
- [ ] bei jedem dieser Themen die beteiligten Bausteine der Einheit nennen
- [ ] Transport- und Ende-zu-Ende-Verschlüsselung unterscheiden
- [ ] erklären, warum Passkeys sicherer sind als Passwörter
- [ ] erklären, warum Quantencomputer RSA bedrohen, AES aber kaum

Haken Sie ab, was Sie sicher können. Wo es noch hapert, hilft die Zusammenfassung unten.

## Zum Besprechen

1. Welche Bausteine der Einheit kommen in fast allen fünf Themen vor?
2. Was bleibt bei Ende-zu-Ende-Verschlüsselung trotzdem sichtbar?
3. Warum stellt man schon heute auf Post-Quanten-Verfahren um, obwohl es noch keine passenden
   Quantencomputer gibt?

## Die fünf Themen in Kürze

### A · HTTPS (TLS 1.3)

Browser und Server vereinbaren mit **Diffie-Hellman** einen gemeinsamen Schlüssel, ohne ihn zu
übertragen (Farbmischung: Grundfarbe öffentlich, eigene Farbe geheim, Mischungen lassen sich
nicht trennen). Das **Zertifikat** und eine **Signatur** beweisen, dass man mit dem echten Server
spricht – sonst könnte sich ein Angreifer dazwischenschalten (*Man-in-the-Middle*). Die Daten
laufen danach mit **AES**. Weil die Sitzungsschlüssel gelöscht werden, bleiben alte
Verbindungen sicher, auch wenn später ein Schlüssel gestohlen wird (*Forward Secrecy*).

### B · Ende-zu-Ende-Verschlüsselung

Bei **Transportverschlüsselung** kann der Anbieter auf seinem Server mitlesen, bei
**Ende-zu-Ende-Verschlüsselung** (Signal, Threema, WhatsApp) haben nur die Geräte von Absender
und Empfänger die Schlüssel. Mit der «Sicherheitsnummer» prüft man, ob der öffentliche Schlüssel
wirklich zur Kontaktperson gehört. Sichtbar bleiben die **Metadaten**: wer mit wem wann wie oft.

### C · Passkeys

Statt eines Passworts erzeugt das Gerät pro Website ein Schlüsselpaar; der Server erhält nur den
öffentlichen Schlüssel. Beim Anmelden **signiert** das Gerät eine Zufallszahl des Servers.
Passkeys sind an die echte Domain gebunden (Phishing nützt nichts), und ein Datenleck beim Server
verrät nur öffentliche Schlüssel.

### D · E-ID

Der **Bund signiert** die Angaben, die E-ID liegt in der App swiyu auf dem eigenen Smartphone
(freiwillig, gratis, Start voraussichtlich 1. Dezember 2026). Prüfstellen kontrollieren die
Signatur über die Vertrauensinfrastruktur des Bundes – ähnlich wie bei Zertifikaten. Man kann
**nur einzelne Angaben** zeigen, z. B. «über 18». Angenommen am 28. September 2025 mit 50,4 % Ja.

### E · Post-Quanten-Kryptografie

Ein grosser Quantencomputer könnte mit dem Shor-Algorithmus **RSA und Diffie-Hellman** brechen;
**AES** bliebe mit langen Schlüsseln sicher. Weil Angreifer Daten heute speichern und später
entschlüsseln könnten (*Harvest now, decrypt later*), werden seit 2024 standardisierte Verfahren
wie **ML-KEM** bereits eingesetzt – *hybrid* zusammen mit den klassischen, für den Fall, dass die
neuen doch Schwächen haben.

## Welche Bausteine wo stecken

| Baustein | HTTPS | E2EE | Passkeys | E-ID | Post-Quanten |
|---|---|---|---|---|---|
| AES (symmetrisch) | ✓ | ✓ | | | bleibt sicher |
| Schlüsselaustausch / asymmetrisch | ✓ | ✓ | ✓ | ✓ | wird ersetzt |
| Hashfunktion | ✓ | ✓ | ✓ | ✓ | |
| Signatur | ✓ | ✓ | ✓ | ✓ | wird ersetzt |
| Zertifikat / Vertrauensregister | ✓ | | | ✓ | |

**Merksatz:** Moderne Sicherheit entsteht aus wenigen Bausteinen, die immer neu kombiniert
werden: symmetrisch für die Daten, asymmetrisch für Schlüssel und Signaturen, Hashwerte für die
Integrität, Zertifikate für das Vertrauen.
