---
layout: material
typ: konzept
zielgruppe: lehrperson
art: konzept
titel: "Gesamtkonzept der Einheit"
kurz: "Rahmenbedingungen, Lernziele, didaktische Leitideen, Änderungen gegenüber dem bisherigen Material und Detailkonzept"
permalink: /konzept.html
---

# Konzept: Unterrichtseinheit «Verschlüsselung» (6 + 1 × 45 Min.)

## Rahmenbedingungen

- **Klasse:** 2. Klasse Gymnasium (Kantonsschule Aargau), Informatik (obligatorisches Fach)
- **Umfang:** 6 Lektionen à 45 Minuten, dazu eine optionale 7. Lektion (Vertiefung RSA-Sicherheit, Debatte, Repetition) – je nach Zeitbudget als Puffer oder für die Lernkontrolle einsetzen.
- **Vorwissen:** Binärsystem und Bits (aus der Einheit Daten/Codierung), Grundbegriffe der Cybersicherheit (Einheit «Cybersicherheit»: Malware, Schutzmassnahmen, 2FA/Passkeys wurden dort kurz erwähnt). Mathematik: Primzahlen, Potenzen, Division mit Rest.
- **Infrastruktur:** Persönliche Geräte (BYOD) mit Browser. Alle Werkzeuge laufen direkt auf dieser Website im Browser, ohne Anmeldung und ohne dass Daten übertragen werden. Für Lektion 4 braucht es einen gemeinsamen Kanal der Klasse (z. B. Teams-Kanal «Verschlüsselung», alternativ Padlet oder Wandtafel).
- **Unterlagen:** Jede Unterlage hat einen Drucken-Knopf. Unter [Dossier]({{ '/dossier.html' | relative_url }}) lassen sich alle SuS-Unterlagen in einem Durchgang drucken.

## Lernziele

Die Schülerinnen und Schüler …

**Schutzziele und Grundbegriffe**
- erklären die Schutzziele Vertraulichkeit, Integrität, Authentizität und Verbindlichkeit an Alltagsbeispielen und ordnen ihnen passende kryptografische Verfahren zu.
- verwenden die Fachbegriffe Klartext, Geheimtext, Schlüssel, Algorithmus, ver- und entschlüsseln, knacken sicher und unterscheiden Verschlüsselung von Codierung.
- erläutern das Prinzip von Kerckhoffs: Die Sicherheit eines Verfahrens darf nur vom Schlüssel abhängen, nicht von der Geheimhaltung des Algorithmus.

**Symmetrische Verschlüsselung**
- verschlüsseln und entschlüsseln Texte mit Caesar- und Vigenère-Verfahren von Hand und mit Werkzeugen.
- unterscheiden mono- und polyalphabetische Verfahren und erklären deren Stärken und Schwächen.
- knacken eine monoalphabetische Verschlüsselung mit einer Häufigkeitsanalyse und beschreiben, wie man bei Vigenère über die Schlüssellänge zum Schlüssel kommt.
- schätzen die Grösse eines Schlüsselraums ab und begründen damit, warum Durchprobieren bei AES aussichtslos ist.
- benennen das Schlüsselaustauschproblem als zentrale Schwäche symmetrischer Verfahren.

**Asymmetrische Verschlüsselung**
- beschreiben die Idee von öffentlichem und privatem Schlüssel und vergleichen asymmetrische mit symmetrischer Verschlüsselung.
- erklären, was eine Einwegfunktion ist, und bringen Multiplizieren/Faktorisieren mit RSA in Verbindung.
- führen RSA mit kleinen Zahlen durch (Schlüssel erzeugen, verschlüsseln, entschlüsseln) und erklären, warum RSA mit grossen Primzahlen heute sicher ist und Quantencomputer das ändern könnten.
- erklären, warum in der Praxis hybride Verfahren eingesetzt werden.

**Hashfunktionen, Signaturen, Zertifikate**
- nennen die Eigenschaften einer kryptografischen Hashfunktion und Anwendungen davon.
- beschreiben den Ablauf einer digitalen Signatur (Hash, privater Schlüssel, Prüfung mit dem öffentlichen Schlüssel) und deren Zweck.
- erklären die Grundidee eines digitalen Zertifikats, die Aufgabe einer Zertifizierungsstelle (CA) und die Vertrauenskette, und lesen ein Zertifikat im Browser.

