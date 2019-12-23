import * as types from './actionTypes';

export function joinGame(gameChosen) {
    return({ type: types.JOIN_GAME, game: gameChosen});
}