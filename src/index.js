import * as Cursor from './modules/cursor.js';
import * as Settings from './modules/settings.js';

// Event listeners for the settings section
Settings.opponentBtns.forEach(btn => {
    btn.addEventListener('click', (e) => Settings.selectAndShowNextQuestion(e, 'opponent', btn));
});

Settings.symbolBtns.forEach(btn => {
    btn.addEventListener('click', (e) => Settings.selectAndShowNextQuestion(e, 'symbol', btn));
});

Settings.backToOpponentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    Settings.selectSymbolSection.classList.add('hidden');
    Settings.selectOpponentSection.classList.remove('hidden');
});

