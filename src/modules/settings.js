import { hide, show, moveLeft, coverScreen, moveDown, addSelectedIcon, getOpponentSymbol } from './helpers.js';

// Start Screen
export const startScreen = document.querySelector('.screen--start');
export const opponentBtns = startScreen.querySelectorAll('.opponent-btn');
export const symbolBtns = startScreen.querySelectorAll('.symbol-btn');
export const backToOpponentBtn = startScreen.querySelector('.back--opponent');
export const selectOpponentSection = startScreen.querySelector('.select--opponent');
export const selectSymbolSection = startScreen.querySelector('.select--symbol');
const startGameText = startScreen.querySelector('.start-game');
export const gameScreen = document.querySelector('.screen--game');
export let opponent = 'auto';
export let selectedSymbol = 'x';
export let opponentSymbol = 'o';
export const userSymbolSign = gameScreen.querySelector('.sign--user');
const userSymbolSignIcon = userSymbolSign.querySelector('i');
export const opponentSymbolSign = gameScreen.querySelector('.sign--opponent');
const opponentSymbolSignIcon = opponentSymbolSign.querySelector('i');
export const switchOpponentBtn = gameScreen.querySelector('.switch-opponent-btn');
const switchOpponentBtnIcon = switchOpponentBtn.querySelector('i');
const gameStatusText = gameScreen.querySelector('.game-status__text');
export let settings = {
    turnCount: 0
};

// Event listeners
opponentBtns.forEach(btn => {
    btn.addEventListener('click', (e) => selectAndShowNextQuestion(e, 'opponent', btn));
});

symbolBtns.forEach(btn => {
    btn.addEventListener('click', (e) => selectAndShowNextQuestion(e, 'symbol', btn));
});

backToOpponentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selectSymbolSection.classList.add('hidden');
    selectOpponentSection.classList.remove('hidden');
});

// export function selectAndShowNextQuestion(item, btn) {
export function selectAndShowNextQuestion(e, item, btn) {
    e.preventDefault();
    
    // First question
    if(item === 'opponent') {
        opponent = btn.dataset.opponent;
        
        hide(selectOpponentSection);
        show(selectSymbolSection);

        addSelectedIcon(switchOpponentBtnIcon, opponent);
    
    // Second question
    } else if(item === 'symbol') {
        selectedSymbol = btn.dataset.symbol;
        
        // Execute "start game" text animation
        hide(selectSymbolSection);
        show(startGameText);
        
        // Add selected icon to game screen
        setIconForPlayerSigns();

        checkPlayer(settings.turnCount);   
        transitionScreen(); 
    } 
}

function setIconForPlayerSigns(selectedUserSymbol) {
    opponentSymbol = getOpponentSymbol(selectedSymbol);

    addSelectedIcon(userSymbolSignIcon, selectedSymbol);
    addSelectedIcon(opponentSymbolSignIcon, opponentSymbol);
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