import { show } from './../helpers.js';
import { cells, games, gameStatusError, settings, winningCombos, backStepBtn } from './../variables.js';
import { checkPlayer } from './../settings.js';
import { removeDisabled, showSelectedIconOnCell, showResult } from './gameUI.js';
import { saveGameHistory, addPlayerMoveToBoardArray, declareWinner } from './gameState.js';

export function playGame(cell) {
    const cellIconElement = cell.querySelector('i');
    if(games.turnCount >= 9 || games.winner !== '') {
        return;
    }
    
    // User's turn
    if(games.turnCount % 2 === 0) {
        if(!userPlay(cell.dataset.index, settings.selectedSymbol, cellIconElement)) {
            return;
        }
        
    // Opponent's turn
    } else {
        if(!userPlay(cell.dataset.index, settings.opponentSymbol, cellIconElement)) {
            return;
        }
    }
}

async function userPlay(cellIndex, symbol, cellIconElement) {
    if(!addMoveToBoard(cellIndex, symbol, cellIconElement)) {
        return false;
    }
    saveGameHistory();
    if(games.turnCount === 0) {
        removeDisabled(backStepBtn);
    }

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

    games.turnCount += 1;
    checkPlayer(games.turnCount);

    // If opponent is auto, call autoPlay function
    if(settings.opponent === 'auto' ) {
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

async function autoPlay() {
    if(games.winner !== '') {
        return;
    }

    let cellIndex = computeNextMoveIndex(games.turnCount);
    const cellIconElement = cells[cellIndex].querySelector('i');

    addMoveToBoard(cellIndex, settings.opponentSymbol, cellIconElement);
    saveGameHistory();

    if(games.turnCount >= 4) {
        if(await checkWinner()) {
            declareWinner();
            removeEventListenerFromCells();
            showResult(games.winner);
            return;
        }
    }

    games.turnCount += 1;
    checkPlayer(games.turnCount);
    return true;
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