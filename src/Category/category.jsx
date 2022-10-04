import React, { useEffect, } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from "../_Actions/categoryactions";
import {
    Card,
    Container,
    Row,
    Table,
    Col
} from 'react-bootstrap';
import image1 from '../_Images/galleryvector.png';


export const Category = () => {

    const styleObj = {
        TextAlign: "center",
        color: 'red'
    }

    let { id } = useParams();
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    useEffect(() => {
        dispatch(categoryList({ _id: id }));
    }, [])

    const subcategories = (chids) => {
        console.log(chids, "childs")
        let childsArray = [];
        for (let subcategory of chids) {
            childsArray.push(
                <tr>
                    <td>{subcategory.image ? <img className="category_image" src={subcategory.image} /> : <img src={image1} className="category_image"></img>}</td>
                    <td>{
                        subcategory.name
                    }</td>
                </tr>
            )
        }
        return childsArray;
    }

    const rendermobilebanners = (banners) => {
        let myarray = [];
        for (let i = 0; i < banners.length; i++) {
            myarray.push(
                <Col md={4}>
                    <img className="category_banner"
                        src={
                            banners[i]
                        } />
                </Col>
            )
        }
        return myarray;
    }

    const renderwebbanners = (banners) => {
        let myarray = [];
        for (let i = 0; i < banners.length; i++) {
            myarray.push(
                <Col md={4}>
                    <img className="category_banner"
                        src={
                            banners[i]
                        } />
                </Col>
            )
        }
        return myarray;
    }


    let categoryfullData = category.categoryfullData && category.categoryfullData.length > 0 ? category.categoryfullData[0] : {};
    console.log(categoryfullData, "categoryfullData", category);
    return (
        <> {/* Hello world */}
            <section className="bg-light">
                <Container className="container">
                    <Row>
                        <Col lg={12}
                            className="mb-4 mb-sm-5">
                            <Card className="card-style1 border-0">
                                <Card.Body className="p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                    <Row className="align-items-center">
                                        <Col lg={6}
                                            className=" px-xl-10">
                                            <Container className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                <h3 className="h2 text-white mb-0">
                                                    {
                                                        categoryfullData.name
                                                    }</h3>
                                            </Container>
                                            <ul className="list-unstyled mb-1-9">
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2 font-weight-600">
                                                        Type:
                                                    </span>
                                                    {
                                                        categoryfullData.type === 1 && "MainCategory"
                                                    }
                                                    {
                                                        categoryfullData.type === 2 && "Subcategory"
                                                    }
                                                    {
                                                        categoryfullData.type === 3 && "Grand Subcategory"
                                                    } </li>


                                                {
                                                    categoryfullData.childs && categoryfullData.childs.length > 0 && <li className="mb-2 mb-xl-3 display-28">
                                                        <span className="display-26 text-secondary me-2 font-weight-600">
                                                            SubCategories:
                                                        </span>
                                                    </li>
                                                }

                                                {
                                                    categoryfullData.childs && categoryfullData.childs.length > 0 && <Table striped bordered hover size="sm">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody> {
                                                            categoryfullData.childs && categoryfullData.childs.length > 0 ? subcategories(categoryfullData.childs) : <p style={
                                                                { textAlign: "center" }
                                                            }>Nochilds</p>
                                                        } </tbody>
                                                    </Table>
                                                } </ul>
                                        </Col>
                                        <Col lg={6} className=" mb-4 mb-lg-0">
                                            <Row>
                                                <p>Logo</p>
                                            </Row>
                                            <Row>
                                                <img className="category_logo" src={
                                                    categoryfullData.image
                                                }
                                                    alt="..." />
                                            </Row>
                                            {categoryfullData.mobile_banners && categoryfullData.mobile_banners.length > 0 && <div>
                                                <Row>
                                                    <p>Mobile Banners</p>
                                                </Row>
                                                <Row>
                                                    {rendermobilebanners(categoryfullData.mobile_banners)}
                                                </Row>
                                            </div>
                                            }
                                            {categoryfullData.web_banners && categoryfullData.web_banners.length > 0 && <div>
                                                <Row>
                                                    <p>Web Banners</p>
                                                </Row>
                                                <Row>
                                                    {renderwebbanners(categoryfullData.web_banners)}
                                                </Row>
                                            </div>
                                            }
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
