import React, { useState } from "react";
import { Row } from 'react-bootstrap';
import AsyncSelect from "react-select/async";
import axios from '../_helpers/axios';

// styles
const styles = {
    control: (provided) => (
        {
            ...provided,
            boxShadow: "none",
            border: "none"
        }
    ),
    menu: (provided) => (
        {
            ...provided,
            border: "none"
        }
    )
};

export const CategorySelect = (props) => {

    const { category_id } = props
    const [selectedcategory, setSelectedcategory] = useState(null);

    // selecting Category
    const getCategorySelect = (selectedOption) => {
        console.log(selectedOption, "selectedOption");
        setSelectedcategory(selectedOption);
        let _id = selectedOption.value;
        category_id(_id);
    }

    // loadoption for Category
    const getAllparentCategories = async (inputValue) => {
        let data = { searchKey: inputValue, status: 1 };
        let response = await axios.post("/categoryList", data);
        let object = response.data.data;
        let array = object.docs;
        console.log(array, "array");
        return array.map(({ _id, name }) => ({ value: _id, label: name }));
    };

    return (
        <Row>
            <AsyncSelect className="form-control"
                styles={styles}
                value={selectedcategory}
                onChange={getCategorySelect}
                placeholder="Select Category"
                loadOptions={getAllparentCategories}
                defaultOptions />
        </Row>
    )
}