**Kryptografie im Alltag**
- erklären an mindestens einem Beispiel (HTTPS, Ende-zu-Ende-verschlüsselte Messenger, Passkeys, E-ID, Post-Quanten-Kryptografie), welche der gelernten Bausteine dort zusammenwirken.
- beurteilen die gesellschaftliche Spannung zwischen starker Verschlüsselung und staatlicher Überwachung mit Argumenten beider Seiten.

## Didaktische Leitideen

**1. Die Schutzziele sind der rote Faden.** Lektion 1 legt die vier Schutzziele fest und hält fest, dass Verschlüsselung allein nur eines davon sichert (Vertraulichkeit). Lektionen 2–4 arbeiten an der Vertraulichkeit, Lektion 5 an Integrität, Authentizität und Verbindlichkeit, Lektion 6 zeigt, wie alles zusammenspielt. So wissen die SuS jederzeit, wozu der aktuelle Baustein dient.

**2. Erst benutzen, dann knacken.** Jedes Verfahren wird zuerst angewendet und dann von der Klasse selbst angegriffen. Der Angriff liefert die Motivation für das nächste Verfahren: Caesar → 25 Schlüssel durchprobieren → allgemeine Ersetzung → Häufigkeitsanalyse → Vigenère → Kasiski → AES → Schlüsselaustausch → asymmetrisch → Faktorisieren → Quantencomputer → Post-Quanten-Kryptografie. Die Einheit ist damit eine Kette von «Problem – Lösung – neues Problem».

**3. Selber machen statt zuschauen.** Alle Verfahren gibt es als Werkzeug direkt auf der Website. Die Werkzeuge rechnen ab, zeigen aber jeden Zwischenschritt (Ersetzungstabelle, Spaltenanalyse, Rechenweg bei RSA). Von Hand gerechnet wird dort, wo es dem Verständnis dient (Caesar, Vigenère, RSA mit n = 55), nicht dort, wo es nur Fleissarbeit wäre.

**4. Mathematik nur so weit, wie sie die Idee trägt.** RSA wird über die Einwegfunktion «Multiplizieren ist leicht, Faktorisieren schwer» verstanden. Modulo-Rechnung, φ(n) und das modulare Inverse kommen vor, werden aber nicht bewiesen. Wer mehr will, findet es unter «Früh fertig?».

**5. Stand 2026 statt Stand 1977.** Die historischen Verfahren sind Mittel zum Zweck. Am Schluss stehen die Verfahren, die die SuS täglich benutzen: TLS 1.3 mit Diffie-Hellman-Schlüsselaustausch, Ende-zu-Ende-Verschlüsselung, Passkeys, die Schweizer E-ID und Post-Quanten-Kryptografie, die seit 2024 standardisiert ist und schon heute den Grossteil des Browser-Verkehrs schützt.

**6. Jede Lektion endet mit einer gemeinsamen Sicherung.** In einer Besprechung von 8–10 Minuten werden die wichtigsten Konzepte im Plenum festgehalten. Grundlage ist pro Lektion eine Seite «Das Wichtigste» mit zwei bis drei Leitfragen, Merksätzen und einer Checkliste «Das sollten Sie jetzt können». Sie ist zugleich die Lernzusammenfassung der SuS und ersetzt einen separaten Theorieteil. Die Besprechung steht in der Regel am Schluss, weil die Konzepte zuerst selbst erarbeitet werden; in Lektion 3 kommt sie vor dem Kistenrätsel, damit dieses als offene Frage stehen bleiben kann. Die Seite funktioniert genauso als Rückblick zu Beginn der nächsten Lektion.

## Die Lektionen im Überblick

