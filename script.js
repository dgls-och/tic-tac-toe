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

