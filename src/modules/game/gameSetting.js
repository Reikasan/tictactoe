// Copyright 2024 Reika Akuzawa. All rights reserved.

import { hide, show, moveLeft, coverScreen, moveDown, getOpponentSymbol } from '../helpers.js';
import { settings, userSymbolSignIcon, opponentSymbolSignIcon, startScreen, gameScreen, switchOpponentBtnIcon, startGameText, selectOpponentSection, selectSymbolSection, games } from '../variables.js';
import { addSelectedIconToElement, showCurrentPlayer, renderGameBoard, showStartScreen, showGameScreen, toggleDisableBtn } from './gameUI.js';
import { resetAllData, resetGameData } from './gameState.js';
import { autoPlay } from './gameLogic.js';

export function selectAndShowNextQuestion(item, btn) {
    // First question
    if(item === 'opponent') {
        settings.opponent = btn.dataset.opponent;
        hide(selectOpponentSection);
        show(selectSymbolSection);
        addSelectedIconToElement(switchOpponentBtnIcon, settings.opponent, 'opponent');

    // Second question
    } else if(item === 'symbol') {
        settings.selectedSymbol = btn.dataset.symbol;
        
        // Execute "start game" text animation
        hide(selectSymbolSection);
        show(startGameText);
        
        // Add selected icon to game screen
        setIconForPlayerSigns();
        transitionScreen(); 
    } 
}

function setIconForPlayerSigns() {
    settings.opponentSymbol = getOpponentSymbol(settings.selectedSymbol);

    addSelectedIconToElement(userSymbolSignIcon, settings.selectedSymbol, 'symbol');
    addSelectedIconToElement(opponentSymbolSignIcon, settings.opponentSymbol, 'symbol');
}

// Transition animation for change screen from setting to game
function transitionScreen() {
    showCurrentPlayer();
    setTimeout(() => moveLeft(startGameText), 500);
    setTimeout(() => coverScreen(startScreen), 1000);
    setTimeout(() => show(gameScreen), 1400);
    setTimeout(() => moveDown(startScreen), 1800);
    setTimeout(() => hide(startScreen), 2800);
}

export function switchOpponent() {
    settings.opponent = settings.opponent === 'auto' ? 'manual' : 'auto';
    addSelectedIconToElement(switchOpponentBtnIcon, settings.opponent, 'opponent');

    if(settings.opponent === 'auto' && games.turnCount % 2 !== 0) {
        autoPlay();
    }
}

export function resetAll() {
    resetAllData();
    renderGameBoard();
    toggleDisableBtn();
    showCurrentPlayer();
    showStartScreen();
}

export function restart() {
    resetGameData();
    renderGameBoard();
    toggleDisableBtn();
    showCurrentPlayer();
    showGameScreen();
}