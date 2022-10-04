import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from 'react-redux';

import { Row, Button, Col, Form } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import { ImageModal } from '../Components/imageModal';
import { Loader } from "../Components/loader";

export const ProductVarients = (props) => {

    const { setAllVarients } = props;
    const product = useSelector(state => state.product);

    const [issaveLoading, setSaveLoading] = useState(false);
    const [isaddmoreLoading, setAddmore] = useState(false);
    const [isError, setError] = useState(false);
    const [errmsg, setErrorMsg] = useState(false);
    const [indeximage, setIndexImage] = useState("");
    const [count, setNumber] = useState(0);
    const [show_imageupload, setImageUpload] = useState(false);
    const [varientsArray, setvarientdetails] = useState([]);
    const [isSpecsTrue, setSpecificationSame] = useState(false); //enable copy
    const [copiedSpecs, SetCopySpecs] = useState([]);



    // ************************************************* Varients Details ***************************************

    // save details of all varients
    const saveVarients = (items) => {
        let attributes = product.attributesall;
        let newone = [];
        let myarray = [];
        for (let item of attributes) {
            if (item.value) {
                for (let i = 0; i < item.value.length; i++) {
                    if (items[item.key] === item.value[i]) {
                        let obj = {
                            key: item.key,
                            value: item.value[i]
                        }
                        newone.push(item.value[i]);
                        myarray.push(obj);

                    }
                }
            }
        }
        items.atribute_value = newone;
        items.attributes = myarray;

        setTimeout(() => {
            setSaveLoading(false);
        }, 500);
        setError(false);
        setAllVarients(items);
    }
    // validating varients
    const saveDetails = () => {
        setSaveLoading(true);
        for (let item of varientsArray) {
            if (!item.varient_name) {
                setError(true);
                setErrorMsg("Required varient name");
                setTimeout(() => {
                    setSaveLoading(false);
                }, 500);
                return null;
            }
            else if (!item.orginal_price) {
                setError(true);
                let a = "Original price is required in " + item.varient_name;
                setErrorMsg(a);
                setTimeout(() => {
                    setSaveLoading(false);
                }, 500);
                return null;
            }
            else if (!item.selling_price) {
                setError(true);
                let a = "Selling price is required in" + item.varient_name;
                setErrorMsg(a);
                setTimeout(() => {
                    setSaveLoading(false);
                }, 500);
                return null;
            }
            else if (parseInt(item.orginal_price) < parseInt(item.selling_price)) {
                setError(true);
                let a = "Original price is lesser of item  in" + item.varient_name;
                setErrorMsg(a);
                setTimeout(() => {
                    setSaveLoading(false);
                }, 500);
                return null;
            }
            else {
                saveVarients(item);
            }
        }

    }
    //Add varient
    const addNewVarient = () => {
        setAddmore(true);
        let length = varientsArray.length;
        if (length > 0) {
            setSpecificationSame(true);
        }
        let product_details = [
            {
                key: "",
                value: ""
            }];
        let specifications = [{
            key: "",
            value: [
                {
                    spec: "",
                    field: "",
                },
            ],
        }];
        product.varient_data.index = length + 1;
        product.varient_data.product_details = product_details;
        product.varient_data.specifications = specifications;
        product.varient_data.productPictures = [];
        varientsArray.push({ ...product.varient_data });
        setvarientdetails(varientsArray);
        setTimeout(() => {
            setAddmore(false);
        }, 1000);
        setNumber(count + 1);//for rerendering
    }
    // delete varient
    const deleteVarient = (index) => {
        for (let i = 0; i < varientsArray.length; i++) {
            if (varientsArray[i].index === index) {
                varientsArray.splice(i, 1);
            }
        }
        setvarientdetails(varientsArray);
        alert("Deleted succesfully");
        setNumber(count + 1);//for rerendering
    }
    //for texting in varients
    const handleChange = (name, value, index) => {
        if (name === "orginal_price") {
            varientsArray[index].orginal_price = value;
        }
        if (name === "selling_price") {
            varientsArray[index].selling_price = value;
        }
        if (name === "varient_name") {
            varientsArray[index].varient_name = value;
        }
        if (name === "availabile_qty") {
            varientsArray[index].availabile_qty = value;
        }
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }





    //   **************************** Add Image *********************************************
    const ImageUpload = (index) => {
        setImageUpload(true);
        setIndexImage(index);
    }
    const imageModalaclose = () => {
        setImageUpload(false);
    }
    const onSumbitImage = (image) => {
        let imageArray = varientsArray[indeximage].productPictures;
        imageArray.push(image);
        varientsArray[indeximage].productPictures = imageArray;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    const removeImage = (image, index) => {
        let array = varientsArray[index].productPictures;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === image) {
                array.splice(i, 1);
            }
        }
        varientsArray[indeximage].productPictures = array;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }



    // *************************************************** Specification **********************************************
    //for specification and textchange in spec values 
    const handleChangeforSpecValue = (name, value, index, mainindex, varientIndex) => {
        let specs = varientsArray[varientIndex].specifications;
        let valuesArray = specs[mainindex].value;

        if (name === "field") {
            valuesArray[index].field = value;
        }
        if (name === "spec") {
            valuesArray[index].spec = value;
        }

        specs[mainindex].value = valuesArray;
        varientsArray[varientIndex].specification = specs;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    //for specification and add spec values or spec subtexts
    const removeSpecValue = (index, mainindex, varientIndex) => {
        let specs = varientsArray[varientIndex].specifications;
        let remove_array = specs[mainindex].value;
        remove_array.splice(index, 1);
        specs[mainindex].value = remove_array;
        varientsArray[varientIndex].specifications = specs;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    //add specification subtexts
    const addSpecValue = (index, mainindex, varientIndex) => {
        let specs = varientsArray[varientIndex].specifications;
        let valueArray = specs[mainindex].value;
        valueArray.push(
            {
                spec: "",
                field: "",
            },
        );
        specs[mainindex].value = valueArray;
        varientsArray[varientIndex].specifications = specs;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    //for specification and atext change in spec keys or spec head
    const handleChangeforSpecKey = (value, index, varientIndex) => {
        let specs = varientsArray[varientIndex].specifications;
        specs[index].key = value;
        varientsArray[varientIndex].specifications = specs;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    //paste specs old one
    const sameSpecs = (varientIndex) => {
        let specs = [...varientsArray[0].specifications];
        let myarray = [];
        for (let item of specs) {
            let newarray = [];
            let obj = {};
            for (let i = 0; i < item.value.length; i++) {
                newarray.push({ ...item.value[i] });
            }
            obj.value = [...newarray];
            obj = {
                ...obj,
                key: item.key
            }
            myarray.push({ ...obj });
        }
        varientsArray[varientIndex].specifications = myarray;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    // add specifications
    const addSpecs = (varientIndex) => {
        let specs = varientsArray[varientIndex].specifications;
        let specifications = {
            key: "",
            value: [
                {
                    spec: "",
                    field: "",
                },
            ],
        };
        specs.push(specifications);
        varientsArray[varientIndex].specifications = specs;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    // Delete specifications
    const removeSpecs = (index, varientIndex) => {
        let specs = varientsArray[varientIndex].specifications;
        specs.splice(index, 1);
        varientsArray[varientIndex].specifications = specs;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    //for spec values
    const renderSpecValuesArray = (specvalues, index, varientIndex) => {
        let myvalueArray = [];
        if (specvalues) {
            for (let j = 0; j < specvalues.length && specvalues.length > 0 && specvalues.length; j++) {
                myvalueArray.push(
                    <Row style={{ width: "100%", margin: 'auto' }} key={j}>
                        <Col md={4} className='specvalue'>
                            <input type="text" className="form-control" placeholder="Name" value={specvalues[j].spec}
                                onChange={(e) => handleChangeforSpecValue("spec", e.target.value, j, index, varientIndex)}></input>
                        </Col >
                        <Col md={4} className='specvalue'>
                            <input type="text" className="form-control" placeholder="Value" value={specvalues[j].field}
                                onChange={(e) => handleChangeforSpecValue("field", e.target.value, j, index, varientIndex)}></input>
                        </Col >
                        <Col md={4} className='specvalue specvalue_delete' >
                            <p className='addicon' > <AiOutlinePlus onClick={() => addSpecValue(j, index, varientIndex)} /> </p>
                            <p className='deleteicon'> <MdDelete onClick={() => removeSpecValue(j, index, varientIndex)} /> </p>
                        </Col >
                    </Row>
                );
            }
        }
        return myvalueArray;
    }
    //for specs
    const renderSpecsArray = useCallback((index) => {
        let myspecArray = [];
        let specs = varientsArray[index].specifications;
        for (let i = 0; specs && i < specs.length; i++) {
            myspecArray.push(
                <div className='specifications'>
                    <Row className='' key={i} style={{ width: "100%", margin: 'auto' }}>
                        <input type="text" className="form-control" placeholder="Specification" value={specs[i].key}
                            onChange={(e) => handleChangeforSpecKey(e.target.value, i, index)}></input>
                    </Row>
                    {renderSpecValuesArray(specs[i].value, i, index)}
                    <Row className='delete_spec'>
                        <p onClick={() => removeSpecs(i, index)}> Delete </p>
                    </Row>
                </div>
            )
        }
        return myspecArray;
    }, [count])





    // ******************************************** Product Detail*************************************
    //  for details add
    const addvalueInput = (varientIndex) => {
        let varient = varientsArray[varientIndex];
        let details = varient.product_details;
        details.push({
            key: "", value: ""
        });
        varient.product_details = details;
        varientsArray[varientIndex] = varient;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    //for details delete
    const removeDetails = (index, varientIndex) => {
        let details = varientsArray[varientIndex].product_details;
        details.splice(index, 1);
        varientsArray[varientIndex].product_details = details;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    // content change in dettail text
    const handleChangeDetails = (value, detailIndex, name, varientIndex) => {
        let details = varientsArray[varientIndex].product_details;
        if (name === "value") {
            details[detailIndex].value = value;
        }
        if (name === "key") {
            details[detailIndex].key = value;
        }
        varientsArray[varientIndex].product_details = details;
        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    // for product details
    const renderDetails = useCallback((index) => {
        let myArray = [];
        let details = varientsArray[index].product_details;
        if (details) {
            for (let j = 0; j < details.length; j++) {
                myArray.push(
                    <Row style={{ marginTop: 5 }} key={j}>
                        <Col md={4} className=''>
                            <input type="text" className="form-control" placeholder=" Key" value={details[j].key}
                                onChange={(e) => handleChangeDetails(e.target.value, j, "key", index)}></input>
                        </Col >
                        <Col md={4} className=''>
                            <input type="text" className="form-control" placeholder=" Value" value={details[j].value}
                                onChange={(e) => handleChangeDetails(e.target.value, j, "value", index)}></input>
                        </Col >
                        <Col md={4}  >
                            <p className='deleteicon' > <MdDelete onClick={() => removeDetails(j, index)} /> </p>
                        </Col >
                    </Row>
                );
            }
        }
        return myArray;
    }, [count]);




    // ************************************************* renderExtafields ************************************
    //selecting attribute value
    const selectValue = (e, index, key) => {
        // assign 
        let obj = varientsArray[index];
        console.log(varientsArray[index], "object");
        obj[key] = e.target.value;


        setvarientdetails(varientsArray);
        setNumber(count + 1);//for rerendering
    }
    const renderExtafields = (index) => {
        let myArray = [];
        if (product.attributesall && product.attributesall.length > 0) {
            for (let i = 0; i < product.attributesall.length; i++) {
                myArray.push(
                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>{product.attributesall[i].key}</label>
                        </Col>
                        <Col md={8}>
                            <select class="form-select" aria-label="Default select example"
                                value={varientsArray[index][product.attributesall[i].key]}
                                onChange={(e) => selectValue(e, index, product.attributesall[i].key)}
                            >
                                <option selected>Select One</option>
                                {product.attributesall[i].value.map((option) => (
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





    // **************************************** Render Varient ****************************************
    const renderbody = useMemo(() => {
        let myarray = [];
        for (let i = 0; i < varientsArray.length; i++) {
            myarray.push(
                <div className="varient_details">
                    <Row className="form-row margin-2-res">
                        {varientsArray[i].productPictures &&
                            varientsArray[i].productPictures.map((picture) => (
                                <Col md={2} xs={4} style={{ textAlign: "end" }}>
                                    <Row className="product_images">
                                        <Col xs={9} className="height">
                                            <img src={picture} alt="" />
                                        </Col>
                                        <Col xs={3} className="height">
                                            <p onClick={() => removeImage(picture, i)}> <MdDelete /> </p>
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
                                <Button className="imageadd" variant="secondary" onClick={() => ImageUpload(i)}>Add Image</Button>
                            </Form>
                        </Col>
                    </Row>

                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>Varient Name</label>
                        </Col>
                        <Col md={8}>
                            <input type="text" className="form-control" placeholder="Varient Name" value={varientsArray[i].varient_name}
                                onChange={(e) => handleChange("varient_name", e.target.value, i)}></input>
                        </Col>
                    </Row>

                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>Original Price</label>
                        </Col>
                        <Col md={8}>
                            <input type="number" className="form-control" placeholder="Orginal Price" value={varientsArray[i].orginal_price}
                                onChange={(e) => handleChange("orginal_price", e.target.value, i)}></input>
                        </Col>
                    </Row>

                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>Seller Price</label>
                        </Col>
                        <Col md={8}>
                            <input type="number" className="form-control" placeholder="Sell Price" value={varientsArray[i].selling_price}
                                onChange={(e) => handleChange("selling_price", e.target.value, i)}></input>
                        </Col>
                    </Row>

                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>Available Quantity</label>
                        </Col>
                        <Col md={8} >
                            <input type="number" className="form-control" placeholder="Quantity" value={varientsArray[i].availabile_qty}
                                onChange={(e) => handleChange("availabile_qty", e.target.value, i)}></input>
                        </Col>
                    </Row>

                    {renderExtafields(i)}

                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>Product Details</label>
                        </Col>
                        <Col md={8} >
                            {renderDetails(i)}
                            <p className="addetail" onClick={() => addvalueInput(i)}> Add </p>
                        </Col>
                    </Row>

                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>Product Specifications</label>
                        </Col>
                        <Col md={8} >
                            {renderSpecsArray(i)}
                            <p className="addetail" onClick={() => addSpecs(i)}> Add </p>
                        </Col>
                    </Row>


                    {isSpecsTrue && i !== 0 && <Row className="form-row margin-2-res">
                        <Col md={4}>
                            <label>Same as above Specifications</label>
                        </Col>
                        <Col md={8} >
                            <p className="addetail" onClick={() => sameSpecs(i)}> Yes </p>
                        </Col>
                    </Row>}

                    <Row className="form-row margin-2-res">
                        <Col md={4}>
                        </Col>
                        <Col md={8} >
                            <div className="delete_varient" onClick={() => deleteVarient(varientsArray[i].index)}>
                                <p>Delete Varient</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            );
        }

        return myarray;
    }, [count])

    return (
        <div>
            <Row className="form-row margin-2-res">
                <label style={{ textAlign: "start", margin: "1rem 0px" }}>Add Your Varients </label>
            </Row>
            {renderbody}
            <Row className="form-row margin-2-res">
                <Col md={4}>
                </Col>
                <Col md={8}>
                    <Form className="flex_add" >
                        <div className="add_more" onClick={() => addNewVarient()}>
                            <p>Add More</p>
                        </div>
                        {varientsArray.length > 0 && <Button variant="secondary" onClick={() => saveDetails()}>
                            Save Varients
                        </Button>}
                    </Form>
                    {isaddmoreLoading && <div style={{ marginTop: 5 }}>
                        <Loader />
                    </div>}
                    {issaveLoading && <div style={{ marginTop: 5 }}>
                        <Loader />
                    </div>}
                    {isError && <p className="error_varients">{errmsg}</p>}
                </Col>
            </Row>

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

