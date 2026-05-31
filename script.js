/* ============================================================
   Olange AI — Coming Soon · interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Launch countdown ----
     Target = 45 days from first visit, stored so it stays steady
     across reloads. Change LAUNCH_OVERRIDE to pin an exact date,
     e.g. new Date("2026-08-01T09:00:00+05:30").getTime();      */
  var LAUNCH_OVERRIDE = null;
  var STORE_KEY = "olange_launch_target";

  function getTarget() {
    if (LAUNCH_OVERRIDE) return LAUNCH_OVERRIDE;
    var saved = null;
    try {
      saved = window.localStorage.getItem(STORE_KEY);
    } catch (e) {}
    if (saved) return parseInt(saved, 10);
    var target = Date.now() + 45 * 24 * 60 * 60 * 1000;
    try {
      window.localStorage.setItem(STORE_KEY, String(target));
    } catch (e) {}
    return target;
  }

  var target = getTarget();
  var cd = document.getElementById("countdown");
  var elDays = cd && cd.querySelector("[data-days]");
  var elHours = cd && cd.querySelector("[data-hours]");
  var elMins = cd && cd.querySelector("[data-mins]");
  var elSecs = cd && cd.querySelector("[data-secs]");

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function tick() {
    if (!cd) return;
    var diff = target - Date.now();
    if (diff <= 0) {
      elDays.textContent = elHours.textContent = elMins.textContent = elSecs.textContent =
        "00";
      return;
    }
    var s = Math.floor(diff / 1000);
    elDays.textContent = pad(Math.floor(s / 86400));
    elHours.textContent = pad(Math.floor((s % 86400) / 3600));
    elMins.textContent = pad(Math.floor((s % 3600) / 60));
    elSecs.textContent = pad(s % 60);
  }

  tick();
  setInterval(tick, 1000);

  /* ---- Notify form ---- */
  var form = document.getElementById("notify-form");
  var input = document.getElementById("email");
  var msg = document.getElementById("notify-msg");

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (input.value || "").trim();
      msg.classList.remove("is-error", "is-success");

      if (!isValidEmail(value)) {
        msg.textContent = "Please enter a valid email address.";
        msg.classList.add("is-error");
        input.focus();
        return;
      }

      /* Persist locally until a backend is wired up. */
      try {
        var list = JSON.parse(
          window.localStorage.getItem("olange_waitlist") || "[]"
        );
        if (list.indexOf(value) === -1) list.push(value);
        window.localStorage.setItem("olange_waitlist", JSON.stringify(list));
      } catch (err) {}

      form.reset();
      msg.textContent =
        "You're on the list! We'll email you the moment Olange AI launches.";
      msg.classList.add("is-success");
    });
  }

  /* ---- Reveal on scroll (progressive enhancement) ---- */
  var revealTargets = document.querySelectorAll(
    ".card, .step, .flow__item, .plan, .problem__inner, .trust__callout, .trust__list li, .cta"
  );

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    // No observer support, or user prefers reduced motion: show everything.
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  Array.prototype.forEach.call(revealTargets, function (el) {
    el.classList.add("reveal");
    io.observe(el);
  });
})();
