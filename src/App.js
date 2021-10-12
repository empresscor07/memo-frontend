import {Container} from 'react-bootstrap'
import Login from "./components/Login";
import Memos from "./components/Memos";
import {connect} from "react-redux";
import {initiateLogin, logout} from "./modules/user";
import {initiateCreateMemo, initiateDeleteMemo} from "./modules/memos";

function App({
                 dispatch,
                 loginPending,
                 loginFailure,
                 token,
                 getMemosPending,
                 getMemosFailure,
                 memos,
                 createMemoPending,
                 createMemoFailure,
                 deleteMemoFailure,
                 deleteMemoPending}) {
    return (
        <Container>
            {
                token ?
                    <Memos
                        handleLogoutRequest={() => dispatch(logout())}
                        handleCreateMemo={memo => dispatch(initiateCreateMemo(memo))}
                        memos={memos}
                        handleDeleteMemo={memo => dispatch(initiateDeleteMemo(memo))}
                        getMemosPending={getMemosPending}
                        getMemosFailure={getMemosFailure}
                        createMemoPending={createMemoPending}
                        createMemoFailure={createMemoFailure}
                        deleteMemoPending={deleteMemoPending}
                        deleteMemoFailure={deleteMemoFailure}
                    /> :
                    <Login
                        handleLoginRequest={(username, password) => dispatch(initiateLogin({username, password}))}
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
