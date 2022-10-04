import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { Card, Container, Row, Button, Table, Col } from 'react-bootstrap';
import ReactPaginate from "react-paginate";

import { ProductList, productsAdd } from "../_Actions/productactions";
import { miscService } from '../_Service/miscService';

import { Loader } from "../Components/loader";
import { ProductAdd } from './addProduct';
import { ProductEdit } from './editProduct';
import { DeleteModal } from '../Components/DeleteModal';
import { SearchBar } from "../Components/searchBar";
import { FilterBar } from "./filterModal";
import { ProductSingleview } from './productSingleview';


export const ProductsList = () => {

    const [isDelete, setdelete] = useState(false);
    const [deleteData, deleteItem] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    //adding
    const [isProductAdd, setProductAdd] = useState(false);

    //editing 
    const [isProductEdit, setProductEdit] = useState(false);
    const [editdata, setProductEditData] = useState({});

    //listing
    const [isOpenSingle, setOpenSingle] = useState(false);
    const [singledata, setProductIngleData] = useState({});

    const product = useSelector(state => state.product);

    const dispatch = useDispatch();
    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 15,
        },
        status: 1
    });
    //listing data
    useEffect(() => { dispatch(ProductList(query)); setLoading(false) }, [product.productSingledata]);



    //for deletion
    const deleteConfirm = (product) => {
        setdelete(true);
        deleteItem(product);
    }
    const handleClose = () => {
        setdelete(false);
    }
    const deleteproduct = () => {
        if (deleteData) {
            console.log(deleteData, "deleteData");
            deleteData.delete = true;
            dispatch(productsAdd(deleteData));
            setdelete(false);
        }
    }

    //single view
    const openSingleModal = (product) => {
        setOpenSingle(true);
        setProductIngleData(product);
    }
    const handleCloseProductSingle = () => {
        setOpenSingle(false);
    }
    //product add
    const ProductAddmodal = () => {
        setProductAdd(true)
    }
    const handleCloseProductAdd = () => {
        setProductAdd(false);
        setProductEdit(false);
    }


    //edit
    const ProductEditmodal = (item) => {
        dispatch(
            {
                type: "EDIT_DATA",
                data: item,
            }
        );
        setProductEditData(item);
        setProductEdit(true);
    }

    //paination
    let pageCount = product.pages
    const changePage = ({ selected }) => {
        console.log(selected, "selected")
        query.pageVo.pageNo = selected + 1;
        dispatch(ProductList(query));
    };


    //for searching data
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        setQuery(query);
        dispatch(ProductList(query));
    }

    const openModal = (value) => {

        if (value === "visibility") {
            setTitle("products In Home");
            dispatch({
                type: "ISFILTERBAR_OPEN",
                data: !product.isfilteropen
            })
        }
        if (value === "category") {
            setTitle("Filter By Category");
            dispatch({
                type: "ISFILTERBAR_OPEN",
                data: !product.isfilteropen
            })
        }
        if (value === "seller") {
            setTitle("Filter By Seller");
            dispatch({
                type: "ISFILTERBAR_OPEN",
                data: !product.isfilteropen
            })
        }
        if (value === "brand") {
            setTitle("Filter By Brand");
            dispatch({
                type: "ISFILTERBAR_OPEN",
                data: !product.isfilteropen
            })
        }
    }


    //renderdata
    const renderProducts = (products) => {
        let productArray = [];
        console.log(products, "123")
        for (let product of products) {
            productArray.push(
                <tr>
                    <td className="text-center text-ellipsis">{product.name}</td>
                    {product.category && <td className="text-center"> {product.category.name ? product.category.name : "-"}</td>}
                    {product.seller && <td className="text-center"> {product.seller.name ? product.seller.name : "-"}</td>}
                    <td className="text-center">{product.type_product}</td>
                    <td className="text-center">{product.homevisibilty ? "Visible In Home" : "Not Visible"}</td>
                    <td>
                        {miscService.timeToDate(product.createdtime)}
                    </td>
                    <td className="text-center">
                        <i className="far fa-eye" style={{ color: "blue" }} onClick={() => openSingleModal(product)} />
                        <i className="fas fa-pencil-alt" onClick={() => ProductEditmodal(product)} />
                        <i className="far fa-trash-alt" onClick={() => deleteConfirm(product)} />
                    </td>
                    {/* <td>{product.children.length > 0 && renderProducts(product.children)}</td> */}
                </tr>
            )
        }
        return productArray;
    }

    return (
        <>
            <Container className="mt-3 mb-4">
                <Card >
                    <Card.Body>
                        <SearchBar
                            titile="Product List"
                            command="Add Product"
                            placeholder="Search Product"
                            addModal={ProductAddmodal}
                            handleSearch={(value) => handleSearch(value)}
                            filtershow={false}
                            />
                    </Card.Body>
                </Card>
                <Card >
                            {
                                product.isfilteropen && <FilterBar title={title} />
                            }
                    <Card.Body>
                        <Row>
                            <Col md={9} sm={9}>
                            </Col>
                            <Col md={3} sm={3} style={{ textAlign: "end" }}>
                                <div class="dropdown_product">
                                    <Button varient="primary">Filter</Button>
                                    <div class="dropdown_product-content">
                                        <p onClick={() => openModal("category")}>Category</p>
                                        <p onClick={() => openModal("seller")}>Seller</p>
                                        <p onClick={() => openModal("brand")}>Brand</p>
                                        <p onClick={() => openModal("visibility")}>Visible In Home</p>
                                        <p onClick={() => dispatch(ProductList(query))}>Clear All</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Container>

            <Container className=" mt-3 mb-4">
             
                <Col lg={12} className=" mt-4 mt-lg-0">

                    <Row >
                        <Col md={12}>
                            <Container className="product-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                {product.productArray && product.productArray.length > 0 && <Table className="table manage-candidates-top mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">category</th>
                                            <th className="text-center">Seller</th>
                                            <th className="text-center">Type</th>
                                            <th className="text-center">Home Visible</th>
                                            <th className="text-center">Date</th>
                                            <th className="action text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderProducts(product.productArray)}
                                    </tbody>
                                </Table>}

                                {product.isListing && <Loader />}
                                {product.productArray && product.productArray.length == 0 && <p> No products Found</p>}



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


            {/* delete product modal */}
            <DeleteModal
                show={isDelete}
                title="Delete product"
                message="Are you sure to delete product"
                handleClose={handleClose}
                deleteModal={deleteproduct}
            />

            {/* add product modal from admin */}
            <ProductAdd
                title="Add product"
                show={isProductAdd}
                handleCloseProductAdd={handleCloseProductAdd}
            />


            {/* edit product modal */}
            <ProductEdit
                show={isProductEdit}
                handleCloseProductAdd={handleCloseProductAdd}
                editdata={editdata}
            />

            {isOpenSingle && <ProductSingleview
                singledata={singledata}
                show={isOpenSingle}
                handleCloseProductSingle={handleCloseProductSingle}
            />}

        </>
    )
}
