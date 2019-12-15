import * as types from "../game/actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
    CurrentGame: undefined
});

export default function reduce(state = initialState, action = {}) {

    switch (action.type) {
        case types.CREATE_NEW_GAME: {
            let game = {
                name: action.gameName
            };

            return state.merge({
                CurrentGame: game
            });
        }
        default:
            return state;
    }
}
//selectors
export function getGame(state) {
    return state.game.CurrentGame;
}