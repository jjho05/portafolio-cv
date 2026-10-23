// Contenido del portafolio: datos + render.
// Los textos viven en data/translations.json (ES/EN); aquí solo hay estructura, enlaces y etiquetas técnicas.
// Cada proyecto aquí es 100% público y verificado en GitHub (https://github.com/jjho05/<repo>).

(function () {
  const GH = 'https://github.com/jjho05/';

  const PROJECTS = [
    {
        'id': 'apyo4all',
        'url': GH + 'Apyo4all',
        'cats': 'fullstack hackathon',
        'tags': [
            'React 19',
            'TypeScript',
            'Supabase',
            'Electron',
            'Leaflet'
        ]
    },
    {
        'id': 'ecoeye',
        'url': GH + 'EcoEye',
        'cats': 'ai deeplearning hackathon',
        'tags': [
            'TensorFlow.js',
            'Gemini AI',
            'WiFi CSI',
            'PCA',
            'Edge AI'
        ]
    },
    {
        'id': 'bloodcare',
        'url': GH + 'BloodCare',
        'cats': 'deeplearning hackathon',
        'tags': [
            'PyTorch',
            'Bi-LSTM',
            'Pinball Loss',
            'OhioT1DM',
            'Bio-IA'
        ]
    },
    {
        'id': 'siie',
        'url': GH + 'Sistema-Inteligente-Inspeccion-Electrica-Ejecutable',
        'cats': 'ai fullstack',
        'tags': [
            'Python',
            'Computer Vision',
            'Docker',
            'PostgreSQL',
            'NOM-001'
        ]
    },
    {
        'id': 'salones',
        'url': GH + 'Sistema-Salones-ISC',
        'cats': 'ai fullstack hackathon',
        'tags': [
            'Algoritmos Gen\u00e9ticos',
            'Random Forest',
            'PyVista',
            'Heur\u00edstica'
        ]
    },
    {
        'id': 'build_with_ai',
        'url': GH + 'build-with-ai-itcm',
        'cats': 'ai fullstack',
        'tags': [
            'Next.js 14',
            'Gemini API',
            'Vercel KV',
            'RAG',
            'Material 3'
        ]
    },
    {
        'id': 'sephora',
        'url': GH + 'distilroberta-sephora-analytics',
        'cats': 'ai deeplearning',
        'tags': [
            'DistilRoBERTa',
            'PyTorch',
            'Docker',
            'Shiny',
            'Power BI'
        ]
    },
    {
        'id': 'edunova',
        'url': GH + 'EduNova_AI',
        'cats': 'ai fullstack',
        'tags': [
            'Flutter',
            'FastAPI',
            'MySQL',
            'Gemini Vision'
        ]
    },
    {
        'id': 'llama',
        'url': GH + 'meta-llama-engineering-labs',
        'cats': 'ai',
        'tags': [
            'Llama 3',
            'Model Router',
            'Prompt Eng',
            'Benchmarking'
        ]
    },
    {
        'id': 'ia_llama',
        'url': GH + 'Inteligencia_Artificial_Aplicada_Llama',
        'cats': 'ai fullstack',
        'tags': [
            'Llama AI',
            'NLP',
            'Hugging Face',
            'Web Interface'
        ]
    },
    {
        'id': 'agentes_ciclo_vida',
        'url': GH + 'Sistema-de-Agentes-para-el-Diagnostico-de-Obsolescencia-y-Ciclo-de-Vida',
        'cats': 'ai',
        'tags': [
            'Multi-Agent',
            'Python',
            'Predictive Analysis',
            'Hardware Lifecycle'
        ]
    },
    {
        'id': 'cyclistic',
        'url': GH + 'cyclistic-shiny-dashboard',
        'cats': 'fullstack',
        'tags': [
            'Python',
            'Shiny',
            'Data Analytics',
            'Geo-Spatial'
        ]
    },
    {
        'id': 'aura_app',
        'url': GH + 'AURA-APP',
        'cats': 'ai',
        'tags': [
            'CustomTkinter',
            'Gemini API',
            'ElevenLabs',
            'Python'
        ]
    },
    {
        'id': 'prompts_ia',
        'url': GH + 'PROMPTS-IA',
        'cats': 'ai',
        'tags': [
            'Gemini 3 Flash',
            'Prompt Engineering',
            'Python',
            'Streamlit'
        ]
    },
    {
        'id': 'vexel',
        'url': GH + 'VEXEL',
        'cats': 'ai',
        'tags': [
            'PyVista',
            'Gemini AI',
            '3D Graphics',
            'Scientific Computing'
        ]
    },
    {
        'id': 'brainy2',
        'url': GH + 'BRAINY2',
        'cats': 'ai',
        'tags': [
            'Linear Algebra',
            'NumPy',
            '3D Math',
            'Python'
        ]
    },
    {
        'id': 'censo_isc',
        'url': GH + 'censo-isc-acm-itcm',
        'cats': 'fullstack',
        'tags': [
            'HTML5',
            'CSS Grid',
            'JavaScript',
            'ACM ITCM'
        ]
    },
    {
        'id': 'supertienda',
        'url': GH + 'SuperTiendaProMax',
        'cats': 'fullstack',
        'tags': [
            'JavaFX',
            'MySQL',
            'Desktop Architecture',
            'PDF/Excel Reports'
        ]
    },
    {
        'id': 'simulacion',
        'url': GH + 'simulacion-tecnm',
        'cats': 'fullstack',
        'tags': [
            'Python',
            'SimPy',
            'Monte Carlo',
            'Discrete Event'
        ]
    },
    {
        'id': 'top_avanz_prog',
        'url': GH + 'top-avanz-prog-tecnm',
        'cats': 'fullstack',
        'tags': [
            'Python',
            'Concurrency',
            'ORM',
            'GUI Architecture'
        ]
    },
    {
        'id': 'skills_isc',
        'url': GH + 'SKILLS-ISC-TECNM',
        'cats': 'fullstack',
        'tags': [
            'Software Engineering',
            'Skills',
            'Best Practices',
            'Python'
        ]
    },
    {
        'id': 'rediseno_sii',
        'url': GH + 'REDISENO-SII',
        'cats': 'fullstack',
        'tags': [
            'Web UI',
            'JavaScript',
            'CSS Architecture',
            'Modernization'
        ]
    },
    {
        'id': 'icpc',
        'url': GH + 'ICPC_TecNM_ITCM',
        'cats': 'fullstack',
        'tags': [
            'Algorithms',
            'Data Structures',
            'Competitive Programming',
            'C++'
        ]
    },
    {
        'id': 'nextjs_acme',
        'url': GH + 'nextjs-acme-dashboard',
        'cats': 'fullstack',
        'tags': [
            'Next.js 14',
            'TypeScript',
            'Server Actions',
            'PostgreSQL'
        ]
    },
    {
        'id': 'vive_mexico',
        'url': GH + 'vive-mexico',
        'cats': 'fullstack',
        'tags': [
            'TypeScript',
            'Frontend',
            'Interactive UI'
        ]
    },
    {
        'id': 'congruencial',
        'url': GH + 'Generador-Congruecial-Lineal-Mixto',
        'cats': 'fullstack',
        'tags': [
            'Java',
            'Probabilidad & Estad\u00edstica',
            'Algoritmos'
        ]
    },
    {
        'id': 'blockbuilder',
        'url': GH + 'BLOCK-BUILDER',
        'cats': 'fullstack',
        'tags': [
            'Three.js',
            'WebGL',
            '3D Voxel Engine',
            'Interactive'
        ]
    },
    {
        'id': 'esfera_3d',
        'url': GH + 'ESFERA-3D',
        'cats': 'fullstack',
        'tags': [
            'Three.js',
            'Game Loop',
            'Audio Web',
            'Cyberpunk 3D'
        ]
    },
    {
        'id': 'win95',
        'url': GH + 'WINDOWS-95',
        'cats': 'fullstack',
        'tags': [
            'JavaScript',
            'CSS Systems',
            'Window Manager',
            'Retro UI'
        ]
    },
    {
        'id': 'carreras',
        'url': GH + 'SON-CARRERAS-NO-CARRERITAS',
        'cats': 'fullstack',
        'tags': [
            'Three.js',
            'Pygame',
            'Game Physics',
            '3D Engine'
        ]
    },
    {
        'id': 'tetris',
        'url': GH + 'TETRIS',
        'cats': 'fullstack',
        'tags': [
            'Python',
            'Pygame',
            'State Machine',
            'Classic Arcade'
        ]
    },
    {
        'id': 'braincourse',
        'url': GH + 'BrainCourse',
        'cats': 'fullstack',
        'tags': [
            'Python',
            'LMS',
            'Education Tech',
            'Analytics'
        ]
    },
    {
        'id': 'prog_web',
        'url': GH + 'prog-web-tecnm',
        'cats': 'fullstack',
        'tags': [
            'HTML5',
            'CSS3',
            'Modern Web Standards',
            'Architecture'
        ]
    },
    {
        'id': 'isc_hub',
        'url': GH + 'ISC-Hub',
        'cats': 'fullstack',
        'tags': [
            'Web Platform',
            'Community',
            'Resource Sharing'
        ]
    },
    {
        'id': 'isc_cursos',
        'url': GH + 'ISC-ITCM-CURSOS',
        'cats': 'fullstack',
        'tags': [
            'E-Learning',
            'JavaScript',
            'Educational System'
        ]
    },
    {
        'id': 'isc_itcm',
        'url': GH + 'ISC-ITCM',
        'cats': 'fullstack',
        'tags': [
            'Web Architecture',
            'Institutional',
            'Information Systems'
        ]
    }
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

  const LAB = [
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
    { id: 'carreras', icon: 'fa-car-side', links: [
      { href: GH + 'SON-CARRERAS-NO-CARRERITAS', icon: 'fa-brands fa-github', i18n: 'lab.codeLink' }
    ] },
    { id: 'tetris', icon: 'fa-gamepad', links: [
      { href: GH + 'TETRIS', icon: 'fa-brands fa-github', i18n: 'lab.codeLink' }
    ] }
  ];

  const STACK = [
    { id: 'arch', icon: 'fa-layer-group', chips: ['Clean Architecture', 'Event-Driven', 'Microservices', 'Offline-first', 'PWA'] },
    { id: 'fe', icon: 'fa-code', chips: ['TypeScript', 'Next.js 14/15', 'React 19', 'Tailwind CSS', 'Vanilla CSS', 'Three.js'] },
    { id: 'be', icon: 'fa-server', chips: ['FastAPI', 'Python', 'Node.js', 'PostgreSQL', 'Supabase', 'Docker', 'Redis'] },
    { id: 'ai', icon: 'fa-brain', chips: ['PyTorch', 'TensorFlow.js', 'Transformers (Hugging Face)', 'Gemini API', 'LiteLLM', 'RAG'] },
    { id: 'systems', icon: 'fa-microchip', chips: ['Linux (Debian/Ubuntu)', 'Bash', 'Git', 'CI/CD Actions', 'Computer Vision'] }
  ];

  const MARQUEE = [
    'PyTorch', 'Next.js', 'TypeScript', 'Gemini', 'FastAPI', 'Flutter',
    'TensorFlow.js', 'Docker', 'Supabase', 'Three.js', 'PostgreSQL', 'Python'
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const h = (strings, ...vals) => strings.reduce((acc, s, i) => acc + s + (vals[i] !== undefined ? vals[i] : ''), '');

  function renderMarquee() {
    const track = $('#marqueeTrack');
    if (!track) return;
    const items = MARQUEE.map((m) => `<span>${m}</span>`).join('');
    track.innerHTML = `<div class="marquee-group">${items}</div><div class="marquee-group" aria-hidden="true">${items}</div>`;
  }

  function renderHonors() {
    const el = $('#honorsList');
    if (!el) return;
    el.innerHTML = HONORS.map((h) => `
      <li class="honor reveal">
        <span class="honor-badge${h.win ? ' win' : ''}" data-i18n="distinctions.items.${h.id}.badge"></span>
        <div class="honor-main">
          <h4 data-i18n="distinctions.items.${h.id}.title"></h4>
          <p data-i18n="distinctions.items.${h.id}.desc"></p>
        </div>
        <span class="honor-year" data-i18n="distinctions.items.${h.id}.year"></span>
      </li>`).join('');
  }

  function renderExperience() {
    const el = $('#xpList');
    if (!el) return;
    el.innerHTML = EXPERIENCE.map((id) => `
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
      return h`
        <li class="reveal" data-cats="${p.cats}">
          <a class="p-row spot" href="${p.url}" target="_blank" rel="noopener noreferrer">
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
            <span class="p-arrow"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span>
          </a>
        </li>`;
    }).join('');
    const total = $('#projTotal');
    if (total) total.textContent = String(PROJECTS.length);
    const shown = $('#projShown');
    if (shown) shown.textContent = String(PROJECTS.length);
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
