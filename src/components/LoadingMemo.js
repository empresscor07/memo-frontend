import {Card, Col, Placeholder} from "react-bootstrap";

export default function LoadingMemo() {
    return (<Col xs={3} className='my-3'>
        <Card>
            <Card.Body>
                <Placeholder as={Card.Subtitle} animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/> <Placeholder xs={6}/>
                </Placeholder>
            </Card.Body>
            <Placeholder as={Card.Footer} animation="glow">
                <Placeholder xs={4}/> <Placeholder xs={3}/>
            </Placeholder>
        </Card>
    </Col>)
}