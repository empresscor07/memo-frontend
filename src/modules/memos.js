import {requestMemos} from "../services/memos";

// Actions
const GET_MEMOS_REQUEST = 'memos/memos/GET_MEMOS_REQUEST'
const GET_MEMOS_SUCCESS = 'memos/memos/GET_MEMOS_SUCCESS'
const GET_MEMOS_FAILURE = 'memos/memos/GET_MEMOS_FAILURE'

// Reducer
const initialState = {
    getMemosPending: false,
    getMemosFailure: false,
    memos: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MEMOS_REQUEST:
            return {...state, getMemosPending: true}

        case GET_MEMOS_SUCCESS:
            return {
                ...state,
                getMemosPending: false,
                getMemosFailure: false,
                memos: action.memos
            }

        case GET_MEMOS_FAILURE:
            return {
                ...state,
                getMemosPending: false,
                getMemosFailure: true
            }

        default:
            return state
    }
}

// Action Creators
export function getMemosRequest() {
    return {type: GET_MEMOS_REQUEST}
}

export function getMemosSuccess(memos) {
    return {
        type: GET_MEMOS_SUCCESS,
        memos: memos
    }
}

export function getMemosFailure() {
    return {type: GET_MEMOS_FAILURE}
}

// Side Effects
export function initiateGetMemos() {
    return function getMemos(dispatch, getState) {
        dispatch(getMemosRequest())
        requestMemos(getState().user.token).then(response => {
            if (!response.ok) {
                dispatch(getMemosFailure())
                return
            }

            response.json().then(json => {
                if (!json.memo_list) {
                    dispatch(getMemosFailure())
                    return
                }

                dispatch(getMemosSuccess(json.memo_list))
            })
        })
    }
}