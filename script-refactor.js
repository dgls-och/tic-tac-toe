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

