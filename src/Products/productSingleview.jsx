import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import image1 from '../_Images/galleryvector.png';
import { varientList } from "../_Actions/productactions";
import { LoadingSkeleton } from "../Components";

import './products.css'
import { Modal, Row, Col } from 'react-bootstrap';

export const ProductSingleview = (props) => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const { singledata, show, handleCloseProductSingle } = props;

    const [varientdata, setvarientData] = useState({});
    const [productData, setProductdata] = useState({});
    const [varientsArray, setvarientsArray] = useState([]);
    const [count, setcount] = useState();
    const [isLoading, setLoading] = useState(false);
    const [atribute_value, setAtribute_value] = useState([]);

    useEffect(() => {
        if (singledata) {
            setLoading(true);
            setProductdata(singledata);
            dispatch(varientList({ product: singledata._id })).then((res) => {
                if (res) {
                    let v = res[0];
                    let atribute_value = v.atribute_value;
                    console.log(atribute_value, "atribute_value")
                    setAtribute_value(atribute_value);
                    setvarientData(v);
                    setLoading(false);
                    if (singledata.type_product === "multi") {
                        setvarientsArray(res);
                        setcount(count + 1);
                    }
                }
            });
        }

    }, [singledata])



    const renderSpecvalues = (values) => {
        let myarray = [];
        if (values.length > 0) {
            for (let item of values) {
                myarray.push(
                    <div className="specvalues_singleview">
                        <p className="spec_para">{item.spec}</p>
                        <p className="spec_field">{item.field}</p>
                    </div>
                )
            }

        }
        return myarray;
    }

    const renderSpecifications = () => {
        let myarray = [];
        for (let item of varientdata.specifications) {
            myarray.push(
                <div className="specification_singleview">
                    <h3>{item.key}</h3>
                    {renderSpecvalues(item.value)}
                </div>
            )
        }

        return myarray;
    }

    const renderProductDetails = () => {
        let myarray = [];
        for (let item of varientdata.product_details) {
            myarray.push(
                <div className="specvalues_singleview">
                    <p className="spec_para">{item.key}</p>
                    <p className="spec_field">{item.value}</p>
                </div>
            )
        }

        return myarray;
    }

    const changevarient = (value) => {
        console.log(value, "value");
        setLoading(true);
        // if varients more than 30 need to change logic , call data from backend
        // else using array for reducing loading

        for (let item of varientsArray) {
            if (item.atribute_value && item.atribute_value.length > 0) {
                for (let i of item.atribute_value) {
                    if (value === i) {
                        console.log(i, "i....................");
                        console.log(item.atribute_value, "atribute_value....................");
                        console.log(item, "item...................");
                        setAtribute_value(item.atribute_value);
                        setvarientData(item);
                        setcount(count + 1);
                    }
                }
            }
        }
        setLoading(false);
    }

    const renderattributevalues = (values) => {
        console.log("renderAttributes 11111111111");
        let myarray = [];
        if (values && values.length > 0) {
            for (let item of values) {
                let checked = false;
                for (let i of atribute_value) {
                    if (item === i) {
                        checked = true;
                    }
                }
                myarray.push(
                    <ul >
                        <li>
                            <a className={checked ? "selected_varient" : ""} onClick={() => changevarient(item)}>
                                {item}
                            </a>
                        </li>
                    </ul>

                );
            }
        }
        return myarray;
    }

    const renderAttributes = () => {
        console.log("renderAttributes");
        let myarray = [];
        if (productData.saved_Attributes && productData.saved_Attributes.length > 0) {
            for (let item of productData.saved_Attributes) {
                myarray.push(
                    <Col>
                        <li>
                            <p>
                                {item.key}
                            </p>
                        </li>
                        <li className="flex_li">
                            {renderattributevalues(item.value)}
                        </li>
                    </Col>
                )
            }
        }
        return myarray;
    }

    const renderimages = () => {
        let myarray = [];
        if (varientdata.productPictures && varientdata.productPictures.length > 0) {
            for (let product of varientdata.productPictures) {
                myarray.push(
                    <div>
                        <img src={product} />
                    </div>
                )
            }
        }
        else {
            myarray.push(
                <div>
                    <img src={image1} />
                </div>
            )
        }
        return myarray;
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => { handleCloseProductSingle() }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <link
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                    rel="stylesheet"
                />
                {!isLoading && <div className="container">
                    <div className="product-content product-wrap clearfix product-deatil">
                        <div className="row">
                            <div className="col-md-5 col-sm-12 col-xs-12">
                                <div className="product-image">
                                    <Carousel showArrows={true}>
                                        {renderimages()}
                                    </Carousel>
                                </div>
                            </div>
                            <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                                <h2 className="name">
                                    {varientdata.varient_name}
                                    <i className="fa fa-star fa-2x text-primary" />
                                    <i className="fa fa-star fa-2x text-primary" />
                                    <i className="fa fa-star fa-2x text-primary" />
                                    <i className="fa fa-star fa-2x text-primary" />
                                    <i className="fa fa-star fa-2x text-muted" />
                                    <span className="fa fa-2x">
                                        <h5>(109) Votes</h5>
                                    </span>
                                    <a >109 customer reviews</a>
                                </h2>
                                <hr />
                                <div className="price_bar">
                                    <h3 className="price-container">
                                        ₹{varientdata.selling_price}
                                    </h3>
                                    <h3 className="price-container original">
                                        ₹{varientdata.orginal_price}
                                    </h3>
                                    <h3 className=" price-offer">{varientdata.offer}%</h3>
                                </div>

                                {productData.saved_Attributes && productData.saved_Attributes.length > 0 && <Row className="certified">
                                    {renderAttributes()}
                                </Row>}

                                {/* <div className="certified">
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Delivery time<span>7 Working Days</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Certified<span>Quality Assured</span>
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                                <hr />

                                <div className="description description-tabs">
                                    <h3 className="price-container">
                                        Description
                                    </h3>
                                    <p className="description-container">
                                        {productData.description}
                                    </p>
                                </div>
                                <hr />

                                <div className="description description-tabs">
                                    <h3 className="price-container">
                                        Highlights
                                    </h3>
                                    <p className="description-container">
                                        {productData.short_desc}
                                    </p>
                                </div>
                                <hr />


                                {varientdata.product_details && varientdata.product_details.length > 0 && varientdata.product_details[0].key && <><div className="description description-tabs">
                                    <h3 className="price-container">
                                        Product Details
                                    </h3>
                                    {renderProductDetails()}
                                </div>
                                    <hr />
                                </>}


                                {varientdata.specifications && varientdata.specifications.length > 0 && varientdata.specifications[0].key && <div className="description description-tabs">
                                    <h3 className="price-container">
                                        Specifications
                                    </h3>
                                    {renderSpecifications()}
                                </div>}


                            </div>
                        </div>
                    </div>
                </div>}

                {isLoading && <LoadingSkeleton />}

            </Modal>

        </>

    )
}

