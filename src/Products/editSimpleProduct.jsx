import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';

import { Row, Button, Col, Form } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import { ImageModal } from '../Components/imageModal';

export const EditSimpleproduct = (props) => {

    const { saveSimpleProduct } = props;
    const simpleProduct = useSelector(state => state.product);

    const [show_imageupload, setImageUpload] = useState(false);
    const [isError, setError] = useState(false);
    const [errmsg, setErrorMsg] = useState(false);
    const [image_Array, setImages] = useState([]);
    const [count, setNumber] = useState(0);
    const [varient, setvarientdetails] = useState({});

    useEffect(() => {
        if (simpleProduct.varientsArray && simpleProduct.varientsArray.length > 0) {
            console.log("EditSimpleproduct1111");
            setvarientdetails(simpleProduct.varientsArray[0]);
            if (simpleProduct.varientsArray[0].productPictures) {
                setImages(simpleProduct.varientsArray[0].productPictures);
            }
            setNumber(count + 1);//for rerendering
        }
    }, [simpleProduct.varientsArray]);

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
            let array = [];
            array.push(varient)
            saveSimpleProduct(array);
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
        console.log(image, "image");
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
        console.log(value, name)
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
        console.log(value, "handleChangeDetails", index, name);
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
        console.log(value, index, "index", mainindex);

        let specifications = varient.specifications;
        let valuesArray = specifications[mainindex].value;
        console.log(valuesArray, "valuesArray");
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
        console.log(value, index, "index");
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
        console.log(index);
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
        console.log(varient.specifications, "specs array");
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
        console.log(index, "index", mainindex);
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
        console.log(index, "index", mainindex);
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

    //render details
    const renderDetails = useMemo(() => {
        let myArray = [];
        console.log(varient, "varient");
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
                            <p className='deleteicon'> <MdDelete onClick={() => removeDetails(j)} /> </p>
                        </Col >
                    </Row>
                );
            }
        }
        return myArray;
    }, [count]);

    const renderValuesArray = (specvalues, index) => {
        console.log(specvalues, "specvalues", index);
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
        console.log(varient, "specs");
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
                    <Col md={8} style={{ textAlign: "end" }} >
                        <Button style={{ margin: "5px 1rem" }} variant="secondary" onClick={() => saveDetails()}>
                            Save
                        </Button>
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

