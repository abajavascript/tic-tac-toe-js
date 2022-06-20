const
  N_SIZE = 15,
  EMPTY = '&nbsp;',
  WIN_SEQUENCE_LENGTH = 5;
var
  turn = 'X',
  turns = [];

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);
  board.style.fontSize = Math.floor(90 / N_SIZE * 10) / 10 + 'vmin';
  board.id = 'board';

  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
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
  let zzz;
  if (this.innerHTML !== EMPTY) {
    return;
  }
  let zzz4;
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
  //Helper function to check if particular cell belong to same player
  function contains(col, row, turn) {
    return document.querySelector('#tictactoe ' + '.col' + col + '.row' + row).textContent === turn;
  }

  // Перевіряєм горизонталь
  let i, j, cnt;
  for (cnt = 0, i = col; i >= 0; i--, cnt++)
    if (!contains(i, row, turn)) break;
  for (i = col; i < N_SIZE; i++, cnt++)
    if (!contains(i, row, turn)) break;
  if (cnt > WIN_SEQUENCE_LENGTH) return true;
  // Перевіряєм вертикаль
  for (cnt = 0, j = row; j >= 0; j--, cnt++)
    if (!contains(col, j, turn)) break;
  for (j = row; j < N_SIZE; j++, cnt++)
    if (!contains(col, j, turn)) break;
  if (cnt > WIN_SEQUENCE_LENGTH) return true;
  // Перевіряєм першу діагональ
  for (cnt = 0, i = col, j = row; i >= 0 && j >= 0; i--, j--, cnt++)
    if (!contains(i, j, turn)) break;
  for (i = col, j = row; i < N_SIZE && j < N_SIZE; i++, j++, cnt++)
    if (!contains(i, j, turn)) break;
  if (cnt > WIN_SEQUENCE_LENGTH) return true;
  // Перевіряєм другу діагональ
  for (cnt = 0, i = col, j = row; i >= 0 && j < N_SIZE; i--, j++, cnt++)
    if (!contains(i, j, turn)) break;
  for (i = col, j = row; i < N_SIZE && j >= 0; i++, j--, cnt++)
    if (!contains(i, j, turn)) break;
  if (cnt > WIN_SEQUENCE_LENGTH) return true;
  return false;
}


init();

