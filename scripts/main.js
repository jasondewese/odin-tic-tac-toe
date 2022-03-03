//a factory function to create player objects
const Player = () => {
    let _score = 0;
    let _name = '';

    const getScore = () => _score;

    const setScore = change => {
        _score += change;
    }

    const setName = name => {
        _name = name;
    }

    const getName = () => {
        return _name;
    }

    return {getScore, setScore, setName, getName};
}


//A module for all properties and functions related to the gameboard
const Gameboard = (() => {

    let _gameboard = ['','','','','','','','',''];

    const getGameboard = () => {
        return _gameboard;
    }

    const clearBoard = () => {
        _gameboard = ['','','','','','','','',''];
		DisplayController.displayBoard();
    }

    const addToBoard = (square) => {
        if (GameControl.getTurn() === 1) {
            _gameboard[square] = 'X';
        }
        else {
            _gameboard[square] = 'O';
        }
    }
	
	const _checkColumns = () => {
		for (let i = 0; i < 3; i++) {
			if (document.querySelector('.square'+(0+i)).textContent ===  document.querySelector('.square'+(3+i)).textContent 
			&&  document.querySelector('.square'+(0+i)).textContent === document.querySelector('.square'+(6+i)).textContent 
			&&  document.querySelector('.square'+(0+i)).textContent !== '') {
				return true;
			}
		}
		return false;
	}
	
	const _checkRows = () => {
		for (let i = 0; i < 3; i++) {
			if (document.querySelector('.square'+(i*3)).textContent === document.querySelector('.square'+(i*3 + 1)).textContent
			&&  document.querySelector('.square'+(i*3)).textContent === document.querySelector('.square'+(i*3 + 2)).textContent
			&&  document.querySelector('.square'+(i*3)).textContent !== '') {
				return true;
			}
		}
		return false;
	}
	
	const _checkDiaganols = () => {
		if (document.querySelector('.square0').textContent === document.querySelector('.square4').textContent
		&&  document.querySelector('.square0').textContent === document.querySelector('.square8').textContent
		&&  document.querySelector('.square0').textContent !== '') {
			return true;
		}
		if (document.querySelector('.square2').textContent === document.querySelector('.square4').textContent
		&&  document.querySelector('.square2').textContent === document.querySelector('.square6').textContent
		&&  document.querySelector('.square2').textContent !== '') {
			return true;
		}
		return false;
	}
	
	const threeInARow = () => {
		if (_checkColumns() || _checkRows() || _checkDiaganols()) {
			return true;
		}
		return false;
	}

    const isBoardFull = () => {
        let isFull = false;
        for (let i = 0; i < _gameboard.length; i++) {
            if (_gameboard[i] !== '') {
                isFull = true;
            } 
            else {
                return false;
            }
        }
        return isFull;
    }

    return {getGameboard, clearBoard, addToBoard, threeInARow, isBoardFull};
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
    
    const displayNames = (player1, player2) => {
        document.querySelector('.player-one-label').textContent = player1.getName() + ': ';
        document.querySelector('.player-two-label').textContent = player2.getName() + ': ';
    }


    return {displayBoard, displayScore, displayNames};
})();



//a module for functions affecting the overall flow of the game
const GameControl = (() => {
    let _playerTurn = 1;
    let _isGameOver = false;
	
	const player1 = Player();
	const player2 = Player();

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
        //only allow turn in empty squares
        if (!_isGameOver && document.querySelector('.square'+square).textContent === '') {
            Gameboard.addToBoard(square);
            DisplayController.displayBoard();
            if (Gameboard.threeInARow() || Gameboard.isBoardFull()) {
                _gameOver();
            }
            else {
                _changeTurn();
            }
        }		
    }

    const gameInit = () => {

        player1.setName(document.querySelector('#player1').value);
        player2.setName(document.querySelector('#player2').value);
        Gameboard.clearBoard();
		_playerTurn = 1;
        DisplayController.displayNames(player1, player2);
		DisplayController.displayScore(player1, player2);
        for (let i = 0; i < 9; i++) {
            document.querySelector('.square'+i).addEventListener('click', function (){
                _gameTurn(i)
            });
        }
        document.querySelector('.new-game').addEventListener('click', _newGame);
    }

    const _gameOver = () => {
		
        console.log('Game Over!');		
		if (Gameboard.isBoardFull() && !Gameboard.threeInARow()) {
            console.log('The game is a tie!');
            _isGameOver = true;
            document.querySelector('.player-one-result').style.zIndex = 1;
            document.querySelector('.player-one-result').textContent = `The game is a draw!`;
            document.querySelector('.player-two-result').style.zIndex = 1;
            document.querySelector('.player-two-result').textContent = `The game is a draw!`;
        }
        else if (getTurn() === 1) {
			player1.setScore(1);
            _isGameOver = true;
            document.querySelector('.player-one-result').style.zIndex = 1;
            document.querySelector('.player-one-result').textContent = `${player1.getName()} wins!`;
		}
		else {
			player2.setScore(1);
            _isGameOver = true;
            document.querySelector('.player-two-result').style.zIndex = 1;
            document.querySelector('.player-two-result').textContent = `${player2.getName()} wins!`;
		}
		DisplayController.displayScore(player1, player2);
        //setTimeout because screen will not update until _gameOver returns, so _newGame will be called before
        //you can actually see the last symbol show up, and then the screen immediately resets to a new board
        //This gives browser a moment to update before continuing running the javascript
        //The browser runs on a single thread, so it cannot update screen until the JS finishes running
        //setTimeout(function() { _newGame(); }, 1);
		
    }
	
	const _newGame = () => {
        _isGameOver = false;
        Gameboard.clearBoard();
        _playerTurn = 1;
        document.querySelector('.player-one-result').style.zIndex = -1;
        document.querySelector('.player-two-result').style.zIndex = -1;
        DisplayController.displayScore(player1, player2);
	}

    return {getTurn, gameInit};
})();


//The 'Start Game' button will begin the tic-tac-toe game and hide the initial name entry box
document.querySelector('#start-new-game').addEventListener('click', function() {
    document.querySelector('#gray-out').style.display = 'none'; //hide name entry fields
    GameControl.gameInit();
});
