import * as types from "../game/actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
    CurrentGame: null
});

export default function reduce(state = initialState, action = {}) {

    switch (action.type) {
        case types.JOIN_GAME: {
            console.log('Action1',action.game);
            let g = action.game;
            return state.merge({
            CurrentGame: g
            });
        }
        case types.START_GAME: {
            //console.log('Action2',action.game);
            return state.merge({
            CurrentGame: action.game
            });
        }
        default:
            return state;
    }
}
//selectors
export function getGame(state) {
    //console.log('Current game',state.game.CurrentGame);
    return state.game.CurrentGame ? state.game.CurrentGame : null;
}
export function getNowPlayer(state) {
    //console.log('Current game',state.game.CurrentGame);
    return state.game.CurrentGame ? state.game.CurrentGame.players[state.game.CurrentGame.now || 0] : null;
}