function addCharacterForm() {
  const formsContainer = document.getElementById('character-forms');
  const newForm = document.createElement('div');
  newForm.className = 'character-form';
  newForm.innerHTML = `
      <input type="text" placeholder="Nome do Personagem" required>
      <input type="number" placeholder="Bônus de Iniciativa" required>
  `;
  formsContainer.appendChild(newForm);
}

function rollInitiative() {
  const characters = [];
  const forms = document.querySelectorAll('.character-form');

  forms.forEach(form => {
    const name = form.querySelector('input[type="text"]').value;
    const bonus = parseInt(form.querySelector('input[type="number"]').value);
    const roll = Math.floor(Math.random() * 20) + 1;
    characters.push({ name, bonus, roll, total: roll + bonus });
  });

  characters.sort((a, b) => {
    if (a.roll === 20 && b.roll !== 20) return -1;
    if (b.roll === 20 && a.roll !== 20) return 1;
    if (a.roll === 1 && b.roll !== 1) return 1;
    if (b.roll === 1 && a.roll !== 1) return -1;
    if (a.total !== b.total) return b.total - a.total;
    if (a.bonus !== b.bonus) return b.bonus - a.bonus;
    return a.name.localeCompare(b.name);
  });

  const resultsTable = document.getElementById('results-table').querySelector('tbody');
  resultsTable.innerHTML = '';
  characters.forEach(char => {
    const row = resultsTable.insertRow();
    row.insertCell().textContent = char.name;
    row.insertCell().textContent = char.bonus;
    row.insertCell().textContent = char.roll;
    row.insertCell().textContent = char.total;
  });

  document.getElementById('results').style.display = 'flex';
}

function rollAgain() {
  const rows = document.getElementById('results-table').querySelector('tbody').rows;
  const characters = [];

  for (let i = 0; i < rows.length; i++) {
    const name = rows[i].cells[0].textContent;
    const bonus = parseInt(rows[i].cells[1].textContent);
    const roll = Math.floor(Math.random() * 20) + 1;
    characters.push({ name, bonus, roll, total: roll + bonus });
  }

  characters.sort((a, b) => {
    if (a.roll === 20 && b.roll !== 20) return -1;
    if (b.roll === 20 && a.roll !== 20) return 1;
    if (a.roll === 1 && b.roll !== 1) return 1;
    if (b.roll === 1 && a.roll !== 1) return -1;
    if (a.total !== b.total) return b.total - a.total;
    if (a.bonus !== b.bonus) return b.bonus - a.bonus;
    return a.name.localeCompare(b.name);
  });

  const resultsTable = document.getElementById('results-table').querySelector('tbody');
  resultsTable.innerHTML = '';
  characters.forEach(char => {
    const row = resultsTable.insertRow();
    row.insertCell().textContent = char.name;
    row.insertCell().textContent = char.bonus;
    row.insertCell().textContent = char.roll;
    row.insertCell().textContent = char.total;
  });
}

function restart() {
  document.getElementById('results').style.display = 'none';
  document.getElementById('character-forms').innerHTML = `
      <div class="character-form">
          <input type="text" placeholder="Nome do Personagem" required>
          <input type="number" placeholder="Bônus de Iniciativa" required>
      </div>
  `;
}