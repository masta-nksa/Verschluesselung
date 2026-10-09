---
lektion: 6
zielgruppe: sus
art: arbeitsblatt
titel: "Gruppenpuzzle: Kryptografie im Alltag"
kurz: "Fünf Expertenthemen – HTTPS, Ende-zu-Ende-Verschlüsselung, Passkeys, E-ID, Post-Quanten-Kryptografie – mit Kurzinfo, Leitfragen und Quellen."
reihenfolge: 10
---

# Gruppenpuzzle: Kryptografie im Alltag

## Ziel

Sie erklären an einem Alltagsbeispiel, welche Bausteine der Einheit darin zusammenwirken, und
können zu allen fünf Themen einen Kernsatz formulieren.

## So funktioniert's

Ihre Gruppe erhält **eines** der fünf Themen. Lesen Sie die Kurzinfo, beantworten Sie die
Leitfragen (die Quellen helfen) und bereiten Sie eine **Vorstellung von 2 Minuten** vor:

- **Was ist das?** – in einem Satz, ohne Fachjargon
- **Welche Bausteine der Einheit stecken darin?** – kreuzen Sie in der Tabelle an
- **Was ist neu, umstritten oder überraschend?**

Stichworte für Ihre Vorstellung:

<div class="antwort" data-zeilen="4"></div>

| Baustein | A | B | C | D | E |
|---|---|---|---|---|---|
| symmetrische Verschlüsselung (AES) | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> |
| asymmetrische Verfahren / Schlüsselaustausch | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> |
| Hashfunktion | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> |
| digitale Signatur | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> |
| Zertifikat / Vertrauensregister | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> | <span class="wahl" data-optionen="✓"></span> |

---

## Thema A: HTTPS – was beim Klick auf ein Schloss passiert

**Kurzinfo.** Jede HTTPS-Verbindung beginnt mit einem *Handshake* nach dem Protokoll TLS 1.3.
Browser und Server vereinbaren dabei einen gemeinsamen geheimen Schlüssel, ohne ihn je zu
übertragen – mit dem **Diffie-Hellman-Verfahren**. Gleichzeitig schickt der Server sein
**Zertifikat** und **signiert** den Handshake, damit der Browser weiss, dass er wirklich mit
dem richtigen Server spricht. Danach werden alle Daten schnell **symmetrisch mit AES**
verschlüsselt. Die Diffie-Hellman-Schlüssel werden nach jeder Sitzung gelöscht. Selbst wer
später den privaten Schlüssel des Servers stiehlt, kann aufgezeichnete Sitzungen nicht mehr
entschlüsseln (*Forward Secrecy*).

<div class="krypto" data-tool="diffie-hellman"></div>

**Leitfragen**

1. Erklären Sie Diffie-Hellman mit der Farbmischung: Was ist öffentlich, was geheim? Warum
   kann Eve das gemeinsame Geheimnis nicht herstellen?
2. Diffie-Hellman allein schützt nicht vor einem Angreifer, der sich in die Mitte setzt und
   mit beiden Seiten je eigene Farben mischt (*Man-in-the-Middle*). Welcher Baustein
   verhindert das?
3. Warum wird für die eigentlichen Daten AES verwendet und nicht RSA?
4. Was bedeutet *Forward Secrecy*, und warum ist sie wertvoll?

