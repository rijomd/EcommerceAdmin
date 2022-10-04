import "./products.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Row, Modal, Button, Container, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import { productsAdd } from "../_Actions/productactions";
import { brandList } from "../_Actions/brandaction";
import { product_attributeList } from "../_Actions/product_attributeactions";
import { productListHome } from "../_Actions/productactions";
import { categoryAllList } from "../_Actions/categoryactions";
import { varientList } from "../_Actions/productactions";

import { Loader } from "../Components/loader";
import { CategoryForproducts } from './_categoryForproducts';
import { SellerForProducts } from './_sellerForProducts';
import { CommonDetailsForProducts } from './_commonDetailsForProducts';
import { BrandsForProducts } from './_brandsForProducts';
import { EditSimpleproduct } from "./editSimpleProduct";
import { EditVarientProduct } from "./editVarientProduct";



export const ProductEdit = (props) => {

    const { show, handleCloseProductAdd, title, editdata } = props;
    const productFromReducer = useSelector(state => state.product);

    const dispatch = useDispatch();

    const [isError, setError] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [homelist, setproducthome] = useState([]);
    const [checked, setCheked] = useState(false); //hometype 
    const [radiosingle, setSelectTypeSingle] = useState(false);//single varient
    const [radiovarient, setSelectTypevarient] = useState(false);//multi varient
    const [istypevisible, selectHomeVisibility] = useState(false);//home visilble
    const [product, setproductdetails] = useState({});
    const [seller, setSelectedSeller] = useState({}); //setting seller name
    const [categoryeditdata, setCategoryName] = useState(''); //setting categoryeditdata name
    const [bandeditdata, setBrandName] = useState(''); //setting brandeidt name
    const [selecteHome, setSelectedHome] = useState(''); //for displaying visibility  content
    const [selectedHomePrevious, setPreviousHome] = useState(''); //updating or changinf productlisthome category

    useEffect(() => {
        if (editdata && editdata._id) {
            if (editdata.homevisibilty == true) {
                setCheked(true);
                selectHomeVisibility(true);
            }
            if (editdata.type_product === "single") {
                setSelectTypeSingle(true);
                setSelectTypevarient(false);
            }
            if (editdata.hometype) {
                setSelectedHome(editdata.hometype);
                setPreviousHome(editdata.hometype);
            }
            if (editdata.type_product === "multi") {
                setSelectTypevarient(true);
                setSelectTypeSingle(false);

                let obj = {
                    orginal_price: "",
                    selling_price: "",
                    varient_name: "",
                    productPictures: [],
                    availabile_qty: 1,
                    type_product: "multi",
                    atribute_value: [],
                };
                for (let i = 0; i < editdata.saved_Attributes.length; i++) {
                    let key = editdata.saved_Attributes[i].key;
                    obj[key] = ''
                }
                dispatch({
                    type: "ATTRIBUTES_VALUE",
                    data: editdata.saved_Attributes,
                    varient_data: obj
                });
            }
            setproductdetails(editdata);
            let value = { label: editdata.seller.name, value: editdata.seller._id }
            setSelectedSeller(value);
            let categoryName = editdata.category.name;
            setCategoryName(categoryName);
            if (editdata.brand) {
                let brandName = editdata.brand.name;
                setBrandName(brandName);
            }
            dispatch(varientList({ product: editdata._id }));
            dispatch(product_attributeList({ status: 1, category_id: editdata.category._id }));
        }
    }, [show]);
    useEffect(() => {
        dispatch(productListHome({ status: 1 })).then(function (res) {
            if (res.length > 0) {
                setproducthome(res);
            }
        });
        dispatch(categoryAllList({ status: 1 }));
    }, []);


    //select type 
    const selectType = (name) => {
        if (name === "single") {
            setSelectTypevarient(false);
            setSelectTypeSingle(true);
            setproductdetails(
                {
                    ...product,
                    type_product: "single"
                }
            );
        }
        if (name === "varient") {
            setSelectTypeSingle(false);
            setSelectTypevarient(true);
            setproductdetails(
                {
                    ...product,
                    type_product: "multi"
                }
            );
        }
    }
    //closemodal
    const handleClose = () => {
        setproductdetails({
        });
        setError(false);
        setCheked(false);
        selectHomeVisibility(false)
    }
    // cash on delivery
    const cashonDeliver = (value) => {
        setproductdetails(
            {
                ...product,
                cod: value
            }
        )
    }
    const returnableValue = (value) => {
        setproductdetails(
            {
                ...product,
                returnable: value
            }
        )
    }
    //handlechnge
    const handleChange = (name, value) => {
        console.log(value, name)
        setproductdetails(
            {
                ...product,
                [name]: value
            }
        )
    }
    //selecting seller
    const selectedvalue = (selectedOption) => {
        setproductdetails(
            {
                ...product,
                seller: selectedOption
            }
        );
    }
    //home visibility
    const selectHometype = (e) => {
        console.log("itemid", e.target.value);
        setSelectedHome(e.target.value);
        setproductdetails(
            {
                ...product,
                homevisibilty: true,
                hometype: e.target.value,
            }
        );
    }
    //home visibility
    const handleChanged = (value) => {
        console.log(value, "value")
        setCheked(!checked);
        if (value === false) {
            console.log(value, "true")
            selectHomeVisibility(true);
            setproductdetails(
                {
                    ...product,
                    homevisibilty: true
                }
            )
        }
        else {
            console.log(value, "false")
            selectHomeVisibility(false);
            setproductdetails(
                {
                    ...product,
                    homevisibilty: false
                }
            )
        }
    }


    //categroy select and category section
    const selectcategory = (category) => {
        dispatch(product_attributeList({ status: 1, category_id: category._id }));
        dispatch(brandList({ status: 1, category_id: category._id }));
        setproductdetails(
            {
                ...product,
                category: category._id
            }
        );
    }
    const selectedbrands = (brand) => {
        console.log(brand, "brand")
        setproductdetails(
            {
                ...product,
                brand: brand._id
            }
        );
    }
    //for multi
    const saveSavarientsArray = (varients) => {
        console.log(varients, "varients");
        setproductdetails(
            {
                ...product,
                varients: varients,
            }
        );
    }
    const saveSimpleProduct = (simple) => {
        simple[0].varient_name = editdata.name;
        setproductdetails(
            {
                ...product,
                varients: simple,
            }
        );
    }

    //add product
    const onSumbitproduct = (product) => {
        product.saved_Attributes = productFromReducer.attributesall;
        product.edit_Varients = productFromReducer.edit_Varients;
        console.log(product, "product");

        if (product.homevisibilty === true) {
            if (!product.hometype) {
                product.homevisibilty = false;
            }
        }
        if (selectedHomePrevious !==selecteHome) {
            product.previoushomeId=selectedHomePrevious;
        }
        if (!product.category) {
            setError(true);
            setErrmsg("Select category");
            return null;
        }
        if (!product.seller) {
            setError(true);
            setErrmsg("Select seller");
            return null;
        }
        if (!product.name) {
            setError(true);
            setErrmsg("Enter name");
            return null;
        }
        if (product.name && product.category && product.seller) {
            setLoading(true);
            dispatch(productsAdd(product)).then(function (res) {
                setproductdetails({})
                handleCloseProductAdd()
                setLoading(false)
            },
                function (err) {
                    handleCloseProductAdd()
                    setLoading(false)
                });
        }
        else {
            setError(true);
            setErrmsg("please fill all details");
        }
    }



    return (
        <>
            <Modal
                show={show}
                onHide={() => { handleCloseProductAdd(); handleClose() }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="ProductAdd">

                        <div className="comman_details_main">
                            <Row><h6>Edit details of product</h6></Row>
                            <CommonDetailsForProducts
                                handleChange={(name, value) => handleChange(name, value)}
                                product={product}
                                cod={(value) => cashonDeliver(value)}
                                returnvalue={(value) => returnableValue(value)}
                            />

                            {/* home visibility */}
                            <Row className="form-row margin-2-res">
                                <Col md={4}>
                                    <label> Visibile In Home</label>
                                </Col>
                                <Col md={8}>
                                <label style={{ paddingRight: "5px" }}>Yes</label>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => handleChanged(checked)}
                                    />
                                </Col>
                            </Row>
                            {istypevisible &&
                                <Row className="form-row margin-2-res">
                                    <Col md={4}>
                                        <label>Select Visible Category</label>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Control
                                            as="select"
                                            custom
                                            onChange={selectHometype}
                                            value={selecteHome}
                                        >
                                            <option value="" >Select Hometype</option>
                                            {homelist.length > 0 && homelist.map((item) => {
                                                return (
                                                    <option value={item._id} >{item.name}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            }
                            <SellerForProducts selectedvalue={(seller_id) => selectedvalue(seller_id)} seller={seller} />
                            <CategoryForproducts selectcategory={(category) => selectcategory(category)} categoryeditdata={categoryeditdata} />
                            <BrandsForProducts setProductbrands={(brand) => selectedbrands(brand)} bandeditdata={bandeditdata} />
                        </div>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Select Type </label>
                            </Col>
                            <Col md={8}>
                                <Form>
                                    <label style={{ marginRight: "1rem" }}>Single</label>
                                    <Form.Check
                                        inline
                                        name="single"
                                        type='radio'
                                        checked={radiosingle}
                                        onChange={() => selectType("single")}
                                    />
                                    <label style={{ marginRight: "1rem" }}> Varient</label>
                                    <Form.Check
                                        inline
                                        name="varient"
                                        type='radio'
                                        checked={radiovarient}
                                        onChange={() => selectType("varient")}
                                    />
                                </Form>
                            </Col>
                        </Row>

                        {radiosingle && <>
                            <EditSimpleproduct saveSimpleProduct={(simple) => saveSimpleProduct(simple)} />
                        </>}

                        {radiovarient && <>
                            <EditVarientProduct saveSavarientsArray={(varients) => saveSavarientsArray(varients)} />
                        </>}

                        {isError && <Row className="form-row m-4">
                            <p className="text_danger">{errmsg}</p>
                        </Row>}
                        {isLoading && <Row className="form-row m-4">
                            <Loader />
                        </Row>}
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="save_all" variant="primary" onClick={() => onSumbitproduct(product)}>Save All</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
