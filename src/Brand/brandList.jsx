import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { brandList, addBrand } from "../_Actions/brandaction";
import { Card, Container, Button, Row, Col, Table } from 'react-bootstrap';
import { Loader } from "../Components/loader";
import { BrandAdd } from './addBrand';
import { BrandEdit } from './editBrand';
import { DeleteModal } from '../Components/DeleteModal';
import { SearchBar } from "../Components/searchBar";
import ReactPaginate from "react-paginate";
import { miscService } from '../_Service/miscService';
import image1 from '../_Images/galleryvector.png';


export const BrandList = () => {

    const [isDelete, setdelete] = useState(false);
    const [deleteDataid, deleteItem] = useState('');
    const [isLoading, setLoading] = useState(false);

    //adding
    const [isBrandAdd, setBrandAdd] = useState(false);

    //editing 
    const [isBrandEdit, setBrandEdit] = useState(false);
    const [editdata, setBrandEditData] = useState(false);
    let query = {
        pageVo: {
            pageNo: 1,
            noOfItems: 15,
        },
        status: 1
    };

    const brand = useSelector(state => state.brand);
    const dispatch = useDispatch();

    //listing data
    useEffect(() => { dispatch(brandList(query)); setLoading(false) }, [brand.brandSingle,]);

    //for deletion
    const deleteConfirm = (brandarray_id) => {
        setdelete(true);
        deleteItem(brandarray_id);
    }
    const handleClose = () => {
        setdelete(false);
    }
    const deleteBrand = () => {
        if (deleteDataid) {
            console.log(deleteDataid, "deleteDataid");
            dispatch(addBrand({ _id: deleteDataid, delete: true }));
            setdelete(false);
        }
    }

    //Brand add
    const BrandAddmodal = () => {
        setBrandAdd(true)
    }
    const handleCloseBrandAdd = () => {
        setBrandAdd(false);
        setBrandEdit(false);
    }


    //edit
    const BrandEditmodal = (item) => {
        console.log(item, "item")
        setBrandEditData(item);
        setBrandEdit(true);
    }

    //for searching data
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        dispatch(brandList(query));
    }


    //paination
    let pageCount = brand.pages
    const changePage = ({ selected }) => {
        console.log(selected, "selected")
        query.pageVo.pageNo = selected + 1;
        dispatch(brandList(query));
    };

    //renderdata
    const renderBrands = (brands) => {
        let BrandArray = [];
        console.log(brands, "brands")
        for (let Brand of brands) {
            BrandArray.push(
                <tr>
                    <td>{Brand.logo ? <img className="category_image" src={Brand.logo} /> : <img src={image1} className="category_image"></img>}</td>
                    <td>{Brand.name}</td>
                    {Brand.category_id && <td>{Brand.category_id.name}</td>}
                    <td>
                        {miscService.timeToDate(Brand.createdtime)}
                    </td>
                    <td>
                        {Brand.updatedtime ? miscService.timeToDate(Brand.updatedtime) : " - "}
                    </td>
                    <td>
                        <i className="fas fa-pencil-alt" onClick={() => BrandEditmodal(Brand)} />
                        {<i className="far fa-trash-alt" onClick={() => deleteConfirm(Brand._id)} />}
                    </td>
                </tr>
            )
        }
        return BrandArray;
    }

    return (
        <>
            <Container className="mt-3 mb-4">
                <Card >
                    <Card.Body>
                        <SearchBar
                            titile="Brand List"
                            command="Add Brand"
                            placeholder="Search Brand or Category"
                            addModal={BrandAddmodal}
                            handleSearch={(value) => handleSearch(value)}
                            filtershow={false}
                        />
                    </Card.Body>
                </Card>
            </Container>

            <Container className=" mt-3 mb-4">
                <Col lg={12} className=" mt-4 mt-lg-0">

                    <Row >
                        <Col md={12} >
                            <Container className="Brand-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                {brand.brandarray && brand.brandarray.length > 0 &&
                                    <Table className="table manage-candidates-top mb-0">
                                        <thead>
                                            <tr>
                                                <th> Image</th>
                                                <th  >Name</th>
                                                <th  >Category</th>
                                                <th  >Created At</th>
                                                <th  >Updated At</th>
                                                <th className="action text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderBrands(brand.brandarray)}
                                        </tbody>
                                    </Table>}

                                {brand.isListing && <Loader />}
                                {!brand.isListing && brand.brandarray && brand.brandarray.length == 0 && <p> No Brands Found</p>}

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


            {/* delete Brand modal */}
            <DeleteModal
                show={isDelete}
                title="Delete Brand"
                message="Are you sure to delete Brand"
                handleClose={handleClose}
                deleteModal={deleteBrand}
            />

            {/* add Brand modal from admin */}
            <BrandAdd
                title="Add Brand"
                show={isBrandAdd}
                handleCloseBrandAdd={handleCloseBrandAdd}
            />


            {/* edit Brand modal */}
            <BrandEdit
                show={isBrandEdit}
                handleCloseBrandAdd={handleCloseBrandAdd}
                editdata={editdata}
            />

        </>
    )
}
