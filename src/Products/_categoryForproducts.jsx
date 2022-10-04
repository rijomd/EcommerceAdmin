import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { categoryList } from "../_Actions/categoryactions";
import "./products.css";

export const CategoryForproducts = (props) => {

    const { selectcategory, categoryeditdata } = props;
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const [productcategory, setProductCategory] = useState("");//for main category
    const [isShow, setshowDiv] = useState(false);

    const [isShowCategory, showCategory] = useState(true);
    const [isShowchild, showChilds] = useState(false);
    const [isShowGrandchild, showGrandChilds] = useState(false);

    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 10,
        },
        status: 1
    });
    useEffect(() => {console.log(categoryeditdata,"categoryeditdata"); dispatch(categoryList(query)); if (categoryeditdata) { setProductCategory(categoryeditdata) } }, [categoryeditdata]);

    const clearAll = () => {
        let query = {
            pageVo: {
                pageNo: 1,
                noOfItems: 10,
            },
            status: 1
        };
        setQuery(query);
        showGrandChilds(false);
        showChilds(false);
        showCategory(true);
        setProductCategory("")
        dispatch(categoryList(query));
    }
    //for main
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        setQuery(query);
        setProductCategory(value);
        dispatch(categoryList(query));
    }
    const showDiv = () => {
        setshowDiv(!isShow);
    }
    const seletcCategory = (category) => {
        if (category.childs && category.childs.length > 0) {
            console.log("exist childs");
            setProductCategory(category.name);
            if (isShowchild) {
                showGrandChilds(true);
                showChilds(false);
                showCategory(false);
            }
            else {
                showChilds(true);
                showCategory(false);
            }
            query.parent_id = category._id;
            dispatch(categoryList(query));
        }
        else {
            console.log("no childs");
            setProductCategory(category.name)
            selectcategory({
                _id: category._id,
                name: category.name
            });
            setshowDiv(false);
        }
    }

    //for render categories
    const renderCategory = () => {
        console.log("renderCategory")
        let myarray = []
        if (category.categoryfullData && category.categoryfullData.length > 0) {
            console.log(category.categoryfullData, "renderCategory")
            for (let item of category.categoryfullData) {
                myarray.push(
                    <p onClick={() => seletcCategory(item)}>
                        {item.name}
                    </p>
                );
            }
        }
        return myarray;
    }

    return (
        <Row className="form-row margin-2-res">
            <Col md={4}>
                <label>Select Category</label>
            </Col>
            <Col md={8}>
                <Form style={{ display: "flex" }}>
                    <Form.Control type="search"
                        placeholder="Select Category"
                        className="me-2"
                        aria-label="Search"
                        value={productcategory}
                        onChange={
                            (e) => handleSearch(e.currentTarget.value)
                        }
                        onClick={showDiv}
                    />
                    <Button variant="secondary" onClick={clearAll}>Clear</Button>
                </Form>
                {isShow && <div className="result_category">
                    {isShowGrandchild && <h6>Select GrandSub Category</h6>}
                    {isShowchild && <h6>Select Sub Category</h6>}
                    {isShowCategory && <h6>Select Category</h6>}

                    {renderCategory()}
                    {category.categoryfullData && category.categoryfullData.length == 0 && <p className="not_found"> No Category Found</p>}

                </div>}
            </Col>
        </Row>
    )
}

