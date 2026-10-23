// Contenido del portafolio: datos + render.
// Los textos viven en data/translations.json (ES/EN); aquí solo hay estructura, enlaces y etiquetas técnicas.
// Para agregar un proyecto: añade una entrada en PROJECTS y sus textos en translations.json (projects.items.<id>).

(function () {
  const GH = 'https://github.com/jjho05/';

  // url: null => repositorio privado o sin publicar (la fila no es un enlace)
  const PROJECTS = [
    { id: 'apyo4all', url: GH + 'Apyo4all', cats: 'fullstack hackathon', tags: ['React 19', 'TypeScript', 'Supabase', 'Electron', 'Leaflet'] },
    { id: 'ecoeye', url: GH + 'EcoEye', cats: 'ai deeplearning hackathon', tags: ['TensorFlow.js', 'Gemini', 'WiFi CSI', 'PCA', 'Offline-first'] },
    { id: 'bloodcare', url: GH + 'BloodCare', cats: 'deeplearning hackathon', tags: ['PyTorch', 'Bi-LSTM', 'Pinball Loss', 'OhioT1DM'] },
    { id: 'olvera_ai_suite', url: null, cats: 'ai fullstack', tags: ['Next.js', 'Vercel AI SDK', 'OpenRouter', 'Groq Whisper'] },
    { id: 'build_with_ai', url: GH + 'build-with-ai-itcm', cats: 'ai fullstack', tags: ['Next.js 14', 'Gemini API', 'Vercel KV', 'RAG'] },
    { id: 'siie', url: GH + 'Sistema-Inteligente-Inspeccion-Electrica-Ejecutable', cats: 'ai fullstack', tags: ['Python', 'Hugging Face', 'Docker', 'PostgreSQL'] },
    { id: 'salones', url: GH + 'Sistema-Salones-ISC', cats: 'ai fullstack', tags: ['Algoritmos genéticos', 'Random Forest', 'PyVista'] },
    { id: 'edunova', url: GH + 'EduNova_AI', cats: 'ai fullstack', tags: ['Flutter', 'FastAPI', 'MySQL', 'Gemini Vision'] },
    { id: 'sephora', url: GH + 'distilroberta-sephora-analytics', cats: 'ai deeplearning', tags: ['DistilRoBERTa', 'Docker', 'Shiny', 'Power BI'] },
    { id: 'cres', url: null, cats: 'fullstack', tags: ['Next.js 14', 'TypeScript', 'Tailwind', 'CMS a medida'] },
    { id: 'llama', url: GH + 'meta-llama-engineering-labs', cats: 'ai', tags: ['Llama 3', 'Model Router', 'Benchmarking'] },
    { id: 'olvera_ai_shiny', url: null, cats: 'ai', tags: ['Shiny', 'LiteLLM', 'Tavily', 'Groq'] },
    { id: 'aura_app', url: GH + 'AURA-APP', cats: 'ai', tags: ['CustomTkinter', 'Gemini API', 'ElevenLabs'] },
    { id: 'olvera_food_ai', url: null, cats: 'ai', tags: ['Shiny', 'LiteLLM', 'Tavily'] }
  ];

  const HONORS = [
    { id: 'iest', win: true },
    { id: 'regional', win: false },
    { id: 'local', win: true },
    { id: 'isc', win: true },
    { id: 'expociencias', win: false },
    { id: 'student', win: false }
  ];

  const EXPERIENCE = ['build_with_ai', 'apyo4all', 'ecoeye', 'bloodcare', 'siie', 'salones', 'edunova', 'cres'];

  // links: [{ href, icon, i18n? , label? , primary? }]
  const LAB = [
    { id: 'fourier', icon: 'fa-wave-square', links: [] },
    { id: 'vexel', icon: 'fa-cubes', links: [
      { href: GH + 'VEXEL', icon: 'fa-brands fa-github', label: 'VEXEL' },
      { href: GH + 'BRAINY2', icon: 'fa-brands fa-github', label: 'BRAINY2' }
    ] },
    { id: 'blockbuilder', icon: 'fa-cube', links: [
      { href: 'https://jjho05.github.io/BLOCK-BUILDER/app.html', icon: 'fa-solid fa-play', i18n: 'lab.runLink', primary: true },
      { href: GH + 'BLOCK-BUILDER', icon: 'fa-brands fa-github', i18n: 'lab.codeLink' }
    ] },
    { id: 'neon', icon: 'fa-circle-notch', links: [
      { href: 'https://jjho05.github.io/ESFERA-3D/app.html', icon: 'fa-solid fa-play', i18n: 'lab.runLink', primary: true },
      { href: GH + 'ESFERA-3D', icon: 'fa-brands fa-github', i18n: 'lab.codeLink' }
    ] },
    { id: 'win95', icon: 'fa-window-maximize', links: [
      { href: 'https://jjho05.github.io/WINDOWS-95/', icon: 'fa-solid fa-play', i18n: 'lab.runLink', primary: true },
      { href: GH + 'WINDOWS-95', icon: 'fa-brands fa-github', i18n: 'lab.codeLink' }
    ] },
    { id: 'tetris', icon: 'fa-gamepad', links: [
      { href: GH + 'TETRIS', icon: 'fa-brands fa-github', i18n: 'lab.codeLink' }
    ] }
  ];

  const STACK = [
    { id: 'ai', icon: 'fa-brain', chips: ['Google Antigravity SDK', 'Gemini 3.x', 'Claude 3.7', 'Meta Llama 3', 'Vercel AI SDK', 'LiteLLM', 'RAG', 'Embeddings'] },
    { id: 'fullstack', icon: 'fa-layer-group', chips: ['Next.js 14/15', 'React 19', 'TypeScript', 'FastAPI', 'Flutter 3', 'Electron', 'Tailwind CSS'] },
    { id: 'dl', icon: 'fa-dna', chips: ['PyTorch', 'Bi-LSTM', 'Pinball Loss', 'Transformers', 'Pandas / NumPy', 'Scikit-learn', 'Power BI'] },
    { id: 'cloud', icon: 'fa-server', chips: ['Docker', 'Supabase', 'PostgreSQL', 'Redis', 'Vercel Edge', 'GitHub Actions', 'Linux'] },
    { id: 'edge', icon: 'fa-wifi', chips: ['TensorFlow.js', 'WiFi CSI / OFDM', 'Butterworth', 'PCA', 'Three.js / WebGL', 'Canvas API'] }
  ];

  const MARQUEE = ['PyTorch', 'Next.js', 'TypeScript', 'Gemini', 'FastAPI', 'Flutter', 'TensorFlow.js', 'Docker', 'Supabase', 'Three.js', 'Hugging Face', 'PostgreSQL', 'LiteLLM', 'Electron'];

  const h = (strings, ...vals) => strings.reduce((acc, s, i) => acc + s + (i < vals.length ? vals[i] : ''), '');
  const $ = (sel) => document.querySelector(sel);

  function renderMarquee() {
    const el = $('#marqueeTrack');
    if (!el) return;
    const group = MARQUEE.map((t) => `<span>${t}</span>`).join('');
    // dos copias idénticas para el bucle infinito
    el.innerHTML = `<div class="marquee-group">${group}</div><div class="marquee-group" aria-hidden="true">${group}</div>`;
  }

  function renderHonors() {
    const el = $('#honorsList');
    if (!el) return;
    el.innerHTML = HONORS.map((x) => h`
      <li class="honor reveal">
        <span class="honor-year" data-i18n="distinctions.items.${x.id}.year"></span>
        <div class="honor-body">
          <h4 data-i18n="distinctions.items.${x.id}.title"></h4>
          <p data-i18n="distinctions.items.${x.id}.desc"></p>
        </div>
        <span class="badge ${x.win ? 'badge-win' : ''}" data-i18n="distinctions.items.${x.id}.badge"></span>
      </li>`).join('');
  }

  function renderExperience() {
    const el = $('#xpList');
    if (!el) return;
    el.innerHTML = EXPERIENCE.map((id) => h`
      <li class="xp reveal">
        <span class="xp-period" data-i18n="experience.items.${id}.period"></span>
        <div class="xp-body">
          <h4 data-i18n="experience.items.${id}.title"></h4>
          <p class="xp-role" data-i18n="experience.items.${id}.role"></p>
          <p class="xp-desc" data-i18n="experience.items.${id}.desc"></p>
        </div>
      </li>`).join('');
  }

  function renderProjects() {
    const el = $('#projectList');
    if (!el) return;
    el.innerHTML = PROJECTS.map((p, i) => {
      const num = String(i + 1).padStart(2, '0');
      const tag = p.url ? 'a' : 'div';
      const attrs = p.url ? ` href="${p.url}" target="_blank" rel="noopener noreferrer"` : '';
      const arrow = p.url ? '<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>' : '<i class="fa-solid fa-lock" aria-hidden="true" title="Privado"></i>';
      return h`
        <li class="reveal" data-cats="${p.cats}">
          <${tag} class="p-row spot${p.url ? '' : ' is-static'}"${attrs}>
            <span class="p-num">${num}</span>
            <div class="p-main">
              <h3 class="p-title" data-i18n="projects.items.${p.id}.title"></h3>
              <span class="p-role" data-i18n="projects.items.${p.id}.role"></span>
            </div>
            <div class="p-info">
              <p class="p-desc" data-i18n="projects.items.${p.id}.desc"></p>
              <div class="p-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
            </div>
            <span class="p-pill" data-i18n="projects.items.${p.id}.pill"></span>
            <span class="p-arrow">${arrow}</span>
          </${tag}>
        </li>`;
    }).join('');
    const total = $('#projTotal');
    if (total) total.textContent = String(PROJECTS.length);
  }

  function renderLab() {
    const el = $('#labGrid');
    if (!el) return;
    el.innerHTML = LAB.map((x) => {
      const links = x.links.map((l) => {
        const text = l.i18n ? `<span data-i18n="${l.i18n}"></span>` : `<span>${l.label}</span>`;
        return `<a class="btn btn-xs ${l.primary ? 'btn-primary' : 'btn-ghost'}" href="${l.href}" target="_blank" rel="noopener noreferrer"><i class="${l.icon}" aria-hidden="true"></i>${text}</a>`;
      }).join('');
      return h`
        <article class="lab-card spot reveal">
          <div>
            <div class="lab-icon"><i class="fa-solid ${x.icon}" aria-hidden="true"></i></div>
            <h3 class="lab-title" data-i18n="lab.items.${x.id}.title"></h3>
            <p class="lab-desc" data-i18n="lab.items.${x.id}.desc"></p>
          </div>
          ${links ? `<div class="lab-actions">${links}</div>` : ''}
        </article>`;
    }).join('');
  }

  function renderStack() {
    const el = $('#stackList');
    if (!el) return;
    el.innerHTML = STACK.map((x) => h`
      <li class="stack-row reveal">
        <div class="stack-head">
          <i class="fa-solid ${x.icon}" aria-hidden="true"></i>
          <div>
            <h3 data-i18n="stack.items.${x.id}.title"></h3>
            <p data-i18n="stack.items.${x.id}.desc"></p>
          </div>
        </div>
        <div class="stack-chips">${x.chips.map((c) => `<span class="tag">${c}</span>`).join('')}</div>
      </li>`).join('');
  }

  renderMarquee();
  renderHonors();
  renderExperience();
  renderProjects();
  renderLab();
  renderStack();

  // i18n carga translations.json de forma asíncrona; si ya terminó, reaplica sobre el DOM recién creado.
  if (window.i18n && window.i18n.translations) window.i18n.applyTranslations();
})();
