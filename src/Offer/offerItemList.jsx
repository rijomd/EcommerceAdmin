import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import ReactPaginate from "react-paginate";

import { offerItemList, addofferItem } from "../_Actions/offeractions";

import { Loader } from "../Components/loader";
import { OfferItemAdd } from './offerItemAdd';
import { OfferItemEdit } from './offerItemEdit';
import { DeleteModal } from '../Components/DeleteModal';
import { SearchBar } from "../Components/searchBar";


export const OfferItemList = () => {

    const [isDelete, setdelete] = useState(false);
    const [deleteDataid, deleteItem] = useState('');
    const [isLoading, setLoading] = useState(false);

    //adding
    const [isOfferItemAdd, setOfferItemAdd] = useState(false);

    //editing 
    const [isOfferItemEdit, setOfferItemEdit] = useState(false);
    const [editdata, setOfferItemEditData] = useState(false);
    let query = {
        pageVo: {
            pageNo: 1,
            noOfItems: 15,
        },
        status: 1
    };

    const offer = useSelector(state => state.offer);
    const dispatch = useDispatch();

    //listing data
    useEffect(() => { dispatch(offerItemList(query)); setLoading(false) }, [offer.offeritemSingle,]);

    //for deletion
    const deleteConfirm = (offeritemArray_id) => {
        setdelete(true);
        deleteItem(offeritemArray_id);
    }
    const handleClose = () => {
        setdelete(false);
    }
    const deleteOffer = () => {
        if (deleteDataid) {
            console.log(deleteDataid, "deleteDataid");
            dispatch(addofferItem({ _id: deleteDataid, delete: true }));
            setdelete(false);
        }
    }

    //offer add
    const OfferItemAddmodal = () => {
        setOfferItemAdd(true)
    }
    const handleCloseOfferItemAdd = () => {
        setOfferItemAdd(false);
        setOfferItemEdit(false);
    }


    //edit
    const OfferItemEditmodal = (item) => {
        console.log(item, "item")
        setOfferItemEditData(item);
        setOfferItemEdit(true);
    }

    //for searching data
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        dispatch(offerItemList(query));
    }


    //paination
    let pageCount = offer.pages
    const changePage = ({ selected }) => {
        console.log(selected, "selected")
        query.pageVo.pageNo = selected + 1;
        dispatch(offerItemList(query));
    };

    //renderdata
    const renderoffers = (offers) => {
        let offeritemArray = [];
        for (let offer of offers) {
            offeritemArray.push(
                <tr>
                    <td>
                        <i className="fas fa-pencil-alt" onClick={() => OfferItemEditmodal(offer)} />
                        {offer.end_date < new Date().getTime() && < i className="far fa-trash-alt" onClick={() => deleteConfirm(offer._id)} />}
                    </td>
                </tr>
            )
        }
        return offeritemArray;
    }

    return (
        <>
            <Container className="mt-3 mb-4">
                <Card >
                    <Card.Body>
                        <SearchBar
                            titile="OfferItem Lists"
                            command="Add Offers"
                            placeholder="Search Items"
                            addModal={OfferItemAddmodal}
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
                            <Container className="offer-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                {offer.offeritemArray && offer.offeritemArray.length > 0 &&
                                    <Table className="table manage-candidates-top mb-0">
                                        <thead>
                                            <tr>
                                                <th className="action text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderoffers(offer.offeritemArray)}
                                        </tbody>
                                    </Table>}

                                {offer.isListing && <Loader />}
                                {!offer.isListing && offer.offeritemArray && offer.offeritemArray.length == 0 && <p> No Items Found</p>}

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


            {/* delete offer modal */}
            <DeleteModal
                show={isDelete}
                title="Delete Item"
                message="Are you sure to delete Item"
                handleClose={handleClose}
                deleteModal={deleteOffer}
            />

            {/* add offer modal from admin */}
            <OfferItemAdd
                title="Add offerItem"
                show={isOfferItemAdd}
                handleCloseOfferItemAdd={handleCloseOfferItemAdd}
            />


            {/* edit offer modal */}
            <OfferItemEdit
                title="Edit offerItem"
                show={isOfferItemEdit}
                handleCloseOfferItemAdd={handleCloseOfferItemAdd}
                editdata={editdata}
            />

        </>
    )
}
