// Hero-Hintergrund: "Iridescence"-Effekt (reines WebGL, ohne ogl-Abhaengigkeit), in Orange getoent.
(function () {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const hero = canvas.closest(".hero");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) return;

  const COLOR = [1.0, 0.44, 0.13];
  const SPEED = 0.5;
  const AMPLITUDE = 0.12;

  const vertexSrc = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentSrc = `
    precision highp float;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uResolution;
    uniform vec2 uMouse;
    uniform float uAmplitude;
    uniform float uSpeed;
    varying vec2 vUv;

    void main() {
      float mr = min(uResolution.x, uResolution.y);
      vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
      uv += (uMouse - vec2(0.5)) * uAmplitude;

      float d = -uTime * 0.5 * uSpeed;
      float a = 0.0;
      for (float i = 0.0; i < 8.0; ++i) {
        a += cos(i - d - a * uv.x);
        d += sin(uv.y * i + a);
      }
      d += uTime * 0.5 * uSpeed;
      vec3 raw = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
      raw = cos(raw * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
      // Nur die Helligkeit behalten und einheitlich in uColor einfaerben,
      // damit kein Gruen/Oliv-Ton mehr durchscheint.
      float lum = clamp(dot(raw, vec3(0.3333)), 0.0, 1.0);
      lum = pow(lum, 0.55);
      // uColor bleibt die Obergrenze pro Kanal -> Farbton kippt nie ins Gelb/Gruen.
      vec3 col = uColor * mix(0.04, 1.0, lum);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSrc));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSrc));
  gl.linkProgram(program);
  gl.useProgram(program);

  const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
  const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
  const uvLoc = gl.getAttribLocation(program, "uv");
  gl.enableVertexAttribArray(uvLoc);
  gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, "uTime");
  const uColor = gl.getUniformLocation(program, "uColor");
  const uResolution = gl.getUniformLocation(program, "uResolution");
  const uMouse = gl.getUniformLocation(program, "uMouse");
  const uAmplitude = gl.getUniformLocation(program, "uAmplitude");
  const uSpeed = gl.getUniformLocation(program, "uSpeed");

  gl.uniform3f(uColor, COLOR[0], COLOR[1], COLOR[2]);
  gl.uniform1f(uAmplitude, AMPLITUDE);
  gl.uniform1f(uSpeed, SPEED);

  let mouseX = 0.5;
  let mouseY = 0.5;

  function resize() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform3f(uResolution, canvas.width, canvas.height, canvas.width / canvas.height);
  }

  function render(time) {
    gl.uniform1f(uTime, time * 0.001);
    gl.uniform2f(uMouse, mouseX, mouseY);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(render);
  }

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = 1.0 - (e.clientY - rect.top) / rect.height;
  });

  window.addEventListener("resize", resize);
  resize();
  if (!reduceMotion) {
    requestAnimationFrame(render);
  } else {
    render(0);
  }
})();

// Hover-Funken-Spur, als eigene 2D-Ebene ueber dem WebGL-Hintergrund.
(function () {
  const canvas = document.getElementById("heroSparkCanvas");
  if (!canvas) return;
  const hero = canvas.closest(".hero");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0;
  let h = 0;
  let sparks = [];

  function resize() {
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnSpark(x, y) {
    sparks.push({
      x,
      y,
      vx: 3 + Math.random() * 3,
      vy: (Math.random() - 0.5) * 0.6,
      life: 1,
      size: 2 + Math.random() * 2,
    });
    if (sparks.length > 140) sparks.splice(0, sparks.length - 140);
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);
    sparks.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.02;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,235,215,${Math.max(s.life, 0)})`;
      ctx.shadowColor = "rgba(255,180,110,0.9)";
      ctx.shadowBlur = 12;
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    sparks = sparks.filter((s) => s.life > 0 && s.x < w + 20);
    requestAnimationFrame(loop);
  }

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    spawnSpark(e.clientX - rect.left, e.clientY - rect.top);
  });

  window.addEventListener("resize", resize);
  resize();
  if (!reduceMotion) requestAnimationFrame(loop);
})();
