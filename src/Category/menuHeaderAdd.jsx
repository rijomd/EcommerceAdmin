import React, { useState, useEffect, useCallback } from "react";
import {
    Row,
    Modal,
    Button,
    Container,
    Col, Form
} from 'react-bootstrap';
import "./category.css";

import { Loader } from "../Components/loader";
import { categorysAdd, categoryList } from "../_Actions/categoryactions";
import { useDispatch, useSelector } from 'react-redux';




export const MenuHeaderAdd = (props) => { // initializing

    const { show, handleCloseCategoryAdd, title, editdata } = props;
    const categorylist = useSelector(state => state.category);
    const dispatch = useDispatch();

    const [productcategory, setProductCategory] = useState("");//for main category
    const [isShow, setshowDiv] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [childs, setChilds] = useState([]);
    const [count, setNumber] = useState(0);

    const [category, setcategorydetails] = useState({
        name: "",
    })
    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 10,
        },
        status: 1
    });


    useEffect(() => {
        if (editdata) {
        let catgories = [];
            editdata.length > 0 && editdata[0].childs && editdata[0].childs.length > 0 ? catgories = editdata[0].childs : catgories = [];
            for (let item of catgories) {
                let value = {
                    _id: item._id,
                    name: item.name
                };
                childs.push(
                    value
                );
            }
            setChilds(childs);
        }
        dispatch(categoryList(query)).then((res) => { if (res.length > 0) { setNumber(count + 1); } });
    }, [show]);


    // closemodal
    const handleClose = () => {
        setError(false)
    }
    const showDiv = () => {
        setshowDiv(!isShow);
    }
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        setQuery(query);
        setProductCategory(value);
        dispatch(categoryList(query)).then((res) => { if (res.length > 0) { setNumber(count + 1); } })

    }

    const renderSelectedCategories = () => {
        let myarray = []
        if (childs.length > 0) {
            for (let item of childs) {
                myarray.push(
                    <p>
                        {item.name}
                    </p>
                );
            }
        }
        return myarray;
    }
    const seletcCategory = (value) => {
        console.log(value, "value");
        let a = {
            _id: value._id,
            name: value.name
        }
        let existValues = childs.find((x) => x._id === value._id);
        if (existValues) {
            for (let i = 0; i < childs.length; i++) {
                if (childs[i]._id === value._id) {
                    childs.splice(i, 1);
                }
            }
            setChilds(childs);
        }
        else {

            childs.push(a);
            setChilds(childs);
        }
        setNumber(count + 1);
    }

    //for render categories
    const renderCategory = useCallback(() => {
        console.log("rerender", childs)
        let myarray = []
        if (categorylist.categoryfullData && categorylist.categoryfullData.length > 0) {
            for (let item of categorylist.categoryfullData) {
                let check = false;
                let exist = childs.find((x) => x._id === item._id);
                if (exist) {
                    check = true;
                }
                myarray.push(
                    <div className="menuheaderadd">
                        <a>
                            {item.name}
                        </a>
                        <input
                            type="checkbox"
                            checked={check}
                            onChange={() => seletcCategory(item)}
                        />
                    </div>
                );
            }
        }
        return myarray;
    }, [count])

    // submit
    const onSumbitcategory = () => {
        setLoading(true)
        let array = [];
        for (let item of childs) {
            array.push(
                item._id
            )
        }
        let category = {
            name: "MenuHeader",
            childs: childs
        }
        if (childs.length !== 10) {
            setError(true);
            setLoading(false)
            setErrmsg("Only select 10 categories");
            setNumber(count + 1);
            return null;
        }
        else {
            dispatch(categorysAdd(category)).then((res) => {
                handleCloseCategoryAdd()
                setLoading(false)
            }, (err) => {
                handleCloseCategoryAdd()
                setLoading(false)
            });
        }

    }

    return (
        <>
            <Modal show={show}
                onHide={
                    () => {
                        handleCloseCategoryAdd();
                        handleClose()
                    }
                }
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="categoryadd">

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Name  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Name"
                                    value="MenuHeader"
                                    disabled={true}
                                >
                                </input>
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Selected Categories</label>
                            </Col>
                            <Col md={8}>
                                <div className="renderSelcted_category">
                                    {renderSelectedCategories()}
                                </div>
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Select Categories  </label>
                            </Col>
                            <Col md={8}>
                                <Form style={{ display: "flex" }}>
                                    <Form.Control type="search"
                                        placeholder="Search Category"
                                        className="me-2"
                                        aria-label="Search"
                                        value={productcategory}
                                        onChange={
                                            (e) => handleSearch(e.currentTarget.value)
                                        }
                                        onClick={showDiv}
                                    />
                                </Form>
                                {isShow && <div className="result_category">
                                    {renderCategory()}
                                    {categorylist.categoryfullData && categorylist.categoryfullData.length == 0 && <p className="not_found"> No Category Found</p>}
                                </div>}
                            </Col>
                        </Row>

                        {
                            isError && <Row className="form-row margin-2-res">
                                <p className="text_danger">
                                    {errmsg}</p>
                            </Row>
                        }
                        {
                            isLoading && <Row className="form-row m-4">
                                <Loader />
                            </Row>
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={
                            () => onSumbitcategory(category)
                        }>Save</Button>
                </Modal.Footer>
            </Modal>


        </>


    )
}
