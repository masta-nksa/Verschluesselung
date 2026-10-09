/* ==========================================================================
   Krypto-Werkzeuge für die Unterrichtseinheit «Verschlüsselung»

   Jedes Werkzeug wird in einer Markdown-Datei als leerer Platzhalter gesetzt:

     <div class="krypto" data-tool="caesar" data-text="HALLO" data-shift="3"></div>

   Beim Laden der Seite sucht dieses Skript alle .krypto-Elemente und baut darin
   das Werkzeug auf. Ohne JavaScript bleibt der Platzhalter leer; im Druck
   erscheint statt des Werkzeugs ein Hinweis (siehe CSS, Abschnitt 7).

   Werkzeuge: caesar, haeufigkeit, vigenere, vigenere-knacken, xor, sha256,
              rsa, rsa-eve, signatur, diffie-hellman

   Alles läuft lokal im Browser – es wird nichts übertragen.
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

  function toolCaesar(root) {
    var d = root.dataset;
    var text = textfeld(d.text || "Treffpunkt beim Brunnen", 3);
    var schieber = eingabe(d.shift || "3", "range", { min: "0", max: "25", step: "1" });
    var zahl = el("output", { class: "kt-zahl" });
    var modus = el("select", {}, [el("option", { value: "ver", text: "verschlüsseln" }), el("option", { value: "ent", text: "entschlüsseln" })]);
    modus.value = d.mode === "ent" ? "ent" : "ver";
    var tabelle = el("div", { class: "kt-alphabet" });
    var out = ausgabe("kt-mono");
    var alle = ausgabe("kt-mono kt-liste");
    alle.hidden = true;

    function rechne() {
      var k = parseInt(schieber.value, 10);
      zahl.textContent = k;
      tabelle.innerHTML = "";
      var oben = el("div", { class: "kt-zeile" }, [el("span", { class: "kt-zeilenkopf", text: "Klartext" })]);
      var unten = el("div", { class: "kt-zeile" }, [el("span", { class: "kt-zeilenkopf", text: "Geheimtext" })]);
      for (var i = 0; i < 26; i++) {
        oben.appendChild(el("span", { text: ABC[i].toLowerCase() }));
        unten.appendChild(el("span", { text: ABC[(i + k) % 26] }));
      }
      tabelle.appendChild(oben); tabelle.appendChild(unten);
      var r = caesarText(text.value, modus.value === "ver" ? k : -k);
      out.textContent = modus.value === "ver" ? r : r.toLowerCase();
      if (!alle.hidden) zeigeAlle();
    }
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
      feld("Text", text),
      el("div", { class: "kt-reihe" }, [feld("Verschiebung (Schlüssel)", schieber), zahl, feld("Modus", modus)]),
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
    var felder = {};

    var refSortiert = ABC.split("").sort(function (a, b) { return DEUTSCH[b] - DEUTSCH[a]; });
    ref.innerHTML = "<strong>Deutsch zum Vergleich:</strong> " + refSortiert.slice(0, 12).map(function (c) {
      return c.toLowerCase() + "&nbsp;" + DEUTSCH[c].toFixed(1).replace(".", ",") + "&nbsp;%";
    }).join(" · ") + " …";

    ABC.split("").forEach(function (c) {
      var i = el("input", { type: "text", maxlength: "1", "aria-label": "Klartextbuchstabe für " + c, autocomplete: "off", spellcheck: "false" });
      i.addEventListener("input", function () { i.value = i.value.toLowerCase().replace(/[^a-z]/g, ""); zeichne(); });
      felder[c] = i;
      tabelle.appendChild(el("label", { class: "kt-subst-zelle" }, [el("span", { text: c }), i]));
    });

    function zeichne() {
      var t = gross(text.value), st = zaehle(t);
      var reihe = ABC.split("");
      if (sortierung.value === "freq") reihe.sort(function (a, b) { return st.z[b] - st.z[a] || a.localeCompare(b); });
      var max = Math.max.apply(null, reihe.map(function (c) { return st.z[c]; })) || 1;
      balken.innerHTML = "";
      reihe.forEach(function (c) {
        var p = st.n ? st.z[c] / st.n * 100 : 0;
        balken.appendChild(el("div", { class: "kt-balken-spalte", title: c + ": " + st.z[c] + " (" + p.toFixed(1) + " %)" }, [
          el("span", { class: "kt-balken-wert", text: st.z[c] ? p.toFixed(0) : "" }),
          el("span", { class: "kt-balken-bar", style: "height:" + (st.z[c] / max * 100) + "%" }),
          el("span", { class: "kt-balken-buchstabe", text: c })
        ]));
      });
      // Doppelte Zuordnungen markieren
      var benutzt = {};
      ABC.split("").forEach(function (c) { var v = felder[c].value; if (v) benutzt[v] = (benutzt[v] || 0) + 1; });
      ABC.split("").forEach(function (c) { felder[c].classList.toggle("kt-doppelt", !!felder[c].value && benutzt[felder[c].value] > 1); });
      // Teilentschlüsselung: ersetzte Buchstaben klein und farbig, Rest gross
      out.innerHTML = "";
      var frag = document.createDocumentFragment(), puffer = "";
      function flush() { if (puffer) { frag.appendChild(document.createTextNode(puffer)); puffer = ""; } }
      for (var i = 0; i < t.length; i++) {
        var c = t[i];
        if (felder[c] && felder[c].value) { flush(); frag.appendChild(el("span", { class: "kt-ersetzt", text: felder[c].value })); }
        else puffer += c;
      }
      flush(); out.appendChild(frag);
    }
    text.addEventListener("input", zeichne);
    sortierung.addEventListener("input", zeichne);

    root.append(
      titel("Häufigkeitsanalyse"),
      feld("Geheimtext", text),
      el("div", { class: "kt-reihe" }, [feld("Balken sortieren", sortierung)]),
      balken, ref,
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

  function toolVigenere(root) {
    var d = root.dataset;
    var text = textfeld(d.text || "JANUAR", 3);
    var key = eingabe(d.key || "NKSA");
    var modus = el("select", {}, [el("option", { value: "ver", text: "verschlüsseln" }), el("option", { value: "ent", text: "entschlüsseln" })]);
    modus.value = d.mode === "ent" ? "ent" : "ver";
    var raster = el("div", { class: "kt-raster-wrap" });
    var out = ausgabe("kt-mono");

    function rechne() {
      var ver = modus.value === "ver";
      var r = vigenereText(text.value, key.value, ver ? 1 : -1);
      out.textContent = ver ? r.text : r.text.toLowerCase();
      // Darstellung der ersten 30 Buchstaben: Text / Schlüssel / Ergebnis
      var ein = nurBuchstaben(text.value).slice(0, 30), aus = nurBuchstaben(r.text).slice(0, 30), ks = (r.schluesselFolge || "").slice(0, 30);
      raster.innerHTML = "";
      if (!ks) { raster.appendChild(el("p", { class: "kt-hilfe", text: "Bitte ein Schlüsselwort aus Buchstaben eingeben." })); return; }
      var tab = el("table", { class: "kt-raster" });
      [[ver ? "Klartext" : "Geheimtext", ver ? ein.toLowerCase() : ein],
       ["Schlüssel", ks],
       [ver ? "Geheimtext" : "Klartext", ver ? aus : aus.toLowerCase()]].forEach(function (z, nr) {
        var tr = el("tr", nr === 1 ? { class: "kt-schluesselzeile" } : {}, [el("th", { text: z[0] })]);
        z[1].split("").forEach(function (c) { tr.appendChild(el("td", { text: c })); });
        tab.appendChild(tr);
      });
      raster.appendChild(tab);
      if (nurBuchstaben(text.value).length > 30) raster.appendChild(el("p", { class: "kt-hilfe", text: "(Darstellung zeigt die ersten 30 Buchstaben.)" }));
    }
    [text, key, modus].forEach(function (x) { x.addEventListener("input", rechne); });
    root.append(
      titel("Vigenère-Werkzeug"),
      feld("Text", text),
      el("div", { class: "kt-reihe" }, [feld("Schlüsselwort", key), feld("Modus", modus)]),
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
        tab.appendChild(el("tr", {}, [el("td", { class: "kt-mono", text: f }), el("td", { text: ab.join(", ") }),
          el("td", { text: ab.map(function (a) { return teiler(a, 12).join(" "); }).join(" | ") })]));
      });
      liste.slice(10).forEach(function (f) { var p = funde[f]; for (var i = 1; i < p.length; i++) abstaende.push(p[i] - p[i - 1]); });
      kasiski.appendChild(el("p", { class: "kt-label", text: "Schritt 1 – Wiederholungen im Geheimtext (" + liste.length + " gefunden, die längsten 10):" }));
      kasiski.appendChild(el("div", { class: "table-scroll" }, [tab]));
      // Wie viele Abstände sind durch 2, 3, … 12 teilbar?
      var bal = el("div", { class: "kt-balken kt-balken-klein" }), max = 1, wert = {};
      for (var n = 2; n <= 12; n++) { wert[n] = abstaende.filter(function (a) { return a % n === 0; }).length; max = Math.max(max, wert[n]); }
      for (n = 2; n <= 12; n++) {
        bal.appendChild(el("div", { class: "kt-balken-spalte", title: wert[n] + " von " + abstaende.length + " Abständen sind durch " + n + " teilbar" }, [
          el("span", { class: "kt-balken-wert", text: String(wert[n]) }),
          el("span", { class: "kt-balken-bar", style: "height:" + (wert[n] / max * 100) + "%" }),
          el("span", { class: "kt-balken-buchstabe", text: String(n) })
        ]));
      }
      kasiski.appendChild(el("p", { class: "kt-label", text: "Wie viele der " + abstaende.length + " Abstände sind durch die Zahl teilbar?" }));
      kasiski.appendChild(bal);
      kasiski.appendChild(el("p", { class: "kt-hilfe", text: "Achtung: Ist die Schlüssellänge z. B. 6, sind alle Abstände auch durch 2 und 3 teilbar. Suchen Sie die grösste Zahl, die fast so hoch ist wie die kleinen." }));
    }

    function spaltenBauen() {
      var t = nurBuchstaben(text.value), L = parseInt(laenge.value, 10);
      spalten.innerHTML = "";
      if (!(L >= 1 && L <= 20)) { verschiebungen = []; entschluesseln(); return; }
      while (verschiebungen.length < L) verschiebungen.push(0);
      verschiebungen.length = L;
      for (var s = 0; s < L; s++) spalten.appendChild(spalte(t, L, s));
      entschluesseln();
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
      karte.append(kopf, diagramm, el("p", { class: "kt-hilfe", text: buchstaben.length + " Buchstaben · blau = diese Spalte, orange Linie = Deutsch" }));
      zeichne();
      return karte;
    }

    function entschluesseln() {
      var key = verschiebungen.map(function (v) { return ABC[v]; }).join("");
      schluesselAnzeige.textContent = key || "–";
      out.textContent = key ? vigenereText(nurBuchstaben(text.value), key, -1).text.toLowerCase() : "";
    }

    text.addEventListener("input", function () { analyse(); spaltenBauen(); });
    laenge.addEventListener("input", spaltenBauen);
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
      el("p", { class: "kt-hilfe", text: "Verschieben Sie mit − und + so lange, bis die blauen Balken zu den orangen Linien passen – vor allem beim hohen e." }),
      spalten,
      el("p", { class: "kt-label" }, ["Schlüsselwort: ", schluesselAnzeige]),
      out
    );
    analyse(); spaltenBauen();
  }

  // ==================================================================== XOR

  function bits(bytes) { return Array.prototype.map.call(bytes, function (b) { return b.toString(2).padStart(8, "0"); }); }

  function toolXor(root) {
    var d = root.dataset;
    var text = eingabe(d.text || "HALLO");
    var key = eingabe(d.key || "KEY");
    var out = el("div", { class: "kt-xor table-scroll" });
    var info = el("p", { class: "kt-hilfe" });

    function rechne() {
      var t = new TextEncoder().encode(text.value), k = new TextEncoder().encode(key.value);
      out.innerHTML = "";
      if (!t.length || !k.length) return;
      var c = t.map(function (b, i) { return b ^ k[i % k.length]; });
      var tab = el("table", { class: "kt-tabelle kt-mono" });
      [["Klartext", bits(t)], ["Schlüssel", bits(t.map(function (_, i) { return k[i % k.length]; }))], ["XOR = Geheimtext", bits(c)]].forEach(function (z, nr) {
        var tr = el("tr", nr === 2 ? { class: "kt-ergebniszeile" } : {}, [el("th", { text: z[0] })]);
        z[1].slice(0, 8).forEach(function (b) { tr.appendChild(el("td", { text: b })); });
        tab.appendChild(tr);
      });
      out.appendChild(tab);
      info.textContent = (t.length > 8 ? "(Es werden die ersten 8 Zeichen gezeigt.) " : "") +
        "Geheimtext als Hex: " + Array.prototype.map.call(c, function (b) { return b.toString(16).padStart(2, "0"); }).join(" ") +
        (k.length >= t.length ? "  –  Schlüssel so lang wie die Nachricht: das ist ein One-Time-Pad, wenn er zufällig ist und nur einmal verwendet wird." :
          "  –  Der Schlüssel wiederholt sich (wie bei Vigenère) – angreifbar!");
    }
    function zufall() {
      var n = new TextEncoder().encode(text.value).length, s = "";
      var z = new Uint8Array(n); crypto.getRandomValues(z);
      for (var i = 0; i < n; i++) s += ABC[z[i] % 26];
      key.value = s; rechne();
    }
    [text, key].forEach(function (x) { x.addEventListener("input", rechne); });
    root.append(titel("XOR-Werkzeug"),
      el("div", { class: "kt-reihe" }, [feld("Klartext", text), feld("Schlüssel", key)]),
      el("div", { class: "kt-knopfreihe" }, [knopf("Zufälliger Schlüssel in Nachrichtenlänge", zufall)]),
      out, info);
    rechne();
  }

  // ================================================================ SHA-256

  function toolSha(root) {
    var d = root.dataset;
    var a = textfeld(d.text || "Informatik ist spannend.", 2);
    var b = textfeld(d.text2 || "Informatik ist spannend!", 2);
    var ha = ausgabe("kt-mono kt-hash"), hb = ausgabe("kt-mono kt-hash");
    var vergleich = el("p", { class: "kt-label" });

    function rechne() {
      var x = sha256(a.value), y = sha256(b.value);
      ha.textContent = x;
      hb.innerHTML = "";
      for (var i = 0; i < y.length; i++) hb.appendChild(el("span", y[i] !== x[i] ? { class: "kt-anders", text: y[i] } : { text: y[i] }));
      var diff = 0;
      for (i = 0; i < 64; i += 8) {
        var v = (parseInt(x.substr(i, 8), 16) ^ parseInt(y.substr(i, 8), 16)) >>> 0;
        while (v) { diff += v & 1; v >>>= 1; }
      }
      vergleich.textContent = x === y ? "Beide Hashwerte sind identisch." :
        diff + " von 256 Bits unterscheiden sich (" + Math.round(diff / 2.56) + " %). Markiert: abweichende Hex-Ziffern.";
    }
    [a, b].forEach(function (x) { x.addEventListener("input", rechne); });
    root.append(titel("SHA-256-Werkzeug"),
      feld("Text A", a), el("p", { class: "kt-label", text: "SHA-256(A)" }), ha,
      feld("Text B – ändern Sie hier nur ein einziges Zeichen", b), el("p", { class: "kt-label", text: "SHA-256(B)" }), hb,
      vergleich);
    rechne();
  }

  // ==================================================================== RSA

  function zeile(name, wert) { return el("div", { class: "kt-kv" }, [el("span", { text: name }), el("code", { text: wert })]); }

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
        tab.appendChild(el("tr", {}, [el("td", { class: "kt-mono", text: nurZahlen ? "–" : "«" + b.text + "»" }), el("td", { class: "kt-mono", text: b.zahl.toString() }), el("td", { class: "kt-mono", text: c.toString() })]));
        return c.toString();
      });
      tabelleV.appendChild(tab);
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
        tab.appendChild(el("tr", {}, [el("td", { class: "kt-mono", text: c }), el("td", { class: "kt-mono", text: m.toString() }), el("td", { class: "kt-mono", text: L > 0 ? "«" + t + "»" : "–" })]));
      });
      tabelleE.appendChild(tab);
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
            el("p", { text: "Für alle ≈ " + wurzel.toExponential(1) + " Versuche bräuchte dieser Browser etwa " + dauer(wurzel / proSek) + "." }));
        } else out.appendChild(el("p", { class: "kt-fehler", text: "n ist eine Primzahl – das ist kein gültiger RSA-Schlüssel." }));
        return;
      }
      var q = n / p, phi = (p - 1n) * (q - 1n), D = modInv(k.a, phi);
      out.append(
        zeile("Probedivision", schritte.toLocaleString("de-CH") + " Versuche in " + ms.toFixed(1) + " ms"),
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
      schluesselInfo.innerHTML = "";
      schluesselInfo.append(zeile("Öffentlicher Schlüssel (e, n)", "(" + paar.e + ", " + paar.n + ")"),
        zeile("Privater Schlüssel (d, n)", "(" + paar.d + ", " + paar.n + ")  – geheim"));
      signieren();
    }
    function hashZahl(t, n) { var h = sha256(t); return { hex: h, zahl: BigInt("0x" + h) % n }; }
    function signieren() {
      signOut.innerHTML = "";
      if (!paar) return;
      var h = hashZahl(text.value, paar.n), s = modPow(h.zahl, paar.d, paar.n);
      signOut.append(zeile("SHA-256(Text)", h.hex.slice(0, 32) + "…"),
        zeile("Hashwert als Zahl mod n", h.zahl.toString()),
        zeile("Signatur s = h^d mod n", s.toString()));
      pruefText.value = text.value; pruefSig.value = s.toString(); pruefKey.value = "(" + paar.e + ", " + paar.n + ")";
      pruefen();
    }
    function pruefen() {
      pruefOut.innerHTML = "";
      var k = schluesselLesen(pruefKey.value), s = zahlen(pruefSig.value)[0];
      if (!k || !s) return;
      var h = hashZahl(pruefText.value, k.n), zurueck = modPow(s, k.a, k.n), ok = zurueck === h.zahl;
      pruefOut.append(zeile("Hashwert des erhaltenen Texts mod n", h.zahl.toString()),
        zeile("s^e mod n (aus der Signatur)", zurueck.toString()),
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

  function start() {
    Array.prototype.forEach.call(document.querySelectorAll(".krypto[data-tool]"), function (root) {
      var f = WERKZEUGE[root.dataset.tool];
      if (!f || root.dataset.bereit) return;
      root.dataset.bereit = "1";
      try { f(root); } catch (err) {
        root.textContent = "Das Werkzeug konnte nicht geladen werden (" + err.message + ").";
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  // Für Tests in der Konsole
  window.Krypto = { sha256: sha256, modPow: modPow, modInv: modInv, caesarText: caesarText, vigenereText: vigenereText, textZuBloecken: textZuBloecken, blockLaenge: blockLaenge, start: start };
})();
