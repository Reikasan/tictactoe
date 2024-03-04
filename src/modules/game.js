import { cells } from './variables.js';
import { playGame } from './game/gameLogic.js';

// Event listener
cells.forEach((cell) => {
    cell.addEventListener('click', () => playGame(cell));
});