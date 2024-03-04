import { title, iconX, iconO, iconPerson, iconComputer } from './variables.js';

function moveLeft(item) {
    item.classList.add('move-left');
}

function moveDown(item) {
    item.classList.add('move-down');
    hide(title);
}

function coverScreen(item) {
    item.classList.add('expand');
}

function show(item) {
    item.classList.remove('hidden');
}

function hide(item) {
    item.classList.add('hidden');
}

function addSelectedIconToElement(element, icon) {
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
    }
}

function addSelectedIcon(element, iconClass) {
    element.classList.add(iconClass);
}

function removeIconClass(element, iconClass) {
    element.classList.remove(iconClass);
}

function getOpponentSymbol(selectedSymbol) {
    return selectedSymbol === 'x' ? 'o' : 'x';
}

export {moveLeft, moveDown, coverScreen, show, hide, addSelectedIconToElement, getOpponentSymbol};

