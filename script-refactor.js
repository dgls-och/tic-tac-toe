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