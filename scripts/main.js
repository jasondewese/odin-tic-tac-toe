//a factory function to create player objects
const Player = () => {
    let _score = 0;

    const getScore = () => _score;

    const setScore = change => {
        _score += change;
    }

    return {getScore, setScore};
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

    return {displayBoard, displayScore};
})();



//a module for functions affecting the overall flow of the game
const GameControl = (() => {
    let _playerTurn = 1;
	
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
        if (document.querySelector('.square'+square).textContent === '') {
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
        Gameboard.clearBoard();
		_playerTurn = 1;
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
		console.log(`Player ${getTurn()} wins!`);
		if (Gameboard.isBoardFull() && !Gameboard.threeInARow()) {
            console.log('The game is a tie!');
        }
        else if (getTurn() === 1) {
			player1.setScore(1);
		}
		else {
			player2.setScore(1);
		}
        console.log(player1.getScore(), player2.getScore());
		DisplayController.displayScore(player1, player2);
        //setTimeout because screen will not update until _gameOver returns, so _newGame will be called before
        //you can actually see the last symbol show up, and then the screen immediately resets to a new board
        //This gives browser a moment to update before continuing running the javascript
        //The browser runs on a single thread, so it cannot update screen until the JS finishes running
        //setTimeout(function() { _newGame(); }, 1);
		
    }
	
	const _newGame = () => {
        Gameboard.clearBoard();
        _playerTurn = 1;
        DisplayController.displayScore(player1, player2);
	}

    return {getTurn, gameInit};
})();




GameControl.gameInit();