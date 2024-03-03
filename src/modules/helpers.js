const title = document.querySelector('.title');

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
        element.classList.add('fa-xmark');
    } else if(icon === 'o') {
        element.classList.add('fa-o');
    } else if(icon === 'manual') {
        element.classList.add('fa-person');
    } else if(icon === 'auto') {
        element.classList.add('fa-computer');
    }
}

function getOpponentSymbol(selectedSymbol) {
    return selectedSymbol === 'x' ? 'o' : 'x';
}

export {moveLeft, moveDown, coverScreen, show, hide, addSelectedIconToElement, getOpponentSymbol};

