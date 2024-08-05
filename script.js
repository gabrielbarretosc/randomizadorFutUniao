document.addEventListener('DOMContentLoaded', (event) => {
     const names = [
        "Binho", "Catinha", "Cláudio", "Cocota", "Esequiel",
        "Gabriel", "Giovane Bresse", "Jackson", "Joanderson", "José Mendes",
        "José Queiroz", "JZ", "Juarez", "Juninho", "Léo",
        "Lucas Henrick", "Maicon", "Paulo Lima", "Paulinho", "Pot",
        "Rafael Duarte", "Rainê", "Rão", "Sales", "Silvio",
        "Tony", "Vaqueiro", "Vanei", "Vinicius Freitas", "Wagner Alexander",
        "Xingú", "CONVIDADO 01", "CONVIDADO 02", "CONVIDADO 03", "CONVIDADO 04",
        "CONVIDADO 05", "CONVIDADO 06", "CONVIDADO 07"
    ];

    const nameListDiv = document.getElementById('name-list');
    names.forEach(name => {
        const nameItemDiv = document.createElement('div');
        nameItemDiv.className = 'name-item';
        nameItemDiv.textContent = name;
        nameItemDiv.onclick = function() {
            selectName(nameItemDiv);
        };
        nameListDiv.appendChild(nameItemDiv);
    });
});

let hasDrawn = false;

function selectName(element) {
    element.classList.toggle('selected');
    // Remover destaque do nome selecionado ao excluí-lo dos selecionados
    const selectedNamesDiv = document.getElementById('selected-names');
    selectedNamesDiv.addEventListener('DOMNodeRemoved', function(event) {
        const removedName = event.target.textContent.trim();
        const names = document.querySelectorAll('.name-item');
        names.forEach(name => {
            if (name.textContent.trim() === removedName) {
                name.classList.remove('selected');
            }
        });
    });
}

function selectNames() {
    const selectedNamesDiv = document.getElementById('selected-names');
    selectedNamesDiv.innerHTML = '';
    const selectedItems = document.querySelectorAll('.name-item.selected');
    selectedItems.forEach(item => {
        const selectedName = document.createElement('div');
        selectedName.classList.add('name-item', 'selected'); // Adiciona a classe 'selected'
        selectedName.textContent = item.textContent;
        selectedName.onclick = function() {
            selectedName.remove();
        };
        selectedNamesDiv.appendChild(selectedName);
    });
}

function clearSelectedNames() {
    document.getElementById('selected-names').innerHTML = '';
}

function drawNames() {
    if (hasDrawn) {
        const confirmResort = confirm('Você já sorteou. Deseja sortear novamente?');
        if (!confirmResort) return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    const selectedItems = document.querySelectorAll('#selected-names .name-item');
    const numWinners = parseInt(document.getElementById('numWinners').value);
    if (selectedItems.length < numWinners) {
        alert('Selecione um número suficiente de nomes para o sorteio.');
        return;
    }
    const winners = [];
    const selectedArray = Array.from(selectedItems);
    for (let i = 0; i < numWinners; i++) {
        const randomIndex = Math.floor(Math.random() * selectedArray.length);
        const winner = selectedArray.splice(randomIndex, 1)[0];
        winners.push(winner.textContent);
    }

    // Adicionar os vencedores ao resultado com destaque
    winners.forEach(winner => {
        const winnerSpan = document.createElement('span');
        winnerSpan.classList.add('winner'); // Adiciona a classe 'winner'
        winnerSpan.textContent = winner;
        resultDiv.appendChild(winnerSpan);
        resultDiv.appendChild(document.createTextNode(' '));
    });

    hasDrawn = true;
}
