import {
    SET_AUTH,
    SET_TOKEN,
    SET_USER,
} from "./authActionTypes.js"

const initialState = {
    auth: false,
    token: "",
    user: {},
}

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default businessReducer
