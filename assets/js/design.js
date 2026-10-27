/* design.js – wählt das Design und schaltet es um (siehe designs.css).
   Standard ist «grusel» (Halloween); wer auf «klassisch» umschaltet, behält das
   im Browser («verschluesselung.design.v1»). Der erste Teil läuft im <head>,
   bevor die Seite gezeichnet wird, damit nichts aufblitzt; der Knopf wird
   erst gebunden, wenn die Seite da ist. */
(function () {
  "use strict";
  var KEY = "verschluesselung.design.v1";
  var root = document.documentElement;

  function gespeichert() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function speichern(id) { try { localStorage.setItem(KEY, id); } catch (e) { /* gesperrt */ } }
  function anwenden(id) {
    if (id === "klassisch") root.removeAttribute("data-design"); else root.setAttribute("data-design", "grusel");
  }

  anwenden(gespeichert() === "klassisch" ? "klassisch" : "grusel");

  document.addEventListener("DOMContentLoaded", function () {
    var knopf = document.querySelector(".design-knopf");
    if (!knopf) return;
    function beschriften() {
      var grusel = root.getAttribute("data-design") === "grusel";
      knopf.textContent = grusel ? "▦ Klassisch" : "🎃 Grusel";
      knopf.title = grusel ? "Zum klassischen Design wechseln" : "Zum Halloween-Design wechseln";
      knopf.setAttribute("aria-label", knopf.title);
    }
    knopf.addEventListener("click", function () {
      var ziel = root.getAttribute("data-design") === "grusel" ? "klassisch" : "grusel";
      speichern(ziel); anwenden(ziel); beschriften();
    });
    window.addEventListener("storage", function (ev) {
      if (ev.key === KEY) { anwenden(ev.newValue === "klassisch" ? "klassisch" : "grusel"); beschriften(); }
    });
    beschriften();
  });
})();
