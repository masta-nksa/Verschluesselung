---
lektion: 1
zielgruppe: sus
art: glossar
titel: "Glossar der ganzen Einheit"
kurz: "Alle Fachbegriffe von Algorithmus bis Zertifikat – zum Nachschlagen während der ganzen Einheit"
reihenfolge: 90
---

# Glossar: Verschlüsselung

Dieses Glossar begleitet Sie durch die ganze Einheit. Die Zahl in Klammern nennt die
Lektion, in der der Begriff eingeführt wird.

## Grundbegriffe

| Begriff | Bedeutung |
|---|---|
| **Kryptologie** | Wissenschaft vom Verschlüsseln. Umfasst die **Kryptografie** (Verfahren entwickeln) und die **Kryptoanalyse** (Verfahren knacken). (1) |
| **Klartext / Geheimtext** | Die lesbare bzw. die verschlüsselte Nachricht. Konvention: Klartext klein, Geheimtext GROSS. (1) |
| **Algorithmus** | Die Rechenvorschrift eines Verfahrens, z. B. «verschiebe jeden Buchstaben». (1) |
| **Schlüssel** | Das Geheimnis, das den Algorithmus steuert, z. B. «um 3». (1) |
| **Knacken** | Den Klartext ohne Kenntnis des Schlüssels herausfinden. (1) |
| **Codierung** | Darstellung von Zeichen durch andere Zeichen *ohne* Schlüssel (Morse, ASCII). Keine Verschlüsselung! (1) |
| **Prinzip von Kerckhoffs** | Ein Verfahren muss auch dann sicher sein, wenn der Gegner es kennt. Geheim ist nur der Schlüssel. (1) |
| **Schutzziele** | Vertraulichkeit, Integrität, Authentizität, Verbindlichkeit (oft zusätzlich: Verfügbarkeit). (1) |
| **Alice, Bob, Eve** | Übliche Namen: Alice und Bob kommunizieren, Eve hört mit (*eavesdropper*). (1) |

## Symmetrische Verfahren

| Begriff | Bedeutung |
|---|---|
| **Symmetrische Verschlüsselung** | Derselbe Schlüssel dient zum Ver- und Entschlüsseln. Beispiele: Caesar, Vigenère, AES. (1–3) |
| **Monoalphabetisch** | Jeder Klartextbuchstabe wird immer durch dasselbe Zeichen ersetzt (Caesar, allgemeine Ersetzung). (1–2) |
| **Polyalphabetisch** | Derselbe Klartextbuchstabe wird je nach Position unterschiedlich ersetzt (Vigenère). (2) |
| **Brute Force** | Knacken durch Ausprobieren aller Schlüssel. (1) |
| **Schlüsselraum** | Anzahl aller möglichen Schlüssel: Caesar 26, allgemeine Ersetzung 26! ≈ 4 · 10²⁶, AES-128 2¹²⁸ ≈ 3,4 · 10³⁸. (2–3) |
| **Häufigkeitsanalyse** | Knacken, indem man die Häufigkeit der Geheimzeichen mit der Häufigkeit der Buchstaben in der Sprache vergleicht. Im Deutschen ist e mit rund 17 % am häufigsten. (2) |
| **Kasiski-Test** | Verfahren zum Bestimmen der Schlüssellänge bei Vigenère über die Abstände wiederholter Buchstabenfolgen. (3) |
| **XOR** | Bitweises «entweder–oder»: 0⊕0 = 0, 0⊕1 = 1, 1⊕0 = 1, 1⊕1 = 0. Zweimal mit demselben Schlüssel angewendet ergibt wieder den Klartext. (3) |
| **One-Time-Pad** | XOR mit einem zufälligen Schlüssel, der so lang ist wie die Nachricht und nur einmal verwendet wird. Beweisbar sicher, aber unpraktisch. (3) |
| **AES** | Advanced Encryption Standard (seit 2001). Das heute meistgenutzte symmetrische Verfahren mit 128- oder 256-Bit-Schlüsseln. (3) |
| **Schlüsselaustauschproblem** | Bei symmetrischen Verfahren müssen beide Seiten vorher den gleichen geheimen Schlüssel besitzen. Wie kommt er sicher zur anderen Person? (3) |

