// Interactive 3D WebGL Background Engine using Three.js
// Inspired by creative developer portfolios, elevated for AI & Systems Architecture.
// Pure vanilla WebGL, zero build step required, ultra-optimized for 60fps.

(function () {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded, 3D background disabled.');
    return;
  }

  const canvas = document.getElementById('gl');
  if (!canvas) return;

  // Check WebGL availability
  try {
    const glTest = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!glTest) return;
  } catch (e) {
    return;
  }

  // Reduce load on mobile or low-end devices
  const isMobile = window.innerWidth < 768;
  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: !isMobile,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 10;

  // Ambient & dynamic lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const light1 = new THREE.PointLight(0x3b82f6, 80, 45);
  const light2 = new THREE.PointLight(0x8b5cf6, 60, 45);
  light1.position.set(5, 4, 6);
  light2.position.set(-6, -3, 5);
  scene.add(ambientLight, light1, light2);

  // Central geometric neural core (Group)
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  const coreMat = new THREE.MeshStandardMaterial({
    metalness: 0.85,
    roughness: 0.25,
    emissiveIntensity: 0.35,
    wireframe: true
  });

  // Concentric orbital gimbal rings
  const ringMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.45 });
  const rings = [];
  [3.2, 4.0, 4.8].forEach((radius, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.015, 8, 120), ringMat);
    ring.rotation.set(1 + i * 0.6, i * 0.8, 0);
    rings.push(ring);
    coreGroup.add(ring);
  });

  // Nested Icosahedron (Geometric neural lattice)
  const icoMat = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.25 });
  const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(2.8, 1), icoMat);
  coreGroup.add(icosahedron);

  const innerIco = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 0), coreMat);
  coreGroup.add(innerIco);

  // Floating crystalline data nodes
  const crystals = [];
  const crystalCount = isMobile ? 4 : 8;
  for (let i = 0; i < crystalCount; i++) {
    const oct = new THREE.Mesh(new THREE.OctahedronGeometry(0.18 + Math.random() * 0.15), coreMat);
    oct.userData = {
      angle: Math.random() * Math.PI * 2,
      radius: 3.3 + Math.random() * 1.8,
      speed: 0.15 + Math.random() * 0.35,
      yOffset: (Math.random() - 0.5) * 2.5
    };
    crystals.push(oct);
    coreGroup.add(oct);
  }

  // Ambient Starfield Point Cloud
  const particleCount = isMobile ? 500 : 1200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const r = 4 + Math.random() * 12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.035,
    transparent: true,
    opacity: 0.75,
    color: 0x60a5fa
  });
  const points = new THREE.Points(particleGeo, particleMat);
  scene.add(points);

  // Theme Colors
  const targetColors = {
    c1: new THREE.Color('#3b82f6'),
    c2: new THREE.Color('#8b5cf6'),
    c3: new THREE.Color('#60a5fa')
  };

  function updateThemeColors(themeName) {
    if (themeName === 'light') {
      targetColors.c1.set('#2563eb');
      targetColors.c2.set('#7c3aed');
      targetColors.c3.set('#64748b');
      particleMat.opacity = 0.45;
      ringMat.opacity = 0.3;
      icoMat.opacity = 0.15;
    } else {
      targetColors.c1.set('#3b82f6');
      targetColors.c2.set('#8b5cf6');
      targetColors.c3.set('#93c5fd');
      particleMat.opacity = 0.75;
      ringMat.opacity = 0.45;
      icoMat.opacity = 0.25;
    }
  }

  // Initial theme check
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeColors(currentTheme);

  // Observer for data-theme mutations
  const themeObserver = new MutationObserver(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeColors(theme);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function lerpColors(step) {
    coreMat.color.lerp(targetColors.c1, step);
    coreMat.emissive.lerp(targetColors.c2, step);
    light1.color.lerp(targetColors.c1, step);
    light2.color.lerp(targetColors.c2, step);
    ringMat.color.lerp(targetColors.c3, step);
    icoMat.color.lerp(targetColors.c1, step);
    particleMat.color.lerp(targetColors.c3, step);
  }

  // Pointer & Scroll Inertia
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let boost = 0;

  window.addEventListener('pointermove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (document.hidden) return;

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    lerpColors(0.04);

    // Scroll depth progress
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollMax > 0 ? window.scrollY / scrollMax : 0;

    boost *= 0.96;

    // Group transforms
    coreGroup.rotation.y = elapsedTime * 0.12 + mouse.x * 0.4 + scrollPercent * Math.PI * 2 + boost * 6;
    coreGroup.rotation.x = mouse.y * 0.25;

    const isWide = window.innerWidth > 900;
    coreGroup.position.x = isWide ? Math.sin(scrollPercent * Math.PI * 2) * 2.2 : 0;
    coreGroup.position.y = -scrollPercent * 0.7;
    coreGroup.scale.setScalar(Math.max(0.65, 1 - scrollPercent * 0.35) * (isWide ? 1 : 0.75));

    icosahedron.rotation.x = elapsedTime * 0.06;
    innerIco.rotation.y = -elapsedTime * 0.1;

    rings.forEach((ring, idx) => {
      ring.rotation.z += 0.002 * (idx + 1);
    });

    crystals.forEach((crystal) => {
      const data = crystal.userData;
      data.angle += data.speed * 0.01;
      crystal.position.set(
        Math.cos(data.angle) * data.radius,
        data.yOffset + Math.sin(elapsedTime + data.angle) * 0.25,
        Math.sin(data.angle) * data.radius
      );
      crystal.rotation.x += 0.01;
      crystal.rotation.y += 0.015;
    });

    points.rotation.y = elapsedTime * 0.015 + mouse.x * 0.08;
    points.rotation.x = mouse.y * 0.04;

    light1.position.x = 5 + mouse.x * 4;
    light1.position.y = 4 - mouse.y * 3;

    renderer.render(scene, camera);
  }

  animate();

  // Export helper for Easter egg / boost
  window.boost3DScene = function () {
    boost = 1;
  };
})();
