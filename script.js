const Gameboard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const getBoard = () => board;

    const placeMarker = (row, col, marker) => {
        if (board[row][col] !== "") return false;

        board[row][col] = marker;
        return true;
    };

    const resetBoard = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = "";
            }
        }
    };

    const printBoard = () => {
        console.log(board);
    };

    return {
        getBoard,
        placeMarker,
        resetBoard,
        printBoard
    };
})();

function Player(name, marker) {
    return {
        name,
        marker
    };
}

const GameController = (() => {
    const player1 = Player("Human", "X");
    const player2 = Player("Computer", "O");

    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer =
            currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const checkWin = (marker) => {
        const board = Gameboard.getBoard();

        // Rows
        for (let row = 0; row < 3; row++) {
            if (
                board[row][0] === marker &&
                board[row][1] === marker &&
                board[row][2] === marker
            ) {
                return true;
            }
        }

        // Columns
        for (let col = 0; col < 3; col++) {
            if (
                board[0][col] === marker &&
                board[1][col] === marker &&
                board[2][col] === marker
            ) {
                return true;
            }
        }

        // Diagonal
        if (
            board[0][0] === marker &&
            board[1][1] === marker &&
            board[2][2] === marker
        ) {
            return true;
        }

        // Reverse diagonal
        if (
            board[0][2] === marker &&
            board[1][1] === marker &&
            board[2][0] === marker
        ) {
            return true;
        }

        return false;
    };

    const checkDraw = () => {
        const board = Gameboard.getBoard();

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === "") {
                    return false;
                }
            }
        }

        return true;
    };

    const playRound = (row, col) => {
        if (gameOver) {
            console.log("Game over.");
            return;
        }

        const successfulMove = Gameboard.placeMarker(
            row,
            col,
            currentPlayer.marker
        );

        if (!successfulMove) {
            console.log("Cell already occupied.");
            return;
        }

        console.log(
            `${currentPlayer.name} placed ${currentPlayer.marker}`
        );

        Gameboard.printBoard();

        if (checkWin(currentPlayer.marker)) {
            console.log(`${currentPlayer.name} wins!`);
            gameOver = true;
            return;
        }

        if (checkDraw()) {
            console.log("It's a draw!");
            gameOver = true;
            return;
        }

        switchPlayer();

        console.log(
            `It's now ${currentPlayer.name}'s turn.`
        );
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        gameOver = false;

        console.log("Game restarted.");
        Gameboard.printBoard();
    };

    return {
        playRound,
        restartGame,
        getCurrentPlayer
    };
})();

GameController.playRound(0, 0);
GameController.playRound(1, 1);
GameController.playRound(0, 1);
GameController.playRound(2, 2);
GameController.playRound(0, 2);