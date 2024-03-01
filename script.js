// Start Screen
const startScreen = document.querySelector('.screen--start');
const opponentBtns = startScreen.querySelectorAll('.opponent-btn');
const symbolBtns = startScreen.querySelectorAll('.symbol-btn');
const backToOpponentBtn = startScreen.querySelector('.back--opponent');
const selectOpponentSection = startScreen.querySelector('.select--opponent');
const selectSymbolSection = startScreen.querySelector('.select--symbol');
const startGameText = startScreen.querySelector('.start-game');

// Game Screen
const gameScreen = document.querySelector('.screen--game');

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

function selectAndShowNextQuestion(e, item, btn) {
    e.preventDefault();
    
    if(item === 'opponent') {
        const opponent = btn.dataset.opponent;
        hide(selectOpponentSection);
        show(selectSymbolSection);
    } else if(item === 'symbol') {
        const symbol = btn.dataset.symbol;
        hide(selectSymbolSection);
        show(startGameText);

        transitionScreen();    
    } 
}

function transitionScreen() {
    setTimeout(() => moveLeft(startGameText), 500);
    setTimeout(() => coverScreen(startScreen), 1000);
    setTimeout(() => moveDown(startScreen), 1800);
    setTimeout(() => show(gameScreen), 1400);
}

function moveLeft(item) {
    item.classList.add('move-left');
}

function moveDown(item) {
    item.classList.add('move-down');
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