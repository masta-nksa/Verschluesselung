/* ==========================================================================
   Krypto-Werkzeuge für die Unterrichtseinheit «Verschlüsselung»

   Jedes Werkzeug wird in einer Markdown-Datei als leerer Platzhalter gesetzt:

     <div class="krypto" data-tool="caesar" data-text="HALLO" data-shift="3"></div>

   Beim Laden der Seite sucht dieses Skript alle .krypto-Elemente und baut darin
   das Werkzeug auf. Ohne JavaScript bleibt der Platzhalter leer; im Druck
   erscheint statt des Werkzeugs ein Hinweis (siehe CSS, Abschnitt 7).

   Werkzeuge: caesar, haeufigkeit, vigenere, vigenere-knacken, xor, sha256,
              rsa, rsa-eve, signatur, diffie-hellman

   Jedes Werkzeug zeigt neben dem Ergebnis, wie es entsteht: ein Bild des
   Verfahrens (Scheibe, Quadrat, Wahrheitstabelle, Bitraster …), in dem das
   Angeklickte hervorgehoben ist, und eine Zeile, die nachrechnet.

   Alles läuft lokal im Browser – es wird nichts übertragen. Der Stand jedes
   Werkzeugs bleibt im Browser gespeichert (localStorage, nur auf diesem
   Gerät), damit ein Neuladen der Seite keine Arbeit löscht; «Zurücksetzen»
   im Werkzeug stellt den Anfangszustand wieder her.
   ========================================================================== */

