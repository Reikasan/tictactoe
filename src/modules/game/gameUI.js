import { hide, show, coverScreen, getCurrentPlayer, changeGameStatusText } from './../helpers.js';
import { startScreen, gameScreen, resultScreen, title, selectOpponentSection, 
        resultMessage, resultText, cells, settings, games, gameStatusError, iconX, iconO, 
        iconPerson, iconComputer, startGameText , userSymbolSign, opponentSymbolSign, 
        stepBackBtnUser, stepBackBtnOpponent, selectSymbolSection} from './../variables.js';

export function backToOpponentSection() {
    hide(selectSymbolSection);
    show(selectOpponentSection);
}

export function addSelectedIconToElement(element, icon, type) {
    let iconToAdd;
    let iconToRemove;

    if(type === 'symbol') {
        if(icon === null) {
            element.classList.remove(iconX, iconO);
            return;
        }
        iconToAdd = icon === 'x' ? iconX : iconO;
        iconToRemove = icon === 'x' ? iconO : iconX;
    } else if(type === 'opponent') {
        iconToAdd = icon === 'manual' ? iconPerson : iconComputer;
        iconToRemove = icon === 'manual' ? iconComputer : iconPerson;
    }
    element.classList.remove(iconToRemove);
    element.classList.add(iconToAdd);
}


export function selectCurrentPlyerSign(currentPlayer) {
    if(currentPlayer === 'user') {
        userSymbolSign.classList.add('selected');
        opponentSymbolSign.classList.remove('selected');
    } else {
        userSymbolSign.classList.remove('selected');
        opponentSymbolSign.classList.add('selected');
    }
}

export function showCurrentPlayer() {
    const currentPlayer = getCurrentPlayer();
    selectCurrentPlyerSign(currentPlayer);
    changeGameStatusText(currentPlayer);
}

export function showSelectedIconOnCell(cellIconElement, symbol) {
    addSelectedIconToElement(cellIconElement, symbol, 'symbol');
    hide(gameStatusError);
}

export function toggleDisableBtn() {
    if(games.turnCount == 0 ) { 
        stepBackBtnUser.classList.add('disabled');
        stepBackBtnOpponent.classList.add('disabled');
        return;
    };

    if(getCurrentPlayer() === 'opponent') {
        stepBackBtnUser.classList.remove('disabled');
        stepBackBtnOpponent.classList.add('disabled');
    } else if(getCurrentPlayer() === 'user') {
        if(settings.opponent === 'auto') {
            // If opponent is auto, user can use step back but opponent stay disabled
            stepBackBtnOpponent.classList.add('disabled');
            stepBackBtnUser.classList.remove('disabled');
        } else {
            console.log('manual');
            stepBackBtnOpponent.classList.remove('disabled');
            stepBackBtnUser.classList.add('disabled');
        }
    }
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
    setTimeout(() => gameScreen.classList.remove('show'), 2500);
    setTimeout(() =>show(resultScreen), 2500);
    setTimeout(() => coverScreen(resultScreen), 2500);
    setTimeout(() => hide(gameScreen), 2500);
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
        addSelectedIconToElement(cellIconElement, games.gameBoard[i], 'symbol');
    }
}
