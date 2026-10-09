/* ==========================================================================
   Interaktive Übungen

   Macht aus einfachen Platzhaltern im Markdown Eingabefelder mit Kontrolle.
   Auf Papier erscheinen dieselben Stellen als Schreiblinien bzw. als Optionen
   zum Einkreisen (siehe CSS, Abschnitt 8).

   PLATZHALTER (im Markdown als HTML schreiben)

   Lücke im Text, wird geprüft:
     <span class="luecke" data-antwort="Klartext"></span>
     data-antwort   richtige Antworten, mehrere mit ; getrennt
     data-typ       text (Standard: Gross-/Kleinschreibung, Umlaute, Leer- und
                    Satzzeichen egal) · zahl (exakt) · groesse (Grössenordnung,
                    z. B. 1,1·10^22) · menge (Zahlen in beliebiger Reihenfolge,
                    z. B. Faktoren «17 · 43»)
     data-breite    Breite in Zeichen (sonst aus der Antwort geschätzt)

   Lücke ohne Kontrolle (freie Eingabe):
     <span class="luecke"></span>

   Auswahlliste:
     <span class="luecke" data-optionen="A;B;C" data-antwort="B"></span>

   Auswahl-Chips (eine oder mehrere Optionen anklicken):
     <span class="wahl" data-optionen="A;B;C" data-antwort="A" data-auch="B"></span>
     data-antwort   muss gewählt sein (mehrere mit + verbinden: «A+B»)
     data-auch      darf zusätzlich gewählt sein
     Ohne data-antwort: frei anklickbar, ohne Kontrolle.

   Antwortfeld für Sätze (Block, eigene Zeile, Leerzeilen davor und danach):
     <div class="antwort" data-zeilen="3"></div>

   Multiple Choice: Task-Liste mit IAL direkt darunter
     - [ ] falsch
     - [ ] richtig
     {: .mc data-antwort="2"}

   Alle anderen Task-Listen (z. B. «Das sollten Sie jetzt können») werden zu
   anklickbaren Checklisten.

   Pro Abschnitt (h2/h3) mit prüfbaren Feldern erscheint automatisch ein
   Knopf «Prüfen».

   Trennzeichen ist das Semikolon, nicht «|» – ein senkrechter Strich würde
   in Markdown-Tabellen die Spalten trennen. Eingaben bleiben im Browser gespeichert (localStorage) –
   nur auf diesem Gerät, es wird nichts übertragen.
   ========================================================================== */

