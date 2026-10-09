---
lektion: 6
zielgruppe: lehrperson
art: ablaufplan
titel: "Ablaufplan Lektion 6"
kurz: "Zeitraster Gruppenpuzzle, Gruppenbildung, Erwartungshorizont der Vorstellungen, Selbsttest"
reihenfolge: 1
---

# Ablaufplan Lektion 6: Kryptografie im Alltag

**45 Min. | Expertengruppen, Plenum, Einzelarbeit**

## Vorbereitung

- Fünf Gruppen à 4–5 Personen festlegen (bei 24 SuS: 5 × 5, eine Gruppe mit 4). Wer schwächer ist, eher in Thema C (Passkeys) oder D (E-ID); Thema E ist am anspruchsvollsten.
- Timer sichtbar projizieren – bei fünf Vorstellungen wird es sonst knapp.
- Prüfen, ob webauthn.io und pq.cloudflareresearch.com im Schulnetz erreichbar sind.

## Zeitraster

| Zeit | Phase | Was passiert | Material |
|---|---|---|---|
| 0–2 | Gruppen | Einteilung, Themen verteilen | Gruppenpuzzle |
| 2–20 | Expertenphase | Kurzinfo, Leitfragen, Bausteintabelle, Vorstellung vorbereiten (2 Min.) | Gruppenpuzzle |
| 20–33 | Vorstellungen | 5 × 2 Min. + Wechsel. Zuhörende notieren je einen Kernsatz. | Notiztabelle |
| 33–43 | Besprechung | Das Wichtigste: alle fünf Themen in Kürze, Bausteintabelle gemeinsam ausfüllen, Merksatz zum Gesamtbild. | Das Wichtigste L6 |
| 43–45 | Abschluss | Hausaufgabe Selbsttest, Ausblick auf Prüfung bzw. L7 | – |

## Erwartungshorizont der Vorstellungen

| Thema | Kernsatz | Bausteine |
|---|---|---|
| A HTTPS | Browser und Server handeln mit Diffie-Hellman einen Schlüssel aus, das Zertifikat beweist die Identität des Servers, die Daten laufen mit AES. | AES, Schlüsselaustausch, Signatur, Zertifikat, Hash (im Handshake) |
| B E2EE | Nur die Endgeräte kennen die Schlüssel; der Anbieter transportiert nur Geheimtext. Metadaten bleiben sichtbar. | AES, Schlüsselaustausch, Signatur (Identitätsschlüssel), Sicherheitsnummer = Fingerabdruck (Hash) des öffentlichen Schlüssels |
| C Passkeys | Das Gerät beweist mit einer Signatur über eine Zufallszahl, dass es den privaten Schlüssel besitzt; der Server speichert nur den öffentlichen Schlüssel. | asymmetrisch, Signatur, Hash |
| D E-ID | Der Bund signiert die Personenangaben, die Wallet zeigt nur nötige Angaben, Prüfstellen kontrollieren die Signatur über die Vertrauensinfrastruktur. | Signatur, Vertrauensregister (≈ Zertifikat), Hash (für die selektive Offenlegung), asymmetrisch (Gerätebindung) |
| E Post-Quanten | Quantencomputer würden RSA/DH brechen; neue Verfahren (ML-KEM, ML-DSA) werden schon heute hybrid eingesetzt, weil Daten heute gespeichert und später entschlüsselt werden könnten. | Schlüsselaustausch, Signatur; AES bleibt |

## Besprechung «Das Wichtigste»

Leitfragen der Seite «Das Wichtigste» projizieren → 1 Min. zu zweit murmeln → Antworten
sammeln → Merksätze auf der Seite zeigen und kurz kommentieren. Die SuS müssen nichts
abschreiben: Die Seite ist ihre Lernzusammenfassung (auch im Dossier).

**Worauf achten:**

- **Lücken der Vorstellungen schliessen:** Die Zusammenfassung stellt sicher, dass alle fünf Themen gleich gut gesichert sind – unabhängig davon, wie gut eine Gruppe vorgestellt hat. Fehler aus den Vorstellungen hier korrigieren.
- **Bausteintabelle** zuerst von der Klasse ausfüllen lassen (Handzeichen pro Zeile), dann mit der Seite vergleichen.
- **HTTPS «mit RSA verschlüsselt»** ist die häufigste Fehlvorstellung: Daten laufen mit AES, der Schlüssel entsteht per Diffie-Hellman.

## Hinweise

- **Stolperstein Thema A:** Viele meinen, bei HTTPS werde «mit RSA verschlüsselt». Bei TLS 1.3 wird RSA, wenn überhaupt, nur noch für die Signatur im Zertifikat verwendet; der Schlüssel entsteht per (EC)Diffie-Hellman (heute meist hybrid X25519 + ML-KEM). Selbsttest Frage 12 prüft genau das.
- **Thema B politisch:** Die Debatte (Chatkontrolle, VÜPF) nicht in der Vorstellung austragen lassen – dafür ist Lektion 7 da. Stand der VÜPF-Revision im Februar 2026: Der Bundesrat hat nach heftiger Kritik in der Vernehmlassung eine grundlegende Überarbeitung und eine zweite Vernehmlassung beschlossen. Vor dem Einsatz aktuellen Stand prüfen.
- **Thema D aktuell halten:** Start der E-ID voraussichtlich 1. Dezember 2026 (Stand Februar 2026). Läuft die Einheit nach dem Start, kann die Gruppe die swiyu-App live zeigen – vorher nur die Sandbox-Wallet.
- **Thema E Zahlen:** «Über zwei Drittel» bezieht sich auf den von Menschen erzeugten TLS-Verkehr im Netz von Cloudflare (Frühling 2026). Live-Zahl auf Cloudflare Radar.
- **Puffer:** Der Selbsttest ist Hausaufgabe. Die Vorstellungen nicht kürzen; notfalls die Besprechung auf die Bausteintabelle und die Leitfragen beschränken.
