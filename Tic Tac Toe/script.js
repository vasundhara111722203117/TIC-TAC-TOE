const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset');
let cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (boardState[index] !== null || !gameActive) return;

    boardState[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDiv.innerText = 'Player ${currentPlayer} has won!';
        gameActive = false;
        return;
    }

    if (!boardState.includes(null)) {
        statusDiv.innerText = 'Game is a draw!';
        gameActive = false;
        return;
    }

    statusDiv.innerText = 'It`s ${currentPlayer}`s turn';
};

const resetGame = () => {
    currentPlayer = 'X';
    boardState.fill(null);
    cells.forEach(cell => cell.innerText = '');
    statusDiv.innerText = 'It`s ${currentPlayer}`s turn';
    gameActive = true;
};

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);

statusDiv.innerText = 'It`s ${currentPlayer}`s turn';