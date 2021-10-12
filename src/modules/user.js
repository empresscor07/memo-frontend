import {requestLogin} from "../services/user";
import {initiateGetMemos} from "./memos";

// Actions
const LOGIN_REQUEST = 'memos/user/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'memos/user/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'memos/user/LOGIN_FAILURE'

const LOGOUT = 'memos/user/LOGOUT'

// Reducer
const initialState = {
    loginPending: false,
    loginFailure: false,
    token: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginPending: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginPending: false,
                loginFailure: false,
                token: action.token
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loginPending: false,
                loginFailure: true
            }

        case LOGOUT:
            return {
                ...state,
                token: ''
            }

        default:
            return state
    }
}

// Action Creators
export function loginRequest() {
    return {type: LOGIN_REQUEST}
}

export function loginSuccess(token) {
    return {type: LOGIN_SUCCESS, token: token}
}

export function loginFailure() {
    return {type: LOGIN_FAILURE}
}

export function logout() {
    return {type: LOGOUT}
}

// Side Effects
export function initiateLogin(credentials) {
    return function login(dispatch) {
        dispatch(loginRequest())
        requestLogin(credentials).then(response => {
            if (!response.ok) {
                dispatch(loginFailure())
                return
            }

            response.json().then(data => {
                if (!data.token) {
                    dispatch(loginFailure())
                    return
                }

                dispatch(loginSuccess(data.token))
                dispatch(initiateGetMemos())
            }, () => dispatch(loginFailure()))
        }, () => dispatch(loginFailure()))
    }
}