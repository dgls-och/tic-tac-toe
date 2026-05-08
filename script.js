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
    let played = false;

    const setPlayedStatus = stat => {
        played = stat;
    };
    const getPlayedStatus = () => played;
    const getName = () => name;
    const getMarker = () => marker;
    const playGame = (boardRow, boardColumn) => {
        gameBoard.getCell(boardRow, boardColumn).push(marker);
    };

    return {
        getName
        , getMarker
        , playGame
        , getPlayedStatus
        , setPlayedStatus
    };
}

const player1 = Player("human", "O");
const player2 = Player("computer", "X");

const gameController = (function () {
    const scores = {
        player1: 0,
        player2: 0
    }

    const getScore = player => {
        return (player == "player1") ? scores.player1 : scores.player2;
    };

    const playRound = () => {
        switch (true) {
            case player1.getPlayedStatus() == false
                && player2.getPlayedStatus() == false:
                let min = 1, max = 2;
                let starterDeterminer = Math.floor(Math.random()
                    * (max - min + 1) + min);
                let capitalisedName = null;
                switch (starterDeterminer) {
                    case 1:
                        capitalisedName = player1.getName()[0].toUpperCase()
                            + player1.getName().slice(1);
                        console.log(`${capitalisedName}'s turn...`);
                        player1.playGame(0, 1);
                        player1.setPlayedStatus(true);
                        console.log(player1.getPlayedStatus())
                        break;
                    case 2:
                        capitalisedName = player2.getName()[0].toUpperCase()
                            + player2.getName().slice(1);
                        console.log(`${capitalisedName}'s turn...`);
                        player2.playGame(1, 0);
                        player2.setPlayedStatus(true);
                        console.log(player2.getPlayedStatus())
                }
                break;
            case !(player1.getPlayedStatus() == true
                && player2.getPlayedStatus() == false):
                capitalisedName = player1.getName()[0].toUpperCase()
                    + player1.getName().slice(1);
                console.log(`${capitalisedName}'s turn...`);
                player1.playGame(1, 0);
                player1.setPlayedStatus(true);
                console.log(player1.getPlayedStatus());
                break;
            case !(player2.getPlayedStatus() == true
                && player1.getPlayedStatus() == false):
                capitalisedName = player2.getName()[0].toUpperCase()
                    + player2.getName().slice(1);
                console.log(`${capitalisedName}'s turn...`);
                player2.playGame(1, 0);
                player2.setPlayedStatus(true);
                console.log(player2.getPlayedStatus())
        }
    };

    return { getScore, playRound };
})();

gameController.playRound();
//console.log(player2.getPlayedStatus())
console.log(gameBoard.printBoard())
