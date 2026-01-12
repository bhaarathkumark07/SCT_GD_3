const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let mode = "";

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
    gameActive = true;
    statusText.textContent = "Player X's Turn";
}

cells.forEach(cell => {
    cell.addEventListener("click", () => cellClick(cell));
});

function cellClick(cell) {
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (checkWin()) return;

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

    if (mode === "cpu" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function computerMove() {
    let emptyCells = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(v => v !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");

    if (checkWin()) return;

    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
}

function checkWin() {
    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            statusText.textContent = `Player ${board[a]} Wins! 🎉`;
            gameActive = false;
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    currentPlayer = "X";
    statusText.textContent = "Game Reset. Choose Mode";
    gameActive = false;
}
