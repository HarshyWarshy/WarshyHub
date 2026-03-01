const prompts = [
  'Evaluate the extent to which the Mongol Empire transformed Afro-Eurasian exchange from c.1200 to c.1450.',
  'Compare state-building in the Ottoman and Mughal empires from c.1450 to c.1750.',
  'Explain one cause and one effect of the Atlantic slave trade from c.1450 to c.1800.',
  'Evaluate how industrialization changed labor systems from c.1750 to c.1900.',
  'Analyze one continuity and one change in globalization from 1900 to present.'
];

const playlist = [
  {
    title: 'Lofi Study Beat (Pixabay)',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=lofi-study-112191.mp3'
  },
  {
    title: 'Calm Rain Ambience (Pixabay)',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_7d08f0060f.mp3?filename=rain-110958.mp3'
  },
  {
    title: 'Night Lofi Drift (Pixabay)',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c9f8d0c4f9.mp3?filename=lofi-chill-140858.mp3'
  }
];

const STORAGE = {
  theme: 'warshyhub-theme',
  track: 'warshyhub-track-index',
  time: 'warshyhub-track-time',
  playing: 'warshyhub-playing',
  minimized: 'warshyhub-player-minimized'
};

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
}

function setTheme(themeName) {
  document.body.classList.remove('theme-default', 'theme-forest', 'theme-sunset');
  document.body.classList.add(themeName);
  localStorage.setItem(STORAGE.theme, themeName);
}

function initThemePersistence() {
  const saved = localStorage.getItem(STORAGE.theme) || 'theme-default';
  setTheme(saved);

  const themeButtons = document.querySelectorAll('[data-theme]');
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => setTheme(button.dataset.theme));
  });
}

function initPromptGenerator() {
  const promptElement = document.getElementById('prompt');
  const promptButton = document.getElementById('new-prompt');

  function showPrompt() {
    const index = Math.floor(Math.random() * prompts.length);
    if (promptElement) promptElement.textContent = prompts[index];
  }

  if (promptElement && promptButton) {
    promptButton.addEventListener('click', showPrompt);
    showPrompt();
  }
}

function initScrollAnimation() {
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    document.documentElement.style.setProperty('--scroll-shift', `${y * 0.28}px`);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(':root', {
      '--scroll-shift': '420px',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }
}

function createGlobalMusicPlayer() {
  if (document.getElementById('global-music-player')) return;

  const player = document.createElement('div');
  player.id = 'global-music-player';
  player.className = 'music-player';
  player.innerHTML = `
    <button type="button" class="player-close" id="player-close" aria-label="Minimize player">✕</button>
    <div class="player-title">Now Playing</div>
    <div class="player-track" id="player-track">No track selected</div>
    <input id="player-progress" type="range" min="0" max="100" value="0" step="0.1" />
    <div class="player-time"><span id="player-current">0:00</span><span id="player-duration">0:00</span></div>
    <div class="player-controls">
      <button type="button" class="link-btn" id="player-prev">⏮</button>
      <button type="button" class="link-btn alt" id="player-toggle">▶</button>
      <button type="button" class="link-btn" id="player-next">⏭</button>
    </div>
    <audio id="focus-audio" preload="metadata"></audio>
  `;

  const mini = document.createElement('button');
  mini.id = 'player-reopen';
  mini.className = 'player-reopen hidden';
  mini.type = 'button';
  mini.textContent = '♫';
  mini.setAttribute('aria-label', 'Reopen music player');

  document.body.appendChild(player);
  document.body.appendChild(mini);
}

function initMusicPlayer() {
  createGlobalMusicPlayer();

  const audio = document.getElementById('focus-audio');
  const trackLabel = document.getElementById('player-track');
  const progress = document.getElementById('player-progress');
  const current = document.getElementById('player-current');
  const duration = document.getElementById('player-duration');
  const toggle = document.getElementById('player-toggle');
  const prev = document.getElementById('player-prev');
  const next = document.getElementById('player-next');
  const close = document.getElementById('player-close');
  const reopen = document.getElementById('player-reopen');
  const player = document.getElementById('global-music-player');
  const playlistButtons = document.getElementById('playlist-buttons');

  if (!audio || !trackLabel || !progress || !current || !duration || !toggle || !prev || !next || !player || !close || !reopen) {
    return;
  }

  let index = Number(localStorage.getItem(STORAGE.track) || 0);
  let storedTime = Number(localStorage.getItem(STORAGE.time) || 0);
  const wasPlaying = localStorage.getItem(STORAGE.playing) === 'true';
  const wasMinimized = localStorage.getItem(STORAGE.minimized) === 'true';

  function syncPlayerVisibility(minimized) {
    player.classList.toggle('hidden', minimized);
    reopen.classList.toggle('hidden', !minimized);
    localStorage.setItem(STORAGE.minimized, String(minimized));
  }

  function savePlaybackState() {
    localStorage.setItem(STORAGE.track, String(index));
    localStorage.setItem(STORAGE.time, String(audio.currentTime || 0));
    localStorage.setItem(STORAGE.playing, String(!audio.paused));
  }

  function loadTrack(i, autoplay = false) {
    index = (i + playlist.length) % playlist.length;
    const track = playlist[index];
    audio.src = track.url;
    trackLabel.textContent = track.title;
    progress.value = 0;
    current.textContent = '0:00';
    duration.textContent = '0:00';
    localStorage.setItem(STORAGE.track, String(index));

    if (autoplay) {
      audio.play().catch(() => {
        toggle.textContent = '▶';
      });
    }
  }

  if (playlistButtons && !playlistButtons.dataset.built) {
    playlist.forEach((track, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = i % 2 === 0 ? 'link-btn' : 'link-btn alt';
      button.textContent = track.title;
      button.addEventListener('click', () => loadTrack(i, true));
      playlistButtons.appendChild(button);
    });
    playlistButtons.dataset.built = 'true';
  }

  toggle.addEventListener('click', () => {
    if (!audio.src) {
      loadTrack(index, true);
      return;
    }

    if (audio.paused) {
      audio.play().catch(() => {
        // no-op
      });
    } else {
      audio.pause();
    }
  });

  prev.addEventListener('click', () => loadTrack(index - 1, true));
  next.addEventListener('click', () => loadTrack(index + 1, true));

  close.addEventListener('click', () => syncPlayerVisibility(true));
  reopen.addEventListener('click', () => syncPlayerVisibility(false));

  audio.addEventListener('play', () => {
    toggle.textContent = '⏸';
    localStorage.setItem(STORAGE.playing, 'true');
  });

  audio.addEventListener('pause', () => {
    toggle.textContent = '▶';
    localStorage.setItem(STORAGE.playing, 'false');
  });

  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
    if (storedTime > 0 && storedTime < audio.duration) {
      audio.currentTime = storedTime;
      storedTime = 0;
    }
  });

  audio.addEventListener('timeupdate', () => {
    current.textContent = formatTime(audio.currentTime);
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.value = pct;
    savePlaybackState();
  });

  progress.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
    savePlaybackState();
  });

  audio.addEventListener('ended', () => loadTrack(index + 1, true));
  window.addEventListener('beforeunload', savePlaybackState);

  loadTrack(index, false);
  syncPlayerVisibility(wasMinimized);

  if (wasPlaying) {
    audio.play().catch(() => {
      // Autoplay may be blocked until user interaction
    });
  }
}

initThemePersistence();
initPromptGenerator();
initScrollAnimation();
initMusicPlayer();
