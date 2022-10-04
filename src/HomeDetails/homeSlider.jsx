import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { ImageModal } from '../Components/imageModal';
import { Card, Container, Row, Col,Button } from 'react-bootstrap';
import "./homedetail.css"
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { OptionsAdd, OptionsList } from "../_Actions/optionsactions";
import { Loader } from "../Components/loader";

export const HomeSlider = () => {

    let query = {
        pageVo: {
            pageNo: 1,
            noOfItems: 15,
        },
        status: 1,
        key: "slider"
    };
    const dispatch = useDispatch();
    const options = useSelector(state => state.options);
    const [isloading, setLoading] = useState(false);
    const [count, setNumber] = useState(0);
    const [slider, setslider] = useState(
        {
            key: "slider",
            valueobject: [
                {
                    name: "",
                    image: "",
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
                setslider(res);
                setNumber(count + 1);//for rerendering
            }
        })
    }, [options.optionsData]);
    const [index_image, setImageIndex] = useState("");
    const [isUpload_true, setImageUpload] = useState(false);
    //add name
    const handleChange = (value, index) => {
        console.log(value, index, "index");
        slider.valueobject[index].name = value;
        setslider(slider);
        setNumber(count + 1);//for rerendering
        console.log(slider);
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
        slider.valueobject[index_image].image = image;
        setslider(slider);
        setNumber(count + 1);//for rerendering
    }
    //delete an item
    const removeSlider = (index) => {
        console.log(index);
        let remove_array = slider.valueobject;
        remove_array.splice(index, 1);
        slider.valueobject = remove_array;
        setslider(slider);
        setNumber(count + 1);//for rerendering
    };

    //add slide
    const addSlider = () => {
        let add_array = slider.valueobject;
        console.log(add_array, "add_array")
        add_array.push({ name: "", image: "" });
        slider.valueobject = add_array;
        setslider(slider);
        console.log(slider, "slider")
        setNumber(count + 1);//for rerendering
    }

    const renderitem = useMemo(() => {
        let myslider = [];
        if (slider && slider.valueobject && slider.valueobject.length > 0) {
            let valuearray = slider.valueobject;
            console.log(valuearray, "valuearray")

            for (let j = 0; j < valuearray.length; j++) {
                myslider.push(
                    <Row className='m-4' key={j}>
                        <Col md={3} className='margin-2'>
                            <input type="text" className="form-control" placeholder="Name" value={valuearray[j].name}
                                onChange={(e) => handleChange(e.target.value, j)}></input>
                        </Col>
                        {!valuearray[j].image && <Col md={3} className='margin-2'>
                            <Container className='gallery' onClick={() => ImageUpload(j)} >
                                <p style={{ marginBottom: 0 }}> <AiOutlinePlus /> </p>
                                <p> Add Image </p>
                            </Container>
                        </Col>}
                        {valuearray[j].image && <Col md={3} className='margin-2'>
                            <Container className='option' >
                                <img src={valuearray[j].image} onClick={() => ImageUpload(j)} />
                            </Container>
                        </Col>}
                        <Col md={3} className=' option' >
                            <p onClick={() => removeSlider(j)}> <MdDelete /> </p>
                        </Col>
                    </Row>
                );
            }
        }
        return myslider;

    }, [count]);


    //savedata
    const SaveAllsliders = () => {
        setLoading(true);
        dispatch(OptionsAdd(slider));
        setLoading(false);
    }


    return (
        <Col >
            <Row >
                {isloading && <Loader />}
            </Row>

            {renderitem}
            <Row className='delete'>
                <p onClick={() => addSlider()}> <AiOutlinePlus /> </p>
            </Row>

            <Row className='m-4'>
                <Button variant="primary sm" onClick={() => SaveAllsliders()}>Save</Button>
            </Row>


            <ImageModal
                show={isUpload_true}
                title="Add slider Image"
                imageModalaclose={imageModalaclose}
                onSumbitImage={(image) => onSumbitImage(image)}
            />
        </Col >
    )
}
