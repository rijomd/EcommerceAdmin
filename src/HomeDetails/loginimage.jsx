import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Container, } from 'react-bootstrap';
import { ImageModal } from '../Components/imageModal';
import { OptionsAdd, OptionsList } from "../_Actions/optionsactions";
import { Loader } from "../Components/loader";
import "./homedetail.css"

export const LoginImage = () => {

    const dispatch = useDispatch();
    const options = useSelector(state => state.options);

    const [isloading, setLoading] = useState(false);
    const [isUpload_true, setImageUpload] = useState(false);
    const [loginImage, setImage] = useState(
        {
            key: "loginimage",
            valueobject: [
                { image: "" }
            ]
        }
    );

    //setting in states
    useEffect(() => {
        setLoading(true);
        dispatch(OptionsList({ status: 1, key: "loginimage" }, "login")).then(function (res) {
            setLoading(false);
            if (res.length > 0) {
                setImage(res[0]);
            }
        })

    }, [options.optionsData]);

    //for image
    const ImageUpload = (index) => {
        setImageUpload(true);
    }
    const imageModalaclose = () => {
        setImageUpload(false);
    }
    const onSumbitImage = (image) => {
        loginImage.valueobject[0].image = image;
        setImage(loginImage);
    }
    //savedata
    const saveLoginImage = () => {
        setLoading(true);
        dispatch(OptionsAdd(loginImage));
        setLoading(false);
    }

    return (
        <>
            <Container className='' >
                <Row >
                    {isloading && <Loader />}
                </Row>
                <Row className='m-4'>
                    {loginImage.valueobject && <img className='login_image_web' src={loginImage.valueobject[0].image} />}
                    <Button variant="secondary sm" onClick={() => ImageUpload()}>Add Logo</Button>
                </Row>
                <Row className='m-4'>
                    <Button variant="primary sm" onClick={() => saveLoginImage()}>Save</Button>
                </Row>
            </Container >
            <ImageModal
                show={isUpload_true}
                title="Add banner Image"
                imageModalaclose={imageModalaclose}
                onSumbitImage={(image) => onSumbitImage(image)}
            />
        </>
    )
}
