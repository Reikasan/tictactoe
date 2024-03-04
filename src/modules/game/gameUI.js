import { hide, show, coverScreen, addSelectedIconToElement } from './../helpers.js';
import { resultScreen, resultMessage, resultText, cells, games, gameStatusError } from './../variables.js';

export function showSelectedIconOnCell(cellIconElement, symbol) {
    addSelectedIconToElement(cellIconElement, symbol);
    hide(gameStatusError);
}

export function removeDisabled(element) {
    element.classList.remove('disabled');
}

export function showResult(winner) {
    if(winner === 'user') {
        resultMessage.textContent = 'congratulations';
        resultText.textContent = 'You win!';
    } else if(winner === 'opponent') {
        resultMessage.textContent = 'better luck next time';
        resultText.textContent = 'You lose!';
    } else if(winner === 'draw') {
        resultText.textContent = 'Draw!';
    }

    if(winner !== 'draw') {
        highlightWinningCombination();
    }
    showResultScreen();
    
}

function highlightWinningCombination() {
    games.winningComb.forEach((cellIndex, index) => {
        setTimeout(() => changeBoardCellColor(cellIndex), index * 500);
    });
}

function changeBoardCellColor(cellIndex) {
    cells[cellIndex].classList.add('board__cell--winning');
}

function showResultScreen() {
    setTimeout(() =>show(resultScreen), 2500);
    setTimeout(() => coverScreen(resultScreen), 2500);
}


