// Copyright 2024 Reika Akuzawa. All rights reserved.

import { games, settings } from './../variables.js';

export function addPlayerMoveToBoardArray(cellIndex, symbol) {
    games.gameBoard[cellIndex] = symbol;
}

export function declareWinner() {
    games.winner = games.turnCount % 2 === 0 ? 'user' : 'opponent';
}

export function saveGameHistory() {
    let copy = JSON.parse(JSON.stringify(games.gameBoard));
    games.history.push(copy);
}

export function resetAllData() {
    settings.opponent = '';
    settings.selectedSymbol = '';
    settings.opponentSymbol = '';
    games.turnCount = 0;
    games.gameBoard = [null, null, null, null, null, null, null, null, null];
    games.history = [
        [null, null, null, null, null, null, null, null, null],
    ];
    games.winner = '';
    games.winningComb = [];
}

export function resetGameData() {
    games.turnCount = 0;
    games.gameBoard = [null, null, null, null, null, null, null, null, null];
    games.history = [
        [null, null, null, null, null, null, null, null, null],
    ];
    games.winner = '';
    games.winningComb = [];
}