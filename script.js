const gameBoard = (function () {
    const board = [];
    for (let i = 0; i < 3; i++) {
        const row = []
        board.push(row);
        for (let i = 0; i < 3; i++) {
            const column = "";
            row.push(column);
        }
    }

    const printBoard = () => board;

    const getCell = (row, column) => board[row][column];

    return { printBoard, getCell };
})();

function Player(name, marker) {
    const getName = () => name;
    const getMarker = () => marker;
    const playGame = (boardRow, boardColumn) => {
        gameBoard.getCell(boardRow, boardColumn).push(marker);
    };

    return {
        getName
        , getMarker
        , playGame
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

    const placeMarker = (whoPlays, row, col) => {
        let player = (whoPlays == "player1") ? player1 : player2;
        let capitalisedName = player.getName()[0].toUpperCase()
            + player.getName().slice(1);
        console.log(`${capitalisedName}'s turn...`);
        player.playGame(row, col);
        player.setPlayedStatus(true);
        console.log(player.getPlayedStatus())
    }

    const playRound = () => {
        switch (true) {
            case player1.getPlayedStatus() == false
                && player2.getPlayedStatus() == false:
                let min = 1, max = 2;
                let starterDeterminer = Math.floor(Math.random()
                    * (max - min + 1) + min);
                switch (starterDeterminer) {
                    case 1:
                        placeMarker("player1", 1, 0);
                        break;
                    case 2:
                        placeMarker("player2", 0, 1);
                }
                break;
            case !(player1.getPlayedStatus() == true
                && player2.getPlayedStatus() == false):
                placeMarker("player1", 2, 1);
                break;
            case !(player2.getPlayedStatus() == true
                && player1.getPlayedStatus() == false):
                placeMarker("player2", 1, 2);
        }
    };

    return { getScore, playRound };
})();

gameController.playRound();
//console.log(player2.getPlayedStatus())
console.log(gameBoard.printBoard())
