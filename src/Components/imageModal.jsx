import React, { useRef, useState, useEffect, useMemo  } from "react";
import { Row, Modal, Button, Col } from 'react-bootstrap';
import { miscActions } from "../_Actions/miscactions";
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from "../Components/loader";
// import { ImageList } from '../Components/ImageList';
import "./component.css";

export const ImageModal = (props) => {

    const inputRef = useRef(null);
    const { show, imageModalaclose, onSumbitImage, title, ismulti } = props;

    const misc = useSelector(state => state.misc);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [imagearray, setImageArray] = useState([]);
    const [selected, setStyle] = useState(false); //style change
    const [image_id, setimageid] = useState(0); //compare image id
    const [image, setImage] = useState();

    //listing data
    useEffect(() => {
        console.log(auth.user, "user")
        if (auth.user) {
            let id = auth.user._id;
            dispatch(miscActions.imageList({ user_id: id })).then(
                function (res) {
                    console.log(res, "resss")
                    setImageArray(res);
                }
            )
        }

    }, [misc.imageData]);
    console.log("dataaa", misc.imageData)
    //upload images
    const onFileChange = (event) => {
        console.log(event.target, "event");
        if (!event.target.files[0]) {
            return null;
        }
        setLoading(true);
        dispatch(miscActions.fileUpload(event.target.files[0], event.target.files[0].name)).then(function (res) {
            if (res.image) {
                onSumbitImage(res.image);
                imageModalaclose();
            }
        })
    };

    const onButtonClick = () => {
        inputRef.current.click();
    }
    const selectitem = (image) => {
        setStyle(true);
        setimageid(image._id);
        setImage(image.image);
    }
    const changeFile = () => {
        if (image) {
            onSumbitImage(image);
            imageModalaclose();
        }
    }
    const render_Imagelist = (imageArray) => {
        // imageArray.map((item) => {
        //     console.log(item)
        //     return (<Col key={item._id} md={4}>
        //         <div className="singleImage">
        //             <img src={item.image} />
        //         </div>
        //     </Col>)
        // }); 
        let image_Array = [];
        for (let image of imageArray) {
            image_Array.push(
                <div className={"col-4 singleImage " + (selected && image_id == image._id ? "selected_imagemodal" : "")} onClick={() => selectitem(image)}>
                    <img src={image.image} />
                </div>
            )
        }
        return image_Array;
    }

    return (
        <>
            <Modal
                className="my-modal"
                show={show}
                onHide={() => imageModalaclose()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <ImageList /> */}
                    <Row className="form m-4">
                        <p>Select Your Listing Images</p>
                    </Row>
                    {imagearray && imagearray.length > 0 && <Row className="m-2">
                        {render_Imagelist(imagearray)}
                    </Row>}
                    <Row className="form m-4">
                        <Button onLoad={isLoading} variant="secondary" onClick={changeFile}>Save</Button>
                    </Row>

                    <Row className="form m-4">
                        <p style={{ textAlign: "center" }}>..........or.............</p>
                    </Row>

                    <Row className="form m-4">
                        <p >Upload New Image</p>
                    </Row>
                    <input
                        style={{ display: "none" }}
                        ref={inputRef}
                        type="file"
                        onChange={(e) => onFileChange(e)}
                    />
                    <Row className="form m-4"
                        onClick={(e) => {
                            e.preventDefault();
                            onButtonClick();
                        }}
                    >
                        <Button onLoad={isLoading} variant="secondary">Upload</Button>
                    </Row>
                    {/* {isLoading && <Row className="form m-4">
                            <Loader />
                        </Row>} */}
                </Modal.Body>
            </Modal>
        </>
    )
};
