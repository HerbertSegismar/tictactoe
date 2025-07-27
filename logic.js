const gameboard = document.getElementById("gameboard");
const board = Array(9).fill(null);
let turn = "circle";

function createBoard () {
    board.forEach((_square, index) => {
        const squareElement = document.createElement("div");
        squareElement.classList.add("square");
        squareElement.id = index;
        squareElement.addEventListener("click", handleClick);
        gameboard.append(squareElement);
    })
}

createBoard();

function handleClick (square) {
    const competingElement = document.createElement("div");
    competingElement.classList.add(turn);
    turn = turn === "circle" ? "cross" : "circle";
    square.target.append(competingElement);
}

