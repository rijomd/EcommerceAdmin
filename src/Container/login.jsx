import React, { useState, useReducer, useEffect } from "react";
import { Container } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "../Components/loader";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../_Actions/authactions";
// import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image1 from '../_Images/logo.png';

export const Login = () => {
    const navigate = useNavigate();

    //loading and error 
    const [isLogin, setLogin] = useState(false);

    //for login action
    const auth = useSelector(state => state.auth);
    const dispatchnew = useDispatch();






    //for handle change usereducer
    const initialState = {
        username: "",
        password: "",
        role: 1
    }
    const formReducer = (state, action) => {
        switch (action.type) {
            case 'login': {
                return {
                    ...state,
                    [action.fieldName]: action.payload,
                };
            }
        }
    }
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { username, password, role } = state;
    const handleChange = (e, role) => {
        if (e.currentTarget.name === "role") {
            if (role === 1) {
                dispatch({ type: 'login', fieldName: e.currentTarget.name, payload: 2 })
            } else {
                dispatch({ type: 'login', fieldName: e.currentTarget.name, payload: 1 })
            }
        }
        else {
            dispatch({ type: 'login', fieldName: e.currentTarget.name, payload: e.currentTarget.value })
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setLogin(true);
        console.log(username, password, role, "===");
        let user = {
            phone: username,
            password: password,
            role: role
        }
        dispatchnew(login(user)).then((res) => {
            if (res) {
                console.log("login succe");
                toast.success("Success", {
                    position: toast.POSITION.TOP_CENTER
                });
                setLogin(false);
                navigate("/");
                window.location.reload();
            }
        },
            (err) => {
                console.log("login errr")
                toast.error(auth.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                setLogin(false);
                navigate("/");
            })
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
                    <form className="p-3 mt-3">
                        <div className="form-field  flex_diplay align-items-center">
                            <span className="far fa-user" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Phone Number"
                                value={username}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-field  flex_diplay align-items-center">
                            <span className="fas fa-key" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {isLogin && <Loader />}
                        <button className="btn mt-3" onClick={handleSubmit}>Login</button>
                    </form>
                    {/* <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="role"
                            checked={role != 1} onChange={(e) => handleChange(e, role)} />
                        <label className="form-check-label" for="flexCheckChecked">
                            Seller
                        </label>
                    </div> */}
                    <div className="text-center fs-6">
                        <a href="#">Forget password?</a> or <a onClick={() => {
                            navigate("/signup");
                        }}>Sign up</a>
                    </div>
                </div>
            </Container>
        </>

    )
}

