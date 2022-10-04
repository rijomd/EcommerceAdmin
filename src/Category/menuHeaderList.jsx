import React, { useState, useEffect, } from "react";
import { useDispatch } from 'react-redux';
import { categoryList } from "../_Actions/categoryactions";
import { Card, Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Loader } from "../Components/loader";
import { MenuHeaderAdd } from './menuHeaderAdd';
import "./category.css";
import image1 from '../_Images/galleryvector.png';

export const MenuheaderList = () => {

    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 30,
        },
        name: "MenuHeader",
        status: 1
    });
    //adding
    const [isCategoryAdd, setCategoryAdd] = useState(false);
    const [category, setMenuheaderList] = useState([]);
    const dispatch = useDispatch();

    //listing data
    useEffect(() => { dispatch(categoryList(query)).then((res) => { if (res.length > 0) { setMenuheaderList(res) } }) }, [category.categorySingle]);

    //category add
    const CategoryAddmodal = () => {
        setCategoryAdd(true)
    }
    const handleCloseCategoryAdd = () => {
        setCategoryAdd(false);
    }





    //renderdata
    const renderCategories = (catgories) => {
        let categoryArray = [];
        for (let category of catgories) {
            categoryArray.push(
                <tr>
                    <td>{category.image ? <img className="category_image" src={category.image} /> : <img src={image1} className="category_image"></img>}</td>
                    <td>{category.name}</td>
                    {category.type == 1 && <td>  MainCategory </td>}
                    {category.type == 2 && <td>  SubCategory </td>}
                    {category.type == 3 && <td>  GrandSubCategory </td>}
                </tr>
            )
        }
        return categoryArray;
    };

    return (
        <div className="pos_fixed">
            <Container className="mt-3 mb-4" >
                <Card >
                    <Card.Body>
                        <div style={{ display: "flex" }}>
                            <h3 style={{ flex: 1 }}>Menuheader Category List</h3>
                            <Button variant="primary" onClick={CategoryAddmodal}> {category.length === 0 ? "Add" : "Edit"}</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>

            <Container className=" mt-3 mb-4">
                <Col lg={12} className=" mt-4 mt-lg-0">

                    <Row >
                        <Col md={12} >
                            <Container className="category-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                {category.length > 0 &&
                                    <Table className="table manage-candidates-top mb-0">
                                        <thead>
                                            <tr>
                                                <th> Image</th>
                                                <th >Name</th>
                                                <th>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderCategories(category)}
                                        </tbody>
                                    </Table>}

                                {category.isListing && <Loader />}
                                {category.length == 0 && <p> No Items Found</p>}
                            </Container>
                        </Col>
                    </Row>

                </Col>
            </Container>

            {/* add category modal from admin */}
            <MenuHeaderAdd
                title="Menu Header Category"
                show={isCategoryAdd}
                handleCloseCategoryAdd={handleCloseCategoryAdd}
            />
        </div>
    )
}
