(function () {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const hero = canvas.closest(".hero");
  const ctx = canvas.getContext("2d");
  const ORANGE = [243, 112, 33];
  const DENSITY = 70;
  const SPEED = 2.5;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let shards = [];
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeShard() {
    const len = rand(18, 60);
    const width = len * rand(0.12, 0.28);
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
      alpha: rand(0.06, 0.32),
      drift: rand(0, Math.PI * 2),
      driftSpeed: rand(0.002, 0.006),
    };
  }

  function seed() {
    shards = Array.from({ length: DENSITY }, makeShard);
  }

  function step(shard) {
    shard.drift += shard.driftSpeed * SPEED;
    shard.x += (shard.vx + Math.sin(shard.drift) * 0.3) * SPEED * shard.depth;
    shard.y += shard.vy * SPEED * shard.depth;
    shard.angle += shard.spin * 0.01 * SPEED;

    if (shard.y < -40) shard.y = h + 40;
    if (shard.x < -40) shard.x = w + 40;
    if (shard.x > w + 40) shard.x = -40;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    shards
      .slice()
      .sort((a, b) => a.depth - b.depth)
      .forEach((shard) => {
        step(shard);
        const [r, g, b] = ORANGE;
        ctx.save();
        ctx.translate(shard.x, shard.y);
        ctx.rotate(shard.angle);
        ctx.globalAlpha = shard.alpha * (0.5 + shard.depth * 0.5);
        if (shard.depth < 0.6) {
          ctx.filter = "blur(1.5px)";
        }
        const grad = ctx.createLinearGradient(-shard.len / 2, 0, shard.len / 2, 0);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-shard.len / 2, 0);
        ctx.lineTo(0, -shard.width / 2);
        ctx.lineTo(shard.len / 2, 0);
        ctx.lineTo(0, shard.width / 2);
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
  if (!reduceMotion) {
    loop();
  }
})();
