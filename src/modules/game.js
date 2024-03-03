import {opponent, selectedSymbol, opponentSymbol, gameScreen, userSymbolSign, opponentSymbolSign, settings, checkPlayer} from './settings.js';
import {hide, show, moveLeft, coverScreen, moveDown, addSelectedIconToElement} from './helpers.js';

let gameBoard = [null, null, null, null, null, null, null, null, null];
const gameStatusError = gameScreen.querySelector('.game-status__text--error');
const cells = gameScreen.querySelectorAll('.board__cell');

cells.forEach((cell) => {
    const cellIconElement = cell.querySelector('i');
    cell.addEventListener('click', () => {
        let isPlayerTurnFinished = false;

        // User's turn
        if(settings.turnCount % 2 === 0) {
            isPlayerTurnFinished = addMoveToBoard(cell.dataset.index, selectedSymbol, cellIconElement);
            
        // Opponent's turn
        } else {
            isPlayerTurnFinished = addMoveToBoard(cell.dataset.index, opponentSymbol, cellIconElement);
        }
        
        // If player selected non-empty cell
        if(!isPlayerTurnFinished) {
            return;
        }
        settings.turnCount += 1;

        if(settings.turnCount >= 5) {
            checkWinner();
        }

        checkPlayer(settings.turnCount);
    });
});

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
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            console.log('winner');
        }
    });
}











