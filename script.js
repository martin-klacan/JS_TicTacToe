let screen1 = document.getElementById("screen-1");
let playButton = document.getElementById("play-button");

let cells = document.querySelectorAll(".cell");
let turnInfoText = document.getElementById("turn-info");
let restartButton = document.getElementById("restart-button");
let xScoreText = document.getElementById("X-score");
let drawScoreText = document.getElementById("Draw-score");
let oScoreText = document.getElementById("O-score");

let screen3 = document.getElementById("screen-3");
let playAgainButton = document.getElementById("play-again-button");
let winningText = document.getElementById("winning-text");

let gameActive = true;
let currentPlayer = "X";
let xWins = 0;
let oWins = 0;
let draws = 0;

let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = ["", "", "", "", "", "", "", "", ""];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index));
});

playButton.addEventListener("click", play);
restartButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", playAgain);

function play() {
  screen1.classList.add("fadeAway");
  startGame();
}

function playAgain() {
  screen3.classList.add("fadeAway");
  startGame();
}

function startGame() {
  screen3.style.visibility = "hidden";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  updateTurnInfoText();
  cells.forEach((cell) => {
    cell.classList.remove("selected", "won");
    cell.innerHTML = "";
  });
}

function handleClick(cell, index) {
  // place marker
  let clickedCell = cell;
  if (clickIsValid(clickedCell) && gameActive) {
    placeMarker(clickedCell, index);
    switch (checkGameState()) {
      case "draw":
        draws += 1;
        updateScore();
        winningScreen("Draw");
        break;
      case "win":
        lightUpTheRow();
        if (currentPlayer === "X") {
          xWins += 1;
        } else {
          oWins += 1;
        }
        updateScore();
        winningScreen(currentPlayer);
        break;
      case "continue":
        swapPlayer();
        updateTurnInfoText();
        break;
    }
  }
}

function clickIsValid(cell) {
  if (cell.innerHTML === "") {
    return true;
  } else {
    return false;
  }
}

function placeMarker(cell, index) {
  let currentCell = cell;
  currentCell.innerHTML = currentPlayer;
  currentCell.classList.add("selected");
  board[index] = currentPlayer;
}

function checkGameState() {
  // WIN or CONTINUE
  if (
    winningCombinations.some((combination) => {
      return combination.every((number) => {
        return board[number] === currentPlayer;
      });
    })
  ) {
    return "win";
  } else if (board.every((tile) => tile != "")) {
    return "draw";
  } else {
    return "continue";
  }
}

function lightUpTheRow() {
  let winningArray = winningCombinations.find((combination) => {
    return combination.every((number) => {
      return board[number] === currentPlayer;
    });
  });
  winningArray.forEach((index) => {
    cells[index].classList.add("won");
  });
}

function swapPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function updateTurnInfoText() {
  turnInfoText.innerHTML = `Player <bold>${currentPlayer} <bold>'s turn`;
}

function winningScreen(currentPlayerOrDraw) {
  screen3.classList.remove("fadeAway");
  screen3.classList.add("appear");
  if (currentPlayerOrDraw === "Draw") {
    winningText.innerHTML = "Draw!";
  } else {
    winningText.innerHTML = `Player ${currentPlayerOrDraw} has WON!`;
  }
  screen3.style.visibility = "visible";
  gameActive = false;
}

function updateScore() {
  xScoreText.innerHTML = `X<br/>${xWins}`;
  drawScoreText.innerHTML = `Draw<br/>${draws}`;
  oScoreText.innerHTML = `O<br/>${oWins}`;
}