| Lektion | Thema | Methode | Ergebnis |
|---|---|---|---|
| 1 | Geheimnisse schützen: Schutzziele und Caesar | Einstiegsrätsel, Partnerarbeit, Werkzeug | Schutzziele zugeordnet, Caesar geknackt, Kerckhoffs-Prinzip |
| 2 | Häufigkeitsanalyse und Vigenère | Knack-Wettbewerb in Zweiergruppen, Handarbeit am Vigenère-Quadrat | Maria-Stuart-Brief entschlüsselt, Vigenère beherrscht |
| 3 | Vigenère knacken, AES und das Schlüsselproblem | Werkzeug, Kurzinput, Rechenauftrag, Denkrätsel | Schlüsselraum abgeschätzt, Schlüsselaustauschproblem formuliert |
| 4 | Asymmetrische Verschlüsselung und RSA | Auflösung Kistenrätsel, Klassen-Experiment im Teams-Kanal | eigenes Schlüsselpaar, verschlüsselte Nachrichten ausgetauscht |
| 5 | Hashfunktionen, Signaturen und Zertifikate | Werkzeug-Experimente, Zertifikat im Browser untersuchen | Signaturablauf skizziert, Zertifikatskette gelesen |
| 6 | Kryptografie im Alltag – heute und morgen | Gruppenpuzzle mit fünf Expertenthemen, gemeinsame Zusammenfassung | Kurzvorstellungen, Zusammenfassung aller Themen; Selbsttest als Hausaufgabe |
| 7 *(optional)* | Wie sicher ist RSA? Verschlüsselung und Überwachung | Eve-Modus, Aufwandsrechnung, strukturierte Debatte | Aufwand abgeschätzt, Positionen begründet |

## Was gegenüber dem bisherigen Material geändert wurde

Grundlage war das bisherige OneNote-Dossier (Folien von oinf.ch, Aufgaben zu Caesar, Vigenère, RSA, Signaturen, Zertifikaten und das Fact Sheet zur E-ID). Die Übersicht hilft bei der Entscheidung, was man allenfalls zurückholen will.

### Neu aufgenommen

- **Prinzip von Kerckhoffs** (L1, L3) – das konzeptionell wichtigste Prinzip der modernen Kryptografie fehlte bisher.
- **Codierung ≠ Verschlüsselung** (L1) – Morse und Braille waren bisher als «Verschlüsselung» eingeordnet; der Unterschied (kein Schlüssel) ist ein guter Prüfstein für das Begriffsverständnis.
- **Schlüsselraum und AES** (L3) – vom Durchprobieren bei Caesar (26) über die allgemeine Ersetzung (26! ≈ 4 · 10²⁶) bis AES (2¹²⁸ ≈ 3,4 · 10³⁸). Damit wird «Viele Schlüssel ≠ sicher» (Häufigkeitsanalyse!) und «sicher = grosser Schlüsselraum *und* keine Struktur» greifbar.
- **XOR und One-Time-Pad** (L3, als Vertiefung) – das einzige beweisbar sichere Verfahren und die Brücke zum Rechnen mit Bits.
- **Kistenrätsel mit zwei Vorhängeschlössern** (L3 → L4) – motiviert die asymmetrische Idee, bevor sie erklärt wird.
- **Diffie-Hellman mit Farbmischung** (L6) – im bisherigen Material wurde die Farbanalogie für RSA verwendet; sie gehört eigentlich zu Diffie-Hellman, dem Verfahren, mit dem TLS 1.3 heute den Schlüssel aushandelt.
- **Hashfunktion als eigener Baustein** (L5) mit Lawineneffekt-Experiment und Anwendungen (Passwortspeicherung, Download-Prüfung).
- **Zertifikat im Browser selbst untersuchen** (L5) inklusive der neuen Laufzeitregeln (seit 15. März 2026 höchstens 200 Tage, ab 2029 nur noch 47 Tage).
- **Passkeys** (L6) – direkte Anwendung von Signaturen, die die SuS bereits benutzen.
- **Ende-zu-Ende-Verschlüsselung vs. Transportverschlüsselung** (L6) mit Schweizer Bezug (Threema, Proton, VÜPF-Revision).
- **E-ID technisch statt nur politisch** (L6): signierte Nachweise in der Wallet swiyu, selektive Offenlegung («über 18» statt Geburtsdatum), Vertrauensregister. Das verbindet die E-ID direkt mit Signaturen und Zertifikaten.
- **Post-Quanten-Kryptografie** (L6, L7): NIST-Standards von 2024 (ML-KEM, ML-DSA), «Harvest now, decrypt later», aktuelle Ressourcenschätzungen für das Knacken von RSA-2048.
- **Textbook-RSA ist deterministisch** (L7): Im Eve-Modus fällt auf, dass gleiche Buchstaben gleiche Geheimzahlen ergeben – darum braucht echtes RSA ein zufälliges Padding.

