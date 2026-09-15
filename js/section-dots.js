// Punkte-Netzwerk-Hintergrund fuer "Ueber uns" und "Projekte": kleine Gruppen von
// Punkten, die sanft und im Gleichklang um ihre Gruppenmitte kreisen und sich
// untereinander verbinden. Reines Canvas 2D / Vanilla-JS.
function initDotNetwork(canvasId, sectionId, dotColor, lineColor) {
  const canvas = document.getElementById(canvasId);
  const section = document.getElementById(sectionId);
  if (!canvas || !section) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let points = [];
  let time = 0;

  const LINK_DIST = 110;
  const CLUSTER_ANCHORS = [
    [0.08, 0.18], [0.92, 0.18],
    [0.06, 0.5], [0.94, 0.5],
    [0.08, 0.85], [0.92, 0.85],
  ];
  const POINTS_PER_CLUSTER = 4;

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
    seed();
  }

  function seed() {
    const clusterRadius = Math.min(w, h) * 0.09;
    points = [];
    CLUSTER_ANCHORS.forEach(([fx, fy]) => {
      const cx = w * fx;
      const cy = h * fy;
      for (let i = 0; i < POINTS_PER_CLUSTER; i++) {
        const angle = rand(0, Math.PI * 2);
        const dist = rand(0, clusterRadius);
        points.push({
          homeX: cx,
          homeY: cy,
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          phase: rand(0, Math.PI * 2),
          speed: rand(0.15, 0.25),
          radius: rand(clusterRadius * 0.3, clusterRadius),
          angle,
        });
      }
    });
  }

  function step(p) {
    p.angle += 0.003 * p.speed;
    const wobble = Math.sin(time * 0.8 + p.phase) * 0.15 + 1;
    p.x = p.homeX + Math.cos(p.angle) * p.radius * wobble;
    p.y = p.homeY + Math.sin(p.angle) * p.radius * wobble;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    time += 0.016;
    points.forEach(step);

    const pulse = Math.sin(time * 0.5) * 0.15 + 0.85;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = lineColor;
          ctx.globalAlpha = (1 - dist / LINK_DIST) * 0.35 * pulse;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 0.8 * pulse;
    ctx.fillStyle = dotColor;
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  if (!reduceMotion) loop();
  else draw();
}

initDotNetwork("shardCanvasUeberUns", "ueber-uns", "rgba(193,68,14,0.7)", "rgba(193,68,14,0.7)");
initDotNetwork("shardCanvasProjekte", "projekte", "rgba(193,68,14,0.7)", "rgba(193,68,14,0.7)");
