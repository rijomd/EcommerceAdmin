import React, { useState, useEffect } from "react";
import { headers } from '../_helpers/header'
import { api } from '../_helpers/urlConstants';
import { Row,Col } from 'react-bootstrap';
import AsyncSelect from "react-select/async";

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

export const SellerForProducts = (props) => {

    const { selectedvalue, seller } = props;
    const [selected_Seller, setSelectedSeller] = useState("Select Seller");

    useEffect(() => {
        if (seller) {
            setSelectedSeller(seller);
        }
    }, [seller]);

    const getSellerSelect = (selectedOption) => {
        console.log(selectedOption, "selectedseller");
        setSelectedSeller(selectedOption.name);
        selectedvalue(selectedOption.value);
    }
    //loadoption for sellers
    const getAllSellers = async (inputValue) => {
        let response = await fetch(api + "/userlist", {
            method: "post",
            headers: headers,
            body: JSON.stringify({ searchKey: inputValue, role: 3, status: 1 }),
        });
        let object = await response.json();
        let array = object.data.docs;
        return array.map(({ _id, name }) => ({ value: _id, label: name }));
    };

    return (

        <Row className="form-row margin-2-res">
            <Col md={4}>
                <label>Select Seller</label>
            </Col>
            <Col md={8}>
                <AsyncSelect
                    className="form-control"
                    styles={styles}
                    value={selected_Seller}
                    onChange={getSellerSelect}
                    placeholder="Select Seller"
                    loadOptions={getAllSellers}
                    defaultOptions
                />
            </Col>
        </Row>
    )
}

