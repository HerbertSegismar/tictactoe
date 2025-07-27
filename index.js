const gameboard = document.getElementById("gameboard");
const info = document.getElementById("info");
const board = Array(9).fill(null);
let turn = "Circle";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function createBoard() {
  gameboard.innerHTML = "";
  board.fill(null);

  board.forEach((_square, index) => {
    const squareElement = document.createElement("div");
    squareElement.classList.add("square");
    squareElement.id = index;
    squareElement.addEventListener("click", handleClick);
    gameboard.append(squareElement);
  });
}

function handleClick(square) {
  const squareElement = square.target;
  if (squareElement.firstChild) return;

  const competingElement = document.createElement("div");
  competingElement.classList.add(turn);
  squareElement.append(competingElement);

  // Remove event listener after click
  squareElement.removeEventListener("click", handleClick);

  turn = turn === "Circle" ? "Cross" : "Circle";
  info.textContent = `${turn}'s turn`;

  checkWinner();
}

function checkWinner() {
  const squares = document.querySelectorAll(".square");

  const checkWinningPlayer = (player) => {
    return winningCombinations.some((combination) =>
      combination.every((cell) =>
        squares[cell].firstChild?.classList.contains(player)
      )
    );
  };

  if (checkWinningPlayer("Circle")) {
    endGame("Circle wins!");
    return;
  }

  if (checkWinningPlayer("Cross")) {
    endGame("Cross wins!");
    return;
  }

  const allSquaresFilled = [...squares].every(
    (square) =>
      square.firstChild &&
      (square.firstChild.classList.contains("Circle") ||
        square.firstChild.classList.contains("Cross"))
  );

  if (allSquaresFilled) {
    endGame("It's a Draw!");
  }
}

function endGame(message) {
  info.textContent = message;

  document.querySelectorAll(".square").forEach((square) => {
    square.removeEventListener("click", handleClick);
  });

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Play Again";
  resetBtn.id = "reset-btn";
  resetBtn.addEventListener("click", createBoard);

  const oldBtn = document.getElementById("reset-btn");
  if (oldBtn) oldBtn.remove();

  info.insertAdjacentElement("afterend", resetBtn);
}

createBoard();
