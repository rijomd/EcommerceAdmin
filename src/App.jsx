import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { Toast } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, Sidebar } from './Components';
import { Login, SignUp } from './Container';
import { Home } from './Home';
import { Userlist, User } from './User';
import { MainCategoryList, Category, SubCategoryList, GrandSubCategoryList ,MenuheaderList} from './Category';
import { BrandList } from './Brand';
import { ProductsList, ProductSingleview } from './Products';
import { HomeSlidebar } from './HomeDetails';
import { ProductListhome } from './productListHome';
import { Product_attribute } from './Product_Attributes';
import { OfferList, OfferItemList } from './Offer';

import { alertActions } from "./_Actions/alertactions";


// ******************************************************************//
const App = () => {

    const [isLogin, setChange] = useState(false);
    const [isError, setError] = useState(false);

    const misc = useSelector(state => state.misc);
    const auth = useSelector(state => state.auth);
    const alert = useSelector(state => state.alert);

    useEffect(() => {
        console.log("haai")
        if (localStorage.getItem("user")) {
            console.log("login")
            let user = JSON.parse(localStorage.getItem("user"));
            let token = localStorage.getItem("token");

            console.log(user, "logineduser", token)
            if (user.phone) {
                setChange(true)
            }
        }
        if (window.location.pathname === "/login" || window.location.pathname === "/signup") {
            setChange(false)
        }
    }, [auth.user]);

    useEffect(() => {
        console.log("error", alert.isError);
        console.log("message", alert.message);
        setError(alert.isError);
    }, [alert.message]);

    const dispatch = useDispatch();
    const toggleClose = () => {
        setError(false);
        dispatch(alertActions.error("empty"));
    }


    return (
        <div className="App" style={{ height: "95vh" }}>
            <div style={{ height: "100%" }}>
                <Router> {
                    isLogin && <Header></Header>
                }
                    {
                        isLogin && misc.isMenuopen && <Sidebar></Sidebar>
                    }
                    {
                        isError && <div className="alert_error"></div>
                    }
                    {
                        isError && <Toast onClose={toggleClose}>
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">Shows Error</strong>
                                <small>now</small>
                            </Toast.Header>
                            <Toast.Body style={
                                {
                                    color: "red",
                                    fontSize: "12px"
                                }
                            }>
                                {
                                    alert.message
                                }</Toast.Body>
                        </Toast>
                    }
                    <ToastContainer
                    // autoClose={1000}
                    />

                    <div className="Router_content">
                        <Routes>

                            {/* ************************************* */}
                            <Route exact path="/"
                                element={
                                    <PrivateRoutes><Home /></PrivateRoutes>
                                } />
                            <Route path="/home"
                                element={
                                    <PrivateRoutes><Home /></PrivateRoutes>
                                } />




                            {/* ************************************* */}
                            <Route path="/userlist"
                                element={
                                    <PrivateRoutes><Userlist /></PrivateRoutes>
                                } />
                            <Route path="/user/:id"
                                element={
                                    <PrivateRoutes><User /></PrivateRoutes>
                                } />
                            <Route path="/homeslidebar"
                                element={
                                    <PrivateRoutes><HomeSlidebar /></PrivateRoutes>
                                } />



                            {/* ************************************* */}
                            <Route path="/maincategorylist"
                                element={
                                    <PrivateRoutes><MainCategoryList /></PrivateRoutes>
                                } />
                            <Route path="/subcategorylist"
                                element={
                                    <PrivateRoutes><SubCategoryList /></PrivateRoutes>
                                } />
                            <Route path="/grandsubcategorylist"
                                element={
                                    <PrivateRoutes><GrandSubCategoryList /></PrivateRoutes>
                                } />
                            <Route path="/category/:id"
                                element={
                                    <PrivateRoutes><Category /></PrivateRoutes>
                                } />
                            <Route path="/brandList"
                                element={
                                    <PrivateRoutes><BrandList /></PrivateRoutes>
                                } />
                            <Route path="/menuheaderList"
                                element={
                                    <PrivateRoutes><MenuheaderList /></PrivateRoutes>
                                } />


                            {/* ************************************* */}
                            <Route path="/productlist"
                                element={
                                    <PrivateRoutes><ProductsList /></PrivateRoutes>
                                } />
                            <Route path="/product/:id"
                                element={
                                    <PrivateRoutes><ProductSingleview /></PrivateRoutes>
                                } />
                            <Route path="/ProductListhome"
                                element={
                                    <PrivateRoutes><ProductListhome /></PrivateRoutes>
                                } />

                            <Route path="/product_attribute"
                                element={
                                    <PrivateRoutes><Product_attribute /></PrivateRoutes>
                                } />


                            {/* ************************************* */}
                            <Route exact path="/login"
                                element={<Login />} />
                            <Route exact path="/signup"
                                element={<SignUp />} />



                            {/* ************************************* */}
                            <Route path="/offerlist"
                                element={
                                    <PrivateRoutes><OfferList /></PrivateRoutes>
                                } />
                            <Route path="/offeritems"
                                element={
                                    <PrivateRoutes><OfferItemList /></PrivateRoutes>
                                } />
                        </Routes>
                    </div>
                </Router>
            </div>
        </div>
    );
};

function PrivateRoutes({
    children,
    ...rest
}) {
    return localStorage.getItem("user") ? children : <Navigate to="/login" />;
}

export default App;