(function () {
  "use strict";

  // ------------------------------------------------------------ Speicher
  function lesen(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function schreiben(k, v) {
    try { if (v === "" || v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { /* gesperrt */ }
  }

  // ------------------------------------------------------------ Vergleich
  function norm(s) {
    return String(s).toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]/g, "");
  }
  var HOCH = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };
  function zahlLesen(s) {
    s = String(s).trim().toLowerCase()
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, function (m) { return "^" + m.split("").map(function (c) { return HOCH[c]; }).join(""); })
      .replace(/[\s'’ ]/g, "").replace(/,/g, ".").replace(/[·×x*]/g, "*")
      .replace(/hoch/g, "^").replace(/\*\*/g, "^");
    var m = s.match(/^(-?[\d.]+)?\*?10\^(-?\d+)$/);
    if (m) return (m[1] ? parseFloat(m[1]) : 1) * Math.pow(10, parseInt(m[2], 10));
    if (/^-?[\d.]+(e-?\d+)?$/.test(s)) return parseFloat(s);
    return NaN;
  }
  function zahlenListe(s) {
    return (String(s).match(/\d+/g) || []).map(Number).sort(function (a, b) { return a - b; }).join(",");
  }
  function stimmt(feld, wert) {
    var typ = feld.dataset.typ || "text";
    var antworten = feld.dataset.antwort.split(";");
    if (!String(wert).trim()) return false;
    return antworten.some(function (a) {
      if (typ === "zahl") { var x = zahlLesen(wert), y = zahlLesen(a); return !isNaN(x) && Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(y)); }
      if (typ === "groesse") {
        var v = zahlLesen(wert), z = zahlLesen(a), tol = parseFloat(feld.dataset.toleranz || "0.25");
        return v > 0 && Math.abs(Math.log10(v) - Math.log10(z)) <= tol;
      }
      if (typ === "menge") return zahlenListe(wert) === zahlenListe(a);
      return norm(wert) === norm(a);
    });
  }

  // ------------------------------------------------------------ Aufbau
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }

  function start(container, schluesselBasis) {
    if (!container || container.dataset.uebungenBereit) return;
    container.dataset.uebungenBereit = "1";
    var nr = 0;
    function schluessel() { return "uebung:" + schluesselBasis + ":" + (nr++); }
    var pruefbar = [];   // { element, pruefe(), zuruecksetzen() }
    var alleFelder = []; // für «Eingaben löschen»

    // --- Lücken (Text, Zahl, Auswahl)
    Array.prototype.forEach.call(container.querySelectorAll("span.luecke"), function (span) {
      var key = schluessel(), feld;
      var optionen = span.dataset.optionen ? span.dataset.optionen.split(";") : null;
      if (optionen) {
        feld = el("select", { class: "luecke-feld", "aria-label": "Auswahl" });
        feld.appendChild(el("option", { value: "" }, ""));
        optionen.forEach(function (o) { feld.appendChild(el("option", { value: o }, o)); });
        var laengste = optionen.reduce(function (m, o) { return Math.max(m, o.length); }, 4);
        feld.style.width = "calc(" + (laengste + 3) + "ch + 1rem)";
      } else {
        feld = el("input", { type: "text", class: "luecke-feld", autocomplete: "off", spellcheck: "false", "aria-label": "Lücke" });
        var breite = parseInt(span.dataset.breite, 10) ||
          Math.max(6, Math.min(40, (span.dataset.antwort || "").split(";")[0].length + 4)) || 12;
        if (span.dataset.breite === "voll") feld.classList.add("luecke-voll");
        else feld.style.width = breite + "ch";
      }
      var gespeichert = lesen(key);
      if (gespeichert != null) feld.value = gespeichert;
      feld.addEventListener("input", function () { schreiben(key, feld.value); feld.classList.remove("richtig", "falsch"); });
      feld.addEventListener("change", function () { schreiben(key, feld.value); });
      Array.prototype.forEach.call(span.attributes, function (a) { if (a.name.indexOf("data-") === 0) feld.setAttribute(a.name, a.value); });
      span.parentNode.replaceChild(feld, span);
      alleFelder.push(function () { feld.value = ""; schreiben(key, ""); feld.classList.remove("richtig", "falsch"); });
      if (feld.dataset.antwort) {
        pruefbar.push({ element: feld, pruefe: function () {
          var ok = stimmt(feld, feld.value);
          feld.classList.toggle("richtig", ok); feld.classList.toggle("falsch", !ok);
          return ok;
        } });
      }
    });

    // --- Auswahl-Chips
    Array.prototype.forEach.call(container.querySelectorAll("span.wahl"), function (span) {
      var key = schluessel();
      var gruppe = el("span", { class: "wahl-gruppe", role: "group" });
      Array.prototype.forEach.call(span.attributes, function (a) { if (a.name.indexOf("data-") === 0) gruppe.setAttribute(a.name, a.value); });
      var gewaehlt = (lesen(key) || "").split("|").filter(Boolean);
      span.dataset.optionen.split(";").forEach(function (o) {
        var b = el("button", { type: "button", class: "chip", "aria-pressed": gewaehlt.indexOf(o) !== -1 ? "true" : "false" }, o);
        b.addEventListener("click", function () {
          b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
          gruppe.classList.remove("richtig", "falsch", "teilweise");
          schreiben(key, aktuelle().join("|"));
        });
        gruppe.appendChild(b);
      });
      function aktuelle() {
        return Array.prototype.filter.call(gruppe.querySelectorAll(".chip"), function (b) { return b.getAttribute("aria-pressed") === "true"; })
          .map(function (b) { return b.textContent; });
      }
      span.parentNode.replaceChild(gruppe, span);
      alleFelder.push(function () {
        Array.prototype.forEach.call(gruppe.querySelectorAll(".chip"), function (b) { b.setAttribute("aria-pressed", "false"); });
        gruppe.classList.remove("richtig", "falsch", "teilweise"); schreiben(key, "");
      });
      if (gruppe.dataset.antwort) {
        pruefbar.push({ element: gruppe, pruefe: function () {
          var muss = gruppe.dataset.antwort.split("+"), auch = (gruppe.dataset.auch || "").split("+").filter(Boolean);
          var g = aktuelle();
          var alleDa = muss.every(function (m) { return g.indexOf(m) !== -1; });
          var nurErlaubte = g.every(function (x) { return muss.indexOf(x) !== -1 || auch.indexOf(x) !== -1; });
          var ok = alleDa && nurErlaubte;
          var teil = !ok && g.some(function (x) { return muss.indexOf(x) !== -1; });
          gruppe.classList.toggle("richtig", ok); gruppe.classList.toggle("teilweise", teil); gruppe.classList.toggle("falsch", !ok && !teil);
          return ok;
        } });
      }
    });

    // --- Antwortfelder für Sätze
    Array.prototype.forEach.call(container.querySelectorAll("div.antwort"), function (div) {
      var key = schluessel();
      var zeilen = parseInt(div.dataset.zeilen, 10) || 2;
      var t = el("textarea", { class: "antwort-feld", rows: String(zeilen), "aria-label": "Antwort", spellcheck: "true" });
      t.style.setProperty("--zeilen", zeilen);
      var g = lesen(key); if (g != null) t.value = g;
      t.addEventListener("input", function () { schreiben(key, t.value); });
      div.appendChild(t);
      alleFelder.push(function () { t.value = ""; schreiben(key, ""); });
    });

    // --- Task-Listen: Multiple Choice oder Checkliste
    Array.prototype.forEach.call(container.querySelectorAll("ul"), function (ul) {
      var boxen = Array.prototype.filter.call(ul.children, function (li) { return li.querySelector(":scope > input[type=checkbox]"); })
        .map(function (li) { return li.querySelector(":scope > input[type=checkbox]"); });
      if (!boxen.length) return;
      ul.classList.add(ul.classList.contains("mc") ? "mc-liste" : "checkliste");
      boxen.forEach(function (box) {
        var key = schluessel();
        box.disabled = false; box.checked = lesen(key) === "1";
        box.addEventListener("change", function () { schreiben(key, box.checked ? "1" : ""); ul.classList.remove("richtig", "falsch"); });
        alleFelder.push(function () { box.checked = false; schreiben(key, ""); });
      });
      if (ul.classList.contains("mc") && ul.dataset.antwort) {
        var richtigeNr = ul.dataset.antwort.split(/[\s,]+/).map(Number);
        pruefbar.push({ element: ul, pruefe: function () {
          var ok = boxen.every(function (b, i) { return b.checked === (richtigeNr.indexOf(i + 1) !== -1); });
          ul.classList.toggle("richtig", ok); ul.classList.toggle("falsch", !ok);
          return ok;
        } });
      }
    });

    // --- «Prüfen»-Knöpfe: ein Knopf pro Abschnitt (h2/h3) mit prüfbaren Feldern
    var kinder = Array.prototype.slice.call(container.children);
    var gruppen = [], aktuell = null;
    kinder.forEach(function (k) {
      if (/^H[1-3]$/.test(k.tagName) || !aktuell) { aktuell = { letztes: null, felder: [] }; gruppen.push(aktuell); }
      pruefbar.forEach(function (p) { if (k === p.element || k.contains(p.element)) { aktuell.felder.push(p); aktuell.letztes = k; } });
    });
    gruppen.forEach(function (g) {
      if (!g.felder.length) return;
      var leiste = el("div", { class: "pruefen-leiste" });
      var knopf = el("button", { type: "button", class: "pruefen-knopf" }, "Prüfen");
      var meldung = el("span", { class: "pruefen-meldung", "aria-live": "polite" });
      knopf.addEventListener("click", function () {
        var richtig = g.felder.filter(function (p) { return p.pruefe(); }).length;
        meldung.textContent = richtig === g.felder.length
          ? "✓ Alles richtig!"
          : richtig + " von " + g.felder.length + " richtig – die markierten Stellen nochmals anschauen.";
        meldung.className = "pruefen-meldung " + (richtig === g.felder.length ? "ok" : "noch-nicht");
      });
      leiste.append(knopf, meldung);
      g.letztes.parentNode.insertBefore(leiste, g.letztes.nextSibling);
    });

    // --- Alle Eingaben löschen
    if (alleFelder.length && !container.closest(".dossier-teil")) {
      var reset = el("p", { class: "eingaben-loeschen" });
      var b = el("button", { type: "button", class: "link-knopf" }, "Alle Eingaben auf dieser Seite löschen");
      b.addEventListener("click", function () {
        if (window.confirm("Alle Ihre Eingaben auf dieser Seite löschen?")) {
          alleFelder.forEach(function (f) { f(); });
          Array.prototype.forEach.call(container.querySelectorAll(".pruefen-meldung"), function (m) { m.textContent = ""; });
        }
      });
      reset.appendChild(b);
      container.appendChild(reset);
    }
  }

  function startSeite() {
    var art = document.querySelector("article.prose");
    if (art) start(art, location.pathname);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startSeite);
  else startSeite();

  window.Uebungen = { start: start, stimmt: stimmt, zahlLesen: zahlLesen };
})();
