import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export const Confirmation = (props) => {

    const { openModal, setcloseModal, saveAttribute } = props;

    return (
        <>
            <Modal
                animationDirection='top'
                show={openModal}
                tabIndex='-1'
                setShow={setcloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Are you sure to continue ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-9'>
                            <p>Confirm this ? You can't make any changes after save</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={saveAttribute} >Yes</Button>
                    <Button variant="primary" onClick={setcloseModal}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

