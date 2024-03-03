import {opponent, selectedSymbol, opponentSymbol, gameScreen, userSymbolSign, opponentSymbolSign, settings, checkPlayer} from './settings.js';
import {hide, show, moveLeft, coverScreen, moveDown, addSelectedIconToElement} from './helpers.js';

let gameBoard = [null, null, null, null, null, null, null, null, null];
const gameStatusError = gameScreen.querySelector('.game-status__text--error');
const cells = gameScreen.querySelectorAll('.board__cell');
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

cells.forEach((cell) => {
    const cellIconElement = cell.querySelector('i');
    cell.addEventListener('click', () => {
        console.log('turn count', settings.turnCount);
        // User's turn
        if(settings.turnCount % 2 === 0) {
            if(!userPlay(cell.dataset.index, selectedSymbol, cellIconElement)) {
                return;
            }
            
        // Opponent's turn
        } else {
            if(!userPlay(cell.dataset.index, opponentSymbol, cellIconElement)) {
                return;
            }
        }
        console.log(gameBoard);
    });
});

function userPlay(cellIndex, symbol, cellIconElement) {
    console.log('user play');
    if(!addMoveToBoard(cellIndex, symbol, cellIconElement)) {
        return false;
    }

    settings.turnCount += 1;

    if(settings.turnCount >= 5) {
        checkWinner();
    }
    checkPlayer(settings.turnCount);

    if(opponent === 'auto') {
        console.log(settings.turnCount, 'auto play');
        const result = setTimeout(autoPlay, 1000);
        if(!result) {
            return false;
        }
    }
    return true;
}

function addMoveToBoard(cellIndex, symbol, cellIconElement) {
    if(isPlayerSelectedEmptyCell(cellIndex)) {
        console.log(cellIndex, 'is empty');
        addPlayerMoveToBoardArray(cellIndex, symbol);
        addSelectedIconToElement(cellIconElement, symbol);
        hide(gameStatusError);
        return true;
    } else {
        show(gameStatusError);
        console.log(cellIndex, 'is not empty' , symbol, 'cannot be placed there')
        return false;
    }
}

function isPlayerSelectedEmptyCell(cellIndex) {
    console.log(gameBoard[cellIndex] === null);
    return gameBoard[cellIndex] === null;
}

function addPlayerMoveToBoardArray(cellIndex, symbol) {
    gameBoard[cellIndex] = symbol;
}

function checkWinner() {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            console.log('winner');
        }
    });
}

function autoPlay() {
    console.log(settings.turnCount, 'in auto play function');

    let cellIndex = computeNextMoveIndex(settings.turnCount);

console.log('auto play cell is ', cellIndex);
    const cellIconElement = cells[cellIndex].querySelector('i');
    addMoveToBoard(cellIndex, opponentSymbol, cellIconElement);
    settings.turnCount += 1;

    if(settings.turnCount >= 5) {
        checkWinner();
    }
    checkPlayer(settings.turnCount);
    return true;
}

function isNextMoveDefence() {
    const no = Math.floor(Math.random() * 2);
    console.log('no', no);
    return no === 0 ? true : false;
    // if(Math.floor(Math.random() * 1) === 0) {
//         return true;
//     }
//     return false;
}

function getRandomEmptyCellIndex() {
    let emptyCells = gameBoard.map((value, index) => value === null ? index : -1)
                            .filter(index => index  !== -1);
    console.log('empty cells', emptyCells);
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

function computeNextMoveIndex(turnCount) {
    if(turnCount === 1) {
        return getRandomEmptyCellIndex();
    } else {
    let index = null;
        if(isNextMoveDefence()) {
            console.log('defence move');
            index = indexForDefenceMove();
    console.log('defence move index', index);

            if(index === null) {
                console.log('no defence move');
                return indexForAttackMove() !== null ? indexForAttackMove() : getRandomEmptyCellIndex();
            }
            console.log('index', index);
            return index;

        } else {
            index = indexForAttackMove();

            if(index === null) {
                return indexForDefenceMove() !== null ? indexForDefenceMove() : getRandomEmptyCellIndex();
            }
            return index;
        }  
    }
}

function indexForDefenceMove() {
    const indexNo = checkForWinningMove(selectedSymbol);
    console.log('index for defence move', indexNo);
    return indexNo;
}

function indexForAttackMove() {
    const indexNo = checkForWinningMove(opponentSymbol);
    console.log('index for attack move', indexNo);
    return indexNo;
}

function checkForWinningMove(symbol) {
    let key = null;
    const index = winningCombos.find((combo) => {
        const [a, b, c] = combo;
        if(gameBoard[a] === symbol) {
            if(gameBoard[a] === gameBoard[b] && gameBoard[c] === null) {
                console.log('winning move is c');
                return key = 2;
            }
            if(gameBoard[a] === gameBoard[c] && gameBoard[b] === null) {
                console.log('winning move is b');
                
                return key = 1;
            }
        } else if(gameBoard[b] === symbol) {
            if(gameBoard[b] === gameBoard[c] && gameBoard[a] === null) {
                console.log('winning move is a');
                return key = 0;
            }
        }
        return null;
    });
    if(index === undefined) {
        return null;
    }
    return index[key];
}