/* ============================================================
   Olange AI — Coming Soon · interactions
   Fotello-style: before/after slider, notify form, scroll reveal
   ============================================================ */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Before / after comparison slider ---- */
  (function () {
    var slider = document.getElementById("ba-slider");
    var before = document.getElementById("ba-before");
    var handle = document.getElementById("ba-handle");
    if (!slider || !before || !handle) return;

    var beforeImg = before.querySelector(".ba__img");

    function sizeImage() {
      // Keep the (clipped) "before" image the same width as the container
      // so it lines up pixel-for-pixel with the "after" image beneath it.
      if (beforeImg) beforeImg.style.width = slider.clientWidth + "px";
    }

    function setPos(pct) {
      pct = Math.max(0, Math.min(100, pct));
      before.style.width = pct + "%";
      handle.style.left = pct + "%";
      handle.setAttribute("aria-valuenow", Math.round(pct));
    }

    function posFromEvent(clientX) {
      var rect = slider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    var dragging = false;

    function start(e) {
      dragging = true;
      slider.classList.add("is-dragging");
      move(e);
    }
    function move(e) {
      if (!dragging) return;
      var x = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(posFromEvent(x));
      if (e.cancelable) e.preventDefault();
    }
    function end() {
      dragging = false;
      slider.classList.remove("is-dragging");
    }

    // Pointer / mouse / touch
    slider.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    slider.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);

    // Keyboard support
    handle.addEventListener("keydown", function (e) {
      var cur = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") setPos(cur - 4);
      else if (e.key === "ArrowRight") setPos(cur + 4);
    });

    window.addEventListener("resize", sizeImage);
    if (beforeImg && !beforeImg.complete) {
      beforeImg.addEventListener("load", sizeImage);
    }

    sizeImage();
    setPos(50);

    // A gentle auto-nudge on first view so the slider is discoverable.
    var nudged = false;
    function nudge() {
      if (nudged) return;
      nudged = true;
      var seq = [50, 64, 38, 50];
      var i = 0;
      var t = setInterval(function () {
        setPos(seq[i++]);
        if (i >= seq.length) clearInterval(t);
      }, 420);
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { nudge(); io.disconnect(); }
        });
      }, { threshold: 0.4 });
      io.observe(slider);
    }
  })();

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

      try {
        var list = JSON.parse(window.localStorage.getItem("olange_waitlist") || "[]");
        if (list.indexOf(value) === -1) list.push(value);
        window.localStorage.setItem("olange_waitlist", JSON.stringify(list));
      } catch (err) {}

      form.reset();
      msg.textContent = "You're on the list! We'll email you the moment Olange AI launches.";
      msg.classList.add("is-success");
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealTargets = document.querySelectorAll(
    ".card, .step, .flow__item, .plan, .problem__inner, .trust__callout, .trust__list li, .stats, .logos"
  );
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) return;

  var ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        ro.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  Array.prototype.forEach.call(revealTargets, function (el) {
    el.classList.add("reveal");
    ro.observe(el);
  });
})();
