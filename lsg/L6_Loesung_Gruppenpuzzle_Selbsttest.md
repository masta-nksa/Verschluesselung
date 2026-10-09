---
lektion: 6
titel: "Musterlösung: Gruppenpuzzle und Selbsttest"
kurz: "Kernsätze und Antworten zu den fünf Expertenthemen, Lösungen des Selbsttests"
---

# Musterlösung: Gruppenpuzzle und Selbsttest

## Bausteintabelle

| Baustein | A HTTPS | B E2EE | C Passkeys | D E-ID | E Post-Quanten |
|---|---|---|---|---|---|
| symmetrisch (AES) | ✓ | ✓ | | | (✓ bleibt sicher) |
| asymmetrisch / Schlüsselaustausch | ✓ | ✓ | ✓ | ✓ | ✓ |
| Hashfunktion | ✓ | ✓ | ✓ | ✓ | |
| digitale Signatur | ✓ | ✓ | ✓ | ✓ | ✓ |
| Zertifikat / Vertrauensregister | ✓ | (Sicherheitsnummer) | | ✓ | |

Abweichende Kreuze sind vertretbar, wenn sie begründet sind.

## Kernsätze und Antworten

**A · HTTPS.** Browser und Server vereinbaren per Diffie-Hellman einen geheimen Schlüssel,
das signierte Zertifikat beweist die Identität des Servers, die Daten laufen mit AES.
1. Öffentlich: Grundfarbe und die beiden Mischungen. Geheim: die eigenen Farben. Eve kann die
   Mischungen nicht trennen; mischt sie beide, enthält das Ergebnis die Grundfarbe doppelt.
2. Das Zertifikat bzw. die Signatur des Servers über den Handshake.
3. AES ist viel schneller; asymmetrisch werden nur die Schlüssel vereinbart (hybrid).
4. Weil die Sitzungsschlüssel gelöscht werden, kann man aufgezeichnete Verbindungen auch dann
   nicht entschlüsseln, wenn später der private Schlüssel des Servers gestohlen wird.

**B · E2EE.** Nur die Endgeräte besitzen die Schlüssel; der Anbieter sieht nur Geheimtext –
aber Metadaten.
1. Transport: Alice →🔒→ Server (liest Klartext) →🔒→ Bob. E2EE: Alice →🔒→ Server (sieht nur
   Geheimtext) →🔒→ Bob.
2. Den Man-in-the-Middle-Angriff: Man prüft, ob der öffentliche Schlüssel wirklich von der
   Kontaktperson stammt (wie ein Zertifikat, nur persönlich geprüft).
3. Wer wann mit wem wie oft und von wo kommuniziert – daraus lassen sich Beziehungen,
   Gewohnheiten, Krankheiten (Chat mit Onkologie) oder politische Kontakte ablesen.
4. Ein Generalschlüssel oder eine Scan-Funktion ist eine Schwachstelle, die auch Kriminelle oder
   fremde Staaten ausnutzen können, sobald sie gestohlen oder entdeckt wird.

**C · Passkeys.** Das Gerät signiert eine Zufallszahl des Servers mit einem privaten Schlüssel,
der das Gerät nie verlässt; der Server kennt nur den öffentlichen Schlüssel.
1. Asymmetrisches Schlüsselpaar, Signatur, Hash. Ablauf: Server schickt Challenge → Gerät
   (nach Entsperren) signiert → Server prüft mit gespeichertem öffentlichem Schlüssel.
2. Der Passkey ist an die echte Domain gebunden; für *g00gle.com* existiert gar kein Passkey,
   das Gerät bietet ihn nicht an. Ein Passwort hingegen tippt man überall ein.
3. Bei Passwörtern Hashwerte, die sich bei schwachen Passwörtern knacken lassen; bei Passkeys
   nur öffentliche Schlüssel – damit kann man sich nirgends anmelden.

**D · E-ID.** Der Bund signiert die Personenangaben; die App zeigt nur die nötigen Angaben;
die Prüfstelle kontrolliert die Signatur über die Vertrauensinfrastruktur.
1. Signatur (Bund = Aussteller), Vertrauensregister (vergleichbar mit CA), Prüfer kontrolliert
   die Signatur mit dem öffentlichen Schlüssel des Bundes; das Smartphone hat ein eigenes
   Schlüsselpaar, damit die E-ID nicht einfach kopiert werden kann.
