//A module for all properties and functions related to the gameboard
const Gameboard = (() => {

    let _gameboard = ['X', 'O', 'X',
                     'X', 'O', 'O',
                     'X', 'X', 'O'];

    const getGameboard = () => {
        return _gameboard;
    }

    const clearBoard = () => {
        _gameboard = ['','','','','','','','',''];
    }

    return {getGameboard, clearBoard};
})();

//a module for all functions related to display controls
const DisplayController = (() => {
    const displayBoard = () => {
        
        for (let i = 0; i < Gameboard.getGameboard().length; i++){
            let currentSquare = document.querySelector('.square'+i);
            currentSquare.textContent = Gameboard.getGameboard()[i];
        }
    }

    const displayScore = (player1, player2) => {
        let p1Score = document.querySelector('.player-one-score');
        let p2Score = document.querySelector('.player-two-score');

        p1Score.textContent = player1.getScore();
        p2Score.textContent = player2.getScore();
    }

    return {displayBoard, displayScore};
})();

//a module for functions affecting the overall flow of the game
const GameControl = (() => {
    let _playerTurn = 1;

    const getTurn = () => _playerTurn;

    return {getTurn};
})();

//a factory function to create player objects
const Player = () => {
    let _score = 0;

    const getScore = () => _score;

    return {getScore};
}

const player1 = Player();
const player2 = Player();

DisplayController.displayBoard();
DisplayController.displayScore(player1, player2);