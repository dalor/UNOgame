import Immutable from 'seamless-immutable';
import * as types from './actionTypes';


const initialState = Immutable({
    Logged: true,
    User: {id: '123', username: 'hitrch', games: new Map()}//undefined
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
                games : undefined
            };

            return state.merge({
                Logged: true,
                User: user
            });
        }
        case types.SET_GAMES: {
            //console.log(action.games.size)
            return state.merge({
                User: state.User.merge({
                    games: action.games
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
    return state.login.User;
}