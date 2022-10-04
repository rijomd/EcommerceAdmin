import React, { useState, useEffect } from "react";
import {
    Row,
    Modal,
    Button,
    Container,
    Col
} from 'react-bootstrap';
import { Loader } from "../Components/loader";
import AsyncSelect from "react-select/async";
import { headers } from '../_helpers/header'
import { api } from '../_helpers/urlConstants';
import { ImageModal } from '../Components/imageModal';
import { addBrand } from "../_Actions/brandaction";
import { useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';

const popover = {
    position: "absolute",
    zIndex: "2"
};
const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
};

export const BrandEdit = (props) => {

    const { show, handleCloseBrandAdd, editdata } = props;
    const [brand, setBrandDetails] = useState({});
    const [brand_category, setselected_category] = useState({});
    const [show_imageupload, setImageUpload] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [isError, setError] = useState(false);
    const [isEdit_true, setEdit_true] = useState(false);
    const [showpicker, setColorpicker] = useState(false);
    const [mob_banner_array, setMobBanners] = useState([]);
    const [web_banner_array, setWebBanners] = useState([]);
    const [typeOfImage, setType] = useState('');

    useEffect(() => {
        if (editdata && editdata._id) {
            console.log(editdata, "editdata")
            if (editdata.category_id) {
                setselected_category({ value: editdata.category_id._id, label: editdata.category_id.name });
            } else {
                setselected_category({})
            }
            setBrandDetails(editdata);
        }
    }, [editdata]);


    // open colorpicker
    const showColorpicker = () => {
        setColorpicker(true);
    }
    const handleClosePicker = () => {
        setColorpicker(false);
    }
    const handleColorChange = (color) => {
        console.log(color, "colors");
        setBrandDetails({
            ...brand,
            background_color: color.hex
        })
    };

    const handleChange = (name, value) => {
        setBrandDetails({
            ...brand,
            [name]: value
        })
    }

    // for image
    const ImageUpload = (type) => {
        setType(type);
        setImageUpload(true);
    }
    const imageModalaclose = () => {
        setImageUpload(false);
    }
    const onSumbitImage = (image) => {
        console.log(typeOfImage, "typeOfImage");
        if (typeOfImage === "logo") {
            setBrandDetails({
                ...brand,
                logo: image
            })
        }
        if (typeOfImage === "banners_web") {
            web_banner_array.push(image);
            setWebBanners(web_banner_array);
            setBrandDetails({
                ...brand,
                web_banners: web_banner_array
            })
        }
        if (typeOfImage === "banners_mob") {
            mob_banner_array.push(image);
            setMobBanners(mob_banner_array);
            setBrandDetails({
                ...brand,
                mobile_banners: mob_banner_array
            })
        }
    }
    // for banner remove
    const removeImage = (image, type) => {
        if (type === "banners_web") {
            let array = brand.web_banners;
            for (let i = 0; i < array.length; i++) {
                if (array[i] === image) {
                    array.splice(i, 1);
                }
            }
            setWebBanners(array);
            setBrandDetails({
                ...brand,
                web_banners: array
            })
        }
        if (type === "banners_mob") {
            let array = brand.mobile_banners;
            for (let i = 0; i < array.length; i++) {
                if (array[i] === image) {
                    array.splice(i, 1);
                }
            }
            setMobBanners(array);
            setBrandDetails({
                ...brand,
                mobile_banners: array
            })
        }
    }

    const getAllparentCategories = async (inputValue) => {
        let response = await fetch(api + "/categoryList", {
            method: "post",
            headers: headers,
            body: JSON.stringify(
                { searchKey: inputValue, status: 1 }
            )
        });
        let object = await response.json();
        let array = object.data.docs;
        console.log(array, "array");
        return array.map(({ _id, name }) => ({ value: _id, label: name }));
    };

    const getCategorySelect = (selectedOption) => {
        console.log(selectedOption, "selectedOption");
        setselected_category({ value: selectedOption.value, label: selectedOption.label });

        setBrandDetails({
            ...brand,
            new_parentid: selectedOption.value
        });
        console.log(brand, "brand");

    }

    const onSumbitEditBrand = (brand) => {
        console.log(brand, "brand");
        if (brand.name && brand._id) {
            setLoading(true);
            setEdit_true(false);
            dispatch(addBrand(brand)).then(function (res) {
                setBrandDetails({})
                handleCloseBrandAdd()
                setLoading(false)
            }, function (err) {
                handleCloseBrandAdd()
                setLoading(false)
            });
        } else {
            setError(true);
            setErrmsg("please fill all details");
        }
    }
    return (
        <>
            <Modal show={show}
                onHide={
                    () => handleCloseBrandAdd()
                }
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="brandadd">

                        {
                            brand.logo && <Row className="imagediv">
                                <img src={
                                    brand.logo
                                } />
                            </Row>
                        }
                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Select Logo</label>
                            </Col>
                            <Col md={8}>
                                <Button variant="secondary"
                                    onClick={
                                        () => ImageUpload("logo")
                                    }>Select Logo</Button>
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Name  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Name"
                                    value={brand.name}
                                    onChange={(e) => handleChange("name", e.target.value)}>
                                </input>
                            </Col>
                        </Row>


                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Select Category  </label>
                            </Col>
                            <Col md={8}>
                                <AsyncSelect value={brand_category}
                                    onChange={getCategorySelect}
                                    placeholder="Select Category"
                                    loadOptions={getAllparentCategories}
                                    defaultOptions />
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Description </label>
                            </Col>
                            <Col md={8}>
                                <textarea  type="textarea" className="form-control" placeholder="Description"
                                    value={brand.description}
                                    onChange={(e) => handleChange("description", e.target.value)}>
                                </textarea >
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Background Color</label>
                            </Col>
                            <Col md={8}>
                                <div style={{ display: 'flex' }}>
                                    <Button variant="secondary"
                                        onClick={showColorpicker}>Pick Color
                                    </Button>
                                    <div style={
                                        {
                                            backgroundColor: brand.background_color,
                                            width: "30px",
                                            marginLeft: '5px',
                                            border: "1px solid #ccc"
                                        }
                                    }>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {
                            showpicker && <Row className="form-row m-4">
                                <div style={popover}>
                                    <div style={cover}
                                        onClick={handleClosePicker} />
                                    <SketchPicker color={
                                        brand.background_color
                                    }
                                        onChange={handleColorChange}
                                        onSwatchHover={
                                            (color, e) => {
                                                console.log("color", color);
                                            }
                                        } />
                                </div>
                            </Row>
                        }


                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Add Mobile Banners</label>
                            </Col>
                            <Col md={8}>
                                <Button variant="secondary"
                                    onClick={
                                        () => ImageUpload("banners_mob")
                                    }>Add Banner</Button>
                            </Col>
                        </Row>
                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                            </Col>
                            <Col md={8}>
                                {
                                    brand.mobile_banners && brand.mobile_banners.map((images) => (
                                        <Row >
                                            <div className="product_images">
                                                <img src={images}
                                                    alt="" />
                                                <i className="far fa-trash-alt"
                                                    onClick={
                                                        () => removeImage(images, "banners_mob")
                                                    }></i>
                                            </div>
                                        </Row>
                                    ))
                                }
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4} >
                                <label>Add Web Banners</label>
                            </Col>
                            <Col md={8}>
                                <Button variant="secondary"
                                    onClick={
                                        () => ImageUpload("banners_web")
                                    }>Add Banner</Button>
                            </Col>
                        </Row>
                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                            </Col>
                            <Col md={8}>
                                {
                                    brand.web_banners && brand.web_banners.map((images) => (
                                        <Row className="product_images">
                                            <Col xs={9}
                                                className="height">
                                                <img src={images}
                                                    style={{ width: "100%" }}
                                                    alt="" />
                                            </Col>
                                            <Col xs={3}
                                                className="height">
                                                <i className="far fa-trash-alt"
                                                    onClick={
                                                        () => removeImage(images, "banners_web")
                                                    }></i>
                                            </Col>
                                        </Row>
                                    ))
                                }
                            </Col>
                        </Row>
                        {
                            isError && <Row className="form-row m-4">
                                <p className="text_danger">
                                    {errmsg}</p>
                            </Row>
                        }
                        {
                            isLoading && <Row className="form-row m-4">
                                <Loader />
                            </Row>
                        } </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={
                            () => onSumbitEditBrand(brand)
                        }>Save</Button>
                </Modal.Footer>
            </Modal>


            <ImageModal show={show_imageupload}
                title="Edit brand Logo"
                imageModalaclose={imageModalaclose}
                onSumbitImage={
                    (image) => onSumbitImage(image)
                } />

        </>


    )
}
