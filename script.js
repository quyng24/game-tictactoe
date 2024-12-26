var cells = document.getElementsByClassName('cell'); // Sử dụng getElementsByClassName
var winnerMessage = document.getElementById('winner-message');
var resetButton = document.querySelector('.reset');

var currentPlayer = 'x';
var board = [null, null, null, null, null, null, null, null, null];

// Các điều kiện thắng
var winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Gắn sự kiện click cho từng ô
for (var i = 0; i < cells.length; i++) {
  (function(index) { // Tạo một closure để giữ giá trị `index` cho từng ô
    cells[index].addEventListener('click', function() {
      handleCellClick(index, cells[index]);
    });
  })(i);
}

// Xử lý khi nhấp vào ô
function handleCellClick(index, cell) {

  if (!board[index]) { // Kiểm tra ô trống
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if (currentPlayer === 'x') {
        cell.classList.add('red'); // X có màu đỏ
      } else {
        cell.classList.add('green'); // O có màu xanh
      }

    if (checkWinner(currentPlayer)) {
      winnerMessage.textContent = "Người chơi " + currentPlayer + " thắng!";
      disableCells();
    } else if (isBoardFull()) {
      winnerMessage.textContent = "Trò chơi hòa!";
    } else {
      currentPlayer = (currentPlayer === 'x') ? 'o' : 'x'; // Đổi lượt
    }
  }
}

// Kiểm tra người thắng
function checkWinner(player) {
  for (var i = 0; i < winningCombinations.length; i++) {
    var combination = winningCombinations[i];
    if (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    ) {
      return true;
    }
  }
  return false;
}

// Kiểm tra toàn bộ bảng đã đầy chưa
function isBoardFull() {
  for (var i = 0; i < board.length; i++) {
    if (!board[i]) {
      return false;
    }
  }
  return true;
}

// Vô hiệu hóa các ô sau khi trò chơi kết thúc
function disableCells() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.pointerEvents = 'none';
  }
}

// Reset lại trò chơi
resetButton.addEventListener('click', function() {
  board = [null, null, null, null, null, null, null, null, null];
  currentPlayer = 'x';
  winnerMessage.textContent = '';
  for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].style.pointerEvents = 'auto';
    cells[i].classList.remove('red', 'blue');
  }
});
