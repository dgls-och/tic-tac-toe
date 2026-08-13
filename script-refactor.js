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

    const getEmptyCells = () => {
        const emptyCells = [];

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === "") {
                    emptyCells.push({
                        row: rowIndex,
                        col: colIndex
                    });
                }
            });
        });

        return emptyCells;
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
        getEmptyCells,
        placeMarker,
        isFull,
        reset
    };
})();


const Player = (name, marker) => ({
    name,
    marker
});


const ComputerPlayer = {
    chooseMove(emptyCells) {
        if (emptyCells.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(
            Math.random() * emptyCells.length
        );

        return emptyCells[randomIndex];
    }
};


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
        cells.forEach(cell => {
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
        status.textContent =
            "That cell is already occupied.";
    };

    const showGameOver = () => {
        status.textContent =
            "Game over. Restart to play again.";
    };

    const showTurn = (player) => {
        status.textContent =
            `${player.name}'s turn.`;
    };

    const showRestart = () => {
        status.textContent = "Human's turn.";
    };

    const onCellClick = (callback) => {
        document
            .querySelector(".board")
            .addEventListener("click", event => {
                const cell = event.target.closest(".cell");

                if (!cell) return;

                const row = Number(cell.dataset.row);
                const col = Number(cell.dataset.col);

                callback(row, col);
            });
    };

    const onRestart = (callback) => {
        document
            .querySelector(".restart")
            .addEventListener("click", callback);
    };

    return {
        renderBoard,
        showMove,
        showWinner,
        showDraw,
        showOccupiedCell,
        showGameOver,
        showTurn,
        showRestart,
        onCellClick,
        onRestart
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

        // Only the human can initiate a round from the UI.
        if (currentPlayer !== player1) {
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

        GameView.renderBoard(Gameboard.getBoard());
        GameView.showMove(currentPlayer);

        const board = Gameboard.getBoard();

        if (
            GameRules.hasWinner(
                board,
                currentPlayer.marker
            )
        ) {
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

        playComputerRound();
    };

    const playComputerRound = () => {
        const emptyCells = Gameboard.getEmptyCells();

        const move = ComputerPlayer.chooseMove(emptyCells);

        if (!move) {
            return;
        }

        const successfulMove = Gameboard.placeMarker(
            move.row,
            move.col,
            currentPlayer.marker
        );

        if (!successfulMove) {
            return;
        }

        GameView.renderBoard(Gameboard.getBoard());
        GameView.showMove(currentPlayer);

        const board = Gameboard.getBoard();

        if (
            GameRules.hasWinner(
                board,
                currentPlayer.marker
            )
        ) {
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

        GameView.renderBoard(Gameboard.getBoard());
        GameView.showRestart();
    };

    return {
        playRound,
        restartGame,
        getCurrentPlayer
    };
})();


GameView.onCellClick((row, col) => {
    GameController.playRound(row, col);
});

GameView.onRestart(() => {
    GameController.restartGame();
});

GameView.renderBoard(Gameboard.getBoard());