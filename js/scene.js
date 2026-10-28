/* ==========================================================================
   Escena 3D — red neuronal esférica
   - Nodos en esfera de Fibonacci, aristas entre vecinos, pulsos viajando por las aristas.
   - Colores leídos de las variables CSS (--accent-fill) y animados al cambiar de tema.
   - Parallax con el mouse, fade con el scroll, pausa en pestaña oculta.
   - prefers-reduced-motion: un solo frame estático. Sin WebGL: el canvas se oculta.
   ========================================================================== */
(function () {
  'use strict';

  const canvas = document.getElementById('gl');
  if (!canvas || typeof THREE === 'undefined') {
    if (canvas) canvas.style.display = 'none';
    return;
  }

  const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const isMobile = () => window.innerWidth < 860;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (err) {
    canvas.style.display = 'none';
    return;
  }
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const group = new THREE.Group();
  scene.add(group);

  /* ---------- Utilidades de color ---------- */
  function cssColor(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return new THREE.Color(v || fallback);
  }
  const palette = {
    accent: new THREE.Color('#c8f542'),
    dim: new THREE.Color('#6b7a3a'),
    isDark: true,
  };
  const target = { accent: palette.accent.clone(), dim: palette.dim.clone(), isDark: true };

  function readTheme() {
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    target.isDark = dark;
    if (dark) {
      target.accent.set('#c8f542');
      target.dim.set('#52652a');
    } else {
      // Modo claro: esquema arquitectónico slate/grafito de alta legibilidad (sin verde)
      target.accent.set('#0f172a');
      target.dim.set('#94a3b8');
    }
  }

  /* ---------- Sprite circular suave para los nodos ---------- */
  function makeSprite() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.85)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }
  const sprite = makeSprite();

  /* ---------- Red neuronal ---------- */
  const NODES = isMobile() ? 90 : 170;
  const RADIUS = 3.1;
  const positions = new Float32Array(NODES * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts = [];
  for (let i = 0; i < NODES; i++) {
    const y = 1 - (i / (NODES - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    // Pequeña irregularidad radial para que no parezca una cuadrícula perfecta
    const jitter = 1 + (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.06;
    const p = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(RADIUS * jitter);
    pts.push(p);
    positions.set([p.x, p.y, p.z], i * 3);
  }

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const nodeMat = new THREE.PointsMaterial({
    size: 0.2, map: sprite, transparent: true, depthWrite: false,
    color: palette.accent, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  });
  const nodes = new THREE.Points(nodeGeo, nodeMat);
  group.add(nodes);

  // Aristas entre vecinos cercanos
  const edges = [];
  const linkDist = RADIUS * 0.46;
  for (let i = 0; i < NODES; i++) {
    let count = 0;
    for (let j = i + 1; j < NODES && count < 4; j++) {
      if (pts[i].distanceTo(pts[j]) < linkDist) {
        edges.push([i, j]);
        count++;
      }
    }
  }
  const linePos = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], k) => {
    linePos.set([pts[a].x, pts[a].y, pts[a].z, pts[b].x, pts[b].y, pts[b].z], k * 6);
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: palette.dim, transparent: true, opacity: 0.55, depthWrite: false });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  // Núcleo: icosaedro wireframe interior
  const coreMat = new THREE.MeshBasicMaterial({ color: palette.accent, wireframe: true, transparent: true, opacity: 0.22 });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), coreMat);
  group.add(core);

  // Cáscara exterior
  const shellMat = new THREE.MeshBasicMaterial({ color: palette.dim, wireframe: true, transparent: true, opacity: 0.1 });
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(RADIUS * 1.28, 2), shellMat);
  group.add(shell);

  // Anillos inclinados
  const rings = [];
  [[RADIUS * 1.5, 0.35, 0.2], [RADIUS * 1.75, -0.6, 0.9]].forEach(([r, rx, rz], i) => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.008, 6, 160),
      new THREE.MeshBasicMaterial({ color: palette.accent, transparent: true, opacity: 0.35 - i * 0.12 })
    );
    m.rotation.set(Math.PI / 2 + rx, 0, rz);
    group.add(m);
    rings.push(m);
  });

  /* ---------- Pulsos de señal sobre las aristas ---------- */
  const PULSES = isMobile() ? 14 : 30;
  const pulseData = [];
  const pulsePos = new Float32Array(PULSES * 3);
  for (let i = 0; i < PULSES; i++) {
    pulseData.push({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.5,
      dir: Math.random() > 0.5 ? 1 : -1,
    });
  }
  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));
  const pulseMat = new THREE.PointsMaterial({
    size: 0.36, map: sprite, transparent: true, depthWrite: false,
    color: palette.accent, blending: THREE.AdditiveBlending,
  });
  const pulses = new THREE.Points(pulseGeo, pulseMat);
  group.add(pulses);

  function updatePulses(dt) {
    for (let i = 0; i < PULSES; i++) {
      const p = pulseData[i];
      p.t += p.speed * dt * p.dir;
      if (p.t > 1 || p.t < 0) {
        // Salta a una arista conectada al nodo de llegada para que parezca propagación
        const cur = edges[p.edge];
        const arrival = p.t > 1 ? cur[1] : cur[0];
        const nexts = [];
        for (let e = 0; e < edges.length; e++) if (edges[e][0] === arrival || edges[e][1] === arrival) nexts.push(e);
        p.edge = nexts.length ? nexts[Math.floor(Math.random() * nexts.length)] : Math.floor(Math.random() * edges.length);
        p.dir = edges[p.edge][0] === arrival ? 1 : -1;
        p.t = p.dir === 1 ? 0 : 1;
      }
      const [a, b] = edges[p.edge];
      pulsePos[i * 3] = pts[a].x + (pts[b].x - pts[a].x) * p.t;
      pulsePos[i * 3 + 1] = pts[a].y + (pts[b].y - pts[a].y) * p.t;
      pulsePos[i * 3 + 2] = pts[a].z + (pts[b].z - pts[a].z) * p.t;
    }
    pulseGeo.attributes.position.needsUpdate = true;
  }

  /* ---------- Campo de estrellas ---------- */
  const STARS = isMobile() ? 220 : 520;
  const starPos = new Float32Array(STARS * 3);
  for (let i = 0; i < STARS; i++) {
    const r = 14 + Math.random() * 26;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    starPos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    size: 0.09, map: sprite, transparent: true, opacity: 0.55, depthWrite: false, color: palette.dim,
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ---------- Layout, resize y tema ---------- */
  let baseX = 3.4;
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile() ? 1.5 : 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (isMobile()) {
      baseX = 0;
      group.scale.setScalar(0.72);
    } else {
      // Más estrecho => la esfera se corre menos para no salirse del encuadre
      baseX = Math.min(3.6, 1.6 + (w / 1440) * 2.1);
      group.scale.setScalar(1);
    }
  }
  window.addEventListener('resize', resize);
  resize();

  readTheme();
  palette.accent.copy(target.accent);
  palette.dim.copy(target.dim);
  palette.isDark = target.isDark;
  applyPalette(true);

  new MutationObserver(readTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function applyPalette(instant) {
    const k = instant ? 1 : 0.08;
    palette.accent.lerp(target.accent, k);
    palette.dim.lerp(target.dim, k);
    nodeMat.color.copy(palette.accent);
    pulseMat.color.copy(palette.accent);
    coreMat.color.copy(palette.accent);
    lineMat.color.copy(palette.dim);
    shellMat.color.copy(palette.dim);
    starMat.color.copy(palette.dim);
    rings.forEach((r) => r.material.color.copy(palette.accent));
    // En claro, aditivo desaparece sobre fondo blanco: usar blending normal y nodos más grandes
    const blend = target.isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    if (nodeMat.blending !== blend && (instant || palette.accent.distanceTo(target.accent) < 0.25)) {
      nodeMat.blending = blend;
      pulseMat.blending = blend;
      nodeMat.size = target.isDark ? 0.2 : 0.26;
      pulseMat.size = target.isDark ? 0.36 : 0.42;
      lineMat.opacity = target.isDark ? 0.55 : 0.7;
      nodeMat.needsUpdate = true;
      pulseMat.needsUpdate = true;
    }
  }

  /* ---------- Interacción ---------- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  // Pulso de energía (usado por el audio / clics)
  let boost = 0;
  window.boost3DScene = function () { boost = 1; };

  /* ---------- Loop ---------- */
  const clock = new THREE.Clock();
  let running = true;
  let t = 0;

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    t += dt;

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    boost *= 0.93;

    const spin = 0.12 + boost * 0.9;
    group.rotation.y += dt * spin;
    group.rotation.x = Math.sin(t * 0.25) * 0.12 + mouse.y * 0.18;
    group.rotation.z = mouse.x * 0.06;
    core.rotation.y -= dt * 0.35;
    core.rotation.x += dt * 0.2;
    shell.rotation.y += dt * 0.05;
    rings[0].rotation.z += dt * 0.12;
    rings[1].rotation.z -= dt * 0.08;
    stars.rotation.y += dt * 0.006;

    const breathe = 1 + Math.sin(t * 0.9) * 0.012 + boost * 0.06;
    nodes.scale.setScalar(breathe);

    // Posición con parallax y desplazamiento por scroll (la esfera se aleja y se desvanece)
    const prog = Math.min(scrollY / (window.innerHeight * 0.9), 1);
    group.position.x = baseX - mouse.x * 0.25 - prog * (isMobile() ? 0 : 1.2);
    group.position.y = -mouse.y * 0.15 + prog * 0.8;
    camera.position.z = 11 + prog * 3;
    canvas.style.opacity = String(1 - prog * 0.78);

    applyPalette(false);
    updatePulses(dt);
    renderer.render(scene, camera);
  }

  function loop() {
    if (!running) return;
    frame();
    requestAnimationFrame(loop);
  }

  if (reduceMotion) {
    frame();
  } else {
    requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) { clock.getDelta(); requestAnimationFrame(loop); }
    });
  }
})();
