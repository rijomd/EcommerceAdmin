import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Form, Col, Row, Button } from 'react-bootstrap';
import './products.css';

import { categoryList } from "../_Actions/categoryactions";
import { brandList } from "../_Actions/brandaction";
import { userList } from "../_Actions/authactions";
import { ProductList, } from "../_Actions/productactions";
import { productListHome } from "../_Actions/productactions";


export const FilterBar = (props) => {

    const { title } = props;
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    const [searchValue, setSearchValue] = useState("");
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    const [fiteritems, setFilterItem] = useState([]);
    const [count, setNumber] = useState(0);

    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 10,
        },
        status: 1
    });


    useEffect(() => {
        if (title) {
            console.log("kkkkkkkk")
            if (title === "Filter By Category") {
                setName("category");
                dispatch(categoryList(query)).then((res) => {
                    if (res.length > 0) {
                        setItems(res);
                        setNumber(count + 1);
                    }
                });
            }
            if (title === "Filter By Seller") {
                setName("seller");
                query.role = 3;
                dispatch(userList(query)).then((res) => {
                    if (res.length > 0) {
                        setItems(res);
                        setNumber(count + 1);
                    }
                });
            }
            if (title === "Filter By Brand") {
                setName("brand");
                dispatch(brandList(query)).then((res) => {
                    if (res.length > 0) {
                        setItems(res);
                        setNumber(count + 1);
                    }
                });
            }
            if (title === "products In Home") {
                setName("visibility");
                dispatch(productListHome(query)).then((res) => {
                    if (res.length > 0) {
                        setItems(res);
                        setNumber(count + 1);
                    }
                });
            }
        }
    }, [title]);


    const applyFilter = () => {
        let query = {};
        query.filter = fiteritems;
        query.filtername = name;
        console.log(query, "fiteritems");
        dispatch(ProductList(query));
        dispatch({
            type: "ISFILTERBAR_OPEN",
            data: !product.isfilteropen
        })
    }

    const closeFilter = () => {
        dispatch({
            type: "ISFILTERBAR_OPEN",
            data: !product.isfilteropen
        })
    }

    const handleSearch = (value) => {
        query.searchKey = value;
        setQuery(query);
        setSearchValue(value);
        if (title === "Filter By Category") {
            dispatch(categoryList(query)).then((res) => {
                if (res.length > 0) {
                    setItems(res);
                    setNumber(count + 1);
                }
            });
        }
        if (title === "Filter By Seller") {
            query.role = 3;
            dispatch(userList(query)).then((res) => {
                if (res.length > 0) {
                    setItems(res.docs);
                    setNumber(count + 1);
                }
            });
        }
        if (title === "Filter By Brand") {
            dispatch(brandList(query)).then((res) => {
                if (res.length > 0) {
                    setItems(res);
                    setNumber(count + 1);
                }
            });
        }
        if (title === "products In Home") {
            dispatch(productListHome(query)).then((res) => {
                if (res.length > 0) {
                    setItems(res);
                    setNumber(count + 1);
                }
            });
        }
    }

    const handleChange = (value) => {
        let exist = fiteritems.find((x) => x === value);
        if (exist) {
            for (let i = 0; i < fiteritems.length; i++) {
                if (fiteritems[i] === value) {
                    fiteritems.splice(i, 1);
                }
            }
        }
        else {
            fiteritems.push(value);
        }
        setFilterItem(fiteritems);
        setNumber(count + 1);
    }

    const renderItems = useMemo(() => {
        let myarray = [];
        for (let i = 0; i < items.length; i++) {
            let check = false;
            let valueExist = fiteritems.find((x) => x === items[i]._id);
            if (valueExist) {
                check = true;
            }
            myarray.push(
                <Row style={{ padding: "8px 0px" }}>
                    <Col md={2} xs={2}>
                        <input
                            type="checkbox"
                            checked={check}
                            style={{ color: "black", width: "15px", height: "15px" }}
                            onChange={() => handleChange(items[i]._id)}
                        />
                    </Col>
                    <Col md={9} xs={9} style={{ color: "black" }}>{items[i].name}</Col>
                </Row>
            )
        }
        return myarray;
    }, [count]);

    return (
        <nav class="main-nav">
            <div style={{ display: "flex" }}>
                <a>{title}</a>
            </div>

            <Form style={{ padding: "0px 3px" }}>
                <Form.Control type="search"
                    placeholder="Search item"
                    className="me-2"
                    aria-label="Search"
                    value={searchValue}
                    onChange={
                        (e) => handleSearch(e.currentTarget.value)
                    }
                />
                <div className="filter_product">
                    {renderItems}
                    {items.length === 0 && <p>No items found</p>}
                </div>
                <div style={{ display: "flex", marginBottom: "1rem", }}>
                    <Button varient="primary" style={{ flex: 1 }} onClick={closeFilter}>Close</Button>
                    <Button varient="primary" style={{ flex: 1 }} onClick={applyFilter}>Apply</Button>
                </div>
            </Form>
        </nav >
    )
}
