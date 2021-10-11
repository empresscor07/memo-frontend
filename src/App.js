import {Container} from 'react-bootstrap'
import Login from "./components/Login";
import Memos from "./components/Memos";
import {createMemo, deleteMemo} from './services/memos'
import {connect} from "react-redux";
import {initiateLogin, logout} from "./modules/user";
import {initiateGetMemos} from "./modules/memos";

function App({
                 dispatch,
                 loginPending,
                 loginFailure,
                 token,
                 getMemosPending,
                 getMemosFailure,
                 memos}) {

    function handleError(error) {
        console.log(error)
    }

    function handleRequestMemos() {
        dispatch(initiateGetMemos())
    }

    function handleLoginRequest(username, password) {
        dispatch(initiateLogin({username, password}))
    }

    function handleLogoutRequest() {
        dispatch(logout())
    }

    function handleCreateMemo(memo) {
        createMemo(token, memo).then(data => data.json(), handleError).then(() => {
            handleRequestMemos()
        }, handleError).catch(handleError)
    }

    function handleDeleteMemo(memo) {
        deleteMemo(token, memo).then(data => data.json(), handleError).then(json => {
            handleRequestMemos()
        }, handleError).catch(handleError)
    }

    return (
        <Container>
            {
                token ?
                    <Memos
                        handleLogoutRequest={handleLogoutRequest}
                        handleCreateMemo={handleCreateMemo}
                        memos={memos}
                        handleDeleteMemo={handleDeleteMemo}
                    /> :
                    <Login
                        handleLoginRequest={handleLoginRequest}
                        loginPending={loginPending}
                        loginFailure={loginFailure}
                    />
            }
        </Container>
    );
}

function mapStateToProps(state) {
    return {...state.user, ...state.memos}
}

export default connect(mapStateToProps)(App);
