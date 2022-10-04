import React, { useState, useEffect } from "react";
import {
  Row,
  Modal,
  Button,
  Container,
  Col
} from 'react-bootstrap';
import './offer.css';

import { Loader } from "../Components/loader";
import { ImageModal } from '../Components/imageModal';

import { addoffer } from "../_Actions/offeractions";
import { miscService } from '../_Service/miscService';

import { useDispatch } from 'react-redux';

import { SketchPicker } from 'react-color';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

export const OfferEdit = (props) => { // initializing
  const { show, handleCloseOfferAdd, title, editdata } = props;
  const dispatch = useDispatch();

  const [show_imageupload, setImageUpload] = useState(false);
  const [errmsg, setErrmsg] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showpicker, setColorpicker] = useState(false);
  const [isError, setError] = useState(false);
  const [mob_banner_array, setMobBanners] = useState([]);
  const [web_banner_array, setWebBanners] = useState([]);
  const [typeOfImage, setType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [offer, setOfferdetails] = useState({});


  useEffect(() => {
    if (editdata && editdata._id) {
      setOfferdetails(editdata);
      setStartDate(new Date(editdata.start_date));
      setEndDate(new Date(editdata.end_date));
    }
  }, [show]);

  // open colorpicker
  const showColorpicker = () => {
    setColorpicker(true);
  }
  const handleClosePicker = () => {
    setColorpicker(false);
  }
  const handleColorChange = (color) => {
    setOfferdetails({
      ...offer,
      background_color: color.hex
    })
  };

  // closemodal
  const handleClose = () => {
    setOfferdetails({})
    setError(false)
  }
  const handleChange = (name, value) => {
    console.log(value, name)
    setOfferdetails({
      ...offer,
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
      setOfferdetails({
        ...offer,
        logo: image
      })
    }
    if (typeOfImage === "banners_web") {
      web_banner_array.push(image);
      setWebBanners(web_banner_array);
      setOfferdetails({
        ...offer,
        web_banners: web_banner_array
      })
    }
    if (typeOfImage === "banners_mob") {
      mob_banner_array.push(image);
      setMobBanners(mob_banner_array);
      setOfferdetails({
        ...offer,
        mobile_banners: mob_banner_array
      })
    }
  }
  // for banner remove
  const removeImage = (image, type) => {
    if (type === "banners_web") {
      let array = offer.web_banners;
      for (let i = 0; i < array.length; i++) {
        if (array[i] === image) {
          array.splice(i, 1);
        }
      }
      setWebBanners(array);
      setOfferdetails({
        ...offer,
        web_banners: array
      })
    }
    if (type === "banners_mob") {
      let array = offer.mobile_banners;
      for (let i = 0; i < array.length; i++) {
        if (array[i] === image) {
          array.splice(i, 1);
        }
      }
      setMobBanners(array);
      setOfferdetails({
        ...offer,
        mobile_banners: array
      })
    }
  }

  const selectDate = (e, value) => {
    console.log(e, "start_date")
    if (value === "end_date") {
      setEndDate(e);
      let milliseconds = e.getTime();
      setOfferdetails({
        ...offer,
        end_date: milliseconds
      })
    }
    if (value === "start_date") {
      setStartDate(e);
      let milliseconds = e.getTime();
      setOfferdetails({
        ...offer,
        start_date: milliseconds
      })
    }
  }

  // submit
  const onSumbitoffer = (offer) => {
    console.log(offer, "offer");

    if (offer.start_date === offer.end_date) {
      setError(true);
      setErrmsg("please select different dates");
      return null;
    }
    if (offer.offer_item < 1) {
      setError(true);
      setErrmsg("offer must be greater than 1");
      return null;
    }
    if (offer.name && offer.start_date && offer.end_date && offer.offer_item) {
      setLoading(true);
      dispatch(addoffer(offer)).then(function (res) {
        setOfferdetails({})
        handleCloseOfferAdd()
        setLoading(false)
      }, function (err) {
        handleCloseOfferAdd()
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
            handleCloseOfferAdd();
            handleClose()
          }
        }
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title> {title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="offeradd">

            {
              offer.logo && <Row className="imagediv">
                <img src={
                  offer.logo
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
                  value={offer.name}
                  onChange={(e) => handleChange("name", e.target.value)}>
                </input>
              </Col>
            </Row>

            <Row className="form-row margin-2-res">
              <Col md={4}>
                <label>Description </label>
              </Col>
              <Col md={8}>
                <textarea type="textarea" className="form-control" placeholder="Description"
                  value={offer.description}
                  onChange={(e) => handleChange("description", e.target.value)}>
                </textarea >
              </Col>
            </Row>

            <Row className="form-row margin-2-res">
              <Col md={4}>
                <label>Thumbnail </label>
              </Col>
              <Col md={8}>
                <textarea type="textarea" className="form-control" placeholder="Thumbnail"
                  value={offer.thumb_nail}
                  onChange={(e) => handleChange("thumb_nail", e.target.value)}>
                </textarea >
              </Col>
            </Row>

            <Row className="form-row margin-2-res">
              <Col md={4}>
                <label>Offer Price </label>
              </Col>
              <Col md={8}>
                <input type="text" className="form-control" placeholder="Offer %"
                  value={offer.offer_item}
                  onChange={(e) => handleChange("offer_item", e.target.value)}>
                </input>
              </Col>
            </Row>

            <Row className="form-row margin-2-res">
              <Col md={4}>
                <label>Start Date </label>
              </Col>
              <Col md={8}>
                <DatePicker
                  selected={startDate}
                  onChange={(e) => selectDate(e, "start_date")}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </Col>
            </Row>

            <Row className="form-row margin-2-res">
              <Col md={4}>
                <label>End Date </label>
              </Col>
              <Col md={8}>
                <DatePicker
                  selected={endDate}
                  onChange={(e) => selectDate(e, "end_date")}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
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
                      backgroundColor: offer.background_color,
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
                    offer.background_color
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
                  offer.mobile_banners && offer.mobile_banners.map((images) => (
                    <Row >
                      <div className="container" style={{marginTop:"1rem"}}>
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
                  offer.web_banners && offer.web_banners.map((images) => (
                    <Row >
                      <div className="container" style={{marginTop:"1rem"}}>
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
              () => onSumbitoffer(offer)
            }>Save</Button>
        </Modal.Footer>
      </Modal>


      <ImageModal show={show_imageupload}
        title="Add offer Logo"
        imageModalaclose={imageModalaclose}
        onSumbitImage={
          (image) => onSumbitImage(image)
        } />

    </>


  )
}
