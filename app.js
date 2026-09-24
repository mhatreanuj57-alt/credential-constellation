const credentials = [
  ['AI Fluency for Educators','Anthropic','certificate','ai-fluency-educators-cert.png'], ['AI Fluency for Students','Anthropic','certificate','ai-fluency-students-cert.png'], ['AI Fundamentals','IBM','certificate','ai-fundamentals-cert.png'], ['Claude AI Fluency','Anthropic','certificate','claude-ai-fluency-cert.png'], ['Claude API','Anthropic','certificate','claude-api-cert.png'], ['Claude Fundamentals','Anthropic','certificate','claude-cert.png'], ['Claude Code 101','Anthropic','certificate','claude-code-101-cert.png'], ['Claude Code in Action','Anthropic','certificate','claude-code-in-action-cert.png'], ['Claude Cowork','Anthropic','certificate','claude-cowork-cert.png'], ['Claude Platform 101','Anthropic','certificate','claude-platform-101-cert.png'], ['Introduction to Generative AI','Google','badge','google-intro-genai-badge.png'], ['Introduction to Large Language Models','Google','badge','google-intro-llm-badge.png'], ['Data Science 101','IBM','certificate','ibm-data-science-101-cert.png'], ['Data Science','IBM','badge','ibm-data-science-badge.png'], ['Data Science Foundations','IBM','certificate','ibm-data-science-cert.png'], ['Data Visualization','IBM','certificate','ibm-dataviz-cert.png'], ['Generative AI Essentials','IBM','badge','ibm-genai-essentials-badge.png'], ['Generative AI Essentials','IBM','certificate','ibm-genai-essentials-cert.png'], ['Granite Classification','IBM','sticker','ibm-granite-classify-sticker.png'], ['Granite','IBM','sticker','ibm-granite-sticker.png'], ['Large Language Models','IBM','sticker','ibm-llm-sticker.png'], ['Prompt Engineering','IBM','badge','ibm-prompt-badge.png'], ['Python for Data Science','IBM','certificate','ibm-python-cert.png'], ['MCP Advanced','Anthropic','certificate','mcp-advanced-cert.png'], ['MCP Introduction','Anthropic','certificate','mcp-intro-cert.png']
].map(([title, provider, type, image]) => ({ title, provider, type, image }));

const grid = document.querySelector('#credential-grid');
const result = document.querySelector('#results');
const search = document.querySelector('#search');
const dialog = document.querySelector('#credential-dialog');
let activeFilter = 'all';

function render() {
  const query = search.value.trim().toLowerCase();
  const visible = credentials.filter(item => (activeFilter === 'all' || item.type === activeFilter) && `${item.title} ${item.provider}`.toLowerCase().includes(query));
  result.textContent = visible.length === credentials.length ? `Showing all ${credentials.length} credentials` : `Showing ${visible.length} of ${credentials.length} credentials`;
  grid.innerHTML = visible.length ? visible.map((item, index) => `<article class="card" style="animation-delay:${Math.min(index * 30, 300)}ms" data-image="assets/credentials/${item.image}" data-title="${item.title}" data-meta="${item.provider} · ${item.type}"><img src="assets/credentials/${item.image}" alt="${item.title} from ${item.provider}" loading="lazy"><div class="card-info"><span class="tag ${item.type}">${item.type}</span><h3>${item.title}</h3><p>${item.provider}</p></div></article>`).join('') : '<p class="empty">No signal found. Try another search.</p>';
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); render(); }));
search.addEventListener('input', render);
grid.addEventListener('click', event => { const card = event.target.closest('.card'); if (!card) return; document.querySelector('#dialog-img').src = card.dataset.image; document.querySelector('#dialog-img').alt = card.dataset.title; document.querySelector('#dialog-title').textContent = card.dataset.title; document.querySelector('#dialog-meta').textContent = card.dataset.meta; document.querySelector('#open-image').href = card.dataset.image; dialog.showModal(); });
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
render();