**Quellen:** [Cloudflare: Was passiert bei einem TLS-Handshake?](https://www.cloudflare.com/de-de/learning/ssl/what-happens-in-a-tls-handshake/) ·
[Wikipedia: Diffie-Hellman-Schlüsselaustausch](https://de.wikipedia.org/wiki/Diffie-Hellman-Schl%C3%BCsselaustausch)

---

## Thema B: Ende-zu-Ende-Verschlüsselung in Messengern

**Kurzinfo.** Bei der **Transportverschlüsselung** (z. B. normale E-Mail, viele Cloud-Dienste)
ist die Nachricht nur auf dem Weg verschlüsselt; der Anbieter kann sie auf seinem Server lesen.
Bei der **Ende-zu-Ende-Verschlüsselung** (E2EE) verlassen die Schlüssel nie die Geräte von
Absender und Empfänger – nicht einmal der Anbieter kann mitlesen. Signal, Threema (aus der
Schweiz) und WhatsApp verwenden E2EE standardmässig. Die Messenger vereinbaren die Schlüssel
asymmetrisch und verschlüsseln die Nachrichten mit AES; für jede Nachricht wird ein neuer
Schlüssel abgeleitet. Was E2EE *nicht* schützt: **Metadaten** (wer mit wem wann wie oft
kommuniziert) und Nachrichten auf einem entsperrten Handy.

Politisch ist E2EE umstritten: Strafverfolgungsbehörden möchten Zugriff. In der EU wird seit
2022 über die sogenannte *Chatkontrolle* gestritten, in der Schweiz über eine Revision der
Überwachungsverordnung (VÜPF), gegen die sich unter anderem Threema und Proton wehren.

**Leitfragen**

1. Erklären Sie den Unterschied zwischen Transport- und Ende-zu-Ende-Verschlüsselung mit einer
   Skizze (Alice – Server – Bob).
2. In Signal und WhatsApp kann man eine «Sicherheitsnummer» vergleichen, in Threema einen QR-Code
   scannen. Welches Problem aus Lektion 5 lösen diese Funktionen?
3. Was verraten Metadaten, auch wenn der Inhalt verschlüsselt ist? Nennen Sie ein Beispiel.
4. Warum sagen Fachleute, es gebe keine «Hintertür nur für die Guten»?

**Quellen:** [Threema: Warum ist Threema sicher?](https://threema.ch/de/faq/why_secure) ·
[Wikipedia: Ende-zu-Ende-Verschlüsselung](https://de.wikipedia.org/wiki/Ende-zu-Ende-Verschl%C3%BCsselung) ·
[SRF: Proton droht mit Wegzug aus der Schweiz](https://www.srf.ch/news/dialog/maildienst-neue-datenueberwachung-proton-droht-mit-wegzug-aus-der-schweiz)

---

## Thema C: Passkeys – Anmelden ohne Passwort

**Kurzinfo.** Ein **Passkey** ersetzt das Passwort durch ein Schlüsselpaar. Bei der
Registrierung erzeugt Ihr Gerät für *diese eine Website* ein neues Schlüsselpaar und schickt nur
den **öffentlichen Schlüssel** an den Server. Beim Anmelden schickt der Server eine zufällige
Zahl (*Challenge*); Ihr Gerät **signiert** sie mit dem privaten Schlüssel – nachdem Sie es mit
Fingerabdruck, Gesicht oder PIN entsperrt haben. Der Server prüft die Signatur. Der private
Schlüssel verlässt das Gerät nie (oder wird verschlüsselt über den Schlüsselbund von Apple,
Google oder einem Passwortmanager synchronisiert). Google, Apple, Microsoft, GitHub und viele
weitere Dienste unterstützen Passkeys.

**Leitfragen**

1. Welche Bausteine der Einheit stecken in einem Passkey? Beschreiben Sie den Anmeldevorgang
   als Ablauf in drei Schritten.
2. Eine Phishing-Seite *g00gle.com* versucht, Sie zur Anmeldung zu verleiten. Warum nützt ihr
   ein Passkey nichts, ein Passwort hingegen schon?
3. Hacker stehlen die Datenbank des Servers. Was erbeuten sie bei Passwörtern (auch gehasht),
   was bei Passkeys?
4. Probieren Sie es aus: Legen Sie auf [webauthn.io](https://webauthn.io) einen Test-Passkey an
   und melden Sie sich an (es werden keine echten Daten gespeichert).

**Quellen:** [FIDO Alliance: Passkeys](https://fidoalliance.org/passkeys/) ·
[passkeys.io (Demo und Erklärung)](https://www.passkeys.io) ·
[Wikipedia: WebAuthn](https://de.wikipedia.org/wiki/WebAuthn)

---

## Thema D: Die Schweizer E-ID

**Kurzinfo.** Am 28. September 2025 hat das Stimmvolk das Bundesgesetz über die E-ID knapp mit
**50,4 % Ja** angenommen (eine erste Vorlage mit privaten Anbietern war 2021 abgelehnt worden).
Die E-ID wird vom **Bund** herausgegeben, ist freiwillig und kostenlos und liegt in der App
**swiyu** auf dem eigenen Smartphone – es gibt keine zentrale Datenbank, in der festgehalten
wird, wo man sie vorgezeigt hat. Der Start ist voraussichtlich am **1. Dezember 2026**; er wurde
verschoben, um Sicherheitsbedenken und Kritikpunkte aufzunehmen.

Technisch ist die E-ID ein vom Bund **digital signierter Nachweis**. Wer die E-ID prüft
(z. B. ein Onlineshop, der das Alter kontrollieren muss), prüft diese Signatur über die
öffentliche **Vertrauensinfrastruktur** des Bundes – ein ähnliches Prinzip wie bei Zertifikaten.
Die Nutzerin kann **nur einzelne Angaben offenlegen**, z. B. «über 18», ohne Name und
Geburtsdatum zu zeigen. Prüfende Stellen müssen vorab in einem öffentlichen Register angeben,
welche Daten sie wozu abfragen; verlangt jemand mehr, warnt die App.

**Leitfragen**

1. Welche Bausteine der Einheit stecken in der E-ID? Wer signiert, wer prüft, wo liegt welcher
   Schlüssel?
2. Warum ist es für die Privatsphäre ein Vorteil, nur «über 18» vorzuzeigen statt der ganzen ID?
3. Was spricht für die E-ID, was dagegen? Nennen Sie je zwei Argumente aus der
   Abstimmungsdebatte.
4. Welche anderen Nachweise könnten später in swiyu landen?

**Quellen:** [eid.admin.ch](https://www.eid.admin.ch) ·
[Bundesamt für Justiz: Staatliche E-ID](https://www.bj.admin.ch/de/staatliche-e-id) ·
[SRF: E-ID ab 1. Dezember (25.2.2026)](https://www.srf.ch/news/schweiz/digitale-identitaetskarte-bund-fuehrt-e-id-per-1-dezember-ein-und-nimmt-anpassungen-vor)

---

## Thema E: Quantencomputer und Post-Quanten-Kryptografie

**Kurzinfo.** Ein ausreichend grosser **Quantencomputer** könnte mit dem *Shor-Algorithmus*
grosse Zahlen effizient faktorisieren – und damit RSA, Diffie-Hellman und elliptische Kurven
brechen. AES wäre dagegen kaum betroffen (doppelt so lange Schlüssel genügen). Heutige
Quantencomputer sind dafür viel zu klein. Eine Schätzung von Google aus dem Jahr 2025 geht aber
davon aus, dass für RSA-2048 bereits **weniger als eine Million** fehleranfällige Qubits in
weniger als einer Woche genügen könnten – 2019 hatte man noch 20 Millionen geschätzt.

Gefährlich ist das schon heute: Wer verschlüsselte Daten **jetzt speichert**, kann sie später
entschlüsseln (*Harvest now, decrypt later*). Darum hat das US-Normungsinstitut NIST 2024 die
ersten **Post-Quanten-Verfahren** standardisiert, allen voran **ML-KEM** für den
Schlüsselaustausch und **ML-DSA** für Signaturen. Sie beruhen auf mathematischen Problemen
(Gittern), für die auch Quantencomputer keinen schnellen Weg kennen. Chrome, Edge, Firefox und
Apple-Geräte verwenden ML-KEM bereits standardmässig – in Kombination mit dem klassischen
Verfahren (*hybrid*), falls sich das neue doch als schwach erweisen sollte. Laut Cloudflare war
im Frühling 2026 schon über zwei Drittel des Browser-Verkehrs auf ihrem Netz so geschützt.

**Leitfragen**

1. Warum sind RSA und Diffie-Hellman durch Quantencomputer bedroht, AES aber kaum?
2. Was bedeutet *Harvest now, decrypt later*? Für welche Daten ist das heute schon ein Problem?
3. Warum setzt man die neuen Verfahren «hybrid» zusammen mit den alten ein?
4. Testen Sie Ihren Browser auf [pq.cloudflareresearch.com](https://pq.cloudflareresearch.com):
   Ist Ihre Verbindung post-quanten-sicher?

**Quellen:** [NIST: FIPS 203 (ML-KEM)](https://csrc.nist.gov/pubs/fips/203/final) ·
[Gidney 2025: RSA-2048 mit weniger als einer Million Qubits](https://arxiv.org/abs/2505.15917) ·
[Cloudflare Radar: Post-Quanten-Anteil](https://radar.cloudflare.com/adoption-and-usage) ·
[Signal: Post-Quanten-Verschlüsselung (PQXDH)](https://signal.org/blog/pqxdh/)

---

## Notizen zu den anderen Themen

| Thema | Mein Kernsatz |
|---|---|
| A HTTPS | <span class="luecke" data-breite="voll"></span> |
| B Ende-zu-Ende | <span class="luecke" data-breite="voll"></span> |
| C Passkeys | <span class="luecke" data-breite="voll"></span> |
| D E-ID | <span class="luecke" data-breite="voll"></span> |
| E Post-Quanten | <span class="luecke" data-breite="voll"></span> |
