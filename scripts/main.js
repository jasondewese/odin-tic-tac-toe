//A module for all properties and functions related to the gameboard
const Gameboard = (() => {

    let _gameboard = ['X', 'O', 'X',
                     'X', 'O', 'O',
                     'X', 'X', 'O'];

    const getGameboard = () => {
        return _gameboard;
    }

    return {getGameboard};
})();

//a module for all functions related to display controls
const DisplayController = (() => {
    const updateBoard = () => {
        
        for (let i = 0; i < Gameboard.getGameboard().length; i++){
            let currentSquare = document.querySelector('.square'+i);
            currentSquare.textContent = Gameboard.getGameboard()[i];
        }
    }

    return {updateBoard};
})();

//a module for functions affecting the overall flow of the game
const GameControl = (() => {

})();

//a factory function to create player objects
const Player = () => {
    let _score = 0;

    const getScore = () => _score;

    return {getScore};
}

DisplayController.updateBoard();