### Gekürzt oder weggelassen

- **Hour of Code (code.org, 6 Levels)** – inhaltlich deckungsgleich mit dem eigenen Häufigkeits-Werkzeug, kostet aber eine halbe Lektion. Als «Früh fertig?»-Link erhalten.
- **Kette aus vier Caesar-Rätseln, Morse-Entschlüsselung** – auf eine kurze Rätselkette als Zusatzaufgabe reduziert.
- **Kasiski-Test mit Primfaktorzerlegung von Hand** – das Werkzeug zeigt Wiederholungen und Abstände; die SuS müssen nur noch die Idee verstehen und die Schlüssellänge ablesen. Die Wikipedia-/inf-schule-Aufgaben sind optional.
- **Externe Übungsseiten** (Dominikus-Gymnasium, serlo, Pohlmann, MysteryTwister, Brickfilm) – als Liste «Weiterüben» auf der Werkzeugseite, nicht mehr als Pflichtaufgaben.
- **RSA-Knackaufgaben 1a–c, 2–4** – in die optionale Lektion 7 verschoben (Eve-Modus und Aufwandsrechnung).
- **E-ID-Fact-Sheet** – ersetzt. Es war KI-generiert, nannte veraltete Termine («frühestens ab 2026», Gesetz «2024/2025 verabschiedet»), eine unbelegte Kostenangabe («Milliardenbereich») und keine prüfbaren Quellen.
- **Lernziel «weitere Anwendungen von Zertifikaten»** (bisher «nicht angeschaut») – ist jetzt mit Passkeys, E-ID und Code-Signing in L5/L6 abgedeckt.

### Korrigiert

- Auf der Folie «RSA Sicherheit» stand, φ herauszufinden bzw. d zu berechnen sei **«NP-schwer»**. Das ist nicht korrekt: Für die Faktorisierung ist kein effizientes Verfahren *bekannt*, sie ist aber nicht als NP-schwer bewiesen (und gilt sogar als vermutlich nicht NP-vollständig). Formulierung jetzt: «Es ist kein effizientes Verfahren bekannt.»
- **«Häufig wird mit RSA nur der Schlüssel für ein symmetrisches Verfahren übermittelt»** – stimmt für ältere TLS-Versionen. Seit TLS 1.3 (2018) wird der Sitzungsschlüssel mit (EC)Diffie-Hellman ausgehandelt, heute meist hybrid mit ML-KEM; RSA dient dort nur noch zum Signieren.
- **«Seither basiert jegliche Form der Verschlüsselung digitaler Kommunikation auf dieser Idee»** – überzeichnet; die Daten selbst werden symmetrisch (AES, ChaCha20) verschlüsselt, asymmetrisch werden nur Schlüssel ausgehandelt und Signaturen erstellt.
- **«Es kostet Zeit und Geld, ein Zertifikat zu bekommen»** – seit Let's Encrypt (2015) sind Zertifikate kostenlos und werden automatisch erneuert. Aktuelle Problemfelder sind eher die immer kürzeren Laufzeiten und das Vertrauen in die Root-CAs.

## Detailkonzept

### Lektion 1: Geheimnisse schützen

Das Einstiegsrätsel (ein Caesar-Text an der Wand) erzeugt sofort den Ehrgeiz, ihn zu knacken. Danach werden die vier Schutzziele an Szenarien erarbeitet. Wichtigste Erkenntnis: Verschlüsselung schützt nur die Vertraulichkeit. Mit dem Caesar-Werkzeug ver- und entschlüsseln die SuS, knacken einen Text durch Durchprobieren aller 26 Schlüssel und leiten daraus das Prinzip von Kerckhoffs ab.

