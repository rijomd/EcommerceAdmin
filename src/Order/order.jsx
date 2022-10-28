import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from "../_Actions/orderAction";
import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import { Loader } from "../Components/loader";
import { SearchBar } from "../Components/searchBar";
import ReactPaginate from "react-paginate";
import "../Category/category.css";
import { miscService } from '../_Service/miscService';

export const OrderList = () => {

    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 30,
        },
        type: 2,
        status: 1
    });

    const order = useSelector(state => state.order);
    const dispatch = useDispatch();

    //listing data
    useEffect(() => { dispatch(getOrder(query)); }, []);


    let pageCount = order.pages
    const changePage = ({ selected }) => {
        console.log(selected, "selected")
        query.pageVo.pageNo = selected + 1;
        dispatch(getOrder(query));
    };

    //renderdata
    const renderorders = (orders) => {
        let orderArray = [];
        for (let order of orders) {
            orderArray.push(
                <tr>
                    <td>{order.user_id && order.user_id.name}</td>
                    <td>{order.cod_delivery ? "COD" : "Online"}</td>
                    <td>{order.order_status ? "Success" : "On Way"}</td>
                    <td>{order.paid_status ? "Paided" : "Unpaid"}</td>
                    <td>
                        {miscService.timeToDate(order.order_date)}
                    </td>
                    <td>{order.total_price}</td>
                </tr>
            )
        }
        return orderArray;
    }

    return (
        <>
            <Container className="mt-3 mb-4">
                <Card >
                    <Card.Body>
                        <p>Order List</p>
                    </Card.Body>
                </Card>
            </Container>

            <Container className=" mt-3 mb-4">
                <Col lg={12} className=" mt-4 mt-lg-0">

                    <Row >
                        <Col md={12} >
                            <Container className="order-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                {order.orderarray && order.orderarray.length > 0 &&
                                    <Table className="table manage-candidates-top mb-0">
                                        <thead>
                                            <tr>
                                                <th >User Name</th>
                                                <th>Delivery</th>
                                                <th > order Status</th>
                                                <th>Paid Status</th>
                                                <th >Order date</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderorders(order.orderarray)}
                                        </tbody>
                                    </Table>}

                                {order.isListing && <Loader />}
                                {order.orderarray && order.orderarray.length == 0 && <p> No Categories Found</p>}

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

        </>
    )
}
