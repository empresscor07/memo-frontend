import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function NewMemo({show, handleClose, handleCreateMemo}) {
    const [content, setMemoText] = useState('');
    const [memoTags, setTags] = useState('');

    function handleSubmit(event) {
        event.preventDefault()
        const tags = memoTags.split(',')
        handleClose()
        handleCreateMemo({content, tags})
    }

    function handleTextChange(event) {
        setMemoText(event.target.value)
    }

    function handleTagsChange(event) {
        setTags(event.target.value)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Memo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Memo text</Form.Label>
                        <Form.Control type="text" placeholder="Enter your memo's text" onChange={handleTextChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" placeholder="Tag1,Tag2,..." onChange={handleTagsChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}