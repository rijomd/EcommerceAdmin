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
import "./category.css";
import { categorysAdd } from "../_Actions/categoryactions";
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

export const GrandSubCategoryAdd = (props) => { // initializing
    const { show, handleCloseCategoryAdd, title } = props;

    let duplicate = {
        name: "",
        parent_id: "",
        image: "",
        background_color: "#fff",
        home_visibility: false,
        description: "",
        type: 3,
        mobile_banners: [],
        web_banners: []
    };
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

    const [category, setcategorydetails] = useState({
        name: "",
        parent_id: "",
        image: "",
        background_color: "#fff",
        home_visibility: false,
        description: "",
        type: 3,
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
        setcategorydetails({
            ...category,
            background_color: color.hex
        })
    };

    // closemodal
    const handleClose = () => {
        setcategorydetails(duplicate)
        setError(false)
    }
    const handleChange = (name, value) => {
        console.log(value, name)
        setcategorydetails({
            ...category,
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
            setcategorydetails({
                ...category,
                image: image
            })
        }
        if (typeOfImage === "banners_web") {
            web_banner_array.push(image);
            setWebBanners(web_banner_array);
            setcategorydetails({
                ...category,
                web_banners: web_banner_array
            })
        }
        if (typeOfImage === "banners_mob") {
            mob_banner_array.push(image);
            setMobBanners(mob_banner_array);
            setcategorydetails({
                ...category,
                mobile_banners: mob_banner_array
            })
        }
    }
    // for banner remove
    const removeImage = (image, type) => {
        if (type === "banners_web") {
            let array = category.web_banners;
            for (let i = 0; i < array.length; i++) {
                if (array[i] === image) {
                    array.splice(i, 1);
                }
            }
            setWebBanners(array);
            setcategorydetails({
                ...category,
                web_banners: array
            })
        }
        if (type === "banners_mob") {
            let array = category.web_banners;
            for (let i = 0; i < array.length; i++) {
                if (array[i] === image) {
                    array.splice(i, 1);
                }
            }
            setMobBanners(array);
            setcategorydetails({
                ...category,
                mobile_banners: array
            })
        }
    }

    // loadoption for parent
    const getAllparentCategories = async (inputValue) => {
        let response = await fetch(api + "/categoryList", {
            method: "post",
            headers: headers,
            body: JSON.stringify(
                { searchKey: inputValue, type: 2, status: 1 }
            )
        });
        let object = await response.json();
        let array = object.data.docs;
        return array.map(({ _id, name }) => ({ value: _id, label: name }));
    };
    // selecting parent
    const getCategorySelect = (selectedOption) => {
        setSelectedOption(selectedOption.name);
        setcategorydetails({
            ...category,
            parent_id: selectedOption.value
        });
    }

    // submit
    const onSumbitcategory = (category) => {

        if (!category.name) {
            setError(true);
            setErrmsg("Please enter name");
            return null;
        }
        if (!category.image) {
            setError(true);
            setErrmsg("Please select logo");
            return null;
        }
        if (!category.parent_id) {
            setError(true);
            setErrmsg("Please select parent category");
            return null;
        }

        if (category.name && category.image) {
            setLoading(true);
            dispatch(categorysAdd(category)).then(function (res) {
                setcategorydetails(duplicate)
                handleCloseCategoryAdd()
                setLoading(false);
                setErrmsg("");
            }, function (err) {
                setcategorydetails(duplicate)
                handleCloseCategoryAdd()
                setLoading(false);
                setErrmsg("");
            });
        }
    }

    return (
        <>
            <Modal show={show}
                onHide={
                    () => {
                        handleCloseCategoryAdd();
                        handleClose()
                    }
                }
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="categoryadd">

                        {
                            category.image && <Row className="imagediv">
                                <img src={
                                    category.image
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
                                    value={category.name}
                                    onChange={(e) => handleChange("name", e.target.value)}>
                                </input>
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Select Parent  </label>
                            </Col>
                            <Col md={8}>
                                <AsyncSelect className="form-control"
                                    styles={styles}
                                    value={selectedOption}
                                    onChange={getCategorySelect}
                                    placeholder="Select Parent"
                                    loadOptions={getAllparentCategories}
                                    defaultOptions />
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Description </label>
                            </Col>
                            <Col md={8}>
                                <textarea type="textArea" className="form-control" placeholder="Description"
                                    value={category.description}
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
                                            backgroundColor: category.background_color,
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
                            showpicker && <Row className="form-row margin-2-res">
                                <div style={popover}>
                                    <div style={cover}
                                        onClick={handleClosePicker} />
                                    <SketchPicker color={
                                        category.background_color
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
                        {/* 
                        <Row className="form-row margin-2-res">
                            <Col md={4} xs={4}>
                                <label style={{ paddingRight: "5px" }}>Visible in home</label>
                            </Col>
                            <Col md={8} xs={4}>
                                <label style={{ paddingRight: "5px" }}>Yes</label>
                                <input type="checkbox" className=""
                                    checked={
                                        category.home_visibility
                                    }
                                    onChange={
                                        (e) => handleChange("home_visibility", e.target.checked)
                                    }></input>
                            </Col>
                        </Row> */}

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
                                    category.mobile_banners && category.mobile_banners.map((images) => (
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
                                    category.web_banners && category.web_banners.map((images) => (
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
                            isError && <Row className="form-row margin-2-res">
                                <p className="text_danger">
                                    {errmsg}</p>
                            </Row>
                        }

                        {
                            isLoading && <Row className="form-row m-4">
                                <Loader />
                            </Row>
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={
                            () => onSumbitcategory(category)
                        }>Save</Button>
                </Modal.Footer>
            </Modal>


            <ImageModal show={show_imageupload}
                title="Add Category Logo"
                imageModalaclose={imageModalaclose}
                onSumbitImage={
                    (image) => onSumbitImage(image)
                } />

        </>


    )
}
