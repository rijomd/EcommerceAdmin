import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ImMenu } from 'react-icons/im';
// import { authService } from "../_Service/authService"
import image1 from '../_Images/logo.png';

export const Header = () => {

    const dispatch = useDispatch();
    const misc = useSelector(state => state.misc);
    const navigate = useNavigate();

    const isMenuopen = () => {
        dispatch({
            type: "ISMENUBAR_OPEN",
            data: !misc.isMenuopen
        })
    }
    const logout = () => {
        // authService.Logout();

        navigate("/login")
        setTimeout(() => {
            localStorage.clear();
            let token = null;
            let user = null;
            dispatch({
                type: "LOGOUT_SUCCESS",
            });
        }
            , 500);

    }

    return (
        <div>
            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ justifyContent: "space-between" }}>
                <Container>
                    <Navbar.Brand onClick={isMenuopen} >{<FaGripVertical />}</Navbar.Brand>
                    <Navbar.Brand><img src={image1} alt="hello" /></Navbar.Brand>
                    <Nav>
                        <li className='nav-item' style={{ textDecoration: "none", color: "#fff" }} onClick={logout}>
                            Logout
                        </li>
                    </Nav>
                </Container>
            </Navbar> */}

            <>
                <nav className="navbar navbar-expand-lg py-3 navbar-dark bg-blue shadow-sm">
                    <div className="navbar_header">
                        <a onClick={isMenuopen}><ImMenu /></a>
                        <a className="navbar-brand">
                            <img
                                src={image1}
                                width={45}
                                alt=""
                                className="d-inline-block align-middle mr-2"
                            />
                            <span className="text-uppercase font-weight-bold">G-SHOPIFY</span>
                        </a>
                    </div>
                    <div className="navbar_header2">
                        <div class="dropdown">
                            <span style={{color:"white"}}>Admin</span>
                            <div class="dropdown-content">
                                <a href="#">Profile</a>
                                <a onClick={logout}>Logout</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </>

        </div>
    )
}



{/* <li className='nav-item'>
                                    <NavLink
                                        to="tasks"
                                        className={({ isActive }) =>
                                            isActive ? activeClassName : undefined
                                        }
                                    >
                                        Tasks
                                    </NavLink>
                                </li> */}