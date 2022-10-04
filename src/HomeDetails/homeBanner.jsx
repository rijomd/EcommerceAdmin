import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { ImageModal } from '../Components/imageModal';
import { Button, Row, Container, Col } from 'react-bootstrap';
import "./homedetail.css"
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { OptionsAdd, OptionsList } from "../_Actions/optionsactions";
import { Loader } from "../Components/loader";

export const HomeBanner = () => {

    let query = {
        pageVo: {
            pageNo: 1,
            noOfItems: 15,
        },
        status: 1,
        key: "banner"
    };
    const dispatch = useDispatch();
    const options = useSelector(state => state.options);
    const [isloading, setLoading] = useState(false);
    const [count, setNumber] = useState(0);

    const [banner, setBanner] = useState(
        {
            key: "banner",
            valueobject: [
                {
                    name: "",
                    image: "",
                    ismobile: false,
                    product: {}
                },
            ],
        }
    );

    //setting in states
    useEffect(() => {
        setLoading(true);
        dispatch(OptionsList(query)).then(function (res) {
            setLoading(false);
            if (res) {
                console.log(res, "res");
                setBanner(res);
                setNumber(count + 1);//for rerendering
            }
        })

    }, [options.optionsData]);
    const [index_image, setImageIndex] = useState("");
    const [isUpload_true, setImageUpload] = useState(false);

    //add name
    const handleChange = (value, index) => {
        console.log(value, index, "index");
        banner.valueobject[index].name = value;
        setBanner(banner);
        setNumber(count + 1);//for rerendering
        console.log(banner);
    }

    //for image
    const ImageUpload = (index) => {
        setImageIndex(index);
        setImageUpload(true);
    }
    const imageModalaclose = () => {
        setImageUpload(false);
    }
    const onSumbitImage = (image) => {
        banner.valueobject[index_image].image = image;
        setBanner(banner);
        setNumber(count + 1);//for rerendering
    }
    //delete an item
    const removeBanner = (index) => {
        console.log(index);
        let remove_array = banner.valueobject;
        remove_array.splice(index, 1);
        banner.valueobject = remove_array;
        setBanner(banner);
        setNumber(count + 1);//for rerendering
    };

    //add slide
    const addbanner = () => {
        let add_array = banner.valueobject;
        console.log(add_array, "add_array")
        add_array.push({ name: "", image: "" });
        banner.valueobject = add_array;
        setBanner(banner);
        console.log(banner, "banner")
        setNumber(count + 1);//for rerendering
    }

    const mobileview = (event, index) => {
        let remove_array = banner.valueobject;
        remove_array[index].ismobile = event.target.checked;
        banner.valueobject = remove_array;
        setBanner(banner);
        setNumber(count + 1);//for rerendering
    }

    const renderitem = useMemo(() => {
        let mybanner = [];
        let valuearray = banner.valueobject;
        console.log(valuearray, "11")
        if (banner && banner.valueobject && banner.valueobject.length > 0) {
            let valuearray = banner.valueobject;

            for (let j = 0; j < valuearray.length; j++) {
                mybanner.push(
                    <Row className='m-4' key={j}>
                        <Col md={3} className='margin-2'>
                            <input type="text" className="form-control" placeholder="Name" value={valuearray[j].name}
                                onChange={(e) => handleChange(e.target.value, j)}></input>
                        </Col >
                        {!valuearray[j].image && <Col md={3} className=' margin-2'>
                            <Container className='gallery' onClick={() => ImageUpload(j)} >
                                <p style={{ marginBottom: 0 }}> <AiOutlinePlus /> </p>
                                <p> Add Image </p>
                            </Container >
                        </Col >}
                        {valuearray[j].image && <Col md={3} className='margin-2'>
                            <Container className='option' >
                                <img src={valuearray[j].image} onClick={() => ImageUpload(j)} />
                            </Container >
                        </Col >}
                        <Col md={3} className='option' >
                            <p onClick={() => removeBanner(j)}> <MdDelete /> </p>
                        </Col >
                        <Col md={2} className='option' >
                            <p>In mobile</p>
                            <input
                                type="checkbox"
                                checked={valuearray[j].ismobile}
                                onChange={(event) => mobileview(event, j)}
                            />
                        </Col >
                    </Row>
                );
            }
        }
        return mybanner;

    }, [count]);


    //savedata
    const SaveAllBanners = () => {
        setLoading(true);
        dispatch(OptionsAdd(banner));
        setLoading(false);
    }


    return (
        <div className='col'>
            <Row>
                {isloading && <Loader />}
            </Row>

            {renderitem}
            <Row className='delete'>
                <p onClick={() => addbanner()}> <AiOutlinePlus /> </p>
            </Row>

            <Row className='m-4'>
                <Button variant="primary sm" onClick={() => SaveAllBanners()}>Save</Button>
            </Row>


            <ImageModal
                show={isUpload_true}
                title="Add banner Image"
                imageModalaclose={imageModalaclose}
                onSumbitImage={(image) => onSumbitImage(image)}
            />
        </div >
    )
}
