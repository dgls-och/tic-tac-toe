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

const GameView = {
    showBoard(board) {
        console.log(board);
    },

    showMove(player) {
        console.log(
            `${player.name} placed ${player.marker}`
        );
    },

    showWinner(player) {
        console.log(`${player.name} wins!`);
    },

    showDraw() {
        console.log("It's a draw!");
    },

    showOccupiedCell() {
        console.log("Cell already occupied.");
    },

    showGameOver() {
        console.log("Game over.");
    },

    showTurn(player) {
        console.log(
            `It's now ${player.name}'s turn.`
        );
    },

    showRestart() {
        console.log("Game restarted.");
    }
};

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