(function () {
  "use strict";

  var ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Buchstabenhäufigkeit im Deutschen in Prozent (übliche Referenzwerte,
  // Umlaute als AE/OE/UE gezählt).
  var DEUTSCH = {
    A: 6.51, B: 1.89, C: 3.06, D: 5.08, E: 17.40, F: 1.66, G: 3.01, H: 4.76,
    I: 7.55, J: 0.27, K: 1.21, L: 3.44, M: 2.53, N: 9.78, O: 2.51, P: 0.79,
    Q: 0.02, R: 7.00, S: 7.27, T: 6.15, U: 4.35, V: 0.67, W: 1.89, X: 0.03,
    Y: 0.04, Z: 1.13
  };

  // ---------------------------------------------------------------- Helfer

  function el(tag, attrs, kinder) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") e.textContent = attrs[k];
        else if (k === "html") e.innerHTML = attrs[k];
        else if (k === "class") e.className = attrs[k];
        else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), attrs[k]);
        else e.setAttribute(k, attrs[k]);
      });
    }
    (kinder || []).forEach(function (k) {
      if (k == null) return;
      e.appendChild(typeof k === "string" ? document.createTextNode(k) : k);
    });
    return e;
  }

  var zaehler = 0;
  function feld(label, eingabe, hilfe) {
    var id = "kt-" + (++zaehler);
    eingabe.id = id;
    return el("div", { class: "kt-feld" }, [
      el("label", { for: id, text: label }),
      eingabe,
      hilfe ? el("small", { class: "kt-hilfe", text: hilfe }) : null
    ]);
  }

  function textfeld(wert, zeilen) {
    var t = el("textarea", { rows: String(zeilen || 3), spellcheck: "false", autocomplete: "off" });
    t.value = wert || "";
    return t;
  }

  function eingabe(wert, typ, extra) {
    var i = el("input", Object.assign({ type: typ || "text", spellcheck: "false", autocomplete: "off" }, extra || {}));
    i.value = wert == null ? "" : wert;
    return i;
  }

  function knopf(text, aktion, klasse) {
    return el("button", { type: "button", class: "kt-knopf" + (klasse ? " " + klasse : ""), onclick: aktion, text: text });
  }

  function ausgabe(klasse) {
    return el("div", { class: "kt-ausgabe" + (klasse ? " " + klasse : ""), "aria-live": "polite" });
  }

  function titel(text) {
    return el("p", { class: "kt-titel" }, [el("span", { "aria-hidden": "true", text: "⚙ " }), text]);
  }

  // Bausteine für die Ansichten, die zeigen, wie ein Ergebnis entsteht.
  function fett(text, klasse) { return el("b", klasse ? { class: klasse, text: text } : { text: text }); }
  function ablesefeld() { return el("div", { class: "kt-ablesen", "aria-live": "polite" }); }

  function svg(tag, attrs, kinder) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]);
    });
    (kinder || []).forEach(function (k) { e.appendChild(k); });
    return e;
  }

  // Eine Spalte im Balkendiagramm: Wert oben, Balken (anteil 0 … 1, dahinter
  // optional eine Vergleichslinie), darunter Beschriftung und Zusatzzeile.
  function balkenSpalte(hinweis, wert, anteil, beschriftung, vergleich, zusatz) {
    return el("div", { class: "kt-balken-spalte", title: hinweis }, [
      el("span", { class: "kt-balken-feld" }, [
        vergleich == null ? null : el("span", { class: "kt-balken-ref", style: "height:" + (vergleich * 100) + "%" }),
        el("span", { class: "kt-balken-bar", style: "height:" + (anteil * 100) + "%" }, [el("span", { class: "kt-balken-wert", text: wert })])
      ]),
      el("span", { class: "kt-balken-buchstabe", text: beschriftung }),
      zusatz == null ? null : el("span", { class: "kt-balken-zusatz", text: zusatz || " " })
    ]);
  }

  // Rechnung im Alphabet: «9 + 13 = 22», mit Überlauf «20 + 18 = 38,  38 − 26 = 12».
  // richtung −1 zieht ab (entschlüsseln).
  function rechnung26(a, b, richtung) {
    var s = a + richtung * b;
    function z(x) { return x < 0 ? "−" + (-x) : String(x); }
    return a + (richtung > 0 ? " + " : " − ") + b + " = " + z(s) +
      (s > 25 ? ",  " + s + " − 26 = " + (s - 26) : s < 0 ? ",  " + z(s) + " + 26 = " + (s + 26) : "");
  }

  function kopierKnopf(quelle) {
    return knopf("Kopieren", function (ev) {
      var text = typeof quelle === "function" ? quelle() : quelle.textContent;
      var b = ev.currentTarget;
      function ok() { b.textContent = "Kopiert ✓"; setTimeout(function () { b.textContent = "Kopieren"; }, 1500); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok, function () { altKopieren(text); ok(); });
      } else { altKopieren(text); ok(); }
    }, "kt-klein");
  }
  function altKopieren(text) {
    var t = el("textarea"); t.value = text; document.body.appendChild(t);
    t.select(); try { document.execCommand("copy"); } catch (e) { /* egal */ }
    document.body.removeChild(t);
  }

  // Umlaute auflösen, Grossbuchstaben – Leerzeichen und Satzzeichen bleiben.
  function gross(text) {
    return text.toUpperCase()
      .replace(/Ä/g, "AE").replace(/Ö/g, "OE").replace(/Ü/g, "UE").replace(/ß/g, "SS");
  }
  function nurBuchstaben(text) { return gross(text).replace(/[^A-Z]/g, ""); }
  function idx(c) { return ABC.indexOf(c); }
  function mod(a, m) { return ((a % m) + m) % m; }
  function zahlen(text) { return (String(text).match(/\d+/g) || []); }

  function zaehle(text) {
    var z = {}; ABC.split("").forEach(function (c) { z[c] = 0; });
    var n = 0;
    for (var i = 0; i < text.length; i++) { if (z[text[i]] !== undefined) { z[text[i]]++; n++; } }
    return { z: z, n: n };
  }

  // Chi-Quadrat-Abstand einer Buchstabenfolge zur deutschen Verteilung,
  // wenn man sie um "verschiebung" zurückschiebt. Kleiner = deutscher.
  function chiQuadrat(buchstaben, verschiebung) {
    var n = buchstaben.length, obs = {}, chi = 0;
    ABC.split("").forEach(function (c) { obs[c] = 0; });
    for (var i = 0; i < n; i++) obs[ABC[mod(idx(buchstaben[i]) - verschiebung, 26)]]++;
    ABC.split("").forEach(function (c) {
      var exp = DEUTSCH[c] / 100 * n;
      chi += (obs[c] - exp) * (obs[c] - exp) / exp;
    });
    return chi;
  }
  function besteVerschiebung(buchstaben) {
    var best = 0, bestWert = Infinity;
    for (var s = 0; s < 26; s++) {
      var w = chiQuadrat(buchstaben, s);
      if (w < bestWert) { bestWert = w; best = s; }
    }
    return best;
  }

  // ---------------------------------------------------- Zahlentheorie (BigInt)

  function big(x) { return BigInt(x); }
  function modPow(b, e, m) {
    b = big(b); e = big(e); m = big(m);
    if (m === 1n) return 0n;
    var r = 1n; b = b % m;
    while (e > 0n) {
      if (e & 1n) r = (r * b) % m;
      e >>= 1n; b = (b * b) % m;
    }
    return r;
  }
  function ggT(a, b) { a = big(a); b = big(b); while (b) { var t = b; b = a % b; a = t; } return a < 0n ? -a : a; }
  function modInv(a, m) {
    a = big(a); m = big(m);
    var r0 = m, r1 = mod2(a, m), s0 = 0n, s1 = 1n;
    while (r1 !== 0n) {
      var q = r0 / r1;
      var t = r0 - q * r1; r0 = r1; r1 = t;
      t = s0 - q * s1; s0 = s1; s1 = t;
    }
    if (r0 !== 1n) return null;
    return mod2(s0, m);
  }
  function mod2(a, m) { var r = a % m; return r < 0n ? r + m : r; }
  function istPrim(n) {
    n = Number(n);
    if (!Number.isSafeInteger(n) || n < 2) return false;
    if (n % 2 === 0) return n === 2;
    for (var i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
    return true;
  }
  function zufallsPrim(min, max) {
    for (;;) {
      var k = min + Math.floor(Math.random() * (max - min + 1));
      if (istPrim(k)) return k;
    }
  }
  function waehleE(phi) {
    var kandidaten = [17, 5, 7, 11, 13, 19, 23, 29, 31, 37, 41, 43, 47, 3];
    for (var i = 0; i < kandidaten.length; i++) {
      if (big(kandidaten[i]) < phi && ggT(kandidaten[i], phi) === 1n) return big(kandidaten[i]);
    }
    for (var e = 3n; e < phi; e += 2n) if (ggT(e, phi) === 1n) return e;
    return null;
  }

  // Text <-> Zahlenblöcke: Leerzeichen = 00, A = 01 … Z = 26.
  // Ein Block umfasst so viele Zeichen, dass jede Blockzahl sicher kleiner als n ist.
  function blockLaenge(n) {
    n = big(n); var k = 0, p = 100n;
    while (p <= n) { k++; p *= 100n; }
    return k;
  }
  function textNormal(text) { return gross(text).replace(/[^A-Z ]/g, "").replace(/ +/g, " "); }
  function zeichenCode(c) { return c === " " ? "00" : String(idx(c) + 1).padStart(2, "0"); }
  function codeZeichen(s) { var z = parseInt(s, 10); return z === 0 ? " " : (z >= 1 && z <= 26 ? ABC[z - 1] : "?"); }
  function textZuBloecken(text, k) {
    var t = textNormal(text), bl = [];
    while (t.length % k !== 0) t += " ";
    for (var i = 0; i < t.length; i += k) {
      var stueck = t.slice(i, i + k);
      bl.push({ text: stueck, zahl: big(stueck.split("").map(zeichenCode).join("")) });
    }
    return bl;
  }
  function blockZuText(zahl, k) {
    var s = zahl.toString().padStart(2 * k, "0"), out = "";
    if (s.length > 2 * k) return "?";
    for (var i = 0; i < s.length; i += 2) out += codeZeichen(s.slice(i, i + 2));
    return out;
  }
  function schluesselLesen(text) {
    var z = zahlen(text);
    if (z.length < 2) return null;
    return { a: big(z[0]), n: big(z[1]) };
  }

  // ------------------------------------------------------------- SHA-256
  // Kompakte Implementierung (synchron, damit sie auch ohne sicheren Kontext
  // läuft). Liefert den Hashwert als Hex-String.
  function sha256(text) {
    var bytes = new TextEncoder().encode(text);
    var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var l = bytes.length, bitLen = l * 8;
    var gesamt = ((l + 9 + 63) >> 6) << 6;
    var m = new Uint8Array(gesamt);
    m.set(bytes); m[l] = 0x80;
    var dv = new DataView(m.buffer);
    dv.setUint32(gesamt - 4, bitLen >>> 0);
    dv.setUint32(gesamt - 8, Math.floor(bitLen / 0x100000000));
    var w = new Uint32Array(64);
    function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
    for (var off = 0; off < gesamt; off += 64) {
      for (var i = 0; i < 16; i++) w[i] = dv.getUint32(off + i * 4);
      for (i = 16; i < 64; i++) {
        var s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        var s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (i = 0; i < 64; i++) {
        var S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[i] + w[i]) >>> 0;
        var S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    return H.map(function (x) { return x.toString(16).padStart(8, "0"); }).join("");
  }

  // ================================================================ CAESAR

  function caesarText(text, k) {
    return gross(text).replace(/[A-Z]/g, function (c) { return ABC[mod(idx(c) + k, 26)]; });
  }

  // Chiffrierscheibe: aussen das Klartextalphabet (fest), innen das
  // Geheimtextalphabet, das sich um den Schlüssel dreht. zeige(k, p) dreht die
  // innere Scheibe und markiert das Paar zum Klartextbuchstaben p.
  function caesarScheibe(beiWahl) {
    var W = 360 / 26, felder = [], aussen = [], innen = [], markiert = [], drehung = 0;
    function punkt(r, grad) {
      var a = (grad - 90) * Math.PI / 180;
      return (r * Math.cos(a)).toFixed(2) + " " + (r * Math.sin(a)).toFixed(2);
    }
    function sektor(i) {
      var a = (i - .5) * W, b = (i + .5) * W;
      return "M" + punkt(98, a) + " A98 98 0 0 1 " + punkt(98, b) + " L" + punkt(54, b) + " A54 54 0 0 0 " + punkt(54, a) + " Z";
    }
    var bild = svg("svg", { class: "kt-scheibe", viewBox: "-100 -100 200 200", role: "img", "aria-label": "Chiffrierscheibe: aussen Klartext, innen Geheimtext" },
      [svg("circle", { r: "98" }), svg("circle", { class: "kt-scheibe-ring", r: "76" }), svg("circle", { class: "kt-scheibe-loch", r: "54" })]);
    var ring = svg("g", { class: "kt-scheibe-innen" }), mitte = svg("text", { class: "kt-scheibe-mitte" });
    for (var i = 0; i < 26; i++) {
      felder[i] = svg("path", { d: sektor(i), "data-i": String(i) });
      bild.appendChild(felder[i]);
    }
    for (i = 0; i < 26; i++) {
      var dreh = "rotate(" + (i * W).toFixed(3) + ") ";
      aussen[i] = svg("text", { transform: dreh + "translate(0 -87)", text: ABC[i].toLowerCase() });
      innen[i] = svg("text", { transform: dreh + "translate(0 -65)", text: ABC[i] });
      bild.appendChild(aussen[i]); ring.appendChild(innen[i]);
    }
    bild.appendChild(ring); bild.appendChild(mitte);
    bild.addEventListener("click", function (ev) {
      var i = ev.target.getAttribute("data-i");
      if (i !== null) beiWahl(+i);
    });
    function zeige(k, p) {
      // auf dem kürzeren Weg weiterdrehen, sonst läuft der Schritt 25 → 0 eine ganze Runde zurück
      drehung += mod(-k * W - drehung + 180, 360) - 180;
      ring.style.transform = "rotate(" + drehung.toFixed(3) + "deg)";
      mitte.textContent = "+" + k;
      markiert.forEach(function (e) { e.classList.remove("kt-gewaehlt"); });
      markiert = [felder[p], aussen[p], innen[(p + k) % 26]];
      markiert.forEach(function (e) { e.classList.add("kt-gewaehlt"); });
    }
    return { bild: bild, zeige: zeige };
  }

  function toolCaesar(root) {
    var d = root.dataset;
    var text = textfeld(d.text || "Treffpunkt beim Brunnen", 3);
    var schieber = eingabe(d.shift || "3", "range", { min: "0", max: "25", step: "1" });
    var zahl = el("output", { class: "kt-zahl" });
    var modus = el("select", {}, [el("option", { value: "ver", text: "verschlüsseln" }), el("option", { value: "ent", text: "entschlüsseln" })]);
    modus.value = d.mode === "ent" ? "ent" : "ver";
    var tabelle = el("div", { class: "kt-alphabet" });
    var ablesen = ablesefeld();
    var out = ausgabe("kt-mono");
    var alle = ausgabe("kt-mono kt-liste");
    alle.hidden = true;
    // wahl: Klartextbuchstabe, den Scheibe und Tabelle hervorheben – zu Beginn
    // der erste Buchstabe des Texts.
    var erster = idx(nurBuchstaben(text.value)[0] || "E");
    var wahl = modus.value === "ver" ? erster : mod(erster - parseInt(schieber.value, 10), 26);
    var scheibe = caesarScheibe(function (p) { wahl = p; rechne(); });

    function rechne() {
      var k = parseInt(schieber.value, 10), ver = modus.value === "ver";
      zahl.textContent = k;
      tabelle.innerHTML = "";
      var oben = el("div", { class: "kt-zeile" }, [el("span", { class: "kt-zeilenkopf", text: "Klartext" })]);
      var unten = el("div", { class: "kt-zeile" }, [el("span", { class: "kt-zeilenkopf", text: "Geheimtext" })]);
      for (var i = 0; i < 26; i++) {
        var klasse = i === wahl ? "kt-gewaehlt" : "";
        oben.appendChild(el("span", { "data-i": String(i), class: klasse, text: ABC[i].toLowerCase() }));
        unten.appendChild(el("span", { "data-i": String(i), class: klasse, text: ABC[(i + k) % 26] }));
      }
      tabelle.appendChild(oben); tabelle.appendChild(unten);
      scheibe.zeige(k, wahl);
      var g = (wahl + k) % 26, P = ABC[wahl].toLowerCase(), G = ABC[g];
      ablesen.innerHTML = "";
      ablesen.append(
        el("p", {}, ver ?
          ["Aussen ", fett(P), " (Klartext), innen darunter ", fett(G, "kt-marke"), " (Geheimtext)."] :
          ["Innen ", fett(G, "kt-marke"), " (Geheimtext), aussen darüber ", fett(P), " (Klartext)."]),
        el("p", { class: "kt-mono", text: ver ?
          P + " = " + wahl + ":  " + rechnung26(wahl, k, 1) + "  →  " + G :
          G + " = " + g + ":  " + rechnung26(g, k, -1) + "  →  " + P })
      );
      var r = caesarText(text.value, ver ? k : -k);
      out.textContent = ver ? r : r.toLowerCase();
      if (!alle.hidden) zeigeAlle();
    }
    tabelle.addEventListener("click", function (ev) {
      var i = ev.target.dataset.i;
      if (i !== undefined) { wahl = +i; rechne(); }
    });
    function zeigeAlle() {
      alle.innerHTML = "";
      for (var s = 0; s < 26; s++) {
        alle.appendChild(el("div", {}, [el("strong", { text: String(s).padStart(2, " ") + ": " }), caesarText(text.value, -s).toLowerCase()]));
      }
    }
    var bruteKnopf = knopf("Alle 26 Schlüssel durchprobieren", function () {
      alle.hidden = !alle.hidden;
      bruteKnopf.textContent = alle.hidden ? "Alle 26 Schlüssel durchprobieren" : "Liste ausblenden";
      if (!alle.hidden) zeigeAlle();
    });
    [text, schieber, modus].forEach(function (x) { x.addEventListener("input", rechne); });

    root.append(
      titel("Caesar-Werkzeug"),
      el("div", { class: "kt-mit-bild" }, [
        el("div", {}, [
          feld("Text", text),
          el("div", { class: "kt-reihe" }, [feld("Verschiebung (Schlüssel)", schieber), zahl, feld("Modus", modus)]),
          el("p", { class: "kt-label", text: "Auf der Scheibe ablesen" }),
          ablesen
        ]),
        el("div", { class: "kt-bild" }, [
          scheibe.bild,
          el("p", { class: "kt-hilfe", text: "Aussen Klartext, innen Geheimtext. Buchstaben anklicken." })
        ])
      ]),
      tabelle,
      el("p", { class: "kt-label", text: "Ergebnis" }), out,
      el("div", { class: "kt-knopfreihe" }, [bruteKnopf, kopierKnopf(out)]),
      alle
    );
    rechne();
  }

  // =========================================================== HÄUFIGKEIT

  function toolHaeufigkeit(root) {
    var d = root.dataset;
    var text = textfeld(d.text || "", 6);
    var sortierung = el("select", {}, [el("option", { value: "abc", text: "alphabetisch" }), el("option", { value: "freq", text: "nach Häufigkeit" })]);
    sortierung.value = "freq";
    var balken = el("div", { class: "kt-balken" });
    var ref = el("p", { class: "kt-hilfe" });
    var tabelle = el("div", { class: "kt-subst" });
    var out = ausgabe("kt-mono kt-klartext");
    var ablesen = ablesefeld();
    var felder = {};
    var fokus = null;   // Geheimtextbuchstabe, dessen Vorkommen hervorgehoben sind

    var refSortiert = ABC.split("").sort(function (a, b) { return DEUTSCH[b] - DEUTSCH[a]; });
    ref.innerHTML = "<strong>Deutsch zum Vergleich:</strong> " + refSortiert.slice(0, 12).map(function (c) {
      return c.toLowerCase() + "&nbsp;" + DEUTSCH[c].toFixed(1).replace(".", ",") + "&nbsp;%";
    }).join(" · ") + " …";

    ABC.split("").forEach(function (c) {
      var i = el("input", { type: "text", maxlength: "1", "aria-label": "Klartextbuchstabe für " + c, autocomplete: "off", spellcheck: "false" });
      i.addEventListener("input", function () { i.value = i.value.toLowerCase().replace(/[^a-z]/g, ""); zeichne(); });
      i.addEventListener("focus", function () { if (fokus !== c) { fokus = c; zeichne(); } });
      felder[c] = i;
      tabelle.appendChild(el("label", { class: "kt-subst-zelle" }, [el("span", { text: c }), i]));
    });

    function zeichne() {
      var t = gross(text.value), st = zaehle(t);
      function prozent(c) { return st.n ? st.z[c] / st.n * 100 : 0; }
      var nachRang = sortierung.value === "freq";
      var rang = ABC.split("").sort(function (a, b) { return st.z[b] - st.z[a] || a.localeCompare(b); });
      var reihe = nachRang ? rang : ABC.split("");
      // Nach Häufigkeit sortiert steht hinter jedem Balken, wie häufig der Buchstabe
      // ist, der im Deutschen auf diesem Rang liegt – verglichen wird die Form der
      // Verteilung. Welcher Buchstabe das ist, steht bewusst nicht dabei.
      var max = Math.max(prozent(rang[0]), nachRang ? DEUTSCH[refSortiert[0]] : 0) || 1;
      balken.innerHTML = "";
      reihe.forEach(function (c, nr) {
        var p = prozent(c);
        var spalte = balkenSpalte(c + ": " + st.z[c] + " (" + p.toFixed(1) + " %)", st.z[c] ? p.toFixed(0) : "", p / max, c,
          nachRang ? DEUTSCH[refSortiert[nr]] / max : null);
        spalte.dataset.c = c;
        spalte.classList.toggle("kt-gewaehlt", c === fokus);
        balken.appendChild(spalte);
      });
      // Doppelte Zuordnungen markieren
      var benutzt = {};
      ABC.split("").forEach(function (c) { var v = felder[c].value; if (v) benutzt[v] = (benutzt[v] || 0) + 1; });
      ABC.split("").forEach(function (c) {
        felder[c].classList.toggle("kt-doppelt", !!felder[c].value && benutzt[felder[c].value] > 1);
        felder[c].parentNode.classList.toggle("kt-gewaehlt", c === fokus);
      });
      // Teilentschlüsselung: ersetzte Buchstaben klein und farbig, Rest gross;
      // der gewählte Buchstabe ist an allen Stellen markiert
      out.innerHTML = "";
      var frag = document.createDocumentFragment(), puffer = "";
      function flush() { if (puffer) { frag.appendChild(document.createTextNode(puffer)); puffer = ""; } }
      for (var i = 0; i < t.length; i++) {
        var c = t[i], ersetzt = felder[c] && felder[c].value;
        if (ersetzt || c === fokus) {
          flush();
          frag.appendChild(el("span", { class: (ersetzt ? "kt-ersetzt" : "") + (c === fokus ? " kt-marke" : ""), text: ersetzt || c }));
        } else puffer += c;
      }
      flush(); out.appendChild(frag);
      ablesen.innerHTML = "";
      if (fokus && st.z[fokus]) {
        var r = rang.indexOf(fokus), dt = refSortiert[r];
        ablesen.append(el("p", {}, [fett(fokus, "kt-marke"), " kommt " + st.z[fokus] + "-mal vor (" + prozent(fokus).toFixed(1).replace(".", ",") +
          " %) und liegt auf Rang " + (r + 1) + ". Im Deutschen liegt auf diesem Rang ", fett(dt.toLowerCase()),
          " (" + DEUTSCH[dt].toFixed(1).replace(".", ",") + " %)."]));
      } else if (fokus) ablesen.append(el("p", {}, [fett(fokus, "kt-marke"), " kommt im Text nicht vor."]));
    }
    balken.addEventListener("click", function (ev) {
      var spalte = ev.target.closest("[data-c]");
      if (spalte) { fokus = fokus === spalte.dataset.c ? null : spalte.dataset.c; zeichne(); }
    });
    text.addEventListener("input", zeichne);
    sortierung.addEventListener("input", zeichne);

    root.append(
      titel("Häufigkeitsanalyse"),
      feld("Geheimtext", text),
      el("div", { class: "kt-reihe" }, [feld("Balken sortieren", sortierung)]),
      balken, ref,
      el("p", { class: "kt-hilfe", text: "Nach Häufigkeit sortiert zeigt die Linie hinter den Balken, wie steil die Häufigkeiten im Deutschen abfallen. Balken anklicken: Der Buchstabe wird im Text markiert." }),
      ablesen,
      el("p", { class: "kt-label", text: "Ersetzungstabelle – tragen Sie unter jedem Geheimtextbuchstaben Ihre Vermutung ein (rot = doppelt vergeben)" }),
      tabelle,
      el("p", { class: "kt-label", text: "Teilweise entschlüsselt (klein = schon ersetzt, GROSS = noch offen)" }),
      out,
      el("div", { class: "kt-knopfreihe" }, [knopf("Tabelle leeren", function () {
        ABC.split("").forEach(function (c) { felder[c].value = ""; }); zeichne();
      })])
    );
    zeichne();
  }

  // ============================================================= VIGENÈRE

  function vigenereText(text, schluessel, richtung) {
    var key = nurBuchstaben(schluessel);
    if (!key) return { text: gross(text), zeilen: null };
    var j = 0, k = "";
    var r = gross(text).replace(/[A-Z]/g, function (c) {
      var s = idx(key[j % key.length]); k += key[j % key.length]; j++;
      return ABC[mod(idx(c) + richtung * s, 26)];
    });
    return { text: r, schluesselFolge: k };
  }

  // Vigenère-Quadrat mit derselben Leserichtung wie auf dem Arbeitsblatt:
  // Zeile = Klartext, Spalte = Schlüssel, Feld = Geheimtext. zeige(p, k) hebt
  // den Weg von den beiden Rändern bis zum Kreuzungsfeld hervor; ein Klick ruft
  // beiWahl(p, k) auf (null für die Richtung, die der Klick offen lässt). Die
  // Fusszeile ist nur im vergrösserten Quadrat zu sehen: Dort verdeckt es die
  // Erklärung daneben.
  function vigenereQuadrat(beiWahl) {
    var oben = [], links = [], zellen = [], markiert = [];
    var fuss = el("caption", { "aria-hidden": "true" });
    var tab = el("table", { class: "kt-quadrat", "aria-label": "Vigenère-Quadrat: Zeile Klartext, Spalte Schlüssel" }, [fuss]);
    var kopfzeile = el("tr", {}, [el("th", { class: "kt-q-ecke", "aria-hidden": "true" })]);
    ABC.split("").forEach(function (c, k) {
      oben[k] = el("th", { "data-k": String(k), title: "Schlüssel " + c + " = Verschiebung um " + k, text: c });
      kopfzeile.appendChild(oben[k]);
    });
    tab.appendChild(kopfzeile);
    ABC.split("").forEach(function (c, p) {
      links[p] = el("th", { "data-p": String(p), title: "Klartext " + c.toLowerCase(), text: c.toLowerCase() });
      var tr = el("tr", {}, [links[p]]);
      zellen[p] = [];
      for (var k = 0; k < 26; k++) {
        zellen[p][k] = el("td", { "data-p": String(p), "data-k": String(k), text: ABC[(p + k) % 26] });
        tr.appendChild(zellen[p][k]);
      }
      tab.appendChild(tr);
    });
    tab.addEventListener("click", function (ev) {
      var z = ev.target.closest("th, td"), w = z ? z.dataset : {};
      if (w.p === undefined && w.k === undefined) return;
      beiWahl(w.p === undefined ? null : +w.p, w.k === undefined ? null : +w.k);
    });
    function setze(z, klasse) { z.classList.add(klasse); markiert.push([z, klasse]); }
    function zeige(p, k) {
      markiert.forEach(function (m) { m[0].classList.remove(m[1]); });
      markiert = [];
      if (p == null || k == null) return;
      setze(links[p], "kt-q-rand"); setze(oben[k], "kt-q-rand");
      for (var i = 0; i < k; i++) setze(zellen[p][i], "kt-q-weg");
      for (i = 0; i < p; i++) setze(zellen[i][k], "kt-q-weg");
      setze(zellen[p][k], "kt-q-treffer");
    }
    return { tabelle: tab, fuss: fuss, zeige: zeige };
  }

  function toolVigenere(root) {
    var d = root.dataset;
    var text = textfeld(d.text || "JANUAR", 3);
    var key = eingabe(d.key || "NKSA");
    var modus = el("select", {}, [el("option", { value: "ver", text: "verschlüsseln" }), el("option", { value: "ent", text: "entschlüsseln" })]);
    modus.value = d.mode === "ent" ? "ent" : "ver";
    var raster = el("div", { class: "kt-raster-wrap" });
    var out = ausgabe("kt-mono");
    var ablesen = ablesefeld();
    var stelleText = el("span", { class: "kt-schritt-text" });
    // folge: die dargestellten Buchstaben; stelle: gewählte Position darin
    // (−1 = im Quadrat frei gewählt); wahl: was das Quadrat gerade zeigt.
    var folge = { klar: "", key: "", geheim: "" }, stelle = 0, wahl = null;

    var quadrat = vigenereQuadrat(function (p, k) {
      wahl = { p: p == null ? (wahl ? wahl.p : 0) : p, k: k == null ? (wahl ? wahl.k : 0) : k };
      stelle = -1;
      zeigeWahl();
    });

    function waehleStelle(i) {
      stelle = i;
      wahl = { p: idx(folge.klar[i]), k: idx(folge.key[i]) };
      zeigeWahl();
    }
    function schritt(richtung) {
      var n = folge.key.length;
      if (n) waehleStelle(stelle < 0 ? 0 : mod(stelle + richtung, n));
    }

    function zeigeWahl() {
      quadrat.zeige(wahl && wahl.p, wahl && wahl.k);
      Array.prototype.forEach.call(raster.querySelectorAll("td"), function (td) {
        td.classList.toggle("kt-gewaehlt", +td.dataset.pos === stelle);
      });
      stelleText.textContent = !wahl ? "–" : stelle < 0 ? "frei gewählt" : "Buchstabe " + (stelle + 1) + " von " + folge.key.length;
      ablesen.innerHTML = ""; quadrat.fuss.textContent = "";
      if (!wahl) return;
      var ver = modus.value === "ver", p = wahl.p, k = wahl.k, g = (p + k) % 26;
      var P = ABC[p].toLowerCase(), K = ABC[k], G = ABC[g];
      var rechnung = ver ?
        P + " = " + p + ", " + K + " = " + k + ":  " + rechnung26(p, k, 1) + "  →  " + G :
        G + " = " + g + ", " + K + " = " + k + ":  " + rechnung26(g, k, -1) + "  →  " + P;
      ablesen.append(
        el("p", {}, ver ?
          ["Zeile ", fett(P), " (Klartext) und Spalte ", fett(K), " (Schlüssel) kreuzen sich bei ", fett(G, "kt-marke"), "."] :
          ["In Spalte ", fett(K), " (Schlüssel) ", fett(G, "kt-marke"), " suchen – am Zeilenanfang steht ", fett(P), "."]),
        el("p", { class: "kt-mono", text: rechnung }),
        el("p", { class: "kt-hilfe", text: "Spalte " + K + " ist ein Caesar-Alphabet mit Verschiebung " + k + "." })
      );
      quadrat.fuss.textContent = rechnung;
    }

    function rechne() {
      var ver = modus.value === "ver";
      var r = vigenereText(text.value, key.value, ver ? 1 : -1);
      out.textContent = ver ? r.text : r.text.toLowerCase();
      // Darstellung der ersten 30 Buchstaben: Text / Schlüssel / Ergebnis
      var ein = nurBuchstaben(text.value).slice(0, 30), aus = nurBuchstaben(r.text).slice(0, 30), ks = (r.schluesselFolge || "").slice(0, 30);
      folge = { klar: ver ? ein : aus, key: ks, geheim: ver ? aus : ein };
      raster.innerHTML = "";
      if (!ks) {
        raster.appendChild(el("p", { class: "kt-hilfe", text: "Bitte ein Schlüsselwort aus Buchstaben eingeben." }));
        wahl = null; stelle = 0; zeigeWahl();
        return;
      }
      var tab = el("table", { class: "kt-raster" });
      [[ver ? "Klartext" : "Geheimtext", ver ? ein.toLowerCase() : ein],
       ["Schlüssel", ks],
       [ver ? "Geheimtext" : "Klartext", ver ? aus : aus.toLowerCase()]].forEach(function (z, nr) {
        var tr = el("tr", nr === 1 ? { class: "kt-schluesselzeile" } : {}, [el("th", { text: z[0] })]);
        var geheim = nr === (ver ? 2 : 0);
        z[1].split("").forEach(function (c, i) {
          tr.appendChild(el("td", geheim ? { "data-pos": String(i), class: "kt-r-geheim", text: c } : { "data-pos": String(i), text: c }));
        });
        tab.appendChild(tr);
      });
      raster.appendChild(tab);
      raster.appendChild(el("p", { class: "kt-hilfe", text: "Buchstaben anklicken: Das Quadrat zeigt, wie er entsteht." +
        (nurBuchstaben(text.value).length > 30 ? " (Darstellung zeigt die ersten 30 Buchstaben.)" : "") }));
      waehleStelle(Math.min(Math.max(stelle, 0), ks.length - 1));
    }
    raster.addEventListener("click", function (ev) {
      var td = ev.target.closest("td[data-pos]");
      if (td) waehleStelle(+td.dataset.pos);
    });
    [text, key, modus].forEach(function (x) { x.addEventListener("input", rechne); });

    var zurueck = knopf("‹", function () { schritt(-1); }, "kt-klein"), weiter = knopf("›", function () { schritt(1); }, "kt-klein");
    zurueck.setAttribute("aria-label", "vorheriger Buchstabe");
    weiter.setAttribute("aria-label", "nächster Buchstabe");
    root.append(
      titel("Vigenère-Werkzeug"),
      el("div", { class: "kt-mit-bild" }, [
        el("div", {}, [
          feld("Text", text),
          el("div", { class: "kt-reihe" }, [feld("Schlüsselwort", key), feld("Modus", modus)]),
          el("div", { class: "kt-schritt" }, [el("span", { class: "kt-label", text: "Im Quadrat ablesen" }), el("span", { class: "kt-schritt-wahl" }, [zurueck, stelleText, weiter])]),
          ablesen
        ]),
        el("div", { class: "kt-bild" }, [
          el("div", { class: "kt-quadrat-rahmen" }, [quadrat.tabelle]),
          el("p", { class: "kt-hilfe", text: "Zeile (Klartext) oder Spalte (Schlüssel) anklicken." })
        ])
      ]),
      raster,
      el("p", { class: "kt-label", text: "Ergebnis" }), out,
      el("div", { class: "kt-knopfreihe" }, [kopierKnopf(out)])
    );
    rechne();
  }

  // ===================================================== VIGENÈRE KNACKEN

  function teiler(n, max) { var t = []; for (var i = 2; i <= max; i++) if (n % i === 0) t.push(i); return t; }

  function toolVigenereKnacken(root) {
    var d = root.dataset;
    var text = textfeld(d.text || "", 6);
    var kasiski = el("div", { class: "kt-kasiski" });
    var laenge = eingabe(d.length || "", "number", { min: "1", max: "20" });
    var streifen = el("div", { class: "kt-raster-wrap" });
    var spalten = el("div", { class: "kt-spalten" });
    var schluesselAnzeige = el("output", { class: "kt-zahl kt-schluessel" });
    var out = ausgabe("kt-mono kt-klartext");
    var verschiebungen = [];

    function analyse() {
      var t = nurBuchstaben(text.value);
      kasiski.innerHTML = "";
      if (t.length < 20) { kasiski.appendChild(el("p", { class: "kt-hilfe", text: "Geben Sie einen längeren Geheimtext ein." })); return; }
      // Wiederholte Folgen (Länge 3 bis 6) mit ihren Abständen
      var funde = {};
      for (var L = 6; L >= 3; L--) {
        var pos = {};
        for (var i = 0; i + L <= t.length; i++) { var f = t.substr(i, L); (pos[f] = pos[f] || []).push(i); }
        Object.keys(pos).forEach(function (f) {
          if (pos[f].length < 2) return;
          // kürzere Folgen überspringen, die nur Teil einer längeren sind
          var teil = Object.keys(funde).some(function (g) { return g.length > f.length && g.indexOf(f) !== -1 && funde[g].length === pos[f].length; });
          if (!teil) funde[f] = pos[f];
        });
      }
      var liste = Object.keys(funde).sort(function (a, b) { return b.length - a.length || funde[b].length - funde[a].length; });
      var abstaende = [];
      var tab = el("table", { class: "kt-tabelle" }, [el("tr", {}, [el("th", { text: "Folge" }), el("th", { text: "Abstände" }), el("th", { text: "Teiler (2–12)" })])]);
      liste.slice(0, 10).forEach(function (f) {
        var p = funde[f], ab = [];
        for (var i = 1; i < p.length; i++) ab.push(p[i] - p[i - 1]);
        ab.forEach(function (a) { abstaende.push(a); });
        tab.appendChild(el("tr", { "data-folge": f }, [el("td", { class: "kt-mono", text: f }), el("td", { text: ab.join(", ") }),
          el("td", { text: ab.map(function (a) { return teiler(a, 12).join(" "); }).join(" | ") })]));
      });
      liste.slice(10).forEach(function (f) { var p = funde[f]; for (var i = 1; i < p.length; i++) abstaende.push(p[i] - p[i - 1]); });
      // Die gewählte Folge im Geheimtext zeigen: Wiederholung und Abstand werden sichtbar.
      var fundtext = el("div", { class: "kt-ausgabe kt-mono kt-fundtext" }), fundinfo = el("p", { class: "kt-hilfe" });
      function zeigeFolge(f) {
        Array.prototype.forEach.call(tab.querySelectorAll("tr[data-folge]"), function (tr) { tr.classList.toggle("kt-gewaehlt", tr.dataset.folge === f); });
        fundtext.innerHTML = "";
        var ende = 0, stellen = [];
        funde[f].forEach(function (start) {
          if (start < ende) return;
          fundtext.appendChild(document.createTextNode(t.slice(ende, start)));
          fundtext.appendChild(el("mark", { class: "kt-marke", text: f }));
          ende = start + f.length; stellen.push(start + 1);
        });
        fundtext.appendChild(document.createTextNode(t.slice(ende)));
        fundtext.scrollTop = Math.max(0, fundtext.querySelector("mark").offsetTop - fundtext.offsetTop - 6);
        fundinfo.textContent = "«" + f + "» beginnt an den Stellen " + stellen.join(", ") + ". Dieselbe Folge entsteht, wenn dasselbe Klartextstück auf dasselbe Stück des Schlüssels trifft – der Abstand ist dann ein Vielfaches der Schlüssellänge.";
      }
      tab.addEventListener("click", function (ev) {
        var tr = ev.target.closest("tr[data-folge]");
        if (tr) zeigeFolge(tr.dataset.folge);
      });
      kasiski.appendChild(el("p", { class: "kt-label", text: "Schritt 1 – Wiederholungen im Geheimtext (" + liste.length + " gefunden, die längsten 10). Zeile anklicken: Die Folge wird im Text markiert." }));
      kasiski.appendChild(el("div", { class: "table-scroll" }, [tab]));
      if (liste.length) { kasiski.append(fundtext, fundinfo); zeigeFolge(liste[0]); }
      // Wie viele Abstände sind durch 2, 3, … 12 teilbar?
      var bal = el("div", { class: "kt-balken kt-balken-klein" }), max = 1, wert = {};
      for (var n = 2; n <= 12; n++) { wert[n] = abstaende.filter(function (a) { return a % n === 0; }).length; max = Math.max(max, wert[n]); }
      for (n = 2; n <= 12; n++) {
        bal.appendChild(balkenSpalte(wert[n] + " von " + abstaende.length + " Abständen sind durch " + n + " teilbar", String(wert[n]), wert[n] / max, String(n)));
      }
      kasiski.appendChild(el("p", { class: "kt-label", text: "Wie viele der " + abstaende.length + " Abstände sind durch die Zahl teilbar?" }));
      kasiski.appendChild(bal);
      kasiski.appendChild(el("p", { class: "kt-hilfe", text: "Achtung: Ist die Schlüssellänge z. B. 6, sind alle Abstände auch durch 2 und 3 teilbar. Suchen Sie die grösste Zahl, die fast so hoch ist wie die kleinen." }));
    }

    function spaltenBauen() {
      var t = nurBuchstaben(text.value), L = parseInt(laenge.value, 10);
      spalten.innerHTML = ""; streifen.innerHTML = "";
      if (!(L >= 1 && L <= 20)) { verschiebungen = []; entschluesseln(); return; }
      while (verschiebungen.length < L) verschiebungen.push(0);
      verschiebungen.length = L;
      if (t) streifenBauen(t, L);
      for (var s = 0; s < L; s++) spalten.appendChild(spalte(t, L, s));
      entschluesseln();
    }

    // Der Geheimtext in Zeilen zu L Buchstaben: Was untereinander steht, wurde
    // mit demselben Schlüsselbuchstaben verschoben.
    function streifenBauen(t, L) {
      var tab = el("table", { class: "kt-streifen" }), kopf = el("tr", {}, [el("th", { text: "Spalte" })]);
      var unten = el("tr", { class: "kt-schluesselzeile" }, [el("th", { text: "Schlüssel" })]);
      for (var s = 0; s < L; s++) {
        kopf.appendChild(el("th", { "data-s": String(s), text: String(s + 1) }));
        unten.appendChild(el("td", { "data-s": String(s) }));
      }
      tab.appendChild(kopf);
      for (var z = 0; z < 5 && z * L < t.length; z++) {
        var tr = el("tr", {}, [el("th", { text: z === 0 ? "Geheimtext" : "" })]);
        for (s = 0; s < L; s++) tr.appendChild(el("td", { "data-s": String(s), text: t[z * L + s] || "\u00a0" }));
        tab.appendChild(tr);
      }
      tab.appendChild(unten);
      tab.addEventListener("click", function (ev) {
        var z = ev.target.closest("[data-s]");
        if (z) waehleSpalte(+z.dataset.s);
      });
      streifen.append(tab, el("p", { class: "kt-hilfe", text: "Der Geheimtext in Zeilen zu " + L + " Buchstaben (die ersten 5 Zeilen): Was untereinander steht, wurde mit demselben Schlüsselbuchstaben verschoben – jede Spalte ist für sich ein Caesar-Geheimtext. Spalte anklicken: Die passende Karte unten wird hervorgehoben." }));
    }
    function waehleSpalte(s) {
      Array.prototype.forEach.call(streifen.querySelectorAll("[data-s]"), function (z) { z.classList.toggle("kt-gewaehlt", +z.dataset.s === s); });
      Array.prototype.forEach.call(spalten.children, function (k, i) { k.classList.toggle("kt-gewaehlt", i === s); });
    }

    function spalte(t, L, s) {
      var buchstaben = "";
      for (var i = s; i < t.length; i += L) buchstaben += t[i];
      var karte = el("div", { class: "kt-spalte" });
      var kopf = el("div", { class: "kt-spalte-kopf" });
      var diagramm = el("div", { class: "kt-mini" });
      function zeichne() {
        var v = verschiebungen[s], st = zaehle(buchstaben), max = 0;
        ABC.split("").forEach(function (c) { max = Math.max(max, st.z[c] / (st.n || 1) * 100, DEUTSCH[c]); });
        diagramm.innerHTML = "";
        for (var i = 0; i < 26; i++) {
          var c = ABC[mod(i + v, 26)];               // Geheimbuchstabe, der zu Klartext ABC[i] wird
          var p = st.n ? st.z[c] / st.n * 100 : 0;
          diagramm.appendChild(el("div", { class: "kt-mini-spalte", title: ABC[i].toLowerCase() + ": " + p.toFixed(1) + " % (Deutsch " + DEUTSCH[ABC[i]] + " %)" }, [
            el("span", { class: "kt-mini-ref", style: "height:" + (DEUTSCH[ABC[i]] / max * 100) + "%" }),
            el("span", { class: "kt-mini-bar", style: "height:" + (p / max * 100) + "%" }),
            el("span", { class: "kt-mini-b", text: ABC[i].toLowerCase() })
          ]));
        }
        kopf.innerHTML = "";
        kopf.append(
          el("strong", { text: "Spalte " + (s + 1) }),
          knopf("−", function () { verschiebungen[s] = mod(verschiebungen[s] - 1, 26); zeichne(); entschluesseln(); }, "kt-klein"),
          el("span", { class: "kt-zahl", text: ABC[v] }),
          knopf("+", function () { verschiebungen[s] = mod(verschiebungen[s] + 1, 26); zeichne(); entschluesseln(); }, "kt-klein"),
          knopf("Vorschlag", function () { verschiebungen[s] = besteVerschiebung(buchstaben); zeichne(); entschluesseln(); }, "kt-klein")
        );
      }
      karte._zeichne = zeichne;
      karte.addEventListener("click", function () { waehleSpalte(s); });
      karte.append(kopf, diagramm, el("p", { class: "kt-hilfe", text: buchstaben.length + " Buchstaben · blau = diese Spalte, orange Linie = Deutsch" }));
      zeichne();
      return karte;
    }

    function entschluesseln() {
      var key = verschiebungen.map(function (v) { return ABC[v]; }).join("");
      schluesselAnzeige.textContent = key || "–";
      Array.prototype.forEach.call(streifen.querySelectorAll(".kt-schluesselzeile td"), function (td, s) { td.textContent = ABC[verschiebungen[s]]; });
      out.textContent = key ? vigenereText(nurBuchstaben(text.value), key, -1).text.toLowerCase() : "";
    }

    text.addEventListener("input", function () { analyse(); spaltenBauen(); });
    laenge.addEventListener("input", spaltenBauen);
    // Die Verschiebungen der Spalten stehen in keinem Eingabefeld – fürs Speichern
    // darum eigens herausgeben und wieder einsetzen.
    function verschiebungenSetzen(v) {
      if (!Array.isArray(v) || v.length !== verschiebungen.length) return;
      verschiebungen = v.map(function (x) { return mod(parseInt(x, 10) || 0, 26); });
      Array.prototype.forEach.call(spalten.children, function (k) { k._zeichne(); });
      entschluesseln();
    }

    root.append(
      titel("Vigenère knacken"),
      feld("Geheimtext", text),
      kasiski,
      el("p", { class: "kt-label", text: "Schritt 2 – Schlüssellänge festlegen und jede Spalte einzeln wie eine Caesar-Verschlüsselung knacken" }),
      el("div", { class: "kt-reihe" }, [feld("Vermutete Schlüssellänge", laenge),
        knopf("Alle Vorschläge übernehmen", function () {
          var t = nurBuchstaben(text.value), L = verschiebungen.length;
          for (var s = 0; s < L; s++) { var b = ""; for (var i = s; i < t.length; i += L) b += t[i]; verschiebungen[s] = besteVerschiebung(b); }
          Array.prototype.forEach.call(spalten.children, function (k) { k._zeichne(); });
          entschluesseln();
        })]),
      streifen,
      el("p", { class: "kt-hilfe", text: "Verschieben Sie mit − und + so lange, bis die blauen Balken zu den orangen Linien passen – vor allem beim hohen e." }),
      spalten,
      el("p", { class: "kt-label" }, ["Schlüsselwort: ", schluesselAnzeige]),
      out
    );
    analyse(); spaltenBauen();
    return { lesen: function () { return verschiebungen.slice(); }, setzen: verschiebungenSetzen };
  }

  // ==================================================================== XOR

  function bits(bytes) { return Array.prototype.map.call(bytes, function (b) { return b.toString(2).padStart(8, "0"); }); }

  function toolXor(root) {
    var d = root.dataset;
    var text = eingabe(d.text || "HALLO");
    var key = eingabe(d.key || "KEY");
    var out = el("div", { class: "kt-xor table-scroll" });
    var ablesen = ablesefeld();
    var info = el("p", { class: "kt-hilfe" });
    var wahl = { z: 0, b: 0 };   // gewähltes Zeichen und Bit (0 = ganz links)
    // Die Wahrheitstabelle ist die ganze Rechenregel von XOR.
    var regel = {}, wahrheit = el("table", { class: "kt-tabelle kt-mono kt-wahrheit" }, [
      el("tr", {}, [el("th", { text: "a" }), el("th", { text: "b" }), el("th", { text: "a ⊕ b" })])]);
    ["00", "01", "10", "11"].forEach(function (ab) {
      regel[ab] = el("tr", {}, [el("td", { text: ab[0] }), el("td", { text: ab[1] }), el("td", { text: String(ab[0] ^ ab[1]) })]);
      wahrheit.appendChild(regel[ab]);
    });
    function zeichen(byte) { return byte === 32 ? "␣" : byte > 32 && byte < 127 ? String.fromCharCode(byte) : "·"; }

    function rechne() {
      var t = new TextEncoder().encode(text.value), k = new TextEncoder().encode(key.value);
      out.innerHTML = ""; ablesen.innerHTML = "";
      Object.keys(regel).forEach(function (ab) { regel[ab].classList.remove("kt-gewaehlt"); });
      if (!t.length || !k.length) return;
      var ks = t.map(function (_, i) { return k[i % k.length]; });
      var c = t.map(function (b, i) { return b ^ ks[i]; });
      var n = Math.min(t.length, 8);
      wahl.z = Math.min(wahl.z, n - 1);
      var tab = el("table", { class: "kt-tabelle kt-mono" }), kopf = el("tr", {}, [el("th", { text: "Zeichen" })]);
      for (var i = 0; i < n; i++) kopf.appendChild(el("th", { text: zeichen(t[i]) + " ⊕ " + zeichen(ks[i]) }));
      tab.appendChild(kopf);
      [["Klartext", t], ["Schlüssel", ks], ["XOR = Geheimtext", c]].forEach(function (z, nr) {
        var tr = el("tr", nr === 2 ? { class: "kt-ergebniszeile" } : {}, [el("th", { text: z[0] })]);
        for (var i = 0; i < n; i++) tr.appendChild(bitZelle(z[1][i], i, nr === 2 ? "kt-marke" : "kt-gewaehlt"));
        tab.appendChild(tr);
      });
      out.appendChild(tab);
      var bitsT = bits([t[wahl.z]])[0], bitsK = bits([ks[wahl.z]])[0], x = bitsT[wahl.b], y = bitsK[wahl.b];
      regel[x + y].classList.add("kt-gewaehlt");
      ablesen.append(
        el("p", { class: "kt-mono", text: "Zeichen " + (wahl.z + 1) + ":  " + zeichen(t[wahl.z]) + " = " + t[wahl.z] + " = " + bitsT +
          ",  Schlüssel " + zeichen(ks[wahl.z]) + " = " + ks[wahl.z] + " = " + bitsK }),
        el("p", {}, ["Bit " + (wahl.b + 1) + " von links: " + x + " ⊕ " + y + " = ", fett(String(x ^ y), "kt-marke"),
          x === y ? " – gleiche Bits ergeben 0." : " – verschiedene Bits ergeben 1."])
      );
      info.textContent = (t.length > 8 ? "(Es werden die ersten 8 Zeichen gezeigt.) " : "") +
        "Geheimtext als Hex: " + Array.prototype.map.call(c, function (b) { return b.toString(16).padStart(2, "0"); }).join(" ") +
        (k.length >= t.length ? "  –  Schlüssel so lang wie die Nachricht: das ist ein One-Time-Pad, wenn er zufällig ist und nur einmal verwendet wird." :
          "  –  Der Schlüssel wiederholt sich (wie bei Vigenère) – angreifbar!");
    }
    // Ein Byte als acht anklickbare Bits; das gewählte bekommt die Klasse.
    function bitZelle(byte, z, klasse) {
      var td = el("td");
      bits([byte])[0].split("").forEach(function (bit, b) {
        td.appendChild(el("span", { "data-z": String(z), "data-b": String(b), class: z === wahl.z && b === wahl.b ? klasse : "", text: bit }));
      });
      return td;
    }
    out.addEventListener("click", function (ev) {
      var bit = ev.target.closest("span[data-b]");
      if (bit) { wahl = { z: +bit.dataset.z, b: +bit.dataset.b }; rechne(); }
    });
    function zufall() {
      var n = new TextEncoder().encode(text.value).length, s = "";
      var z = new Uint8Array(n); crypto.getRandomValues(z);
      for (var i = 0; i < n; i++) s += ABC[z[i] % 26];
      key.value = s; rechne();
    }
    [text, key].forEach(function (x) { x.addEventListener("input", rechne); });
    root.append(titel("XOR-Werkzeug"),
      el("div", { class: "kt-mit-bild" }, [
        el("div", {}, [
          el("div", { class: "kt-reihe" }, [feld("Klartext", text), feld("Schlüssel", key)]),
          el("div", { class: "kt-knopfreihe" }, [knopf("Zufälliger Schlüssel in Nachrichtenlänge", zufall)])
        ]),
        el("div", { class: "kt-bild" }, [wahrheit, el("p", { class: "kt-hilfe", text: "Die Regel: gleich → 0, verschieden → 1." })])
      ]),
      out,
      el("p", { class: "kt-hilfe", text: "Bit anklicken: Die passende Zeile der Regel wird markiert." }),
      ablesen, info);
    rechne();
  }

  // ================================================================ SHA-256

  function toolSha(root) {
    var d = root.dataset;
    var a = textfeld(d.text || "Informatik ist spannend.", 2);
    var b = textfeld(d.text2 || "Informatik ist spannend!", 2);
    var ha = ausgabe("kt-mono kt-hash"), hb = ausgabe("kt-mono kt-hash");
    var vergleich = el("p", { class: "kt-label" });
    var bild = el("div", { class: "kt-bitbild" }), ablesen = ablesefeld();
    var ziffer = 0;   // gewählte Hex-Ziffer (0 … 63)

    function vierBits(h) { return parseInt(h, 16).toString(2).padStart(4, "0"); }
    // 256 Kästchen, eines pro Bit; an(j) sagt, ob Bit j gefüllt ist.
    function bitZeile(name, an, klasse) {
      var kasten = el("div", { class: "kt-bits" + (klasse ? " " + klasse : "") });
      for (var j = 0; j < 256; j++) {
        kasten.appendChild(el("span", { "data-i": String(j >> 2), class: (an(j) ? "kt-an" : "") + ((j >> 2) === ziffer ? " kt-gewaehlt" : "") }));
      }
      return el("div", { class: "kt-bitzeile" }, [el("span", { text: name }), kasten]);
    }

    function rechne() {
      var x = sha256(a.value), y = sha256(b.value);
      ha.innerHTML = ""; hb.innerHTML = "";
      for (var i = 0; i < 64; i++) {
        ha.appendChild(el("span", { "data-i": String(i), class: i === ziffer ? "kt-gewaehlt" : "", text: x[i] }));
        hb.appendChild(el("span", { "data-i": String(i), class: (y[i] !== x[i] ? "kt-anders" : "") + (i === ziffer ? " kt-gewaehlt" : ""), text: y[i] }));
      }
      var bx = x.split("").map(vierBits).join(""), by = y.split("").map(vierBits).join("");
      bild.innerHTML = "";
      bild.append(
        bitZeile("A", function (j) { return bx[j] === "1"; }),
        bitZeile("B", function (j) { return by[j] === "1"; }),
        bitZeile("A ≠ B", function (j) { return bx[j] !== by[j]; }, "kt-bits-anders")
      );
      var vx = vierBits(x[ziffer]), vy = vierBits(y[ziffer]), ungleich = 0;
      for (i = 0; i < 4; i++) if (vx[i] !== vy[i]) ungleich++;
      ablesen.innerHTML = "";
      ablesen.append(el("p", { class: "kt-mono", text: "Ziffer " + (ziffer + 1) + " von 64:  A = " + x[ziffer] + " = " + vx +
        ",  B = " + y[ziffer] + " = " + vy + "  →  " + ungleich + " von 4 Bits verschieden" }));
      var diff = 0;
      for (i = 0; i < 64; i += 8) {
        var v = (parseInt(x.substr(i, 8), 16) ^ parseInt(y.substr(i, 8), 16)) >>> 0;
        while (v) { diff += v & 1; v >>>= 1; }
      }
      vergleich.textContent = x === y ? "Beide Hashwerte sind identisch." :
        diff + " von 256 Bits unterscheiden sich (" + Math.round(diff / 2.56) + " %). Markiert: abweichende Hex-Ziffern.";
    }
    [a, b].forEach(function (x) { x.addEventListener("input", rechne); });
    [ha, hb, bild].forEach(function (x) {
      x.addEventListener("click", function (ev) {
        var i = ev.target.dataset.i;
        if (i !== undefined) { ziffer = +i; rechne(); }
      });
    });
    root.append(titel("SHA-256-Werkzeug"),
      feld("Text A", a), el("p", { class: "kt-label", text: "SHA-256(A)" }), ha,
      feld("Text B – ändern Sie hier nur ein einziges Zeichen", b), el("p", { class: "kt-label", text: "SHA-256(B)" }), hb,
      vergleich, bild,
      el("p", { class: "kt-hilfe", text: "Ein Kästchen pro Bit, gefüllt = 1. Unterste Reihe: die Bits, in denen sich A und B unterscheiden. Hex-Ziffer oder Kästchen anklicken: Eine Ziffer steht für 4 Bits." }),
      ablesen);
    rechne();
  }

  // ==================================================================== RSA

  function zeile(name, wert) { return el("div", { class: "kt-kv" }, [el("span", { text: name }), el("code", { text: wert })]); }

  // Weg von links nach rechts. teile wechselt ab: Kästchen, Pfeiltext, Kästchen, …
  function weg(teile) {
    return el("div", { class: "kt-weg" }, teile.map(function (t, i) {
      return el("span", { class: i % 2 ? "kt-pfeil" : "kt-knoten", text: t });
    }));
  }

  // Rechenweg für basis^exp mod n durch wiederholtes Quadrieren. So rechnet auch
  // der Computer: Nach jedem Schritt wird der Rest genommen, die Zahlen bleiben klein.
  function potenzSchritte(basis, exp, n, name) {
    basis = big(basis); exp = big(exp); n = big(n);
    var bin = exp.toString(2), box = el("div", { class: "kt-schritte" });
    if (bin.length > 40) {
      box.appendChild(el("p", { class: "kt-hilfe", text: "Der Exponent ist zu gross, um den Rechenweg hier zu zeigen." }));
      return box;
    }
    var tab = el("table", { class: "kt-tabelle kt-mono" }, [el("tr", {}, [
      el("th", { text: "Potenz" }), el("th", { text: "Rechnung" }), el("th", { text: "mod " + n }), el("th", { text: "gebraucht" })])]);
    var q = basis % n, vorher = null, r = 1n, summe = [], faktoren = [];
    for (var i = 0; i < bin.length; i++) {
      var hoch = 1n << big(i), gebraucht = bin[bin.length - 1 - i] === "1";
      tab.appendChild(el("tr", gebraucht ? { class: "kt-gewaehlt" } : {}, [
        el("td", { text: name + "^" + hoch }), el("td", { text: i === 0 ? String(basis) : vorher + "²" }),
        el("td", { text: String(q) }), el("td", { text: gebraucht ? "✓" : "–" })]));
      if (gebraucht) { summe.unshift(String(hoch)); faktoren.push(String(q)); r = r * q % n; }
      vorher = q; q = q * q % n;
    }
    box.append(
      el("p", {}, [fett(name + "^" + exp + " mod " + n), " – der Exponent als Summe von Zweierpotenzen: " + exp + " = " + summe.join(" + ") + " (binär " + bin + ")."]),
      el("div", { class: "table-scroll" }, [tab]),
      el("p", { class: "kt-mono", text: faktoren.join(" · ") + " mod " + n + " = " + r }),
      el("p", { class: "kt-hilfe", text: "Jede Zeile quadriert die vorherige und nimmt sofort den Rest. So bleiben die Zahlen klein, auch wenn der Exponent riesig ist." })
    );
    return box;
  }
  // Zeigt unter einer Tabelle den Rechenweg zur angeklickten Zeile; ein zweiter Klick klappt ihn zu.
  function zeigeSchritte(behaelter, tr, basis, exp, n, name) {
    var alt = behaelter.querySelector(".kt-schritte"), war = tr.classList.contains("kt-gewaehlt");
    if (alt) alt.remove();
    Array.prototype.forEach.call(behaelter.querySelectorAll("tr.kt-klickbar"), function (z) { z.classList.remove("kt-gewaehlt"); });
    if (war) return;
    tr.classList.add("kt-gewaehlt");
    behaelter.appendChild(potenzSchritte(basis, exp, n, name));
  }
  var SCHRITTE_HINWEIS = "Zeile anklicken: Rechenweg in Schritten.";

  function toolRsa(root) {
    var d = root.dataset;
    var schluessel = null;

    // --- Teil 1: Schlüsselpaar erzeugen
    var p = eingabe(d.p || "", "number", { min: "2" }), q = eingabe(d.q || "", "number", { min: "2" });
    var e = eingabe(d.e || "", "number", { min: "3" });
    var rechenweg = ausgabe("kt-rechenweg");
    var oeff = el("code", { class: "kt-schluesselwert" }), priv = el("code", { class: "kt-schluesselwert" });

    function erzeugen(zufaellig) {
      if (zufaellig) {
        var a = zufallsPrim(101, 997), b;
        do { b = zufallsPrim(101, 997); } while (b === a);
        p.value = a; q.value = b; e.value = "";
      }
      rechenweg.innerHTML = ""; schluessel = null; oeff.textContent = "–"; priv.textContent = "–";
      var P = parseInt(p.value, 10), Q = parseInt(q.value, 10);
      if (!istPrim(P) || !istPrim(Q)) { rechenweg.appendChild(el("p", { class: "kt-fehler", text: "p und q müssen Primzahlen sein." })); return; }
      if (P === Q) { rechenweg.appendChild(el("p", { class: "kt-fehler", text: "p und q müssen verschieden sein." })); return; }
      var n = big(P) * big(Q), phi = big(P - 1) * big(Q - 1);
      var E = e.value ? big(e.value) : waehleE(phi);
      if (!E || E <= 1n || E >= phi || ggT(E, phi) !== 1n) {
        rechenweg.appendChild(el("p", { class: "kt-fehler", text: "e muss zwischen 1 und φ(n) liegen und teilerfremd zu φ(n) = " + phi + " sein." })); return;
      }
      e.value = E.toString();
      var D = modInv(E, phi);
      schluessel = { e: E, d: D, n: n };
      rechenweg.append(
        zeile("n = p · q", P + " · " + Q + " = " + n),
        zeile("φ(n) = (p−1) · (q−1)", (P - 1) + " · " + (Q - 1) + " = " + phi),
        zeile("e (teilerfremd zu φ)", "ggT(" + E + ", " + phi + ") = 1  ✓"),
        zeile("d mit e · d mod φ = 1", E + " · " + D + " mod " + phi + " = " + ((E * D) % phi)),
        zeile("Zeichen pro Block", n < 100n ? "n < 100: zu klein für Text – verschlüsseln Sie Zahlen kleiner als " + n : String(blockLaenge(n)))
      );
      oeff.textContent = "(" + E + ", " + n + ")";
      priv.textContent = "(" + D + ", " + n + ")";
      privFeld.value = priv.textContent;
      entschluesseln();
    }

    // --- Teil 2: verschlüsseln
    var oeffFeld = eingabe(d.pub || "", "text", { placeholder: "z. B. (17, 323663)" });
    var nachricht = textfeld(d.text || "", 2);
    var tabelleV = el("div", { class: "table-scroll" });
    var geheim = ausgabe("kt-mono");

    function verschluesseln() {
      tabelleV.innerHTML = ""; geheim.textContent = "";
      var k = schluesselLesen(oeffFeld.value);
      if (!k || !nachricht.value.trim()) return;
      // Zahlenmodus: Besteht die Nachricht nur aus Zahlen, wird direkt mit ihnen gerechnet.
      var nurZahlen = /^[\d\s,;]+$/.test(nachricht.value.trim());
      if (!nurZahlen && k.n < 100n) { tabelleV.appendChild(el("p", { class: "kt-fehler", text: "n ist zu klein für Text (mindestens 100). Geben Sie stattdessen Zahlen kleiner als n ein." })); return; }
      var bl;
      if (nurZahlen) {
        bl = zahlen(nachricht.value).map(function (z) { return { text: "Zahl", zahl: big(z) }; });
        if (bl.some(function (b) { return b.zahl >= k.n; })) { tabelleV.appendChild(el("p", { class: "kt-fehler", text: "Jede Zahl muss kleiner als n = " + k.n + " sein." })); return; }
      } else bl = textZuBloecken(nachricht.value, blockLaenge(k.n));
      var tab = el("table", { class: "kt-tabelle" }, [el("tr", {}, [el("th", { text: "Block" }), el("th", { text: "Zahl m" }), el("th", { text: "c = m^e mod n" })])]);
      var cs = bl.map(function (b) {
        var c = modPow(b.zahl, k.a, k.n);
        var tr = el("tr", { class: "kt-klickbar" }, [el("td", { class: "kt-mono", text: nurZahlen ? "–" : "«" + b.text + "»" }), el("td", { class: "kt-mono", text: b.zahl.toString() }), el("td", { class: "kt-mono", text: c.toString() })]);
        tr.addEventListener("click", function () { zeigeSchritte(tabelleV, tr, b.zahl, k.a, k.n, "m"); });
        tab.appendChild(tr);
        return c.toString();
      });
      tabelleV.append(tab, el("p", { class: "kt-hilfe", text: SCHRITTE_HINWEIS }));
      geheim.textContent = cs.join(" ");
    }

    // --- Teil 3: entschlüsseln
    var privFeld = eingabe(d.priv || "", "text", { placeholder: "z. B. (284177, 323663)" });
    var geheimEin = textfeld(d.cipher || "", 2);
    var tabelleE = el("div", { class: "table-scroll" });
    var klar = ausgabe("kt-mono");

    function entschluesseln() {
      tabelleE.innerHTML = ""; klar.textContent = "";
      var k = schluesselLesen(privFeld.value), cs = zahlen(geheimEin.value);
      if (!k || !cs.length) return;
      var L = blockLaenge(k.n), text = "", ms = [];
      var tab = el("table", { class: "kt-tabelle" }, [el("tr", {}, [el("th", { text: "c" }), el("th", { text: "m = c^d mod n" }), el("th", { text: "als Text" })])]);
      cs.forEach(function (c) {
        var m = modPow(c, k.a, k.n), t = L > 0 ? blockZuText(m, L) : "";
        text += t; ms.push(m.toString());
        var tr = el("tr", { class: "kt-klickbar" }, [el("td", { class: "kt-mono", text: c }), el("td", { class: "kt-mono", text: m.toString() }), el("td", { class: "kt-mono", text: L > 0 ? "«" + t + "»" : "–" })]);
        tr.addEventListener("click", function () { zeigeSchritte(tabelleE, tr, c, k.a, k.n, "c"); });
        tab.appendChild(tr);
      });
      tabelleE.append(tab, el("p", { class: "kt-hilfe", text: SCHRITTE_HINWEIS }));
      klar.textContent = L > 0 ? text.trim().toLowerCase() : "Zahlen: " + ms.join(" ");
    }

    [p, q, e].forEach(function (x) { x.addEventListener("change", function () { erzeugen(false); }); });
    [oeffFeld, nachricht].forEach(function (x) { x.addEventListener("input", verschluesseln); });
    [privFeld, geheimEin].forEach(function (x) { x.addEventListener("input", entschluesseln); });

    root.append(
      titel("RSA-Werkzeug (mit kleinen Zahlen)"),
      el("div", { class: "kt-teil kt-teil-empfaenger" }, [
        el("p", { class: "kt-teiltitel", text: "1 · Schlüsselpaar erzeugen (Empfänger/in)" }),
        el("div", { class: "kt-reihe" }, [feld("Primzahl p", p), feld("Primzahl q", q), feld("e (leer = automatisch)", e)]),
        el("div", { class: "kt-knopfreihe" }, [knopf("Zufällige Primzahlen wählen", function () { erzeugen(true); }), knopf("Mit p und q berechnen", function () { erzeugen(false); })]),
        rechenweg,
        el("div", { class: "kt-kv kt-kv-gross" }, [el("span", { text: "Öffentlicher Schlüssel (e, n) – darf jede/r sehen" }), oeff, kopierKnopf(oeff)]),
        el("div", { class: "kt-kv kt-kv-gross kt-geheim" }, [el("span", { text: "Privater Schlüssel (d, n) – geheim halten!" }), priv])
      ]),
      el("div", { class: "kt-teil kt-teil-sender" }, [
        el("p", { class: "kt-teiltitel", text: "2 · Verschlüsseln (Sender/in) – mit dem öffentlichen Schlüssel der Empfängerin" }),
        feld("Öffentlicher Schlüssel (e, n) der Empfängerin", oeffFeld, "Einfach «(e, n)» hineinkopieren."),
        feld("Nachricht (Buchstaben und Leerzeichen; Umlaute werden zu ae/oe/ue)", nachricht),
        el("p", { class: "kt-hilfe", text: "Codierung: Leerzeichen = 00, A = 01, B = 02, … Z = 26. Mehrere Zeichen werden zu einem Block zusammengefasst. Geben Sie nur Zahlen ein (z. B. «7»), wird direkt mit diesen Zahlen gerechnet." }),
        tabelleV,
        el("p", { class: "kt-label", text: "Geheimtext (diese Zahlen verschicken)" }), geheim,
        el("div", { class: "kt-knopfreihe" }, [kopierKnopf(geheim),
          knopf("Eigenen öffentlichen Schlüssel einsetzen (zum Testen)", function () { if (schluessel) { oeffFeld.value = oeff.textContent; verschluesseln(); } })])
      ]),
      el("div", { class: "kt-teil kt-teil-empfaenger" }, [
        el("p", { class: "kt-teiltitel", text: "3 · Entschlüsseln (Empfänger/in) – mit dem eigenen privaten Schlüssel" }),
        feld("Privater Schlüssel (d, n)", privFeld),
        feld("Empfangener Geheimtext (Zahlen)", geheimEin),
        tabelleE,
        el("p", { class: "kt-label", text: "Klartext" }), klar
      ])
    );
    if (p.value && q.value) erzeugen(false);
    verschluesseln(); entschluesseln();
  }

  // ======================================================== RSA – EVE-MODUS

  // Die ersten Schritte der Probedivision ausgeschrieben, dazu der Treffer.
  function probeText(n, p) {
    var teile = [3n, 5n, 7n].filter(function (t) { return t < p; }).map(function (t) { return n + " : " + t + " → Rest " + (n % t); });
    if (p > 9n) teile.push("…");
    teile.push(n + " : " + p + " → Rest 0 ✓");
    return teile.join("   ");
  }
  // Balken: wie viel vom Bereich 3 … √n abgesucht wurde.
  function suchstrecke(n, bis, gefunden) {
    var wurzel = Math.sqrt(Number(n));
    if (!isFinite(wurzel) || !(wurzel > 3)) return document.createTextNode("");
    var prozent = Math.min(1, Math.max(0, (Number(bis) - 3) / (wurzel - 3))) * 100;
    return el("div", { class: "kt-suche" }, [
      el("div", { class: "kt-strecke" }, [el("span", { style: "width:" + prozent + "%" })]),
      el("div", { class: "kt-strecke-text" }, [
        el("span", { text: "3" }),
        el("span", { text: (gefunden ? "Treffer bei " : "abgesucht bis ") + bis + " – " +
          (prozent < 0.01 ? "weniger als 0,01" : prozent.toFixed(prozent < 10 ? 2 : 0).replace(".", ",")) + " % des Bereichs" }),
        el("span", { text: "√n" })   // ohne Zahl: Die schätzen die SuS in Lektion 7 selbst
      ]),
      el("p", { class: "kt-hilfe", text: "Eve probiert 3, 5, 7, … als Teiler. Weiter als bis √n muss sie nie suchen: Von zwei Faktoren ist einer höchstens so gross wie √n." })
    ]);
  }

  function toolRsaEve(root) {
    var d = root.dataset;
    var oeffFeld = eingabe(d.pub || "", "text", { placeholder: "(e, n)" });
    var geheimEin = textfeld(d.cipher || "", 2);
    var out = ausgabe("kt-rechenweg");

    function angriff() {
      out.innerHTML = "";
      var k = schluesselLesen(oeffFeld.value);
      if (!k) { out.appendChild(el("p", { class: "kt-fehler", text: "Bitte einen öffentlichen Schlüssel (e, n) eingeben." })); return; }
      var n = k.n, schritte = 0n, t0 = performance.now(), p = null;
      var LIMIT = 30000000n;
      if (n % 2n === 0n) { p = 2n; schritte = 1n; }
      else {
        for (var i = 3n; i * i <= n; i += 2n) {
          schritte++;
          if (n % i === 0n) { p = i; break; }
          if (schritte > LIMIT) break;
        }
      }
      var ms = performance.now() - t0;
      if (!p) {
        if (schritte > LIMIT) {
          var wurzel = Math.sqrt(Number(n)) / 2;
          var proSek = Number(schritte) / (ms / 1000);
          out.append(el("p", { class: "kt-fehler", text: "Abgebrochen nach " + schritte.toLocaleString("de-CH") + " Versuchen (" + (ms / 1000).toFixed(1) + " s)." }),
            el("p", { text: "Für alle ≈ " + wurzel.toExponential(1) + " Versuche bräuchte dieser Browser etwa " + dauer(wurzel / proSek) + "." }),
            suchstrecke(n, i, false));
        } else out.appendChild(el("p", { class: "kt-fehler", text: "n ist eine Primzahl – das ist kein gültiger RSA-Schlüssel." }));
        return;
      }
      var q = n / p, phi = (p - 1n) * (q - 1n), D = modInv(k.a, phi);
      out.append(
        zeile("Probedivision", schritte.toLocaleString("de-CH") + " Versuche in " + ms.toFixed(1) + " ms"),
        zeile("getestete Teiler", probeText(n, p)),
        suchstrecke(n, p, true),
        zeile("n = p · q", n + " = " + p + " · " + q),
        zeile("φ(n)", (p - 1n) + " · " + (q - 1n) + " = " + phi),
        zeile("privater Schlüssel d", D === null ? "existiert nicht (e nicht teilerfremd zu φ)" : D.toString())
      );
      var cs = zahlen(geheimEin.value);
      if (D !== null && cs.length) {
        var L = blockLaenge(n);
        var text = cs.map(function (c) { return blockZuText(modPow(c, D, n), L); }).join("").trim().toLowerCase();
        out.append(el("p", { class: "kt-label", text: "Geknackter Klartext" }), el("div", { class: "kt-ausgabe kt-mono", text: text }));
      }
    }
    root.append(
      titel("Eve-Modus: RSA knacken durch Faktorisieren"),
      feld("Abgefangener öffentlicher Schlüssel (e, n)", oeffFeld),
      feld("Abgefangener Geheimtext (Zahlen)", geheimEin),
      el("div", { class: "kt-knopfreihe" }, [knopf("n faktorisieren und entschlüsseln", angriff)]),
      out
    );
  }

  function dauer(s) {
    if (!isFinite(s)) return "unvorstellbar lange";
    if (s < 60) return s.toFixed(1) + " Sekunden";
    if (s < 3600) return (s / 60).toFixed(1) + " Minuten";
    if (s < 86400) return (s / 3600).toFixed(1) + " Stunden";
    if (s < 3.156e7) return (s / 86400).toFixed(1) + " Tage";
    return (s / 3.156e7).toExponential(1).replace("e+", " · 10^") + " Jahre";
  }

  // =============================================================== SIGNATUR

  function toolSignatur(root) {
    var d = root.dataset;
    var paar = null;
    var schluesselInfo = el("div", { class: "kt-rechenweg" });
    var text = textfeld(d.text || "Ich, Alice, schulde Bob 20 Franken.", 2);
    var signOut = ausgabe("kt-rechenweg");
    var pruefText = textfeld("", 2);
    var pruefSig = eingabe("", "text");
    var pruefKey = eingabe("", "text", { placeholder: "(e, n)" });
    var pruefOut = ausgabe("kt-rechenweg");

    function neuesPaar() {
      var a = zufallsPrim(1009, 9973), b;
      do { b = zufallsPrim(1009, 9973); } while (b === a);
      var n = big(a) * big(b), phi = big(a - 1) * big(b - 1), e = waehleE(phi);
      paar = { e: e, d: modInv(e, phi), n: n };
      zeigePaar();
      signieren();
    }
    function zeigePaar() {
      schluesselInfo.innerHTML = "";
      schluesselInfo.append(zeile("Öffentlicher Schlüssel (e, n)", "(" + paar.e + ", " + paar.n + ")"),
        zeile("Privater Schlüssel (d, n)", "(" + paar.d + ", " + paar.n + ")  – geheim"));
    }
    function hashZahl(t, n) { var h = sha256(t); return { hex: h, zahl: BigInt("0x" + h) % n }; }
    // Rechnet die Signatur und zeigt den Rechenweg bei Alice.
    function signaturRechnen() {
      signOut.innerHTML = "";
      if (!paar) return null;
      var h = hashZahl(text.value, paar.n), s = modPow(h.zahl, paar.d, paar.n);
      signOut.append(zeile("SHA-256(Text)", h.hex.slice(0, 32) + "…"),
        zeile("Hashwert als Zahl mod n", h.zahl.toString()),
        zeile("Signatur s = h^d mod n", s.toString()),
        weg(["Dokument", "SHA-256, mod n", "h = " + h.zahl, "h^d mod n – privater Schlüssel", "s = " + s]));
      return s;
    }
    // Signieren und alles an Bob übergeben.
    function signieren() {
      var s = signaturRechnen();
      if (s === null) return;
      pruefText.value = text.value; pruefSig.value = s.toString(); pruefKey.value = "(" + paar.e + ", " + paar.n + ")";
      pruefen();
    }
    function pruefen() {
      pruefOut.innerHTML = "";
      var k = schluesselLesen(pruefKey.value), s = zahlen(pruefSig.value)[0];
      if (!k || !s) return;
      var h = hashZahl(pruefText.value, k.n), zurueck = modPow(s, k.a, k.n), ok = zurueck === h.zahl;
      pruefOut.append(
        weg(["erhaltenes Dokument", "SHA-256, mod n", h.zahl.toString()]),
        el("div", { class: "kt-urteil " + (ok ? "kt-ok" : "kt-fehler"), text: ok ? "=" : "≠" }),
        weg(["Signatur s", "s^e mod n – öffentlicher Schlüssel", zurueck.toString()]),
        el("p", { class: ok ? "kt-ok" : "kt-fehler", text: ok ? "✓ Signatur gültig: Text unverändert und mit dem passenden privaten Schlüssel signiert." :
          "✗ Signatur ungültig: Text verändert, falsche Signatur oder falscher Schlüssel." }));
    }
    text.addEventListener("input", signieren);
    [pruefText, pruefSig, pruefKey].forEach(function (x) { x.addEventListener("input", pruefen); });
    root.append(
      titel("Signatur-Werkzeug (RSA + SHA-256, kleine Zahlen)"),
      el("div", { class: "kt-teil kt-teil-sender" }, [
        el("p", { class: "kt-teiltitel", text: "Alice signiert" }),
        el("div", { class: "kt-knopfreihe" }, [knopf("Neues Schlüsselpaar erzeugen", neuesPaar)]),
        schluesselInfo, feld("Dokument", text), signOut
      ]),
      el("div", { class: "kt-teil kt-teil-empfaenger" }, [
        el("p", { class: "kt-teiltitel", text: "Bob prüft – ändern Sie hier etwas am Text, an der Signatur oder am Schlüssel" }),
        feld("Erhaltenes Dokument", pruefText), el("div", { class: "kt-reihe" }, [feld("Signatur s", pruefSig), feld("Öffentlicher Schlüssel von Alice", pruefKey)]),
        pruefOut
      ])
    );
    neuesPaar();
    // Das Schlüsselpaar entsteht zufällig – gespeichert wird es, damit Alices Seite
    // nach dem Neuladen noch zu dem passt, was bei Bob steht. Bobs Felder bleiben dabei
    // unberührt (sie können absichtlich verändert sein).
    return {
      lesen: function () { return paar ? { e: paar.e.toString(), d: paar.d.toString(), n: paar.n.toString() } : null; },
      setzen: function (x) {
        if (!x || !x.e || !x.d || !x.n) return;
        paar = { e: big(x.e), d: big(x.d), n: big(x.n) };
        zeigePaar(); signaturRechnen();
      }
    };
  }

  // ========================================================= DIFFIE-HELLMAN

  var FARBEN = [
    { name: "Rot", rgb: [220, 40, 40] }, { name: "Blau", rgb: [40, 80, 220] }, { name: "Grün", rgb: [40, 170, 70] },
    { name: "Violett", rgb: [140, 50, 170] }, { name: "Orange", rgb: [240, 140, 20] }, { name: "Türkis", rgb: [20, 180, 190] },
    { name: "Braun", rgb: [130, 80, 40] }, { name: "Pink", rgb: [235, 90, 170] }
  ];
  var GELB = { name: "Gelb", rgb: [245, 215, 40] };

  function mische(liste) {
    var s = [0, 0, 0];
    liste.forEach(function (f) { for (var i = 0; i < 3; i++) s[i] += f.rgb[i]; });
    return "rgb(" + s.map(function (v) { return Math.round(v / liste.length); }).join(",") + ")";
  }
  function klecks(farbe, beschriftung, geheim) {
    return el("div", { class: "kt-klecks" + (geheim ? " kt-geheim" : "") }, [
      el("span", { class: "kt-klecks-farbe", style: "background:" + farbe }),
      el("span", { class: "kt-klecks-text", text: beschriftung })
    ]);
  }

  function toolDh(root) {
    var a = el("select"), b = el("select");
    FARBEN.forEach(function (f, i) {
      a.appendChild(el("option", { value: String(i), text: f.name }));
      b.appendChild(el("option", { value: String(i), text: f.name }));
    });
    a.value = "0"; b.value = "1";
    var buehne = el("div", { class: "kt-dh" });
    var zahlenTeil = el("div", { class: "kt-rechenweg" });
    var potenzen = el("div", { class: "kt-balken kt-balken-klein" });
    var ga = eingabe("6", "number", { min: "2", max: "21" }), gb = eingabe("15", "number", { min: "2", max: "21" });

    function zeichne() {
      var A = FARBEN[a.value], B = FARBEN[b.value];
      buehne.innerHTML = "";
      var spalteA = el("div", { class: "kt-dh-spalte" }, [el("strong", { text: "Alice" }),
        klecks(mische([GELB]), "öffentlich: Gelb"),
        klecks(mische([A]), "geheim: " + A.name, true),
        klecks(mische([GELB, A]), "sendet Gelb + " + A.name),
        klecks(mische([GELB, B, A]), "mischt Bobs Farbe + " + A.name + " = gemeinsames Geheimnis", true)]);
      var spalteE = el("div", { class: "kt-dh-spalte kt-dh-eve" }, [el("strong", { text: "Eve hört mit" }),
        klecks(mische([GELB]), "sieht Gelb"),
        klecks(mische([GELB, A]), "sieht Alices Mischung"),
        klecks(mische([GELB, B]), "sieht Bobs Mischung"),
        klecks(mische([GELB, A, GELB, B]), "mischt beide: zu viel Gelb – falsch!")]);
      var spalteB = el("div", { class: "kt-dh-spalte" }, [el("strong", { text: "Bob" }),
        klecks(mische([GELB]), "öffentlich: Gelb"),
        klecks(mische([B]), "geheim: " + B.name, true),
        klecks(mische([GELB, B]), "sendet Gelb + " + B.name),
        klecks(mische([GELB, A, B]), "mischt Alices Farbe + " + B.name + " = gemeinsames Geheimnis", true)]);
      buehne.append(spalteA, spalteE, spalteB);

      // Dasselbe mit Zahlen: p = 23, g = 5
      var p = 23n, g = 5n, x = big(ga.value || 2), y = big(gb.value || 2);
      var X = modPow(g, x, p), Y = modPow(g, y, p);
      // Alle Potenzen von 5 auf einen Blick: vorwärts ablesen ist leicht, rückwärts muss man suchen.
      potenzen.innerHTML = "";
      for (var i = 1; i <= 22; i++) {
        var wert = Number(modPow(g, i, p));
        var marke = [big(i) === x ? "a" : "", big(i) === y ? "b" : ""].filter(Boolean).join(",");
        var spalte = balkenSpalte("5^" + i + " mod 23 = " + wert, String(wert), wert / 22, String(i), null, marke);
        spalte.classList.toggle("kt-gewaehlt", !!marke);
        potenzen.appendChild(spalte);
      }
      zahlenTeil.innerHTML = "";
      zahlenTeil.append(
        zeile("öffentlich", "p = 23, g = 5"),
        zeile("Alice sendet", "A = 5^" + x + " mod 23 = " + X),
        zeile("Bob sendet", "B = 5^" + y + " mod 23 = " + Y),
        zeile("Alice rechnet", "B^" + x + " mod 23 = " + modPow(Y, x, p)),
        zeile("Bob rechnet", "A^" + y + " mod 23 = " + modPow(X, y, p)),
        el("p", { class: "kt-hilfe", text: "Eve kennt p, g, A und B. Um das Geheimnis zu berechnen, müsste sie aus A = 5^a mod 23 den Exponenten a zurückrechnen (diskreter Logarithmus) – bei sehr grossen Zahlen praktisch unmöglich." })
      );
    }
    [a, b, ga, gb].forEach(function (x) { x.addEventListener("input", zeichne); });
    root.append(
      titel("Diffie-Hellman: gemeinsames Geheimnis über eine offene Leitung"),
      el("div", { class: "kt-reihe" }, [feld("Geheime Farbe von Alice", a), feld("Geheime Farbe von Bob", b)]),
      buehne,
      el("p", { class: "kt-hilfe", text: "Die Analogie funktioniert, weil sich gemischte Farben kaum wieder trennen lassen – das ist die Einwegfunktion." }),
      el("p", { class: "kt-label", text: "Dasselbe mit Zahlen (Einwegfunktion: Potenzieren mit Rest)" }),
      el("div", { class: "kt-reihe" }, [feld("Geheimzahl a von Alice", ga), feld("Geheimzahl b von Bob", gb)]),
      el("p", { class: "kt-hilfe", text: "5^x mod 23 für x = 1 … 22 (unten x, oben der Wert): Jeder Wert kommt genau einmal vor, aber ohne erkennbare Ordnung. Vorwärts liest Alice in Spalte a ihren Wert A ab. Rückwärts müsste Eve die ganze Reihe nach A absuchen." }),
      potenzen,
      zahlenTeil
    );
    zeichne();
  }

  // ============================================================== Start

  var WERKZEUGE = {
    "caesar": toolCaesar, "haeufigkeit": toolHaeufigkeit, "vigenere": toolVigenere,
    "vigenere-knacken": toolVigenereKnacken, "xor": toolXor, "sha256": toolSha,
    "rsa": toolRsa, "rsa-eve": toolRsaEve, "signatur": toolSignatur, "diffie-hellman": toolDh
  };

  // ------------------------------------------------------------ Speicher
  // Gespeichert wird pro Werkzeug: der Inhalt aller Eingabefelder und, wo ein
  // Werkzeug mehr braucht, sein innerer Zustand (die Werkzeugfunktion gibt dafür
  // { lesen, setzen } zurück). Der Schlüssel folgt der Seite, auf der das
  // Werkzeug steht – im Dossier also der Unterlage, aus der es stammt.

  function standLesen(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function standSchreiben(k, v) {
    try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* gesperrt oder voll */ }
  }

  function einrichten(root, f) {
    var teil = root.closest("[data-quelle]");
    var nr = Array.prototype.indexOf.call((teil || document).querySelectorAll(".krypto[data-tool]"), root);
    var key = "krypto:" + (teil ? teil.dataset.quelle : location.pathname) + ":" + nr;
    // Ändert jemand die Vorbelegung im Markdown, gilt der alte Stand nicht mehr.
    var vorgabe = sha256(JSON.stringify(root.dataset)).slice(0, 12);
    var api = {}, felder = [], laedt = false;

    function sichern() {
      if (laedt) return;
      standSchreiben(key, { v: vorgabe, f: felder.map(function (x) { return x.value; }), x: api.lesen ? api.lesen() : null });
    }
    function bauen(mitStand) {
      root.textContent = "";
      api = f(root) || {};
      felder = Array.prototype.slice.call(root.querySelectorAll("textarea, input, select"));
      var kopf = root.querySelector(".kt-titel");
      if (kopf) kopf.appendChild(knopf("Zurücksetzen", function (ev) {
        ev.stopPropagation();
        if (window.confirm("Dieses Werkzeug auf den Anfangszustand zurücksetzen?")) zuruecksetzen();
      }, "kt-klein kt-zurueck"));
      var stand = mitStand ? standLesen(key) : null;
      if (!stand || stand.v !== vorgabe || !Array.isArray(stand.f) || stand.f.length !== felder.length) return;
      laedt = true;
      try {
        felder.forEach(function (x, i) {
          if (x.value === stand.f[i]) return;
          x.value = stand.f[i];
          x.dispatchEvent(new Event("input", { bubbles: true }));
          x.dispatchEvent(new Event("change", { bubbles: true }));
        });
        if (api.setzen && stand.x != null) api.setzen(stand.x);
      } catch (err) { /* unbrauchbarer Stand: Werkzeug bleibt, wie es jetzt ist */ }
      laedt = false;
    }
    function zuruecksetzen() { standSchreiben(key, null); bauen(false); }

    ["input", "change", "click"].forEach(function (e) { root.addEventListener(e, sichern); });
    root._zuruecksetzen = zuruecksetzen;
    bauen(true);
  }

  // Alle Werkzeuge eines Bereichs zurücksetzen (für «Alle Eingaben löschen»).
  function allesZuruecksetzen(bereich) {
    Array.prototype.forEach.call((bereich || document).querySelectorAll(".krypto[data-tool]"), function (root) {
      if (root._zuruecksetzen) root._zuruecksetzen();
    });
  }

  function start() {
    Array.prototype.forEach.call(document.querySelectorAll(".krypto[data-tool]"), function (root) {
      var f = WERKZEUGE[root.dataset.tool];
      if (!f || root.dataset.bereit) return;
      try { einrichten(root, f); } catch (err) {
        root.textContent = "Das Werkzeug konnte nicht geladen werden (" + err.message + ").";
      }
      root.dataset.bereit = "1";
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  // Für Tests in der Konsole
  window.Krypto = { sha256: sha256, modPow: modPow, modInv: modInv, caesarText: caesarText, vigenereText: vigenereText, textZuBloecken: textZuBloecken, blockLaenge: blockLaenge, start: start, allesZuruecksetzen: allesZuruecksetzen };
})();
