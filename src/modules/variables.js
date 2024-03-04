// Cursor
export const cursor = document.querySelector('.cursor');
export const normalCursor = cursor.querySelector('.cursor--normal');
export const pointerCursor = cursor.querySelector('.cursor--pointer');
export const hoverEffectElements = document.querySelectorAll('.pointer');
export let msPos = {
    x: document.documentElement.clientWidth / 2,
    y: document.documentElement.clientHeight / 2
};

// Settings
export const startScreen = document.querySelector('.screen--start');
export const opponentBtns = startScreen.querySelectorAll('.opponent-btn');
export const symbolBtns = startScreen.querySelectorAll('.symbol-btn');
export const backToOpponentBtn = startScreen.querySelector('.back-btn--opponent');
export const selectOpponentSection = startScreen.querySelector('.select--opponent');
export const selectSymbolSection = startScreen.querySelector('.select--symbol');
export const startGameText = startScreen.querySelector('.start-game');
export let settings = {
    opponent: '',
    selectedSymbol: '',
    opponentSymbol: ''
};

// Game
export let games = {
    turnCount: 0,
    gameBoard: [null, null, null, null, null, null, null, null, null],
    history: [],
    winner: '',
    winningComb: []
};
export const gameScreen = document.querySelector('.screen--game');
export const gameStatusText = gameScreen.querySelector('.game-status__text');
export const gameStatusError = gameScreen.querySelector('.game-status__text--error');
export const userSymbolSign = gameScreen.querySelector('.sign--user');
export const userSymbolSignIcon = userSymbolSign.querySelector('i');
export const opponentSymbolSign = gameScreen.querySelector('.sign--opponent');
export const opponentSymbolSignIcon = opponentSymbolSign.querySelector('i');
export const switchOpponentBtn = gameScreen.querySelector('.switch-opponent-btn');
export const switchOpponentBtnIcon = switchOpponentBtn.querySelector('i');
export const cells = gameScreen.querySelectorAll('.board__cell');
export const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8], 
                [0, 4, 8], [2, 4, 6]
            ];

// Result
export const resultScreen = document.querySelector('.screen--result');
export const resultText = resultScreen.querySelector('.result__text');
export const resultMessage = resultScreen.querySelector('.result__message');

// Buttons
export const allResetBtns = document.querySelectorAll('.reset-btn--all');
export const gameResetBtns = document.querySelectorAll('.reset-btn--game');

// Helper
export const title = document.querySelector('.title');
export const iconX = 'fa-xmark';
export const iconO = 'fa-o';
export const iconPerson = 'fa-person';
export const iconComputer = 'fa-computer';