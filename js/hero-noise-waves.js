// Hero-Hintergrund: geblurrte, fliessende "Noise Waves", angepasst an den
// weissen Hintergrund. Reines Canvas 2D / Vanilla-JS, eigene Noise-Funktion
// statt einer externen Bibliothek. Die Animation pausiert, sobald der Hero
// nicht sichtbar ist (spart Rechenleistung / verhindert Ruckeln beim Scrollen).
(function () {
  const canvas = document.getElementById("heroNoiseCanvas");
  if (!canvas) return;
  const hero = canvas.closest(".hero");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

  // Dunklere Rosttoene, damit die Wellen auf weissem Grund sichtbar bleiben.
  // Oberste Welle bewusst NICHT im Akzent-Orange (#f37021), da diese Farbe
  // exakt der Akzentbuchstaben (m/s) im Logo entspricht und die Welle die
  // Buchstaben sonst beim Ueberlappen unsichtbar macht. Das kraeftige Orange
  // sitzt stattdessen unten, wo es nicht mit den Buchstaben kollidiert.
  const COLORS = ["#8a3208", "#c1440e", "#f37021"];
  const CENTERS = [0.3, 0.55, 0.8];
  const noiseFns = COLORS.map(() => createNoise1D());
  const BACKGROUND = "#ffffff";
  const WAVE_OPACITY = 0.05;
  const WAVE_WIDTH = 55;
  const BLUR = 22;
  const SPEED = 0.0018;
  // Canvas groesser als der sichtbare Bereich zeichnen, damit die Unschaerfe
  // am Rand des Canvas ausserhalb des sichtbaren Ausschnitts landet.
  const BLEED = 90;

  let w = 0;
  let h = 0;
  let t = 0;
  let visible = true;
  let rafId = null;

  function resize() {
    w = hero.clientWidth + BLEED * 2;
    h = hero.clientHeight + BLEED * 2;
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
    ctx.globalAlpha = 1;
    ctx.fillStyle = BACKGROUND;
    ctx.globalAlpha = WAVE_OPACITY;
    ctx.fillRect(0, 0, w, h);

    t += SPEED;
    for (let i = 0; i < COLORS.length; i++) {
      ctx.beginPath();
      ctx.lineWidth = WAVE_WIDTH;
      ctx.strokeStyle = COLORS[i];
      ctx.globalAlpha = 0.35;
      for (let x = 0; x <= w; x += 6) {
        const y = noiseFns[i](x / 800 + t) * (h * 0.14) + h * CENTERS[i];
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
    observer.observe(hero);
  }

  window.addEventListener("resize", resize);
  resize();
  if (!reduceMotion) startLoop();
  else drawWaves();
})();
