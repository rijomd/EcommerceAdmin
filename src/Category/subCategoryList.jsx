import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { categoryList, categorysAdd } from "../_Actions/categoryactions";
import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import { Loader } from "../Components/loader";
import { Link } from "react-router-dom";
import { SubCategoryAdd } from './subCategoryAdd';
import { SubCategoryEdit } from './subcategoryEdit';
import { DeleteModal } from '../Components/DeleteModal';
import { SearchBar } from "../Components/searchBar";
import ReactPaginate from "react-paginate";
import "./category.css";
import { miscService } from '../_Service/miscService';
import image1 from '../_Images/galleryvector.png';

export const SubCategoryList = () => {

    const [isDelete, setdelete] = useState(false);
    const [deleteDataid, deleteItem] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 30,
        },
        type: 2,
        status: 1
    });
    //adding
    const [isCategoryAdd, setCategoryAdd] = useState(false);
    //editing 
    const [isCategoryEdit, setCategoryEdit] = useState(false);
    const [editdata, setCategoryEditData] = useState(false);

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    //listing data
    useEffect(() => { dispatch(categoryList(query)); setLoading(false) }, [category.categorySingle]);

    //for deletion
    const deleteConfirm = (categoryfullData_id) => {
        setdelete(true);
        deleteItem(categoryfullData_id);
    }
    const handleClose = () => {
        setdelete(false);
    }
    const deleteCategory = () => {
        if (deleteDataid) {
            console.log(deleteDataid, "deleteDataid");
            dispatch(categorysAdd({ _id: deleteDataid, delete: true }));
            setdelete(false);
        }
    }

    //category add
    const CategoryAddmodal = () => {
        setCategoryAdd(true)
    }
    const handleCloseCategoryAdd = () => {
        setCategoryAdd(false);
        setCategoryEdit(false);
    }


    //edit
    const CategoryEditmodal = (item) => {
        console.log(item, "item")
        setCategoryEditData(item);
        setCategoryEdit(true);
    }

    //for searching data
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        setQuery(query);
        dispatch(categoryList(query));
    }

    // const filtervalue = (value) => {

    //     console.log(value, "value");
    //     if (value === "true") {
    //         query.home_visibility = true;
    //     }
    //     else {
    //         query.type = parseInt(value);
    //         delete query.home_visibility;
    //     }
    //     setQuery(query);
    //     dispatch(categoryList(query));
    // }
    //paination
    let pageCount = category.pages
    const changePage = ({ selected }) => {
        console.log(selected, "selected")
        query.pageVo.pageNo = selected + 1;
        dispatch(categoryList(query));
    };

    //renderdata
    const renderCategories = (catgories) => {
        let categoryArray = [];
        console.log(catgories, "123")
        for (let category of catgories) {
            categoryArray.push(
                <tr>
                    <td>{category.image ? <img className="category_image" src={category.image} /> : <img src={image1} className="category_image"></img>}</td>
                    <td>{category.name}</td>
                    <td>{category.parent_id && category.parent_id.name}</td>
                    {category.type == 1 && <td>  MainCategory </td>}
                    {category.type == 2 && <td>  SubCategory </td>}
                    {category.type == 3 && <td>  GrandSubCategory </td>}
                    <td>
                        {miscService.timeToDate(category.createdtime)}
                    </td>
                    <td>
                        {category.updatedtime ? miscService.timeToDate(category.updatedtime) : " - "}
                    </td>
                    <td>
                        <Link to={"/category/" + category._id}>
                            <i className="far fa-eye" />
                        </Link>
                        <i className="fas fa-pencil-alt" onClick={() => CategoryEditmodal(category)} />
                        {category.childs && category.childs.length == 0 && <i className="far fa-trash-alt" onClick={() => deleteConfirm(category._id)} />}
                    </td>
                    {/* <td>{category.children.length > 0 && renderCategories(category.children)}</td> */}
                </tr>
            )
        }
        return categoryArray;
    }

    return (
        <>
            <Container className="mt-3 mb-4">
                <Card >
                    <Card.Body>
                        <SearchBar
                            titile="Sub Category List"
                            command="Add Sub Category"
                            placeholder="Search Item"
                            addModal={CategoryAddmodal}
                            handleSearch={(value) => handleSearch(value)}
                            // filtervalue={(value) => filtervalue(value)}
                            filtershow={false}

                        />
                    </Card.Body>
                </Card>
            </Container>

            <Container className=" mt-3 mb-4">
                <Col lg={12} className=" mt-4 mt-lg-0">

                    <Row >
                        <Col md={12} >
                            <Container className="category-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                {category.categoryfullData && category.categoryfullData.length > 0 &&
                                    <Table className="table manage-candidates-top mb-0">
                                        <thead>
                                            <tr>
                                                <th> Image</th>
                                                <th >Name</th>
                                                <th >Parent Category</th>
                                                <th>Type</th>
                                                <th >Created At</th>
                                                <th>Updated At</th>
                                                <th className="action text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderCategories(category.categoryfullData)}
                                        </tbody>
                                    </Table>}

                                {category.isListing && <Loader />}
                                {category.categoryfullData && category.categoryfullData.length==0 && <p> No Categories Found</p>}

                                {pageCount > 1 && <Row className="paginate">
                                    <ReactPaginate
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        nextLabel="next >"
                                        previousLabel="< prev"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                    />
                                </Row>}

                            </Container>
                        </Col>
                    </Row>

                </Col>
            </Container>


            {/* delete category modal */}
            <DeleteModal
                show={isDelete}
                title="Delete Category"
                message="Are you sure to delete category"
                handleClose={handleClose}
                deleteModal={deleteCategory}
            />

            {/* add category modal from admin */}
            <SubCategoryAdd
                title="Add Sub Category"
                show={isCategoryAdd}
                handleCloseCategoryAdd={handleCloseCategoryAdd}
            />


            {/* edit category modal */}
            <SubCategoryEdit
                show={isCategoryEdit}
                handleCloseCategoryAdd={handleCloseCategoryAdd}
                editdata={editdata}
            />

        </>
    )
}
