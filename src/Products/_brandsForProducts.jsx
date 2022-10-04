import React, { useState, useEffect } from "react";
import {  Form, Row, Col } from 'react-bootstrap';
import { brandList } from "../_Actions/brandaction";
import "./products.css";
import { useDispatch, useSelector } from 'react-redux';

//styles
const styles = {
    control: (provided) => ({
        ...provided,
        boxShadow: "none",
        border: "none"
    }),
    menu: (provided) => ({
        ...provided,
        border: "none",
    }),
};

export const BrandsForProducts = (props) => {

    const { setProductbrands, bandeditdata } = props;
    const brand = useSelector(state => state.brand);
    const dispatch = useDispatch();

    const [selectedBrand, setBrands] = useState("");//for main category
    const [isShow, setshowDiv] = useState(false);
    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 10,
        },
        status: 1
    });

    useEffect(() => {  if (bandeditdata) { setBrands(bandeditdata) } }, [bandeditdata]);

    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        setBrands(value);
        setQuery(query);
        dispatch(brandList(query));
    }
    const selectBrands = (brand) => {
        setProductbrands(brand);
        setBrands(brand.name);
        setshowDiv(false);
    }
    const showDiv = () => {
        setshowDiv(!isShow);
    }
    const renderBrands = () => {
        console.log("renderCategory")
        let myarray = []
        if (brand.brandarray && brand.brandarray.length > 0) {
            for (let item of brand.brandarray) {
                myarray.push(
                    <p onClick={() => selectBrands(item)}>
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
                <label>Select Brands</label>
            </Col>
            <Col md={8}>
                <Form style={{ display: "flex" }}>
                    <Form.Control type="search"
                        placeholder="Select Brands"
                        className="me-2"
                        aria-label="Search"
                        value={selectedBrand}
                        onChange={
                            (e) => handleSearch(e.currentTarget.value)
                        }
                        onClick={showDiv}
                    />
                </Form>
                {isShow && <div className="result_category">
                    {brand.brandarray && brand.brandarray.length == 0 && <p className="not_found"> No Brands Found</p>}
                    {renderBrands()}
                </div>}
            </Col>
        </Row>
    )
}

