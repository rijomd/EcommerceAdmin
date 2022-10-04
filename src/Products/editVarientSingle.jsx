import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';

import { Row, Button, Col, Form } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import { ImageModal } from '../Components/imageModal';

export const EditVarientSingle = (props) => {

    const { saveSingleVarient, editData, closeVarient } = props;
    const simpleProduct = useSelector(state => state.product);

    const [show_imageupload, setImageUpload] = useState(false);
    const [isError, setError] = useState(false);
    const [errmsg, setErrorMsg] = useState(false);
    const [image_Array, setImages] = useState([]);
    const [count, setNumber] = useState(0);
    const [varient, setvarientdetails] = useState({});

    useEffect(() => {
        if (editData) {
            if (simpleProduct.attributesall && simpleProduct.attributesall.length > 0) {
                for (let i = 0; i < simpleProduct.attributesall.length; i++) {
                    let key = simpleProduct.attributesall[i].key;
                    console.log(key, "key");

                    for (let j = 0; j < editData.atribute_value.length; j++) {
                        editData[key] = editData.atribute_value[i];
                    }
                }
            }
            if (editData.productPictures) {
                setImages(editData.productPictures);
            }
            setvarientdetails(editData);
            setNumber(count + 1);//for rerendering
        }
    }, [editData]);

    const saveVarients = (items) => {
        let attributes = simpleProduct.attributesall;
        let newone = [];
        let myarray = [];
        for (let item of attributes) {
            if (item.value) {
                for (let i = 0; i < item.value.length; i++) {
                    if (items[item.key] === item.value[i]) {
                        newone.push(item.value[i]);
                        let obj = {
                            key: item.key,
                            value: item.value[i]
                        }
                        myarray.push(obj);
                    }
                }
            }
        }
        items.atribute_value = newone;
        items.attributes = myarray;
        setError(false);
        saveSingleVarient(items);
    }

    const saveDetails = () => {
        if (!varient.orginal_price) {
            setError(true);
            let a = "Original price is required in ";
            setErrorMsg(a);
            return null;
        }
        else if (!varient.selling_price) {
            setError(true);
            let a = "Selling price is required in";
            setErrorMsg(a);
            return null;
        }
        else if (parseInt(varient.orginal_price) < parseInt(varient.selling_price)) {
            setError(true);
            let a = "Original price is lesser of item  in";
            setErrorMsg(a);
            return null;
        }
        else {
            alert("Saved succecsfully");
            setError(false);
            saveVarients(varient);
            closeVarient()
        }
    }

    //for image
    const ImageUpload = () => {
        setImageUpload(true);
    }
    const imageModalaclose = () => {
        setImageUpload(false);
    }
    const onSumbitImage = (image) => {
        image_Array.push(image);
        setImages(image_Array);
        setvarientdetails(
            {
                ...varient,
                productPictures: image_Array
            }
        );
        setNumber(count + 1);//for rerendering
    }
    const removeImage = (image) => {
        let array = varient.productPictures;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === image) {
                array.splice(i, 1);
            }
        }
        setImages(array);
        setvarientdetails(
            {
                ...varient,
                productPictures: image_Array
            }
        );
        setNumber(count + 1);//for rerendering
    }

    //handlechnge
    const handleChange = (name, value) => {
        setvarientdetails(
            {
                ...varient,
                [name]: value
            }
        );
        setNumber(count + 1);//for rerendering
    }

    //for details add
    const addvalueInput = () => {
        let details = [];
        if (varient.product_details) {
            details = varient.product_details
        }
        else {
            details = [{ key: "", value: "" }];
        }
        details.push({
            key: "", value: ""
        });
        setvarientdetails(
            {
                ...varient,
                product_details: details
            }
        );
        setNumber(count + 1);//for rerendering
    }
    const removeDetails = (index) => {
        let details = varient.product_details;
        details.splice(index, 1);
        setvarientdetails(
            {
                ...varient,
                product_details: details
            }
        );
        setNumber(count + 1);//for rerendering
    }
    const handleChangeDetails = (value, index, name) => {
        let details = varient.product_details;
        if (name === "value") {
            details[index].value = value;
        }
        if (name === "key") {
            details[index].key = value;
        }
        setvarientdetails(
            {
                ...varient,
                product_details: details
            }
        )
        setNumber(count + 1);//for rerendering
    }
    //for sub
    const handleChangeforSpecValue = (name, value, index, mainindex) => {

        let specifications = varient.specifications;
        let valuesArray = specifications[mainindex].value;
        if (name === "field") {
            valuesArray[index].field = value;
        }
        if (name === "spec") {
            valuesArray[index].spec = value;
        }
        specifications[mainindex].value = valuesArray;

        setvarientdetails(
            {
                ...varient,
                specifications: specifications
            }
        );
        setNumber(count + 1);//for rerendering
    }
    //for main
    const handleChangeforSpec = (value, index) => {
        let specifications = varient.specifications;
        specifications[index].key = value;
        setvarientdetails(
            {
                ...varient,
                specifications: specifications
            }
        );
        setNumber(count + 1);//for rerendering
    }
    const removeSpecs = (index) => {
        let specifications = varient.specifications;
        specifications.splice(index, 1);
        setvarientdetails(
            {
                ...varient,
                specifications: specifications
            }
        );
        setNumber(count + 1);//for rerendering
    }
    const addSpecs = () => {
        let specifications = [];
        if (varient.specifications) {
            specifications = varient.specifications
        }
        else {
            specifications = [{
                key: "",
                value: [
                    {
                        spec: "",
                        field: "",
                    },
                ],
            }];
        }
        specifications.push(
            {
                key: "",
                value: [
                    {
                        spec: "",
                        field: "",
                    },
                ],
            }
        );
        setvarientdetails(
            {
                ...varient,
                specifications: specifications
            }
        );
        setNumber(count + 1);//for rerendering
    }
    const removeSpecValue = (index, mainindex) => {
        let specifications = varient.specifications;
        let remove_array = specifications[mainindex].value;
        remove_array.splice(index, 1);
        specifications[mainindex].value = remove_array;
        setvarientdetails(
            {
                ...varient,
                specifications: specifications
            }
        );
        setNumber(count + 1);//for rerendering
    }
    const addSpecValue = (index, mainindex) => {
        let specifications = varient.specifications;
        let valueArray = specifications[mainindex].value;

        valueArray.push(
            {
                spec: "",
                field: "",
            },
        );
        specifications[mainindex].value = valueArray;
        setvarientdetails(
            {
                ...varient,
                specifications: specifications
            }
        );
        setNumber(count + 1);//for rerendering
    }

    const selectValue = (e, key) => {
        // assign 
        varient[key] = e.target.value;

        setvarientdetails(varient);
        setNumber(count + 1);//for rerendering
    }
    const renderExtafields = () => {
        let myArray = [];
        if (simpleProduct.attributesall && simpleProduct.attributesall.length > 0) {
            for (let i = 0; i < simpleProduct.attributesall.length; i++) {
                myArray.push(
                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>{simpleProduct.attributesall[i].key}</label>
                        </Col>
                        <Col md={8}>
                            <select class="form-select" aria-label="Default select example"
                                value={varient[simpleProduct.attributesall[i].key]}
                                onChange={(e) => selectValue(e, simpleProduct.attributesall[i].key)}
                            >
                                <option selected>Select One</option>
                                {simpleProduct.attributesall[i].value.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                            </select>

                        </Col>
                    </Row>
                );
            }
        }
        return myArray;
    }


    //render details
    const renderDetails = useMemo(() => {
        let myArray = [];
        let details = varient.product_details;
        if (details) {
            for (let j = 0; j < details.length; j++) {
                myArray.push(
                    <Row className='' key={j}>
                        <Col md={4} className=''>
                            <input type="text" className="form-control" placeholder=" Key" value={details[j].key}
                                onChange={(e) => handleChangeDetails(e.target.value, j, "key")}></input>
                        </Col >
                        <Col md={4} className=''>
                            <input type="text" className="form-control" placeholder=" Value" value={details[j].value}
                                onChange={(e) => handleChangeDetails(e.target.value, j, "value")}></input>
                        </Col >
                        <Col md={4} className='' >
                            <p className='deleteicon' > <MdDelete onClick={() => removeDetails(j)}/> </p>
                        </Col >
                    </Row>
                );
            }
        }
        return myArray;
    }, [count]);

    const renderValuesArray = (specvalues, index) => {
        let myvalueArray = [];
        for (let j = 0; j < specvalues.length; j++) {
            myvalueArray.push(

                <Row style={{ width: "100%", margin: 'auto' }} key={j}>
                    <Col md={4} className='specvalue'>
                        <input type="text" className="form-control" placeholder="Name" value={specvalues[j].spec}
                            onChange={(e) => handleChangeforSpecValue("spec", e.target.value, j, index)}></input>
                    </Col >
                    <Col md={4} className='specvalue'>
                        <input type="text" className="form-control" placeholder="Value" value={specvalues[j].field}
                            onChange={(e) => handleChangeforSpecValue("field", e.target.value, j, index)}></input>
                    </Col >
                    <Col md={4} className='specvalue specvalue_delete' >
                        <p className='addicon' > <AiOutlinePlus onClick={() => addSpecValue(j, index)} /> </p>
                        <p className='deleteicon' > <MdDelete onClick={() => removeSpecValue(j, index)} /> </p>
                    </Col >
                </Row>
            );
        }
        return myvalueArray;
    }

    const renderSpecsArray = useMemo(() => {
        let myspecArray = [];
        let specs = varient.specifications;
        for (let i = 0; specs && i < specs.length; i++) {
            myspecArray.push(
                <div className='specifications'>
                    <Row className='' key={i} style={{ width: "100%", margin: 'auto' }}>
                        <input type="text" className="form-control" placeholder="Specification" value={specs[i].key}
                            onChange={(e) => handleChangeforSpec(e.target.value, i)}></input>
                    </Row>
                    {renderValuesArray(specs[i].value, i)}
                    <Row className='delete_spec'>
                        <p onClick={() => removeSpecs(i)}> Delete </p>
                    </Row>
                </div>


            )
        }
        return myspecArray;
    }, [count])


    const renderbody = useMemo(() => {
        let myarray = [];
        myarray.push(
            <div className="varient_details">

                <Row className="form-row">
                    <label style={{ textAlign: "start", margin: "1rem 0px", color: "black" }}>Edit Your Varient </label>
                </Row>

                <Row className="form-row margin-2-res">
                    {varient.productPictures &&
                        varient.productPictures.map((picture) => (
                            <Col md={2} xs={4} style={{ textAlign: "end" }}>
                                <Row className="product_images">
                                    <Col xs={9} className="height">
                                        <img src={picture} alt="" />
                                    </Col>
                                    <Col xs={3} className="height">
                                        <p onClick={() => removeImage(picture)}> <MdDelete /> </p>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                </Row>


                <Row className="form-row margin-2-res">
                    <Col md={4}>
                        <label>Add images</label>
                    </Col>
                    <Col md={8} style={{ textAlign: "end" }}>
                        <Form style={{ display: "flex" }} >
                            <div style={{ width: "100%", marginRight: 8 }}>
                            </div>
                            <Button className="imageadd" variant="secondary" onClick={() => ImageUpload()}>Add Image</Button>
                        </Form>
                    </Col>
                </Row>


                <Row className="form-row margin-2-res">
                    <Col md={4}>
                        <label>varient Name</label>
                    </Col>
                    <Col md={8}>
                        <input type="text" className="form-control" placeholder="Varient Name" value={varient.varient_name}
                            onChange={(e) => handleChange("varient_name", e.target.value)}></input>
                    </Col>
                </Row>

                <Row className="form-row margin-2-res">
                    <Col md={4}>
                        <label>Original Price</label>
                    </Col>
                    <Col md={8}>
                        <input type="text" className="form-control" placeholder="orginal Price" value={varient.orginal_price}
                            onChange={(e) => handleChange("orginal_price", e.target.value)}></input>
                    </Col>
                </Row>

                <Row className="form-row margin-2-res">
                    <Col md={4}>
                        <label>Seller Price</label>
                    </Col>
                    <Col md={8}>
                        <input type="number" className="form-control" placeholder="Sell Price" value={varient.selling_price}
                            onChange={(e) => handleChange("selling_price", e.target.value)}></input>
                    </Col>
                </Row>


                <Row className="form-row margin-2-res">
                    <Col md={4}>
                        <label>Available Quantity</label>
                    </Col>
                    <Col md={8} >
                        <input type="number" className="form-control" placeholder="Quantity" value={varient.availabile_qty}
                            onChange={(e) => handleChange("availabile_qty", e.target.value)}></input>
                    </Col>
                </Row>

                {renderExtafields()}

                <Row className="form-row margin-2-res">
                    <Col md={4}>
                        <label>Product Details</label>
                    </Col>
                    <Col md={8} >
                        {renderDetails}
                        <p className="addetail" onClick={() => addvalueInput()}> Add </p>
                    </Col>
                </Row>


                <Row className="form-row margin-2-res">
                    <Col md={4}>
                        <label>Product Specifications</label>
                    </Col>
                    <Col md={8} >
                        {renderSpecsArray}
                        <p className="addetail" onClick={() => addSpecs()}> Add </p>
                    </Col>
                </Row>

                <Row className="form-row margin-2-res">
                    <Col md={4}>
                    </Col>
                    <Col md={8}>
                        <Form className="flex_add" >
                            <div className="add_more" onClick={closeVarient}>
                                <p style={{ color: "red" }}>Close</p>
                            </div>
                            <div className="add_more" onClick={() => saveDetails()}>
                                <p> Save Varient</p>
                            </div>
                        </Form>
                        {isError && <p className="error_varients">{errmsg}</p>}
                    </Col>
                </Row>
            </div>
        );
        return myarray;
    }, [count]);


    return (
        <div>
            {renderbody}

            <ImageModal
                show={show_imageupload}
                title="Add product varient image"
                imageModalaclose={imageModalaclose}
                ismulti="true"
                onSumbitImage={(image) => onSumbitImage(image)}
            />
        </div>
    )
}

