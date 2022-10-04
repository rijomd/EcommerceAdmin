import React, { useState, useEffect, useMemo } from "react";
import {
    Row,
    Modal,
    Button,
    Container,
    Col
} from 'react-bootstrap';
import { Loader } from "../Components/loader";
import { product_attributeAdd } from "../_Actions/product_attributeactions";
import { useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

export const ProductValues = (props) => {

    const { show, handleCloseAttribute, keyAttribute, attribute_values, title } = props;
    const [attribute, setAttributedetails] = useState({});
    const [attributevalues, setattributevalues] = useState(['']);
    const [count, setNumber] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("kk")
        if (keyAttribute) {
            console.log(keyAttribute, "keyAttribute",attribute_values)
            setAttributedetails(keyAttribute);
            setattributevalues(attribute_values);
            setNumber(count + 1);//for rerendering
        }
    }, [keyAttribute]);

    const handleClose = () => {
        setAttributedetails({});
        setattributevalues([]);
        setTimeout(handleCloseAttribute(), 1000);

    }

    const handleChange = (name, index) => {
        attributevalues[index] = name.target.value;
        setattributevalues(attributevalues);
        setNumber(count + 1);//for rerendering
    }

    const attributeAddEdit = () => {
        keyAttribute.value = attributevalues;
        console.log("attribute", keyAttribute);
        if (keyAttribute.key && keyAttribute._id) {
            setLoading(true);
            dispatch(product_attributeAdd(keyAttribute)).then(function (res) {
                handleCloseAttribute()
                setLoading(false)
            }, function (err) {
                handleCloseAttribute()
                setLoading(false)
            });
        }
    }
    //delete an item
    const removeProductattributeValue = (index) => {
        console.log(index);
        attributevalues.splice(index, 1);
        setattributevalues(attributevalues);
        setNumber(count + 1);//for rerendering
    };
    const addvalueInput = () => {
        console.log(attributevalues, "attributevalues")
        attributevalues.push('');
        setNumber(count + 1);//for rerendering
    }
    const renderitem = useMemo(() => {
        let myProductattributeValue = [];
        for (let j = 0; j < attributevalues.length; j++) {
            console.log(attributevalues, "attributevalues")
            myProductattributeValue.push(
                <Row className='m-4' key={j}>
                    <Col className='margin-2'>
                        <input type="text" className="form-control" placeholder="Attribute value" value={attributevalues[j]}
                            onChange={(e) => handleChange(e, j)}></input>
                    </Col >
                    <Col className='option' >
                        <p onClick={() => removeProductattributeValue(j)}> <MdDelete /> </p>
                    </Col >
                </Row>
            );
        }
        return myProductattributeValue;
    }, [count]);


    return (
        <Modal show={show}
            onHide={
                () => { handleClose() }
            }
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add attribute values for {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="attributeadd">
                    {renderitem}
                    <Row className='delete'>
                        <p onClick={() => addvalueInput()}> <AiOutlinePlus /> </p>
                    </Row>
                    {isLoading && <Row className="form-row m-4">
                        <Loader />
                    </Row>}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary"
                    onClick={
                        () => attributeAddEdit()
                    }>Save</Button>
            </Modal.Footer>
        </Modal>

    )
}
