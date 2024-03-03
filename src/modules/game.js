import {opponent, selectedSymbol, opponentSymbol, gameScreen, userSymbolSign, opponentSymbolSign, settings, checkPlayer} from './settings.js';
import {hide, show, moveLeft, coverScreen, moveDown, addSelectedIcon} from './helpers.js';

let gameBoard = ['', '', '', '', '', '', '', '', ''];

const cells = gameScreen.querySelectorAll('.board__cell');

cells.forEach((cell) => {
    const cellIcon = cell.querySelector('i');
    cell.addEventListener('click', () => {
        if(settings.turnCount % 2 === 0) {
            addSelectedIcon(cellIcon, selectedSymbol);
            addMoveToBoard(cell.dataset.index, selectedSymbol);
        } else {
            addSelectedIcon(cellIcon, opponentSymbol);
            addMoveToBoard(cell.dataset.index, opponentSymbol);
        }
        settings.turnCount += 1;

        if(settings.turnCount >= 5) {
            checkWinner();
        }

        checkPlayer(settings.turnCount);
    });
});

function addMoveToBoard(cellIndex, symbol) {
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











