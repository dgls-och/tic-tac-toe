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

    const printBoard = () => {
        return board;
    };

    const getCell = (row, column) => {
        return board[row][column];
    }

    return { printBoard, getCell };
})();

const boardCells = (function () {
    const cellA1 = gameBoard.getCell(0, 0);
    const cellA2 = gameBoard.getCell(0, 1);
    const cellA3 = gameBoard.getCell(0, 2);
    const cellB1 = gameBoard.getCell(1, 0);
    const cellB2 = gameBoard.getCell(1, 1);
    const cellB3 = gameBoard.getCell(1, 2);
    const cellC1 = gameBoard.getCell(2, 0);
    const cellC2 = gameBoard.getCell(2, 1);
    const cellC3 = gameBoard.getCell(2, 2);

    const getCellA1 = () => cellA1;
    const getCellA2 = () => cellA2;
    const getCellA3 = () => cellA3;
    const getCellB1 = () => cellB1;
    const getCellB2 = () => cellB2;
    const getCellB3 = () => cellB3;
    const getCellC1 = () => cellC1;
    const getCellC2 = () => cellC2;
    const getCellC3 = () => cellC3;

    return { 
        getCellA1, getCellA2, getCellA3,
        getCellB1, getCellB2, getCellB3,
        getCellC1, getCellC2, getCellC3 
    };
})();

console.log(boardCells.getCellA1());