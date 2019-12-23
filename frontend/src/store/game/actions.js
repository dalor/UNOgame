import * as types from './actionTypes';

export function continueGame(gameChosen) {
    return({ type: types.CONTINUE_GAME, game: gameChosen});
}