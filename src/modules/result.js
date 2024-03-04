import { show, coverScreen } from './helpers.js';
import { resultScreen, resultMessage, resultText, cells, games } from './variables.js';

export function showResult(winner) {
    if(winner === 'user') {
        resultMessage.textContent = 'congratulations';
        resultText.textContent = 'You win!';
    } else if(winner === 'opponent') {
        resultMessage.textContent = 'better luck next time';
        resultText.textContent = 'You lose!';
    } else if(winner === 'draw') {
        gameStatusText.textContent = 'Draw!';
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