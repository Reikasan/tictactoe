import { opponentBtns, symbolBtns, backToOpponentBtn, cells, games, allResetBtns, gameResetBtns } from './variables.js';
import { selectAndShowNextQuestion } from './settings.js';
import { playGame, resetAll, restart } from './game/gameLogic.js';

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

// backStepBtn.addEventListener('click', () => {
//     console.log('clicked back-btn');
//     games.gameBoard = games.history[games.history.length - 1];
//     console.log(games.gameBoard);
// });

allResetBtns.forEach((btn) => {
    btn.addEventListener('click', () => resetAll());
});

gameResetBtns.forEach((btn) => {
    btn.addEventListener('click', () => restart());
});

