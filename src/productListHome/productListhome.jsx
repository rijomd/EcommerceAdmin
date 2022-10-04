import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { productListHomeAdd, productListHome } from "../_Actions/productactions";
import { Loader } from "../Components/loader";
import { Button, Row, Container, Col, Card } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

export const ProductListhome = () => {

    const [count, setNumber] = useState(0);
    const [productsinHhome, setproducthome] = useState(
        [{
            name: "",
            products_id: [],
        }]
    );
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    //listing data
    useEffect(() => {
        dispatch(productListHome({ status: 1 })).then(function (res) {
            if (res) {
                console.log(res, "res");
                setproducthome(res);
                setNumber(count + 1);//for rerendering
            }
        })
    }, []);
    const handleChange = (value, index) => {
        productsinHhome[index].name = value;
        setproducthome(productsinHhome);
        setNumber(count + 1);//for rerendering

    }
    const saveItem = (index) => {
        dispatch(productListHomeAdd(productsinHhome[index])).then(function (res) {
            if (res.length > 0) {
                console.log(res, "deleteItem")
                setproducthome(res);
                setNumber(count + 1);//for rerendering
            }
        })
    }
    const deleteItem = (index) => {
        let a = productsinHhome[index];
        a.delete = true;
        
        let add_array = productsinHhome;
        for (let i = 0; i < add_array.length; i++) {
            if (add_array[i]._id === a._id) {
                add_array.splice(i, 1);
            }
        }
        dispatch(productListHomeAdd(a)).then(function (res) {
            if (res.length > 0) {
                console.log(res, "deleteItem")
                setproducthome(res);
                setNumber(count + 1);//for rerendering
            }
        })

    }
    const additem = () => {
        let add_array = productsinHhome;
        console.log(add_array, "add_array")
        add_array.push({ name: "", products_id: [] });
        setproducthome(add_array);
        setNumber(count + 1);//for rerendering
    }


    //renderdata
    const renderitem = useMemo(() => {
        let productlisthome = [];
        console.log(productsinHhome, "productsinHhome");
        for (let j = 0; j < productsinHhome.length; j++) {
            productlisthome.push(
                <Row key={j}>
                    <Col md={7} className='margin-2'>
                        <input type="text" className="form-control" placeholder="Name" value={productsinHhome[j].name}
                            onChange={(e) => handleChange(e.target.value, j)}></input>
                    </Col >
                    <Col md={3} className='option' >
                        <Button variant="primary sm" onClick={() => saveItem(j)}>Save</Button>
                        {productsinHhome[j]._id && <i className="far fa-trash-alt delete_icon_producthome" onClick={() => deleteItem(j)} />}
                    </Col >
                </Row>
            )
        }
        return productlisthome;
    }, [count]);


    return (
        <>
            <Container className="mt-3 mb-4">
                <Card >
                    <Card.Body>
                        <Row className="row">
                            <Col md={9}> <p>ProductListHome</p></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

            <Container className=" mt-3 mb-4">
                <Col lg={12} className=" mt-4 mt-lg-0">

                    <Row >
                        <Col md={12}>
                            <Container className="product-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                {renderitem}
                                <Row className='add_icon_producthome'>
                                    <Button variant="primary sm" onClick={() => additem()}><AiOutlinePlus /></Button>
                                </Row>
                                {product.isListing && <Loader />}
                            </Container>
                        </Col>
                    </Row>

                </Col>
            </Container>
        </>
    )
}
