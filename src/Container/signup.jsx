import React, { useState, useEffect, useReducer } from "react";
import { Container, Toast } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import {  useDispatch, useSelector } from 'react-redux';
import { userSighnUp } from "../_Actions/authactions";
import { Loader } from "../Components/loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image1 from '../_Images/logo.png';

export const SignUp = () => {
    const navigate = useNavigate();

    const initialState = {
        user: {
            name: "",
            phone: "",
            email: "",
            role: 1,
            password: "",
            confirmpassword: "",
        }
    }

    const signUpReducer = (state, action) => {
        switch (action.type) {
            case 'signup': {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        [action.fieldName]: action.payload,
                    },
                };
            }
        }
    }

    const [state, dispatch] = useReducer(signUpReducer, initialState);
    const { user } = state;

    const dispatchnew = useDispatch();
    const usersign = useSelector(state => state.user);

    const [isSignin, setsignin] = useState(false);
    const [iserror, setError] = useState(false);
    const [error, setErmsg] = useState('');
    const [isPswdmsg, setPasswd] = useState(false);
    const [pswdmsg, setpswdmsg] = useState('');


    const handleChange = (e) => {
        dispatch({ type: 'signup', fieldName: e.currentTarget.name, payload: e.currentTarget.value });
        if (e.currentTarget.name === "password") {
            if (!validator.isStrongPassword(e.currentTarget.value)) {
                setPasswd(true);
                setpswdmsg("Weak Password")
            }
            else {
                setPasswd(false);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setsignin(true);
        if (user.phone && user.password && user.confirmpassword) {
            if (user.phone.length !== 10) {
                setError(true);
                setsignin(false);
                setErmsg("Invalid Phone Number")
                return null;
            }
            if (!validator.isStrongPassword(user.password)) {
                setsignin(false);
                return null;
            }
            if (user.password !== user.confirmpassword) {
                setError(true);
                setsignin(false);
                setErmsg("Password does'nt match")
                return null;
            }
            dispatchnew(userSighnUp(user)).then((res) => {
                console.log("succes")
                // toast(usersign.message);
                toast.success("SuuccesFully Registered", {
                    position: toast.POSITION.TOP_CENTER
                });
                setsignin(false);
            },
                (err) => {
                    console.log("err")
                    toast.error(usersign.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setsignin(false);
                });
            setError(false);
        }
        else {
            setError(true);
            setsignin(false);
            setErmsg("Enter valid datas")
            return null;
        }

        console.log(user, "user");
    }

    const toggleClose = () => {
        setError(false);
    }
    return (
        <>
            <Container >
                <div className="wrapper">
                    <div className="logo">
                        <img
                            src={image1}
                            alt=""
                        />
                    </div>
                    <div className="text-center mt-4 name">G-SHOPIFY</div>
                    {iserror && <Toast onClose={toggleClose}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Shows Error</strong>
                            <small>now</small>
                        </Toast.Header>
                        <Toast.Body style={{ color: "red", fontSize: "12px" }}>{error}</Toast.Body>
                    </Toast>}
                    <form className="p-3 mt-3">
                        <div className="form-field  flex_diplay align-items-center">
                            <span className="far fa-user" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                autocomplete="off"
                                value={user.name}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-field  flex_diplay align-items-center">
                            <span className="fas fa-key" />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                autocomplete="off"
                                value={user.phone}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-field  flex_diplay align-items-center">
                            <span className="fas fa-key" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                autocomplete="off"
                                value={user.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-field  flex_diplay align-items-center">
                            <span className="fas fa-key" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {isPswdmsg && <p className="password">{pswdmsg}</p>}
                        <div className="form-field  flex_diplay align-items-center">
                            <span className="fas fa-key" />
                            <input
                                type="password"
                                name="confirmpassword"
                                placeholder="Confirm Password"
                                value={user.confirmpassword}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <button className="btn mt-3" onClick={handleSubmit}>SignUp</button>
                    </form>
                    <div className="text-center fs-6">
                        <a onClick={() => {
                            navigate("/login");
                        }}>Login</a>
                    </div>

                    {isSignin && <Loader />}

                </div>
            </Container>
        </>

    )
}

