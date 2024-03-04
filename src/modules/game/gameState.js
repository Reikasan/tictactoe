import { games } from './../variables.js';

export function addPlayerMoveToBoardArray(cellIndex, symbol) {
    games.gameBoard[cellIndex] = symbol;
}

export function declareWinner() {
    games.winner = games.turnCount % 2 === 0 ? 'user' : 'opponent';
}

export function saveGameHistory() {
    let copy = JSON.parse(JSON.stringify(games.gameBoard));
    games.history.push(copy);
    console.log(games.history);
}