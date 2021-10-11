import {Button, Row, Col, Toast, ToastContainer} from 'react-bootstrap'
import {useEffect, useState} from "react";
import NewMemo from './NewMemo'
import Memo from "./Memo";
import LoadingMemo from "./LoadingMemo";

function Memos({handleLogoutRequest, handleCreateMemo, memos, handleDeleteMemo, getMemosPending, getMemosFailure}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showError, setShowError] = useState(getMemosFailure);

    useEffect(() => {
        if (getMemosFailure) {
            setShowError(true)
        }
    }, [getMemosFailure])

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
                    memos && !getMemosPending ?
                        memos.map((memo, idx) => <Memo key={idx} memo={memo} handleDeleteMemo={handleDeleteMemo}/>) :
                        <h2>Loading...</h2>
                }
            </Row>
            <ToastContainer className="p-3" position='bottom-end'>
                <Toast bg='danger' onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error retrieving memos</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default Memos;