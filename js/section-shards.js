// Treibende Splitter im Hintergrund von "Ueber uns" und "Projekte".
function initShards(canvasId, sectionId, color, density, speed) {
  const canvas = document.getElementById(canvasId);
  const section = document.getElementById(sectionId);
  if (!canvas || !section) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let shards = [];
  let w = 0;
  let h = 0;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    w = section.clientWidth;
    h = section.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeShard() {
    const len = rand(16, 50);
    const width = len * rand(0.12, 0.26);
    return {
      x: rand(0, w),
      y: rand(0, h),
      len,
      width,
      angle: rand(0, Math.PI * 2),
      spin: rand(-0.15, 0.15),
      vx: rand(-1, 1) * 0.15,
      vy: rand(-1, -0.3) * 0.15,
      depth: rand(0.35, 1),
      alpha: rand(0.1, 0.3),
      drift: rand(0, Math.PI * 2),
      driftSpeed: rand(0.002, 0.006),
    };
  }

  function seed() {
    shards = Array.from({ length: density }, makeShard);
  }

  function step(s) {
    s.drift += s.driftSpeed * speed;
    s.x += (s.vx + Math.sin(s.drift) * 0.3) * speed * s.depth;
    s.y += s.vy * speed * s.depth;
    s.angle += s.spin * 0.02 * speed;
    if (s.y < -40) s.y = h + 40;
    if (s.x < -40) s.x = w + 40;
    if (s.x > w + 40) s.x = -40;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    shards
      .slice()
      .sort((a, b) => a.depth - b.depth)
      .forEach((s) => {
        step(s);
        const [r, g, b] = color;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.globalAlpha = s.alpha * (0.5 + s.depth * 0.5);
        const grad = ctx.createLinearGradient(-s.len / 2, 0, s.len / 2, 0);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-s.len / 2, 0);
        ctx.lineTo(0, -s.width / 2);
        ctx.lineTo(s.len / 2, 0);
        ctx.lineTo(0, s.width / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  seed();
  if (!reduceMotion) loop();
  else draw();
}

initShards("shardCanvasUeberUns", "ueber-uns", [193, 68, 14], 55, 5);
initShards("shardCanvasProjekte", "projekte", [193, 68, 14], 55, 5);
