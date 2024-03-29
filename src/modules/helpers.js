// Copyright 2024 Reika Akuzawa. All rights reserved.

import { title, games, gameStatusText } from './variables.js';

export function moveLeft(item) {
    item.classList.add('move-left');
}

export function changeTitleZindex() {
    title.style.zIndex = '0';
}

export function moveDown(item) {
    item.classList.add('move-down');
    hide(title);
}

export function coverScreen(item) {
    item.classList.add('expand');
}

export function show(item) {
    item.classList.remove('hidden');
}

export function hide(item) {
    item.classList.add('hidden');
}

export function getOpponentSymbol(selectedSymbol) {
    return selectedSymbol === 'x' ? 'o' : 'x';
}

export function changeGameStatusText(player) {
    const text = player === 'user' ? 'Your turn' : 'Opponent\'s turn';
    gameStatusText.textContent = text;
}

export function getCurrentPlayer() {
    return games.turnCount % 2 === 0 ? 'user' : 'opponent';
}

export function isAutoPlaying() {
    return games.isAutoPlaying;
}

export function isGameOver() {
    if(games.turnCount >= 9 || games.winner !== ''){
        return true;
    } 
    return false;
}