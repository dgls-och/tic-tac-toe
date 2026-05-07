const gameBoard = (function () {
    const board = [];
    for (let i = 0; i < 3; i++) {
        const row = []
        board.push(row);
        for (let i = 0; i < 3; i++) {
            const column = [];
            row.push(column);
        }
    }

    const printBoard = () => board;

    const getCell = (row, column) => board[row][column];

    return { printBoard, getCell };
})();

const boardCells = (function () {
    const getCellA1 = () => gameBoard.getCell(0, 0);
    const getCellA2 = () => gameBoard.getCell(0, 1);
    const getCellA3 = () => gameBoard.getCell(0, 2);
    const getCellB1 = () => gameBoard.getCell(1, 0);
    const getCellB2 = () => gameBoard.getCell(1, 1);
    const getCellB3 = () => gameBoard.getCell(1, 2);
    const getCellC1 = () => gameBoard.getCell(2, 0);
    const getCellC2 = () => gameBoard.getCell(2, 1);
    const getCellC3 = () => gameBoard.getCell(2, 2);

    return {
        getCellA1, getCellA2, getCellA3,
        getCellB1, getCellB2, getCellB3,
        getCellC1, getCellC2, getCellC3
    };
})();

function Player(name, marker) {
    const getName = () => name;
    const getMarker = () => marker;
    const playGame = (boardRow, boardColumn) => {
        gameBoard.getCell(boardRow, boardColumn).push(marker);
    };

    return { getName, getMarker, playGame };
}

const player1 = Player("human", "O");
const player2 = Player("computer", "X");
