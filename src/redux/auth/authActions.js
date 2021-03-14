import {
    SET_AUTH,
    SET_TOKEN,
    SET_USER,
} from "./authActionTypes.js";

export const setAuth = auth => {
    return {
        type: SET_AUTH,
        payload: auth
    }
}

export const setToken = token => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

