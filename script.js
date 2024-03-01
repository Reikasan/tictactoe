const startScreen = document.querySelector('.screen--start');
const opponentBtns = startScreen.querySelectorAll('.opponent-btn');
const symbolBtns = startScreen.querySelectorAll('.symbol-btn');
const backToOpponentBtn = startScreen.querySelector('.back--opponent');
const selectOpponentSection = startScreen.querySelector('.select--opponent');
const selectSymbolSection = startScreen.querySelector('.select--symbol');
const startGameText = startScreen.querySelector('.start-game');

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
        selectOpponentSection.classList.add('hidden');
        selectSymbolSection.classList.remove('hidden');
    } else if(item === 'symbol') {
        const symbol = btn.dataset.symbol;
        selectSymbolSection.classList.add('hidden');
        startGameText.classList.remove('hidden');

        transitionScreen();    
    } 
}

function transitionScreen() {
    setTimeout(() => moveLeft(startGameText), 800);
    setTimeout(() => coverScreen(startScreen), 1600);
}

function moveLeft(item) {
    item.classList.add('move-left');
}

function coverScreen(item) {
    item.classList.add('expand');
}