import * as types from "../game/actionTypes";

export default function reduce(state = {}, action = {}) {

    switch (action.type) {
        case types.JOIN_GAME: {
            console.log('Action',action.game);
            return {
                CurrentGame: action.game
            }
        }
        default:
            return state;
    }
}
export function getGame(state) {
    console.log('sate', state.game.CurrentGame);
    return state.game.CurrentGame ? state.game.CurrentGame : null;
}
export function getNowPlayer(state) {
    return state.game.CurrentGame ? state.game.CurrentGame.players[state.game.CurrentGame.now || 0] : null;
}