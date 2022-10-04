import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import ReactPaginate from "react-paginate";

import { offerList, addoffer } from "../_Actions/offeractions";
import { miscService } from '../_Service/miscService';

import { Loader } from "../Components/loader";
import { OfferAdd } from './offerAdd';
import { OfferEdit } from './offerEdit';
import { DeleteModal } from '../Components/DeleteModal';
import { SearchBar } from "../Components/searchBar";


export const OfferList = () => {

    const [isDelete, setdelete] = useState(false);
    const [deleteDataid, deleteItem] = useState('');
    const [isLoading, setLoading] = useState(false);

    //adding
    const [isOfferAdd, setOfferAdd] = useState(false);

    //editing 
    const [isOfferEdit, setOfferEdit] = useState(false);
    const [editdata, setOfferEditData] = useState(false);
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
    useEffect(() => { dispatch(offerList(query)); setLoading(false) }, [offer.offersSingle,]);

    //for deletion
    const deleteConfirm = (offersarray_id) => {
        setdelete(true);
        deleteItem(offersarray_id);
    }
    const handleClose = () => {
        setdelete(false);
    }
    const deleteOffer = () => {
        if (deleteDataid) {
            console.log(deleteDataid, "deleteDataid");
            dispatch(addoffer({ _id: deleteDataid, delete: true }));
            setdelete(false);
        }
    }

    //offer add
    const OfferAddmodal = () => {
        setOfferAdd(true)
    }
    const handleCloseOfferAdd = () => {
        setOfferAdd(false);
        setOfferEdit(false);
    }


    //edit
    const OfferEditmodal = (item) => {
        console.log(item, "item")
        setOfferEditData(item);
        setOfferEdit(true);
    }

    //for searching data
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        dispatch(offerList(query));
    }


    //paination
    let pageCount = offer.pages
    const changePage = ({ selected }) => {
        console.log(selected, "selected")
        query.pageVo.pageNo = selected + 1;
        dispatch(offerList(query));
    };

    //renderdata
    const renderoffers = (offers) => {
        let offersarray = [];
        for (let offer of offers) {
            offersarray.push(
                <tr>
                    <td>{offer.logo ? <img className="category_image" src={offer.logo} /> : "image"}</td>
                    <td>{offer.name}</td>
                    <td>
                        {offer.start_date ? miscService.timeToDate(offer.start_date) : " - "}
                    </td>
                    <td>
                        {offer.end_date ? miscService.timeToDate(offer.end_date) : " - "}
                    </td>
                    <td>{offer.offer_item} %</td>
                    <td> {offer.end_date < new Date().getTime() ? "Expired" : "Active"}</td>
                    <td>
                        <i className="fas fa-pencil-alt" onClick={() => OfferEditmodal(offer)} />
                        {offer.end_date < new Date().getTime() && < i className="far fa-trash-alt" onClick={() => deleteConfirm(offer._id)} />}
                    </td>
                </tr>
            )
        }
        return offersarray;
    }

    return (
        <>
            <Container className="mt-3 mb-4">
                <Card >
                    <Card.Body>
                        <SearchBar
                            titile="Offer List"
                            command="Add Offer "
                            placeholder="Search Offer"
                            addModal={OfferAddmodal}
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
                                {offer.offersarray && offer.offersarray.length > 0 &&
                                    <Table className="table manage-candidates-top mb-0">
                                        <thead>
                                            <tr>
                                                <th> Image</th>
                                                <th> name</th>
                                                <th> Start date</th>
                                                <th> End Date</th>
                                                <th> Offer Price</th>
                                                <th> Status</th>
                                                <th className="action text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderoffers(offer.offersarray)}
                                        </tbody>
                                    </Table>}

                                {offer.isListing && <Loader />}
                                {!offer.isListing && offer.offersarray && offer.offersarray.length == 0 && <p> No offers Found</p>}

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
                title="Delete Offer"
                message="Are you sure to delete Offer"
                handleClose={handleClose}
                deleteModal={deleteOffer}
            />

            {/* add offer modal from admin */}
            <OfferAdd
                title="Add offer"
                show={isOfferAdd}
                handleCloseOfferAdd={handleCloseOfferAdd}
            />


            {/* edit offer modal */}
            <OfferEdit
                title="Edit offer"
                show={isOfferEdit}
                handleCloseOfferAdd={handleCloseOfferAdd}
                editdata={editdata}
            />

        </>
    )
}
