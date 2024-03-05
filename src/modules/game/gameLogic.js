import { show, getCurrentPlayer } from './../helpers.js';
import { cells, games, gameStatusError, settings, winningCombos } from './../variables.js';
import { toggleDisableBtn, showSelectedIconOnCell, showResult, showCurrentPlayer } from './gameUI.js';
import { saveGameHistory, addPlayerMoveToBoardArray, declareWinner } from './gameState.js';

export function playGame(cell) {
    const cellIconElement = cell.querySelector('i');
    if(games.turnCount >= 9 || games.winner !== '') {
        return;
    }
    
    const symbol = getCurrentPlayer() === 'user' ? settings.selectedSymbol 
                                                : settings.opponentSymbol;
    userPlay(cell.dataset.index, symbol, cellIconElement);
}

async function userPlay(cellIndex, symbol, cellIconElement) {
    if(!addMoveToBoard(cellIndex, symbol, cellIconElement)) {
        return false;
    }
    saveGameHistory(cellIndex, symbol);
    toggleDisableBtn();

    if(games.turnCount >= 4) {
        if(await checkWinner()) {
            declareWinner();
            removeEventListenerFromCells();
            showResult(games.winner);
            return;
        }
    }

    if(games.turnCount >= 8) {
        games.winner = 'draw';
        showResult(games.winner);
        return false;
    }

    changePlayer();

    // If opponent is auto, call autoPlay function
    if(settings.opponent === 'auto' ) {
        const result = setTimeout(autoPlay, 1500);
        if(!result) {
            return false;
        }
    }
    return true;
}

export async function autoPlay() {
    if(games.winner !== '') {
        return;
    }

    let cellIndex = computeNextMoveIndex(games.turnCount);
    const cellIconElement = cells[cellIndex].querySelector('i');

    addMoveToBoard(cellIndex, settings.opponentSymbol, cellIconElement);
    saveGameHistory(cellIndex, settings.opponentSymbol);

    if(games.turnCount >= 4) {
        if(await checkWinner()) {
            declareWinner();
            removeEventListenerFromCells();
            showResult(games.winner);
            return;
        }
    }

    // Change player to user
    changePlayer();
    return true;
}

function addMoveToBoard(cellIndex, symbol, cellIconElement) {
    if(isPlayerSelectedEmptyCell(cellIndex)) {
        addPlayerMoveToBoardArray(cellIndex, symbol);
        showSelectedIconOnCell(cellIconElement, symbol);
        return true;
    } else {
        show(gameStatusError);
        return false;
    }
}

function isPlayerSelectedEmptyCell(cellIndex) {
    return games.gameBoard[cellIndex] === null;
}

function isNextMoveDefence() {
    Math.floor(Math.random() * 2) === 0 ? true : false;
}

function getRandomEmptyCellIndex() {
    let emptyCells = games.gameBoard.map((value, index) => value === null ? index : -1)
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
    return checkForWinningMove(settings.selectedSymbol);
}

function indexForAttackMove() {
    return checkForWinningMove(settings.opponentSymbol);
}

function checkForWinningMove(symbol) {
    let key = null;
    const index = winningCombos.find((combo) => {
        const [a, b, c] = combo;
        if(games.gameBoard[a] === symbol) {
            if(games.gameBoard[a] === games.gameBoard[b] && games.gameBoard[c] === null) {
                return key = 2;
            }
            if(games.gameBoard[a] === games.gameBoard[c] && games.gameBoard[b] === null) {
                
                return key = 1;
            }
        } else if(games.gameBoard[b] === symbol) {
            if(games.gameBoard[b] === games.gameBoard[c] && games.gameBoard[a] === null) {
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

function changePlayer() {
    games.turnCount += 1;
    showCurrentPlayer();
}

function checkWinner() {
    games.winningComb = winningCombos.find((combo) => {
        const [a, b, c] = combo;
        if(games.gameBoard[a] && games.gameBoard[a] === games.gameBoard[b] && games.gameBoard[a] === games.gameBoard[c]) {
            
            return true;
        }
    });
    return games.winningComb !== undefined ? true : false;
}

// Romove event listener after game ends
function removeEventListenerFromCells() {
    cells.forEach((cell) => {
        cell.removeEventListener('click', playGame);
    });
}