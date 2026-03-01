const prompts = [
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
];

const promptElement = document.getElementById('prompt');
const promptButton = document.getElementById('new-prompt');

function showPrompt() {
  const index = Math.floor(Math.random() * prompts.length);
  promptElement.textContent = prompts[index];
}

if (promptElement && promptButton) {
  promptButton.addEventListener('click', showPrompt);
  showPrompt();
}
