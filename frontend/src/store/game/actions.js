import * as types from './actionTypes';

export function createNewGame(gameChosen) {
    return({ type: types.CREATE_NEW_GAME, gameName: gameChosen });
}