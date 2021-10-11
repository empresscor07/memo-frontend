import {Row, Col, Form, Button, Alert} from 'react-bootstrap'
import {useState} from "react";

function Login({handleLoginRequest, loginPending, loginFailure}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(event) {
        event.preventDefault()
        console.log({username, password})
        handleLoginRequest(username, password)
    }

    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    return (
        <>
            <Row className='mt-3'><Col><h2>Please Login</h2></Col></Row>
            <Row>
                <Col>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User name</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" onChange={onUsernameChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={onPasswordChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loginPending}>
                            {loginPending ? 'Logging in...' : 'Submit'}
                        </Button>
                    </Form>
                </Col>
            </Row>
            {loginFailure && <Row className='mt-3'><Col>
                <Alert variant='danger'>Invalid Login</Alert>
            </Col></Row>}
        </>
    );
}

export default Login;
