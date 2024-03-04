import {opponent, selectedSymbol, opponentSymbol, gameScreen, userSymbolSign, opponentSymbolSign, settings, checkPlayer} from './settings.js';
import {hide, show, moveLeft, coverScreen, moveDown, addSelectedIconToElement} from './helpers.js';

let gameBoard = [null, null, null, null, null, null, null, null, null];
const gameStatusError = gameScreen.querySelector('.game-status__text--error');
const cells = gameScreen.querySelectorAll('.board__cell');
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];
let winner = '';
let winningComb = [];

// Event listener
cells.forEach((cell) => {
    cell.addEventListener('click', () => playGame(cell));
});

// Romove event listener after game ends
function removeEventListenerFromCells() {
    cells.forEach((cell) => {
        cell.removeEventListener('click', playGame);
    });
}

function playGame(cell) {
    const cellIconElement = cell.querySelector('i');
    if(settings.turnCount >= 9 || winner !== '') {
        return;
    }
    
    // User's turn
    if(settings.turnCount % 2 === 0) {
        if(!userPlay(cell.dataset.index, selectedSymbol, cellIconElement)) {
            return;
        }
        
    // Opponent's turn
    } else {
        if(!userPlay(cell.dataset.index, opponentSymbol, cellIconElement)) {
            return;
        }
    }
}

function userPlay(cellIndex, symbol, cellIconElement) {
    if(!addMoveToBoard(cellIndex, symbol, cellIconElement)) {
        return false;
    }

    if(settings.turnCount >= 5) {
        if(checkWinner()) {
            removeEventListenerFromCells();
            winner = 'user';
            showWinnerScreen(winner);
            return;
        }
    }

    settings.turnCount += 1;

    if(settings.turnCount >= 9) {
        return;
    }

    checkPlayer(settings.turnCount);

    // If opponent is auto, call autoPlay function
    if(opponent === 'auto') {
        const result = setTimeout(autoPlay, 1000);
        if(!result) {
            return false;
        }
    }
    return true;
}

function addMoveToBoard(cellIndex, symbol, cellIconElement) {
    if(isPlayerSelectedEmptyCell(cellIndex)) {
        addPlayerMoveToBoardArray(cellIndex, symbol);
        addSelectedIconToElement(cellIconElement, symbol);
        hide(gameStatusError);
        return true;
    } else {
        show(gameStatusError);
        return false;
    }
}

function isPlayerSelectedEmptyCell(cellIndex) {
    return gameBoard[cellIndex] === null;
}

function addPlayerMoveToBoardArray(cellIndex, symbol) {
    gameBoard[cellIndex] = symbol;
}

function checkWinner() {
    winningComb = winningCombos.find((combo) => {
        const [a, b, c] = combo;
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    });
    return winningComb !== undefined ? true : false;
}

function autoPlay() {
    if(winner !== '') {
        return;
    }

    let cellIndex = computeNextMoveIndex(settings.turnCount);
    const cellIconElement = cells[cellIndex].querySelector('i');
    addMoveToBoard(cellIndex, opponentSymbol, cellIconElement);
    
    if(settings.turnCount >= 5) {
        if(checkWinner()) {
            winner = 'opponent';
            removeEventListenerFromCells();
            showWinnerScreen(winner);
            return;
        }
    }

    settings.turnCount += 1;
    checkPlayer(settings.turnCount);
    return true;
}

function isNextMoveDefence() {
    const no = Math.floor(Math.random() * 2);
    return no === 0 ? true : false;
}

function getRandomEmptyCellIndex() {
    let emptyCells = gameBoard.map((value, index) => value === null ? index : -1)
                            .filter(index => index  !== -1);
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

function computeNextMoveIndex(turnCount) {
    // First turn is random
    if(turnCount === 1) {
        return getRandomEmptyCellIndex();
    
    // From second turn, randomly choose between defence or attack
    } else {
    let index = null;
        if(isNextMoveDefence()) {
            index = indexForDefenceMove();

            if(index === null) {
                return indexForAttackMove() !== null ? indexForAttackMove() : getRandomEmptyCellIndex();
            }
            return index;

        } else {
            index = indexForAttackMove();

            if(index === null) {
                return indexForDefenceMove() !== null ? indexForDefenceMove() : getRandomEmptyCellIndex();
            }
            return index;
        }  
    }
}

function indexForDefenceMove() {
    return checkForWinningMove(selectedSymbol);
}

function indexForAttackMove() {
    return checkForWinningMove(opponentSymbol);
}

function checkForWinningMove(symbol) {
    let key = null;
    const index = winningCombos.find((combo) => {
        const [a, b, c] = combo;
        if(gameBoard[a] === symbol) {
            if(gameBoard[a] === gameBoard[b] && gameBoard[c] === null) {
                return key = 2;
            }
            if(gameBoard[a] === gameBoard[c] && gameBoard[b] === null) {
                
                return key = 1;
            }
        } else if(gameBoard[b] === symbol) {
            if(gameBoard[b] === gameBoard[c] && gameBoard[a] === null) {
                return key = 0;
            }
        }
        return null;
    });
    if(index === undefined) {
        return null;
    }
    return index[key];
}

function showWinnerScreen(winner) {
    winningComb.forEach((cellIndex, index) => {
        setTimeout(() => changeBoardCellColor(cellIndex), index * 500);
    });
}

function changeBoardCellColor(cellIndex) {
    cells[cellIndex].classList.add('board__cell--winning');
}