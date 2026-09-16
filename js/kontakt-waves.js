// Duenne, geblurrte Noise-Wellen im Hintergrund des Kontakt-Bereichs.
// Gleiche Technik wie im Hero (js/hero-noise-waves.js), nur duenner/dezenter
// und in dunkleren Rosttoenen fuer den hellen Hintergrund.
(function () {
  const canvas = document.getElementById("kontaktWaves");
  if (!canvas) return;
  const section = canvas.closest(".section");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const COLORS = ["#c1440e", "#f37021", "#8a3208"];
  const CENTERS = [0.3, 0.55, 0.78];
  const noiseFns = COLORS.map(() => createNoise1D());
  const WAVE_OPACITY = 0.28;
  const WAVE_WIDTH = 7;
  const BLUR = 10;
  const SPEED = 0.0018;
  const BLEED = 60;

  let w = 0;
  let h = 0;
  let t = 0;

  function resize() {
    w = section.clientWidth + BLEED * 2;
    h = section.clientHeight + BLEED * 2;
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
    ctx.clearRect(0, 0, w, h);
    t += SPEED;
    for (let i = 0; i < COLORS.length; i++) {
      ctx.beginPath();
      ctx.lineWidth = WAVE_WIDTH;
      ctx.strokeStyle = COLORS[i];
      ctx.globalAlpha = WAVE_OPACITY;
      for (let x = 0; x <= w; x += 6) {
        const y = noiseFns[i](x / 800 + t) * (h * 0.14) + h * CENTERS[i];
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  function loop() {
    drawWaves();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  if (!reduceMotion) requestAnimationFrame(loop);
  else drawWaves();
})();
