const prompts = [
  'Evaluate the extent to which the Mongol Empire transformed Afro-Eurasian exchange from c.1200 to c.1450.',
  'Compare state-building in the Ottoman and Mughal empires from c.1450 to c.1750.',
  'Explain one cause and one effect of the Atlantic slave trade from c.1450 to c.1800.',
  'Evaluate how industrialization changed labor systems from c.1750 to c.1900.',
  'Analyze one continuity and one change in globalization from 1900 to present.'
];

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

const themeButtons = document.querySelectorAll('[data-theme]');
if (themeButtons.length > 0) {
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      document.body.classList.remove('theme-default', 'theme-forest', 'theme-sunset');
      document.body.classList.add(button.dataset.theme);
    });
  });
}
