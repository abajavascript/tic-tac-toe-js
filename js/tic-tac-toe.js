const
  N_SIZE = 15,
  EMPTY = '&nbsp;',
  WIN_SEQUENCE_LENGTH = 5;
let
  turn = 'X',
  turns = [];

var
  aaa = 3;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
  let board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);
  board.style.fontSize = Math.floor(90 / N_SIZE * 10) / 10 + 'vmin';
  board.id = 'board';

  for (let i = 0; i < N_SIZE; i++) {
    let row = document.createElement('tr');
    board.appendChild(row);
    for (let j = 0; j < N_SIZE; j++) {
      let cell = document.createElement('td');
      cell.classList.add('col' + j, 'row' + i);
      cell.addEventListener('click', setTurn);
      row.appendChild(cell);
    }
  }

  document.getElementById('tictactoe').appendChild(board);
  document.getElementById('undo').addEventListener('click', unsetTurn);
  document.getElementById('new').addEventListener('click', startNewGame);
  startNewGame();
}

/**
 * Clear board and prepare for new game
 */
function startNewGame() {
  turns = [];
  turn = 'X';
  document.querySelectorAll("#board td").forEach(function (square) {
    square.innerHTML = EMPTY;
  });
  displayCurrentPlayer();
}

function displayCurrentPlayer() {
  document.getElementById('turn').textContent = 'Player ' + turn;
}

/**
 * Sets clicked square and also updates the turn.
 */
function setTurn() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  turns.push(this);
  
  document.querySelectorAll('.last-cell').forEach((el) => el.classList.remove('last-cell'));
  this.classList.add('last-cell');
  if (isWinner(this)) {
    displayFinalMessage('Winner: Player ' + turn);
  } else if (turns.length === N_SIZE * N_SIZE) {
    displayFinalMessage('Draw');
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    displayCurrentPlayer();
  }
}

function unsetTurn() {
  if (turns.length === 0) return;
  let cell = turns.pop();
  cell.innerHTML = EMPTY;

  document.querySelectorAll('.last-cell').forEach((el) => el.classList.remove('last-cell'));
  if (turns.length > 0) turns[turns.length-1].classList.add('last-cell');

  turn = turn === 'X' ? 'O' : 'X';
  displayCurrentPlayer();
}

function displayFinalMessage(msg) {
  setTimeout(() => {
    alert(msg);
    startNewGame();
  }, 1);
}

// Check if a win or not
function isWinner(clicked) {
  // Get all cell classes
  let memberOf = clicked.className.split(/\s+/);
  let col = memberOf.find(e => e.search('col') === 0).substring(3);
  let row = memberOf.find(e => e.search('row') === 0).substring(3);
 
  return (getCntInHorizontalLine(col, row, turn) > WIN_SEQUENCE_LENGTH) ||
         (getCntInVerticalLine(col, row, turn) > WIN_SEQUENCE_LENGTH) ||
         (getCntInDiagonalLine1(col, row, turn) > WIN_SEQUENCE_LENGTH) ||
         (getCntInDiagonalLine2(col, row, turn) > WIN_SEQUENCE_LENGTH);
}

//Helper function to check if particular cell belong to same player
function contains(_col, _row, _turn) {
  return document.querySelector('#tictactoe ' + '.col' + _col + '.row' + _row).textContent === _turn;
}

// Функція перевіряє горизонталь і вертає поточну к-сть хрестиків чи ноліків
function getCntInHorizontalLine(_col, _row, _turn){
  let cnt = 0;
  for (let i = _col; i >= 0; i--, cnt++)
    if (!contains(i, _row, _turn)) break;
  for (let i = _col; i < N_SIZE; i++, cnt++)
    if (!contains(i, _row, _turn)) break;
  return cnt;
}

// Функція перевіряє вертикаль і вертає поточну к-сть хрестиків чи ноліків
function getCntInVerticalLine(_col, _row, _turn){
  let cnt = 0;
  for (let j = _row; j >= 0; j--, cnt++)
    if (!contains(_col, j, _turn)) break;
  for (let j = _row; j < N_SIZE; j++, cnt++)
    if (!contains(_col, j, _turn)) break;
  return cnt;
}

// Функція перевіряє першу діагональ і вертає поточну к-сть хрестиків чи ноліків
function getCntInDiagonalLine1(_col, _row, _turn){
  let cnt = 0;
  for (let i = _col, j = _row; i >= 0 && j >= 0; i--, j--, cnt++)
    if (!contains(i, j, _turn)) break;
  for (let i = _col, j = _row; i < N_SIZE && j < N_SIZE; i++, j++, cnt++)
    if (!contains(i, j, _turn)) break;
  return cnt;
}

// Функція перевіряє другу діагональ і вертає поточну к-сть хрестиків чи ноліків
function getCntInDiagonalLine2(_col, _row, _turn){
  let cnt = 0;
  for (let i = _col, j = _row; i >= 0 && j < N_SIZE; i--, j++, cnt++)
    if (!contains(i, j, _turn)) break;
  for (let i = _col, j = _row; i < N_SIZE && j >= 0; i++, j--, cnt++)
    if (!contains(i, j, _turn)) break;
  return cnt;
}

init();

