import { title } from './variables.js';

export function moveLeft(item) {
    item.classList.add('move-left');
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