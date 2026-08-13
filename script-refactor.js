const Gameboard = (() => {
    const SIZE = 3;

    let board = createEmptyBoard();

    function createEmptyBoard() {
        return Array.from(
            { length: SIZE },
            () => Array(SIZE).fill("")
        );
    }

    const getBoard = () => {
        // Return a copy so outside code cannot mutate our board directly.
        return board.map(row => [...row]);
    };

    const placeMarker = (row, col, marker) => {
        if (!isValidPosition(row, col)) {
            return false;
        }

        if (board[row][col] !== "") {
            return false;
        }

        board[row][col] = marker;
        return true;
    };

    const isValidPosition = (row, col) => {
        return (
            row >= 0 &&
            row < SIZE &&
            col >= 0 &&
            col < SIZE
        );
    };

    const isFull = () => {
        return board.every(row =>
            row.every(cell => cell !== "")
        );
    };

    const reset = () => {
        board = createEmptyBoard();
    };

    return {
        getBoard,
        placeMarker,
        isFull,
        reset
    };
})();

const Player = (name, marker) => ({
    name,
    marker
});

const GameRules = (() => {
    const WINNING_LINES = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],

        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],

        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    const hasWinner = (board, marker) => {
        return WINNING_LINES.some(line =>
            line.every(([row, col]) =>
                board[row][col] === marker
            )
        );
    };

    const isDraw = (board) => {
        return board.every(row =>
            row.every(cell => cell !== "")
        );
    };

    return {
        hasWinner,
        isDraw
    };
})();

const GameView = (() => {
  const cells = document.querySelectorAll(".cell");
  const status = document.querySelector(".status");

  const renderBoard = (board) => {
    cells.forEach((cell) => {
      const row = Number(cell.dataset.row);
      const col = Number(cell.dataset.col);

      cell.textContent = board[row][col];
      cell.disabled = board[row][col] !== "";
    });
  };

  const showMove = (player) => {
    status.textContent =
      `${player.name} placed ${player.marker}.`;
  };

  const showWinner = (player) => {
    status.textContent =
      `${player.name} wins!`;
  };

  const showDraw = () => {
    status.textContent = "It's a draw!";
  };

  const showOccupiedCell = () => {
    status.textContent = "That cell is already occupied.";
  };

  const showGameOver = () => {
    status.textContent = "Game over. Restart to play again.";
  };

  const showTurn = (player) => {
    status.textContent =
      `${player.name}'s turn.`;
  };

  const showRestart = () => {
    status.textContent = "Human's turn.";
  };
  
  document.querySelector(".board").addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");

    if (!cell) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    GameController.playRound(row, col);
  });

  document.querySelector(".restart").addEventListener("click", () => {
    GameController.restartGame();
  });

  return {
    renderBoard,
    showMove,
    showWinner,
    showDraw,
    showOccupiedCell,
    showGameOver,
    showTurn,
    showRestart
  };
})();

const GameController = (() => {
    const player1 = Player("Human", "X");
    const player2 = Player("Computer", "O");

    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer =
            currentPlayer === player1
                ? player2
                : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const playRound = (row, col) => {
        if (gameOver) {
            GameView.showGameOver();
            return;
        }

        const successfulMove = Gameboard.placeMarker(
            row,
            col,
            currentPlayer.marker
        );

        if (!successfulMove) {
            GameView.showOccupiedCell();
            return;
        }

        GameView.showMove(currentPlayer);
        GameView.showBoard(Gameboard.getBoard());

        const board = Gameboard.getBoard();

        if (GameRules.hasWinner(
            board,
            currentPlayer.marker
        )) {
            GameView.showWinner(currentPlayer);
            gameOver = true;
            return;
        }

        if (GameRules.isDraw(board)) {
            GameView.showDraw();
            gameOver = true;
            return;
        }

        switchPlayer();
        GameView.showTurn(currentPlayer);
    };

    const restartGame = () => {
        Gameboard.reset();

        currentPlayer = player1;
        gameOver = false;

        GameView.showRestart();
        GameView.showBoard(Gameboard.getBoard());
    };

    return {
        playRound,
        restartGame,
        getCurrentPlayer
    };
})();

GameView.renderBoard(Gameboard.getBoard());