import Immutable from 'seamless-immutable';
import * as types from './actionTypes';


const initialState = Immutable({
    Logged: true,
    User: {id: '123', first_name: 'dolboeb', last_name: 'petia', username: 'hitrch', available_games: []}//undefined
});

export default function reduce(state = initialState, action = {}) {

    switch (action.type) {
        case types.LOGGED_IN: {

            let user = {
                id : action.user.id,
                first_name : action.user.first_name,
                last_name : action.user.last_name,
                username : action.user.username,
                photo_url :  action.user.photo_url,
                available_games: []
            };

            return state.merge({
                Logged: true,
                User: user
            });
        }
        case types.SET_GAMES: {
            return state.merge({
                User: state.User.merge({
                    available_games: action.games
                })
            });
        }
        default:{
            return state;
        }

    }
}

//selectors

export  function isLogged(state) {
    return state.login.Logged;
}

export function getUser(state) {
    return state.login.User ? state.login.User: null;
}