//A module for all properties and functions related to the gameboard
const Gameboard = (() => {

    let _gameboard = ['','','','','','','','',''];

    const getGameboard = () => {
        return _gameboard;
    }

    const clearBoard = () => {
        _gameboard = ['','','','','','','','',''];
    }

    const addToBoard = (square) => {
        if (GameControl.getTurn() === 1) {
            _gameboard[square] = 'X';
        }
        else {
            _gameboard[square] = 'O';
        }
    }

    return {getGameboard, clearBoard, addToBoard};
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

    const _changeTurn = () => {
        if (_playerTurn === 1) {
            _playerTurn = 2;
        }
        else {
            _playerTurn = 1;
        }
    }

    const _gameTurn = (square) => {
        Gameboard.addToBoard(square);
        _changeTurn();
        DisplayController.displayBoard();
    }

    const gameInit = () => {
        Gameboard.clearBoard();
        for (let i = 0; i < 9; i++) {
            document.querySelector('.square'+i).addEventListener('click', function (){
                _gameTurn(i)
            });
        }
    }

    const gameOver = () => {
        
    }

    return {getTurn, gameInit};
})();

//a factory function to create player objects
const Player = () => {
    let _score = 0;

    const getScore = () => _score;

    const setScore = change => {
        _score += change;
    }

    return {getScore, setScore};
}

const player1 = Player();
const player2 = Player();

GameControl.gameInit();