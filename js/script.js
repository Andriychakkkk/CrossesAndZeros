// Ініціалізація поля 3x3
const board = document.getElementById('board');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Обробник кліка по клітинці
function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameState[index] === '' && !isGameOver()) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            saveGameState();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (!isGameOver()) {
                setTimeout(computerMove, 1000); // Затримка для комп'ютера
            } else {
                saveGameState();
            }
        }
    }
}

// Комп'ютерний хід
function computerMove() {
    const emptyCells = gameState.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerChoice = emptyCells[randomIndex];
    gameState[computerChoice] = currentPlayer;
    const cell = document.querySelector(`[data-index="${computerChoice}"]`);
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        saveGameState();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Перевірка закінчення гри
function isGameOver() {
    // Реалізація логіки перевірки закінчення гри
}

// Зберігання стану гри у файл
function saveGameState() {
    const data = JSON.stringify(gameState);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game_state.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('Game state saved successfully.');
}


function checkWin(player) {
    const winConditions = [
        // Горизонтальні рядки
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Вертикальні стовпці
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Діагоналі
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameState[a] === player && gameState[b] === player && gameState[c] === player) {
            return true;
        }
    }

    return false;
}

initializeBoard();
