// Copyright 2024 Reika Akuzawa. All rights reserved.

import { opponentBtns, symbolBtns, backToOpponentBtn, cells, switchOpponentBtn, allResetBtns, gameResetBtns, stepBackBtns } from './variables.js';
import { selectAndShowNextQuestion, resetAll, restart, switchOpponent } from './game/gameSetting.js';
import { playGame, stepBack } from './game/gameLogic.js';
import { backToOpponentSection } from './game/gameUI.js';

// Event listeners for start screen
opponentBtns.forEach(btn => {
    btn.addEventListener('click', () => selectAndShowNextQuestion('opponent', btn));
});

symbolBtns.forEach(btn => {
    btn.addEventListener('click', () => selectAndShowNextQuestion('symbol', btn));
});

backToOpponentBtn.addEventListener('click', () => backToOpponentSection()); 

// Event listener for game screen
cells.forEach((cell) => {
    cell.addEventListener('click', () => playGame(cell));
});

stepBackBtns.forEach((btn) => {
    btn.addEventListener('click', () => stepBack(btn.dataset.player));
});

switchOpponentBtn.addEventListener('click', switchOpponent);

allResetBtns.forEach((btn) => {
    btn.addEventListener('click', () => resetAll());
});

gameResetBtns.forEach((btn) => {
    btn.addEventListener('click', () => restart());
});

