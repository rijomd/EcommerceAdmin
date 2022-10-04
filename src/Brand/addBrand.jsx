import React, { useState } from "react";
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
import "../Category/category.css";
import { addBrand } from "../_Actions/brandaction";
import { useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';


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

export const BrandAdd = (props) => { // initializing
    const { show, handleCloseBrandAdd, title } = props;
    const [selectedOption, setSelectedOption] = useState(null);
    const [show_imageupload, setImageUpload] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [showpicker, setColorpicker] = useState(false);
    const dispatch = useDispatch();
    const [isError, setError] = useState(false);
    const [mob_banner_array, setMobBanners] = useState([]);
    const [web_banner_array, setWebBanners] = useState([]);
    const [typeOfImage, setType] = useState('');

    let duplicate={
        name: "",
        category_id: "",
        logo: "",
        description: '',
        background_color: "#fff",
        mobile_banners: [],
        web_banners: []
    };

    const [brand, setBranddetails] = useState({
        name: "",
        category_id: "",
        logo: "",
        description: '',
        background_color: "#fff",
        mobile_banners: [],
        web_banners: []
    })

    // open colorpicker
    const showColorpicker = () => {
        setColorpicker(true);
    }
    const handleClosePicker = () => {
        setColorpicker(false);
    }
    const handleColorChange = (color) => {
        console.log(color, "colors");
        setBranddetails({
            ...brand,
            background_color: color.hex
        })
    };

    // closemodal
    const handleClose = () => {
        setBranddetails(duplicate)
        setError(false)
    }
    const handleChange = (name, value) => {
        console.log(value, name)
        setBranddetails({
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
            setBranddetails({
                ...brand,
                logo: image
            })
        }
        if (typeOfImage === "banners_web") {
            web_banner_array.push(image);
            setWebBanners(web_banner_array);
            setBranddetails({
                ...brand,
                web_banners: web_banner_array
            })
        }
        if (typeOfImage === "banners_mob") {
            mob_banner_array.push(image);
            setMobBanners(mob_banner_array);
            setBranddetails({
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
            setBranddetails({
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
            setBranddetails({
                ...brand,
                mobile_banners: array
            })
        }
    }

    // loadoption for category
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
    // selecting category
    const getCategorySelect = (selectedOption) => {
        console.log(selectedOption, "selectedOption");
        setSelectedOption(selectedOption.name);
        setBranddetails({
            ...brand,
            category_id: selectedOption.value
        });
        console.log(brand, "brand");
    }

    // submit
    const onSumbitBrand = (brand) => {
        console.log(brand, "brand");
        if (brand.name) {
            setLoading(true);
            dispatch(addBrand(brand)).then(function (res) {
                setBranddetails(duplicate)
                handleCloseBrandAdd()
                setLoading(false)
            }, function (err) {
                setBranddetails(duplicate)
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
                    () => {
                        handleCloseBrandAdd();
                        handleClose()
                    }
                }
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> {title} </Modal.Title>
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
                                <AsyncSelect className="form-control"
                                    styles={styles}
                                    value={selectedOption}
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
                                <textarea type="textarea" className="form-control" placeholder="Description"
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
                                               <div className="container" style={{ marginTop: "1rem" }}>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="card">
                                                            <img
                                                                src={images}
                                                                className="card-img-top"
                                                                alt="Waterfall"
                                                            />
                                                            <div className="card-body">
                                                                <i className="far fa-trash-alt"
                                                                    onClick={
                                                                        () => removeImage(images, "banners_mob")
                                                                    }></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                        <Row className="">
                                            <div className="container" style={{ marginTop: "1rem" }}>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="card">
                                                            <img
                                                                src={images}
                                                                className="card-img-top"
                                                                alt="Waterfall"
                                                            />
                                                            <div className="card-body">
                                                                <i className="far fa-trash-alt"
                                                                    onClick={
                                                                        () => removeImage(images, "banners_mob")
                                                                    }></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                            () => onSumbitBrand(brand)
                        }>Save</Button>
                </Modal.Footer>
            </Modal>


            <ImageModal show={show_imageupload}
                title="Add brand Logo"
                imageModalaclose={imageModalaclose}
                onSumbitImage={
                    (image) => onSumbitImage(image)
                } />

        </>


    )
}
