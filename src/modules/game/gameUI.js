import { checkPlayer } from '../settings.js';
import { hide, show, coverScreen } from './../helpers.js';
import { startScreen, gameScreen, resultScreen, title, selectOpponentSection, resultMessage, resultText, cells, games, gameStatusError, iconX, iconO, iconPerson, iconComputer, startGameText } from './../variables.js';

export function addSelectedIconToElement(element, icon) {
    if(icon === 'x') {
        removeIconClass(element, iconO);
        addSelectedIcon(element, iconX);
    } else if(icon === 'o') {
        removeIconClass(element, iconX);
        addSelectedIcon(element, iconO);
    } else if(icon === 'manual') {
        removeIconClass(element, iconComputer);
        addSelectedIcon(element, iconPerson);
    } else if(icon === 'auto') {
        removeIconClass(element, iconPerson);
        addSelectedIcon(element, iconComputer);
    } else if(icon === 'null') {
        removeIconClass(element, iconX);
        removeIconClass(element, iconO);
    }
}

function addSelectedIcon(element, iconClass) {
    element.classList.add(iconClass);
}

function removeIconClass(element, iconClass) {
    element.classList.remove(iconClass);
}

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

export function showStartScreen() {
    show(startScreen);
    show(title);
    startScreen.classList.remove('expand');
    startScreen.classList.remove('move-down');
    selectOpponentSection.classList.remove('hidden');
    startGameText.classList.add('hidden');
    hide(gameScreen);
    hide(resultScreen);
}

export function showGameScreen() {
    checkPlayer(games.turnCount);
    show(gameScreen);
    hide(startScreen);
    hide(title);
    hide(resultScreen);
    resultScreen.classList.remove('expand');
}

export function renderGameBoard() {
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const cellIconElement = cell.querySelector('i');
        cell.classList.remove('board__cell--winning');
        cellIconElement.classList.remove(iconX, iconO);

        console.log(games.gameBoard);
    }
}
