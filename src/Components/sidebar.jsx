import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export const Sidebar = () => {

    const misc = useSelector(state => state.misc);
    const dispatch = useDispatch();
    const menuClose = () => {
        dispatch({
            type: "ISMENUBAR_OPEN",
            data: !misc.isMenuopen
        })
    }

    return (
        <ProSidebar style={{ position: "absolute" }}>
            <Menu iconShape="square">

                <MenuItem icon={<FaGem />}>
                    <Link to="/" onClick={menuClose}>
                        Dashboard
                    </Link>
                </MenuItem>

                <MenuItem icon={<FaGem />}>
                    <Link to="/userlist" onClick={menuClose}>
                        UserList
                    </Link>
                </MenuItem>

                <MenuItem icon={<FaGem />}>
                    <Link to="/homeslidebar" onClick={menuClose}>
                        Home Details
                    </Link>
                </MenuItem>

                <SubMenu title="G-Divisions" icon={<FaGem />}>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/maincategorylist" onClick={menuClose}>
                           Main Categories
                        </Link>
                    </MenuItem>
                     <MenuItem icon={<FaGem />}>
                        <Link to="/subcategorylist" onClick={menuClose}>
                           Sub Categories
                        </Link>
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/grandsubcategorylist" onClick={menuClose}>
                           GrandSub Categories
                        </Link>
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/brandList" onClick={menuClose}>
                            Brands
                        </Link>
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/menuheaderList" onClick={menuClose}>
                            Menuheader In Home
                        </Link>
                    </MenuItem>
                </SubMenu>

                <SubMenu title="G-Products" icon={<FaGem />}>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/product_attribute" onClick={menuClose}>
                            Product Attributes
                        </Link>
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/productlist" onClick={menuClose}>
                            ProductList
                        </Link>
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/ProductListhome" onClick={menuClose}>
                            ProductList Home
                        </Link>
                    </MenuItem>
                </SubMenu>

                {/* <SubMenu title="G-Offers" icon={<FaGem />}>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/offerlist" onClick={menuClose}>
                            OfferList
                        </Link>
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/offeritems" onClick={menuClose}>
                            Offers
                        </Link>
                    </MenuItem>
                </SubMenu> */}



            </Menu>
        </ProSidebar>
    )
}
