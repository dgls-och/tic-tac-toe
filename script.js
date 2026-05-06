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

    return { printBoard };
})();

console.log(gameBoard.printBoard());