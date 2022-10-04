import React, { useEffect, } from "react";
import {
    useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userList } from "../_Actions/authactions";
import { Card, Row, Col, Container } from 'react-bootstrap';


export const User = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(userList({ _id: id }));
    }, [])

    let userdata = user.userData && user.userData.docs && user.userData.docs.length > 0 ? user.userData.docs[0] : {};
    console.log(userdata, "userdata", user);
    return (
        <>
            {/* Hello world */}
            <section className="bg-light">
                <Container >
                    <Row >
                        <Col lg={12} className="mb-4 mb-sm-5">
                            <Card className=" card-style1 border-0">
                                <Card.Body className="p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                    <Row className="align-items-center">
                                        <Col lg={6} className="mb-4 mb-lg-0">
                                            {/* <img
                                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                alt="..."
                                            /> */}
                                        </Col>
                                        <Col lg={6} className="px-xl-10">
                                            <Container className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                <h3 className="h2 text-white mb-0">{userdata.name}</h3>
                                            </Container>
                                            <ul className="list-unstyled mb-1-9">
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2 font-weight-600">
                                                        Type:
                                                    </span>{" "}
                                                    {userdata.role == 3 && "Seller"}
                                                    {userdata.role == 1 && "Admin"}
                                                    {userdata.role == 2 && "Customer"}
                                                </li>

                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2 font-weight-600">
                                                        Email:
                                                    </span>{" "}
                                                    {userdata.email}
                                                </li>

                                                <li className="display-28">
                                                    <span className="display-26 text-secondary me-2 font-weight-600">
                                                        Phone:
                                                    </span>{" "}
                                                    {userdata.phone}
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    )
}
