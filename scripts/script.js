let characters = [];
let rolledCharacters = [];

document.getElementById('add-character').addEventListener('click', function () {
  const name = document.getElementById('character-name').value;
  const bonus = parseInt(document.getElementById('initiative-bonus').value);

  if (name && !isNaN(bonus)) {
    const character = {
      name,
      bonus,
      roll: null,
      total: null
    };
    characters.push(character);
    updateCharacterList();
    document.getElementById('character-name').value = '';
    document.getElementById('initiative-bonus').value = '';

    if (characters.length >= 2) {
      document.getElementById('roll-initiative').style.display = 'block';
    }
  }
});

document.getElementById('roll-initiative').addEventListener('click', function () {
  rolledCharacters = characters.map(character => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + character.bonus;
    return { ...character, roll, total };
  });

  sortAndDisplayResults();
  document.getElementById('results').style.display = 'block';
  document.getElementById('characters-list').style.display = 'none';
  document.getElementById('roll-initiative').textContent = 'Rolar Novamente';
  document.getElementById('reset').style.display = 'block';
  document.getElementById('add-and-roll').style.display = 'block';
});

document.getElementById('reset').addEventListener('click', function () {
  characters = [];
  rolledCharacters = [];
  updateCharacterList();
  updateResultsTable();
  document.getElementById('roll-initiative').style.display = 'none';
  document.getElementById('reset').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('roll-initiative').textContent = 'Rolar Iniciativa';
  document.getElementById('characters-list').style.display = 'block';
  document.getElementById('add-and-roll').style.display = 'none';
});

document.getElementById('increase-bonus').addEventListener('click', function () {
  const bonusInput = document.getElementById('initiative-bonus');
  bonusInput.value = parseInt(bonusInput.value || 0) + 1;
});

document.getElementById('decrease-bonus').addEventListener('click', function () {
  const bonusInput = document.getElementById('initiative-bonus');
  bonusInput.value = parseInt(bonusInput.value || 0) - 1;
});

document.getElementById('add-and-roll').addEventListener('click', function () {
  const name = document.getElementById('character-name').value;
  const bonus = parseInt(document.getElementById('initiative-bonus').value);

  if (name && !isNaN(bonus)) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + bonus;
    const newCharacter = { name, bonus, roll, total };
    rolledCharacters.push(newCharacter);
    characters.push(newCharacter); // Adiciona o personagem na lista geral também
    sortAndDisplayResults();

    document.getElementById('character-name').value = '';
    document.getElementById('initiative-bonus').value = '';
  }
});

function updateCharacterList() {
  const characterList = document.getElementById('characters-list');
  characterList.innerHTML = '';
  characters.forEach(character => {
    const characterDiv = document.createElement('div');
    characterDiv.textContent = `${character.name} (Bônus: ${character.bonus})`;
    characterList.appendChild(characterDiv);
  });
}

function updateResultsTable() {
  const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];
  resultsTable.innerHTML = '';

  rolledCharacters.forEach(result => {
    const row = resultsTable.insertRow();
    row.insertCell(0).textContent = result.name;
    row.insertCell(1).textContent = result.bonus;
    row.insertCell(2).textContent = result.roll;
    row.insertCell(3).textContent = result.total;
  });
}

function sortAndDisplayResults() {
  rolledCharacters.sort((a, b) => {
    // Verifica se há 20 natural
    if (a.roll === 20 && b.roll !== 20) return -1;
    if (b.roll === 20 && a.roll !== 20) return 1;

    // Verifica se há 1 natural
    if (a.roll === 1 && b.roll !== 1) return 1;
    if (b.roll === 1 && a.roll !== 1) return -1;

    // Desempate por total de iniciativa
    if (b.total !== a.total) return b.total - a.total;

    // Desempate por bônus
    if (b.bonus !== a.bonus) return b.bonus - a.bonus;

    // Desempate por nome (ordem alfabética)
    return a.name.localeCompare(b.name);
  });

  updateResultsTable();
}
