(function () {
  "use strict";

  // ----- Theme toggle -----
  var THEME_KEY = "portfolio-theme";
  var DARK = "dark";
  var LIGHT = "light";

  function getStored() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (_) {
      return null;
    }
  }

  function setStored(value) {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (_) { }
  }

  function isDark() {
    var stored = getStored();
    if (stored === DARK || stored === LIGHT) return stored === DARK;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add(DARK);
      setStored(DARK);
    } else {
      document.documentElement.classList.remove(DARK);
      setStored(LIGHT);
    }
  }

  function initTheme() {
    applyTheme(isDark());
  }

  function toggleTheme() {
    applyTheme(!document.documentElement.classList.contains(DARK));
  }

  [].forEach.call(document.querySelectorAll("#theme-toggle, #theme-toggle-footer, #resume-theme-toggle"), function (el) {
    if (el) el.addEventListener("click", toggleTheme);
  });

  // Set theme before first paint to avoid flash
  initTheme();

  // Optional: listen for system preference changes when no manual preference is set
  if (window.matchMedia && !getStored()) {
    window.matchMedia("(prefers-color-scheme: dark)").addListener(function (e) {
      if (!getStored()) applyTheme(e.matches);
    });
  }

  // ----- Mobile nav -----
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-label", navLinks.classList.contains("is-open") ? "Close menu" : "Open menu");
    });

    // Close on link click (for anchor links)
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
      });
    });
  }

  // ----- Footer year -----
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ----- Timeline: scroll-driven gradient fill (Aceternity-style) -----
  var section = document.getElementById("experience");
  var timelineRoot = document.getElementById("timeline-root");
  var fill = document.getElementById("timeline-track-fill");

  if (section && timelineRoot && fill) {
    var trackHeight = 0;
    var ticking = false;

    function measure() {
      trackHeight = timelineRoot.offsetHeight;
    }

    function update() {
      var vh = window.innerHeight;
      var rect = section.getBoundingClientRect();
      var scrollY = window.scrollY || window.pageYOffset;
      var start = rect.top + scrollY - 0.1 * vh;
      var end = rect.top + scrollY + rect.height - 0.5 * vh;
      var range = end - start;
      var progress = range > 0 ? (scrollY - start) / range : 1;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      var height = progress * trackHeight;
      var opacity = progress <= 0.1 ? progress / 0.1 : 1;

      fill.style.height = height + "px";
      fill.style.opacity = String(opacity);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          update();
        });
        ticking = true;
      }
    }

    function init() {
      measure();
      update();
    }

    init();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () {
      measure();
      update();
    });
  }
  // ----- Hero Canvas (Dithering/Noise Effect) -----
  function initHeroCanvas() {
    var canvas = document.getElementById("hero-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var width, height;
    var frameId;

    function resize() {
      var parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function draw() {
      var isDarkMode = document.documentElement.classList.contains("dark");

      var bg = isDarkMode ? "#000000" : "#f2f2f2";
      var fg = isDarkMode ? "hsl(320, 100%, 70%)" : "hsl(220, 100%, 70%)";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Bayer 4x4 matrix
      var bayer = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
      ];
      var matrixSize = 4;
      var pxSize = 3;

      ctx.fillStyle = fg;

      var cols = Math.ceil(width / pxSize);
      var rows = Math.ceil(height / pxSize);
      var time = Date.now() * 0.0005;

      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var u = x / cols;
          var v = y / rows;

          // Layered sine waves
          var noise = Math.sin(u * 6.0 + time) * Math.cos(v * 4.0 + time * 0.5);
          noise += Math.sin((u + v) * 10.0 - time * 1.5) * 0.5;
          noise += Math.sin(Math.sqrt(u * u + v * v) * 15.0 + time) * 0.3;

          var intensity = (noise + 1.8) / 3.6;
          var inputIntensity = intensity * 17;

          var threshold = bayer[y % matrixSize][x % matrixSize];

          if (inputIntensity > threshold) {
            ctx.fillRect(x * pxSize, y * pxSize, pxSize, pxSize);
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    }

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
  }

  // Start Canvas
  initHeroCanvas();
})();
