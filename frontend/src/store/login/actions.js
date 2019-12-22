import * as types from './actionTypes';

export function logIn(user) {
    return({ type: types.LOGGED_IN, user: user });
}

export function setUser(user) {
    return({ type: types.SET_GAMES, games: user.games });
}