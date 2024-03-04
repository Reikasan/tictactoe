import { hide, show, moveLeft, coverScreen, moveDown, getOpponentSymbol } from './helpers.js';
import { settings, userSymbolSign, userSymbolSignIcon, opponentSymbolSign, opponentSymbolSignIcon, gameStatusText, startScreen, gameScreen, switchOpponentBtnIcon, startGameText, backToOpponentBtn, selectOpponentSection, selectSymbolSection, opponentBtns, symbolBtns, games } from './variables.js';
import { addSelectedIconToElement } from './game/gameUI.js';

export function selectAndShowNextQuestion(e, item, btn) {
    e.preventDefault();
    
    // First question
    if(item === 'opponent') {
        settings.opponent = btn.dataset.opponent;
        hide(selectOpponentSection);
        show(selectSymbolSection);

        addSelectedIconToElement(switchOpponentBtnIcon, settings.opponent);
    
    // Second question
    } else if(item === 'symbol') {
        settings.selectedSymbol = btn.dataset.symbol;
        
        // Execute "start game" text animation
        hide(selectSymbolSection);
        show(startGameText);
        
        // Add selected icon to game screen
        setIconForPlayerSigns();

        checkPlayer(games.turnCount);   
        transitionScreen(); 
    } 
}

function setIconForPlayerSigns() {
    settings.opponentSymbol = getOpponentSymbol(settings.selectedSymbol);

    addSelectedIconToElement(userSymbolSignIcon, settings.selectedSymbol);
    addSelectedIconToElement(opponentSymbolSignIcon, settings.opponentSymbol);
}

export function checkPlayer(turnCount) {
    if(turnCount % 2 === 0) {
        userSymbolSign.classList.add('selected');
        opponentSymbolSign.classList.remove('selected');
        gameStatusText.textContent = 'Your turn';
    } else {
        userSymbolSign.classList.remove('selected');
        opponentSymbolSign.classList.add('selected');
        gameStatusText.textContent = 'Opponent\'s turn';
    }
}

function transitionScreen() {
    setTimeout(() => moveLeft(startGameText), 500);
    setTimeout(() => coverScreen(startScreen), 1000);
    setTimeout(() => show(gameScreen), 1400);
    setTimeout(() => moveDown(startScreen), 1800);
    setTimeout(() => hide(startScreen), 2800);
}