import {Button, Row, Col} from 'react-bootstrap'
import {useState} from "react";
import NewMemo from './NewMemo'
import Memo from "./Memo";
import LoadingMemo from "./LoadingMemo";

function Memos({handleLogoutRequest, handleCreateMemo, memos, handleDeleteMemo}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <NewMemo show={show} handleClose={handleClose} handleCreateMemo={handleCreateMemo}/>
            <Row className='mt-3'>
                <Col><h1>Welcome</h1></Col>
                <Col xs='auto'><Button onClick={handleShow}>New</Button></Col>
                <Col xs='auto'><Button variant="outline-primary" onClick={handleLogoutRequest}>Logout</Button></Col>
            </Row>
            <Row>
                {
                    memos ?
                        memos.map((memo, idx) => <Memo key={idx} memo={memo} handleDeleteMemo={handleDeleteMemo}/>) :
                        <LoadingMemo/>
                }
            </Row>
        </>
    )
}

export default Memos;