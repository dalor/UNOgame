import * as types from './actionTypes';

export function createNewGame(gameChosen, host) {
    return({ type: types.CREATE_NEW_GAME, gameName: gameChosen, creator: host });
}