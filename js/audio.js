// Subtle Web Audio Engine for Interactive Feedback
// Ambient generative harmonics + micro-tactile UI clicks (User Opt-in Only)

(function () {
  const STORAGE_KEY = 'preferred-audio-fx';
  const soundBtn = document.getElementById('soundToggle');

  let audioCtx = null;
  let masterGain = null;
  let ambientOscs = [];
  let isSoundOn = localStorage.getItem(STORAGE_KEY) === 'true';

  function initAudio() {
    if (audioCtx) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // Ambient generative sine chord (very low gain: 0.015)
      const frequencies = [110.0, 164.81, 220.0];
      frequencies.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        oscGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        ambientOscs.push(osc);
      });
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  function playClickSound(freq = 600, duration = 0.04) {
    if (!isSoundOn || !audioCtx) return;

    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const clickGain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

      clickGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(clickGain);
      clickGain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function updateButtonUI() {
    if (!soundBtn) return;
    const icon = soundBtn.querySelector('i');
    if (icon) {
      icon.className = isSoundOn ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
    }
    soundBtn.setAttribute('title', isSoundOn ? 'Audio FX: Activado' : 'Audio FX: Desactivado');
  }

  function toggleSound() {
    isSoundOn = !isSoundOn;
    localStorage.setItem(STORAGE_KEY, isSoundOn);

    if (isSoundOn) {
      initAudio();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (masterGain) {
        masterGain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.8);
      }
      playClickSound(880, 0.08);
    } else {
      if (audioCtx && masterGain) {
        masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
      }
    }

    updateButtonUI();
  }

  if (soundBtn) {
    updateButtonUI();
    soundBtn.addEventListener('click', toggleSound);
  }

  // Hook subtle clicks on buttons and interactive filters
  document.addEventListener('click', (e) => {
    if (!isSoundOn) return;
    if (e.target.closest('button, .btn, .nav-link, .filter-btn, .project-card')) {
      playClickSound(520, 0.04);
    }
  });

  // Easter egg: 5 clicks on brand triggers 3D boost and sound cascade
  let brandClicks = 0;
  let brandTimer = null;
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('click', () => {
      brandClicks++;
      if (brandClicks >= 5) {
        brandClicks = 0;
        if (typeof window.boost3DScene === 'function') {
          window.boost3DScene();
        }
        if (isSoundOn) {
          playClickSound(1046, 0.2);
        }
      }
      clearTimeout(brandTimer);
      brandTimer = setTimeout(() => {
        brandClicks = 0;
      }, 1200);
    });
  }
})();
