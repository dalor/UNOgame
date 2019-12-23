import * as types from "../game/actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
    CurrentGame: null
});

export default function reduce(state = initialState, action = {}) {

    switch (action.type) {
        case types.JOIN_GAME: {
            console.log('Action',action.game);
            // /*let game = {
            //     name: action.game.name,
            //     creator: action.game.creator,
            //     users: action.game.users,
            // }
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
    console.log('sate',state.game.CurrentGame);
    return state.game.CurrentGame ? state.game.CurrentGame : null;
}
export function getNowPlayer(state) {
    return state.game.CurrentGame ? state.game.CurrentGame.players[state.game.CurrentGame.now || 0] : null;
}