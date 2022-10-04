import React, { useState, useEffect } from "react";
import { Container, Row, Modal, Button, Col } from 'react-bootstrap';
import { Loader } from "../Components/loader";



export const UserEdit = (props) => {

    const { show, handleCloseUserAdd, onSumbitEditUser, errmsg, isError, isLoading, editdata } = props;
    const [user, setUserdetails] = useState({});

    useEffect(() => {
        if (editdata && editdata._id) {
            setUserdetails(editdata)
            console.log(user, "user111")
        }
    }, [editdata]);

    const handleChange = (name, value) => {
        console.log(user, "user")
        setUserdetails(
            {
                ...user,
                [name]: value
            }
        )
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => handleCloseUserAdd()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE USER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="useradd">

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Name  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Name" value={user.name}
                                    onChange={(e) => handleChange("name", e.target.value)}></input>
                            </Col>
                        </Row>
                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Email  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Email" value={user.email}
                                    onChange={(e) => handleChange("email", e.target.value)}></input>
                            </Col>
                        </Row>
                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Mobile Number  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Phone" value={user.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}></input>
                            </Col>
                        </Row>
                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Password  </label>
                            </Col>
                            <Col md={8}>
                                <input type="password" className="form-control" placeholder="Password" value={user.password}
                                    onChange={(e) => handleChange("password", e.target.value)}></input>
                            </Col>
                        </Row>
                        {isError && <Row className="form-row margin-2-res">
                            <p className="text_danger">{errmsg}</p>
                        </Row>}
                        {isLoading && <Row className="form-row margin-2-res">
                            <Loader />
                        </Row>}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => onSumbitEditUser(user)}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
