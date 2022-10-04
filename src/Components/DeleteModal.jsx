import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export const DeleteModal = (props) => {
    const { title, show, message, handleClose, deleteModal } = props;
    console.log(show, "isDelete")
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={deleteModal}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
