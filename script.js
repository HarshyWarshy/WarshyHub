const prompts = [
  'Evaluate the extent to which the Mongol Empire transformed Afro-Eurasian exchange from c.1200 to c.1450.',
  'Compare state-building in the Ottoman and Mughal empires from c.1450 to c.1750.',
  'Explain one cause and one effect of the Atlantic slave trade from c.1450 to c.1800.',
  'Evaluate how industrialization changed labor systems from c.1750 to c.1900.',
  'Analyze one continuity and one change in globalization from 1900 to present.'
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
