import * as types from "../game/actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
    CurrentGame: undefined
});

export default function reduce(state = initialState, action = {}) {

    switch (action.type) {
        case types.CONTINUE_GAME: {
            /*let game = {
                name: action.game.name,
                creator: action.game.creator,
                users: action.game.users,
                lastCard: undefined
            };*/


            return state.merge({
                CurrentGame: action.gameChosen
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