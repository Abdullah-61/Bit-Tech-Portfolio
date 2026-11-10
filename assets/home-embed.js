/**
 * When the URL contains homeEmbed=1 (e.g. portfolio home slideshow iframe),
 * show only the hero workflow region marked with id="home-embed-root" and hide
 * navigation, footer, and other hero copy so the frame is diagram-first.
 */
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get("homeEmbed") !== "1") return;

    var root = document.getElementById("home-embed-root");
    if (!root) return;

    document.documentElement.classList.add("home-embed-mode");

    Array.prototype.forEach.call(document.body.children, function (el) {
      if (!el.contains(root)) el.setAttribute("hidden", "");
    });

    var el = root;
    while (el && el !== document.body) {
      var sib = el.previousElementSibling;
      while (sib) {
        sib.setAttribute("hidden", "");
        sib = sib.previousElementSibling;
      }
      el = el.parentElement;
    }

    var el2 = root;
    while (el2 && el2 !== document.body) {
      var nextSib = el2.nextElementSibling;
      while (nextSib) {
        var after = nextSib.nextElementSibling;
        if (!nextSib.contains(root)) nextSib.setAttribute("hidden", "");
        nextSib = after;
      }
      el2 = el2.parentElement;
    }

    document.body.classList.add("home-embed-body");

    var style = document.createElement("style");
    style.textContent =
      "html.home-embed-mode [hidden]{display:none!important}" +
      "html.home-embed-mode body.home-embed-body{margin:0;padding:0;min-height:100vh;overflow-x:hidden}" +
      "html.home-embed-mode section:first-of-type{padding-top:0.85rem!important;padding-bottom:1rem!important}";
    document.head.appendChild(style);
  } catch (_) {}
})();
