import { opponentBtns, symbolBtns, backToOpponentBtn, cells, switchOpponentBtn, allResetBtns, gameResetBtns, stepBackBtn } from './variables.js';
import { selectAndShowNextQuestion } from './settings.js';
import { playGame, stepBack, resetAll, restart, switchOpponent } from './game/gameLogic.js';

// Event listeners for start screen
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

// Event listener for game screen
cells.forEach((cell) => {
    cell.addEventListener('click', () => playGame(cell));
});

// stepBackBtn.addEventListener('click', () => stepBack());

switchOpponentBtn.addEventListener('click', switchOpponent);

allResetBtns.forEach((btn) => {
    btn.addEventListener('click', () => resetAll());
});

gameResetBtns.forEach((btn) => {
    btn.addEventListener('click', () => restart());
});