2. Datensparsamkeit: Der Shop erfährt nur, was er wissen muss. Es entstehen keine Kopien der ID
   und weniger Daten, die gestohlen werden können.
3. Dafür (Beispiele): einfache Online-Behördengänge, sichere Altersprüfung, staatlich statt
   privat betrieben, freiwillig und gratis. Dagegen (Beispiele): Datenschutzbedenken, Gefahr der
   «Überidentifikation» (alle verlangen plötzlich die ID), Abhängigkeit vom Smartphone und damit
   von Apple/Google, digitale Ausgrenzung.
4. Zum Beispiel Führerausweis, Lernfahrausweis, Diplome, Wohnsitzbestätigung, Betreibungsauszug.

**E · Post-Quanten.** Quantencomputer würden RSA und Diffie-Hellman brechen; neue Verfahren wie
ML-KEM werden schon heute zusätzlich eingesetzt, weil Daten jetzt gespeichert und später
entschlüsselt werden könnten.
1. Der Shor-Algorithmus löst Faktorisieren und diskreten Logarithmus effizient. Für AES gibt es
   nur Grover, der das Durchprobieren lediglich beschleunigt – längere Schlüssel genügen.
2. Angreifer speichern heute verschlüsselten Verkehr, um ihn in 10–20 Jahren zu entschlüsseln.
   Betroffen sind Daten, die lange geheim bleiben müssen: Gesundheitsdaten, Staatsgeheimnisse,
   Geschäftsgeheimnisse, Quellenschutz von Journalistinnen.
3. Die neuen Verfahren sind jung; falls doch eine Schwäche gefunden wird, schützt immer noch das
   bewährte klassische Verfahren. Ein Angreifer müsste beide brechen.
4. Je nach Browser: In aktuellen Versionen von Chrome, Edge, Firefox und Safari meist «ja».

## Selbsttest

1. **Integrität, Authentizität, Verbindlichkeit** – nicht Vertraulichkeit (nicht verschlüsselt).
2. *caesar*; 26 Schlüssel (25 sinnvolle).
3. Ein Verfahren muss auch dann sicher sein, wenn der Gegner es kennt; geheim ist nur der Schlüssel.
4. Weil jeder Buchstabe immer gleich ersetzt wird, bleiben die Buchstabenhäufigkeiten erhalten;
   man knackt den Schlüssel Buchstabe für Buchstabe statt durch Ausprobieren.
5. *abc* mit BB → **BCD**. Vigenère verwendet je nach Position verschiedene Verschiebungen
   (polyalphabetisch), Caesar immer dieselbe (monoalphabetisch).
6. 10¹² / 10⁹ = 1000 s ≈ 17 Minuten → **unsicher**.
7. Das **Schlüsselaustauschproblem**: Man muss vorher keinen geheimen Schlüssel austauschen.
8. n = **33**, φ = 2 · 10 = **20**, d = **3** (7 · 3 = 21, 21 mod 20 = 1), c = 2⁷ mod 33 = 128 mod 33 = **29**.
9. Einwegfunktion: Multiplizieren zweier Primzahlen (leicht) vs. Faktorisieren von n (schwer).
   Falltür: die Kenntnis von p und q (bzw. d).
10. privaten · öffentlichen · Hashwert.
11. Die CA bestätigt mit ihrer Signatur, dass der öffentliche Schlüssel zu einem bestimmten
    Namen (Domain) gehört. Der Browser vertraut ihr, weil ihr Root-Zertifikat (oder das ihrer
    übergeordneten CA) im Browser bzw. Betriebssystem vorinstalliert ist.
12. Richtig sind nur **Passkey** (nie ein Geheimnis übertragen) und **E-ID** (vom Bund
    signierter Nachweis). Falsch: Bei HTTPS laufen die Daten mit AES, nicht RSA; E2EE schützt
    die Metadaten nicht; AES-256 bleibt auch gegen Quantencomputer sicher.
