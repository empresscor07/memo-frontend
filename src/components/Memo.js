import {Badge, Card, CloseButton, Col, Row} from "react-bootstrap";

export default function Memo({memo, handleDeleteMemo}) {
    const raw_tags = memo ? (memo.tags ? memo.tags : []) : []
    const tags = raw_tags.filter(tag => tag.length > 0)

    function memo_date(memo) {
        const date = new Date(memo.create_timestamp);
        return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
    }

    return (<Col xs={3} className='my-3'>
        <Card>
            <Card.Body>
                <Card.Subtitle><Row>
                    <Col>{memo_date(memo)}</Col>
                    <Col xs='auto'><CloseButton onClick={() => handleDeleteMemo(memo)}/></Col>
                </Row></Card.Subtitle>
                <Card.Text>{memo.content}</Card.Text>
            </Card.Body>
            {
                tags.length > 0 &&
                <Card.Footer><Row>
                    {tags.map((tag, idx) => <Col xs='auto' key={idx}><Badge>{tag}</Badge></Col>)}
                </Row></Card.Footer>
            }
        </Card>
    </Col>)
}