import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { Row, Button, Form, Col, Table } from 'react-bootstrap';
import "./products.css";

export const ProductAttributes = (props) => {

    const { setAttributes, edit_true } = props;
    const product_attribute = useSelector(state => state.product_attribute);
    const productFromReducer = useSelector(state => state.product);

    const [field, setField] = useState([]);//selected values of attributes
    const [count, setNumber] = useState(0);
    const [selected_attributes, setSelctedAttributes] = useState([]); //seleting some attributes
    const [attribute_values, setAttributevalues] = useState([]);
    const [checkvalueArray, setValuArray] = useState([]); //for checking

    useEffect(() => {
        if (edit_true) {
            let attributes = productFromReducer.attributesall;
            setAttributevalues(attributes);
            for (let item of attributes) {
                field.push(item.key);
                for (let items of item.value) {
                    checkvalueArray.push(items);
                }
            }
            setValuArray(checkvalueArray);
            setField(field);
            setNumber(count + 1);//for rerendering
        }//only for edit;for shows selected
    }, [edit_true]);

    //select key values
    const handleChange = (e) => {
        let value = e.target.selectedOptions[0].value;

        // setting fields
        if (field.length > 0) {
            for (let j = 0; j < field.length; j++) {
                if (field[j] === value) {
                    field.splice(j, 1);
                    setField(field);
                    return true
                }
                else {
                    if (j === field.length - 1) {
                        field.push(value);
                        setField(field);
                        return true
                    }
                }
            }
        }
        else {
            field.push(value);
            setField(field);
        }
    };

    //for selecting values
    const handleChangeValues = (value, key) => {
        // for check
        let existValues = checkvalueArray.find((x) => x === value);
        if (existValues) {
            for (let i = 0; i < checkvalueArray.length; i++) {
                if (checkvalueArray[i] == value) {
                    checkvalueArray.splice(i, 1);
                }
            }
            setValuArray(checkvalueArray)
        }
        else {
            checkvalueArray.push(value);
            setValuArray(checkvalueArray)
        }


        // for attribute values
        let exist = attribute_values.find((x) => x.key === key);
        if (exist) {
            for (let i = 0; i < attribute_values.length; i++) {
                if (attribute_values[i].key === key) {
                    attribute_values.splice(i, 1);
                }
            }
            let myarray = exist.value;
            let valueExist = myarray.find((x) => x === value);
            if (valueExist) {
                for (let i = 0; i < myarray.length; i++) {
                    if (myarray[i] === value) {
                        myarray.splice(i, 1);
                    }
                }
                attribute_values.push({
                    key: key, value: myarray
                });
            }
            else {
                myarray.push(value);
                attribute_values.push({
                    key: key, value: myarray
                });
            }

        }
        else {
            let myarray = [];
            myarray.push(value);
            attribute_values.push({
                key: key, value: myarray
            });
        }
        setAttributevalues(attribute_values);
        setNumber(count + 1);//for rerendering
    }


    const saveAttribute = () => {
        let myarray = product_attribute.product_attribute_array;
        let attributeArray = myarray.filter(element => field.includes(element.key));

        // for deleting attributes
        if (attribute_values.length > 0) {
            let newArray = [];
            for (let item of attributeArray) {
                let t = attribute_values.filter(element => item.key === element.key);
                if (t[0]) {
                    newArray.push(t[0]);
                }
            }
            setAttributevalues(newArray);
            // for chedarray
            let myarray = [];
            for (let item of newArray) {
                for (let i = 0; i < item.value.length; i++) { myarray.push(item.value[i]) }
            }
            setValuArray(myarray);
        }

        setSelctedAttributes(attributeArray);
        setNumber(count + 1);//for rerendering
    }
    const saveAttributeValues = () => {
        setAttributes(attribute_values);
    }

    const renderAttributeValues = useCallback((valuarray, key) => {
        let myarray = [];
        for (let i = 0; i < valuarray.length; i++) {
            let check = false;
            let item = checkvalueArray.find((x) => x === valuarray[i]);
            if (item) {
                check = true;
            }
            myarray.push(
                <tr>
                    <td>{valuarray[i]}</td>
                    <td>
                        <input
                            type="checkbox"
                            checked={check}
                            onChange={() => handleChangeValues(valuarray[i], key)}
                        />
                    </td>
                </tr>
            )
        }
        return myarray;
    }, [count]);

    const renderAttributes = useMemo(() => {
        let myArray = [];
        for (let item of selected_attributes) {
            myArray.push(
                <Table className="table manage-candidates-top mb-0">
                    <thead>
                        <tr>
                            <th>{item.key}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderAttributeValues(item.value, item.key)}
                    </tbody>
                </Table>
            );
        }
        return myArray;
    }, [count]);

    return (
        <div>
            <Row className="form-row margin-2-res">
                <Col md={4}>
                    <label>Select Product Attributes</label>
                </Col>
                <Col md={8}>
                    <Form style={{ display: "flex" }} >
                        <Form.Control as="select" componentClass="select" style={{ marginRight: 8 }} multiple value={field}
                            onChange={handleChange}>
                            {product_attribute.product_attribute_array && product_attribute.product_attribute_array.length > 0
                                && product_attribute.product_attribute_array.map((item) => {
                                    return (
                                        <option value={item.key} >{item.key}</option>
                                    )
                                })}
                        </Form.Control>
                        <Button variant="secondary" style={{ height: "40px" }} onClick={() => saveAttribute(field)}>Save</Button>
                    </Form>
                </Col>
            </Row>

            {selected_attributes.length > 0 && <Row className="form-row margin-2-res">
                <Col md={4}>
                    <label>Select Attributes Values</label>
                </Col>
                <Col md={8}>
                    <Form style={{ display: "flex" }} >
                        <div className="result_category" style={{ width: "100%", marginRight: 8 }}>
                            {renderAttributes}
                        </div>
                        <Button variant="secondary" style={{ height: "40px" }} onClick={() => saveAttributeValues()}>Save</Button>
                    </Form>
                </Col>
            </Row>}
        </div >
    )
}