## Asymmetrische Verfahren

| Begriff | Bedeutung |
|---|---|
| **Asymmetrische Verschlüsselung** | Zwei verschiedene Schlüssel: Mit dem **öffentlichen** wird verschlüsselt, mit dem **privaten** entschlüsselt. (4) |
| **Einwegfunktion** | Eine Funktion, die leicht zu berechnen, aber praktisch nicht umzukehren ist (Multiplizieren ↔ Faktorisieren). (4) |
| **Falltür (Hintertür)** | Geheime Zusatzinformation, mit der man eine Einwegfunktion doch umkehren kann – bei RSA der private Schlüssel. (4) |
| **RSA** | Asymmetrisches Verfahren von Rivest, Shamir und Adleman (1977). Seine Sicherheit beruht darauf, dass kein effizientes Verfahren zum Faktorisieren grosser Zahlen bekannt ist. (4) |
| **modulo (mod)** | Rest bei der ganzzahligen Division: 17 mod 5 = 2. (4) |
| **Hybride Verschlüsselung** | Ein asymmetrisches Verfahren vereinbart einen Schlüssel, die eigentlichen Daten werden schnell symmetrisch (AES) verschlüsselt. So funktionieren HTTPS und Messenger. (4, 6) |
| **Diffie-Hellman** | Verfahren, mit dem zwei Parteien über eine offene Leitung einen gemeinsamen geheimen Schlüssel vereinbaren. (6) |

## Integrität und Authentizität

| Begriff | Bedeutung |
|---|---|
| **Hashfunktion** | Berechnet aus beliebigen Daten einen kurzen «Fingerabdruck» fester Länge (z. B. SHA-256: 256 Bit). Kleinste Änderungen ändern den Hashwert völlig. (5) |
| **Digitale Signatur** | Der Hashwert eines Dokuments wird mit dem privaten Schlüssel signiert. Jede Person kann mit dem öffentlichen Schlüssel prüfen, ob das Dokument unverändert ist und von wem es stammt. (5) |
| **Zertifikat** | Elektronische Bescheinigung, dass ein öffentlicher Schlüssel zu einer bestimmten Website, Firma oder Person gehört – signiert von einer Zertifizierungsstelle. (5) |
| **Zertifizierungsstelle (CA)** | Vertrauenswürdige Stelle, die Zertifikate ausstellt und signiert (z. B. Let's Encrypt, SwissSign). (5) |
| **Vertrauenskette** | Zertifikat der Website → Zwischenzertifikat → Root-Zertifikat, das im Betriebssystem oder Browser vorinstalliert ist. (5) |

## Anwendungen

| Begriff | Bedeutung |
|---|---|
| **HTTPS / TLS** | Gesichertes Web-Protokoll: Zertifikat prüfen, Schlüssel per Diffie-Hellman aushandeln, Daten mit AES verschlüsseln. Aktuelle Version: TLS 1.3. (6) |
| **Ende-zu-Ende-Verschlüsselung (E2EE)** | Nur Sender und Empfänger können die Nachricht lesen, nicht einmal der Anbieter des Dienstes. (6) |
| **Passkey** | Anmeldung ohne Passwort: Das Gerät beweist mit einer Signatur, dass es den privaten Schlüssel besitzt. (6) |
| **E-ID** | Elektronischer Identitätsnachweis der Schweiz in der App swiyu, mit vom Bund signierten Nachweisen. (6) |
| **Post-Quanten-Kryptografie** | Verfahren, die auch gegen Quantencomputer sicher sein sollen, z. B. ML-KEM (Standard seit 2024). (6) |
