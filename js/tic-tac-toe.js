const
  N_SIZE = 15,
  PX_SIZE = 500,
  TD_SIZE = Math.trunc(PX_SIZE / N_SIZE),
  EMPTY = '&nbsp;',
  WIN_SEQUENCE_LENGTH = 5;
var
  boxes = [],
  turn = 'X',
  moves;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);
  board.style.fontSize = TD_SIZE + 'px';
  board.id = 'board';

  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', TD_SIZE);
      cell.setAttribute('width', TD_SIZE);
      cell.classList.add('col' + j, 'row' + i);
      cell.addEventListener('click', setTurn);
      row.appendChild(cell);
      boxes.push(cell);
    }
  }

  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

/**
 * Clear board and prepare for new game
 */
function startNewGame() {
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
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
  moves += 1;
  if (isWinner(this)) {
    displayFinalMessage('Winner: Player ' + turn);
  } else if (moves === N_SIZE * N_SIZE) {
    displayFinalMessage('Draw');
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    displayCurrentPlayer();
  }
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
  let i, cnt;
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

