import {requestMemos, createMemo} from "../services/memos";

// Actions
const GET_MEMOS_REQUEST = 'memos/memos/GET_MEMOS_REQUEST'
const GET_MEMOS_SUCCESS = 'memos/memos/GET_MEMOS_SUCCESS'
const GET_MEMOS_FAILURE = 'memos/memos/GET_MEMOS_FAILURE'

const CREATE_MEMO_REQUEST = 'memos/memos/CREATE_MEMO_REQUEST'
const CREATE_MEMO_SUCCESS = 'memos/memos/CREATE_MEMO_SUCCESS'
const CREATE_MEMO_FAILURE = 'memos/memos/CREATE_MEMO_FAILURE'

// Reducer
const initialState = {
    getMemosPending: false,
    getMemosFailure: false,
    memos: [],
    createMemoPending: false,
    createMemoFailure: false,
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

        case CREATE_MEMO_REQUEST:
            return {...state, createMemoPending: true}

        case CREATE_MEMO_SUCCESS:
            return {
                ...state,
                createMemoPending: false,
                createMemoFailure: false
            }

        case CREATE_MEMO_FAILURE:
            return {
                ...state,
                createMemoPending: false,
                createMemoFailure: true
            }

        default:
            return state
    }
}

// Action Creators
function getMemosRequest() {
    return {type: GET_MEMOS_REQUEST}
}

function getMemosSuccess(memos) {
    return {
        type: GET_MEMOS_SUCCESS,
        memos: memos
    }
}

function getMemosFailure() {
    return {type: GET_MEMOS_FAILURE}
}

function createMemoRequest() {
    return {type: CREATE_MEMO_REQUEST}
}

function createMemoSuccess() {
    return {type: CREATE_MEMO_SUCCESS}
}

function createMemoFailure() {
    return {type: CREATE_MEMO_FAILURE}
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

export function initiateCreateMemo(memo) {
    return function createMemoDispatcher(dispatch, getState) {
        dispatch(createMemoRequest())
        createMemo(getState().user.token, memo).then(response => {
            if (!response.ok) {
                dispatch(createMemoFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    dispatch(createMemoFailure())
                    return
                }

                if (json.message !== 'created') {
                    dispatch(createMemoFailure())
                    return
                }

                dispatch(createMemoSuccess())
                dispatch(initiateGetMemos())
            })
        })
    }
}