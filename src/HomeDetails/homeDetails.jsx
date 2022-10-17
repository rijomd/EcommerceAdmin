import React, { useState, useEffect } from 'react'
import { useMemo } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { HomeBanner } from "./homeBanner"
import { HomeSlider } from "./homeSlider"
import { LoginImage } from "./loginimage"



export const HomeSlidebar = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    //for shows each sections
    const [banner_true, setBanner] = useState(true);
    const [slider_true, setSlider] = useState(false);
    const [login_image, setLoginImage] = useState(false);
    const [btnColor, setBtnColor] = useState("Homme Banner");

    // const [myarray, setMyarray] = useState([]);
    // useEffect(() => {
    //     let heaersArray = ["Homme Banner", "Home Slider", "login Image"];
    //     console.log(heaersArray, "jjj");
    //     let arrays = [];
    //     for (let i = 0; i < heaersArray.length; i++) {
    //         console.log(heaersArray[i], "jjj")
    //         let btnClass = false;
    //         if (btnColor === heaersArray[i]) {
    //             btnClass = true;
    //         }
    //         arrays.push(
    //             <Row className="col-md-3" onClick={() => openSection(i)}>
    //                 <p className={btnClass ? "btnClass_clicked" : ""}>{heaersArray[i]}</p>
    //             </Row>
    //         )
    //     }
    //     setMyarray(arrays)
    // }, []);

    const renderDetails = useMemo(() => {
        let heaersArray = ["Homme Banner", "Product Banners", "login Image"];
        let arrays = [];
        for (let i = 0; i < heaersArray.length; i++) {
            let btnClass = false;
            if (btnColor === heaersArray[i]) {
                btnClass = true;
            }
            arrays.push(
                <Row className="col-md-3" onClick={() => openSection(i)}>
                    <p className={btnClass ? "btnClass_clicked" : ""}>{heaersArray[i]}</p>
                </Row>
            )
        }
        return arrays;
    },[btnColor]);

    const openSection = (index) => {
        console.log(index);
        if (index === 0) {
            console.log("HommeBanner");
            setSlider(false);
            setLoginImage(false);
            setBanner(true);
            setBtnColor("Homme Banner");
        }
        if (index === 1) {
            setBanner(false);
            setLoginImage(false);
            setSlider(true);
            setBtnColor("Product Banners");
        }
        if (index === 2) {
            setSlider(false);
            setBanner(false);
            setLoginImage(true);
            setBtnColor("login Image");
        }
    }

    return (
        <div className="min-height">
            <Container className="mt-3 mb-4 ">
                <Card >
                    <Card.Body>
                        <Row >
                            <Col md={9}> <p>Home Details</p></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

            <Container className="mt-3 mb-4  ">
                <Card >
                    <Card.Body>
                        <Row className="home_details">
                            {renderDetails}
                        </Row>
                        {banner_true && <Row className="home_details_sub">
                            <HomeBanner />
                        </Row>}

                        {slider_true && <Row className="home_details_sub">
                            <HomeSlider />
                        </Row>}
                        {login_image && <Row className="home_details_sub">
                            <LoginImage />
                        </Row>}
                    </Card.Body>
                </Card>

            </Container>

        </div>
    )
}
