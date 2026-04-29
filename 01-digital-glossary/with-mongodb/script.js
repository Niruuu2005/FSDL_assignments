// script.js
let items = [];

function draw(list) {
  tableBody.innerHTML = list.map(x => `<tr><td>${x.tagName}</td><td>${x.description}</td></tr>`).join('');
  noResults.style.display = list.length ? 'none' : 'block';
}

async function loadGlossary() {
  items = await (await fetch('/api/glossary')).json();
  draw(items);
}

function filterTable() {
  const q = search.value.toLowerCase();
  draw(items.filter(x => `${x.tagName} ${x.description}`.toLowerCase().includes(q)));
}
