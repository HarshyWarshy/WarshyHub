const prompts = [
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
  promptElement.textContent = prompts[index];
}

promptButton.addEventListener('click', showPrompt);
showPrompt();
