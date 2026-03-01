const prompts = [
  'Evaluate the extent to which the Mongol Empire transformed Afro-Eurasian exchange from c.1200 to c.1450.',
  'Compare state-building in the Ottoman and Mughal empires from c.1450 to c.1750.',
  'Explain one cause and one effect of the Atlantic slave trade from c.1450 to c.1800.',
  'Evaluate how industrialization changed labor systems from c.1750 to c.1900.',
  'Analyze one continuity and one change in globalization from 1900 to present.'
];

const playlist = [
  {
    title: 'Lofi Study Beat',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=lofi-study-112191.mp3'
  },
  {
    title: 'Calm Rain Ambience',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_7d08f0060f.mp3?filename=rain-110958.mp3'
  },
  {
    title: 'Night Lofi Drift',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c9f8d0c4f9.mp3?filename=lofi-chill-140858.mp3'
  }
];

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
  localStorage.setItem('warshyhub-theme', themeName);
}

function initThemePersistence() {
  const saved = localStorage.getItem('warshyhub-theme') || 'theme-default';
  setTheme(saved);

  const themeButtons = document.querySelectorAll('[data-theme]');
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setTheme(button.dataset.theme);
    });
  });
}

function initPromptGenerator() {
  const promptElement = document.getElementById('prompt');
  const promptButton = document.getElementById('new-prompt');

  function showPrompt() {
    const index = Math.floor(Math.random() * prompts.length);
    if (promptElement) {
      promptElement.textContent = prompts[index];
    }
  }

  if (promptElement && promptButton) {
    promptButton.addEventListener('click', showPrompt);
    showPrompt();
  }
}

function initScrollAnimation() {
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    document.documentElement.style.setProperty('--scroll-shift', `${y * 0.25}px`);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMusicPlayer() {
  const audio = document.getElementById('focus-audio');
  const trackLabel = document.getElementById('player-track');
  const progress = document.getElementById('player-progress');
  const current = document.getElementById('player-current');
  const duration = document.getElementById('player-duration');
  const toggle = document.getElementById('player-toggle');
  const prev = document.getElementById('player-prev');
  const next = document.getElementById('player-next');
  const playlistButtons = document.getElementById('playlist-buttons');

  if (!audio || !trackLabel || !progress || !current || !duration || !toggle || !prev || !next || !playlistButtons) {
    return;
  }

  let index = 0;

  function loadTrack(i, autoplay = false) {
    index = (i + playlist.length) % playlist.length;
    const track = playlist[index];
    audio.src = track.url;
    trackLabel.textContent = track.title;
    progress.value = 0;
    current.textContent = '0:00';
    duration.textContent = '0:00';

    if (autoplay) {
      audio.play().catch(() => {
        toggle.textContent = '▶';
      });
    }
  }

  playlist.forEach((track, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = i % 2 === 0 ? 'link-btn' : 'link-btn alt';
    button.textContent = track.title;
    button.addEventListener('click', () => {
      loadTrack(i, true);
    });
    playlistButtons.appendChild(button);
  });

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

  audio.addEventListener('play', () => {
    toggle.textContent = '⏸';
  });

  audio.addEventListener('pause', () => {
    toggle.textContent = '▶';
  });

  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    current.textContent = formatTime(audio.currentTime);
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.value = pct;
  });

  progress.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  });

  audio.addEventListener('ended', () => {
    loadTrack(index + 1, true);
  });

  loadTrack(0, false);
}

initThemePersistence();
initPromptGenerator();
initScrollAnimation();
initMusicPlayer();
  'Evaluate the extent to which the Mongol Empire transformed trade and communication across Afro-Eurasia from c. 1200 to c. 1450.',
  'Compare methods of state-building in the Ottoman and Mughal empires from c. 1450 to c. 1750.',
  'Explain one major cause and one major effect of the Atlantic slave trade from c. 1450 to c. 1800.',
  'Evaluate the extent to which industrialization changed labor systems from c. 1750 to c. 1900.',
  'Compare responses to imperialism in China and Japan during the 19th century.',
  'Explain how nationalist movements contributed to decolonization after World War II.',
  'Evaluate the extent to which Cold War competition shaped political alignments in Asia or Africa.',
  'Analyze one continuity and one change in global trade networks from 1900 to the present.',
  'Explain how religious beliefs influenced governance in one empire between 1450 and 1750.',
  'Evaluate the impact of technological innovation on warfare in the period 1900 to present.'
  'Compare how the Mongol Empire and the Ottoman Empire maintained control over diverse populations.',
  'Explain one continuity and one change in Indian Ocean trade from 1200 to 1750.',
  'Evaluate how industrialization affected social classes in the 19th century.',
  'Analyze one cause and one consequence of decolonization after World War II.',
  'Describe how belief systems influenced state-building in any one empire from 1450 to 1750.'
];

const promptElement = document.getElementById('prompt');
const promptButton = document.getElementById('new-prompt');

function showPrompt() {
  const index = Math.floor(Math.random() * prompts.length);
  if (promptElement) {
    promptElement.textContent = prompts[index];
  }
  promptElement.textContent = prompts[index];
}

if (promptElement && promptButton) {
  promptButton.addEventListener('click', showPrompt);
  showPrompt();
}

const themeButtons = document.querySelectorAll('[data-theme]');
if (themeButtons.length > 0) {
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      document.body.classList.remove('theme-default', 'theme-forest', 'theme-sunset');
      document.body.classList.add(button.dataset.theme);
    });
  });
}
promptButton.addEventListener('click', showPrompt);
showPrompt();