### Lektion 2: Häufigkeitsanalyse und Vigenère

Die allgemeine monoalphabetische Ersetzung hat 26! Schlüssel – Durchprobieren ist unmöglich. Trotzdem knacken die SuS in Zweiergruppen einen Brief, der an die Geschichte von Maria Stuart angelehnt ist, mit der Häufigkeitsanalyse. Damit wird klar: Ein grosser Schlüsselraum genügt nicht. Vigenère verwischt die Häufigkeiten; die SuS verschlüsseln von Hand mit dem Vigenère-Quadrat.

### Lektion 3: Vigenère knacken, AES und das Schlüsselproblem

Mit dem Werkzeug knacken die SuS einen Vigenère-Text (Wiederholungen → Schlüssellänge → Spalten einzeln wie Caesar). Ein Kurzinput führt zu modernen Verfahren (Bits, XOR, AES) und zur Abschätzung des Schlüsselraums. Das Kistenrätsel am Schluss führt zum Problem, das kein symmetrisches Verfahren lösen kann: der Schlüsselaustausch.

### Lektion 4: Asymmetrische Verschlüsselung und RSA

Die Auflösung des Kistenrätsels führt zur Idee von öffentlichem und privatem Schlüssel. Multiplizieren gegen Faktorisieren macht die Einwegfunktion erlebbar. Im Hauptteil erzeugt jede Person ein RSA-Schlüsselpaar, veröffentlicht den öffentlichen Schlüssel im Klassenkanal und tauscht verschlüsselte Nachrichten aus. Alle können alles mitlesen – und trotzdem kann nur die richtige Person entschlüsseln.

### Lektion 5: Hashfunktionen, Signaturen und Zertifikate

Zurück zu den Schutzzielen: Wie stelle ich sicher, dass eine Nachricht nicht verändert wurde und wirklich vom Absender stammt? Hashfunktionen (Lawineneffekt im Werkzeug), dann die digitale Signatur als «Verschlüsseln mit dem privaten Schlüssel» – im Werkzeug fällt jede Änderung sofort auf. Abschliessend untersuchen die SuS das Zertifikat einer echten Website und rekonstruieren die Vertrauenskette.

### Lektion 6: Kryptografie im Alltag

Gruppenpuzzle mit fünf Expertenthemen: HTTPS/TLS 1.3 mit Diffie-Hellman, Ende-zu-Ende-Verschlüsselung, Passkeys, E-ID, Post-Quanten-Kryptografie. Jede Gruppe beantwortet Leitfragen und stellt in 2 Minuten vor, welche Bausteine der Einheit in ihrem Thema stecken. In der anschliessenden Besprechung werden alle fünf Themen zusammengefasst, damit niemand nur sein eigenes Thema kennt. Der Selbsttest zur ganzen Einheit ist Hausaufgabe.

### Lektion 7 (optional): Wie sicher ist RSA? Verschlüsselung und Überwachung

Im Eve-Modus knacken die SuS abgefangene RSA-Nachrichten mit kleinen Schlüsseln und schätzen ab, wie der Aufwand mit der Schlüssellänge wächst. In der zweiten Hälfte eine strukturierte Debatte: Sollen Staaten Zugang zu verschlüsselten Nachrichten erhalten (EU-«Chatkontrolle», Schweizer VÜPF-Revision)?

## Bewertung

Die Einheit selbst wird formativ begleitet: die Besprechung «Das Wichtigste» am Ende jeder Lektion (Leitfragen und Checkliste «Das sollten Sie jetzt können») und der Selbsttest als Hausaufgabe nach Lektion 6 (Lösungen unter `/lsg/`). Für eine summative Prüfung eignen sich die Lernziele oben direkt als Prüfungsraster. Typische Aufgaben: einen kurzen Text mit Caesar/Vigenère ver- oder entschlüsseln, ein Szenario den Schutzzielen zuordnen, RSA mit gegebenen kleinen Zahlen durchrechnen (n = 55), den Signaturablauf skizzieren, ein Alltagsbeispiel analysieren. Die Prüfung selbst gehört nicht in dieses öffentliche Repository.
