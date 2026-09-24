// Hero-Hintergrund: geblurrte, fliessende "Noise Waves", angepasst an den
// weissen Hintergrund. Reines Canvas 2D / Vanilla-JS, eigene Noise-Funktion
// statt einer externen Bibliothek. Die Animation pausiert, sobald der Hero
// nicht sichtbar ist (spart Rechenleistung / verhindert Ruckeln beim Scrollen).
(function () {
  const canvas = document.getElementById("heroNoiseCanvas");
  if (!canvas) return;
  const zone = canvas.closest(".wave-zone");
  const hero = zone.querySelector(".hero");
  const ctx = canvas.getContext("2d");
  const dpr = 1; // stark geblurrt, hoehere Aufloesung bringt nichts
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Einfache, selbstgeschriebene 1D-Value-Noise-Funktion.
  function createNoise1D() {
    const perm = new Float32Array(512);
    for (let i = 0; i < 256; i++) perm[i] = Math.random();
    for (let i = 0; i < 256; i++) perm[256 + i] = perm[i];
    function fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
    function lerp(a, b, t) {
      return a + t * (b - a);
    }
    return function (x) {
      const xi = Math.floor(x) & 255;
      const xf = x - Math.floor(x);
      return lerp(perm[xi], perm[xi + 1], fade(xf)) * 2 - 1;
    };
  }

  // Dieselben duennen, dezenten Wellen wie im Kontakt-Bereich (js/kontakt-waves.js).
  // Oberste Welle bewusst nicht im Akzent-Orange (#f37021) der Logo-Buchstaben.
  const COLORS = ["#c1440e", "#f37021", "#8a3208", "#f37021", "#c1440e", "#8a3208"];
  // Anteile der Hero-Hoehe; Werte ueber 1 laufen in den "Ueber uns"-Bereich.
  const CENTERS = [0.3, 0.55, 0.78, 1.02, 1.22, 1.42];
  const noiseFns = COLORS.map(() => createNoise1D());
  const WAVE_OPACITY = 0.28;
  const WAVE_WIDTH = 45;
  const BLUR = 12;
  const SPEED = 0.0018;
  // Canvas groesser als der sichtbare Bereich zeichnen, damit die Unschaerfe
  // am Rand des Canvas ausserhalb des sichtbaren Ausschnitts landet.
  const BLEED = 60;

  let w = 0;
  let h = 0;
  let t = 0;
  let visible = true;
  let rafId = null;

  function resize() {
    w = zone.clientWidth + BLEED * 2;
    h = zone.clientHeight + BLEED * 2;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.style.left = -BLEED + "px";
    canvas.style.top = -BLEED + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.filter = `blur(${BLUR}px)`;
  }

  function drawWaves() {
    const heroH = hero.clientHeight;
    ctx.clearRect(0, 0, w, h);
    t += SPEED;
    for (let i = 0; i < COLORS.length; i++) {
      ctx.beginPath();
      ctx.lineWidth = WAVE_WIDTH;
      ctx.strokeStyle = COLORS[i];
      ctx.globalAlpha = WAVE_OPACITY;
      for (let x = 0; x <= w; x += 6) {
        const y = noiseFns[i](x / 800 + t) * heroH * 0.14 + BLEED + heroH * CENTERS[i];
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  function loop() {
    if (!visible) {
      rafId = null;
      return;
    }
    drawWaves();
    rafId = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (rafId === null) {
      rafId = requestAnimationFrame(loop);
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) startLoop();
      },
      { threshold: 0 }
    );
    observer.observe(zone);
  }

  if (window.ResizeObserver) new ResizeObserver(resize).observe(zone);
  window.addEventListener("resize", resize);
  resize();
  if (!reduceMotion) startLoop();
  else drawWaves();
})();
