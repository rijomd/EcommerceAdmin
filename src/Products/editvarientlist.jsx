import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { DeleteModal } from '../Components/DeleteModal';
import { EditVarientSingle } from "./editVarientSingle";
import { Loader } from "../Components/loader";

import { Container, Row, Table, Col } from 'react-bootstrap';

import { varientsAdd } from "../_Actions/productactions";

export const Editvarientlist = () => {

    const varient = useSelector(state => state.product);
    const dispatch = useDispatch();

    const [isDelete, setDelete] = useState(false);
    const [deleteData, deleteItem] = useState({});
    const [isEdit, setEdit] = useState(false);
    const [editData, editItem] = useState({});


    const editVarient = (varient) => {
        setEdit(true);
        editItem(varient);
    }
    const deleteConfirm = (varient) => {
        setDelete(true);
        deleteItem(varient);
    }
    const handleClose = () => {
        setDelete(false);
    }
    const deleteVarient = () => {
        if (deleteData) {
            console.log(deleteData, "deleteData");
            deleteData.delete = true;
            dispatch(varientsAdd(deleteData));
            setDelete(false);
        }
    }
    const saveSingleVarient = (item) => {
        console.log(item, "item");
        let editvarients = varient.edit_Varients;
        console.log(editvarients, "item1111");
        if (editvarients.length > 0) {
            for (let j = 0; j < editvarients.length; j++) {
                if (editvarients[j]._id === item._id) {
                    editvarients.splice(j, 1);
                }
            }
        }
        editvarients.push(item);
        console.log(editvarients, "editvarients");
        dispatch({
            type: "EDIT_VARIENTS",
            data: editvarients,
        })
    }
    const closeVarient = () => {
        setEdit(false);
        editItem({});
    }
    const rendervalues = (values) => {
        let myarray = [];
        for (let item of values) {
            myarray.push(
                <p>
                    {item}
                </p>
            )
        }
        return myarray;
    }

    const rendervarients = (products) => {
        let productArray = [];
        for (let product of products) {
            productArray.push(
                <tr>
                    <td className="text-center text-ellipsis">{product.varient_name}</td>
                    <td className="text-center">{rendervalues(product.atribute_value)}</td>
                    <td className="text-center">{product.availabile_qty}</td>
                    <td className="text-center">{product.soldout_count}</td>
                    <td className="text-center">{product.selling_price}</td>
                    <td className="text-center">{product.offer}</td>

                    <td className="text-center">
                        <i className="fas fa-pencil-alt" onClick={() => editVarient(product)} />
                        <i className="far fa-trash-alt" onClick={() => deleteConfirm(product)} />
                    </td>
                </tr>
            )
        }
        return productArray;
    }

    return (
        <Container className=" mt-3 mb-4">
            <Col lg={12} className=" mt-4 mt-lg-0">

                <Row >
                    <Col md={12}>
                        <Container className="product-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                            {varient.varientsArray && varient.varientsArray.length > 0 &&
                                <Table className="table manage-candidates-top mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">Attributes</th>
                                            <th className="text-center">Avaialble</th>
                                            <th className="text-center">Sold</th>
                                            <th className="text-center">Selling Price</th>
                                            <th className="text-center">Offer</th>
                                            <th className="action text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rendervarients(varient.varientsArray)}
                                    </tbody>
                                </Table>}
                            {varient.isListing && <Loader />}
                            {varient.varientsArray && varient.varientsArray.length == 0 && <p> No Varients Found</p>}
                        </Container>

                    </Col>
                </Row>
            </Col>

            <DeleteModal
                show={isDelete}
                title="Delete Varient"
                message="Are you sure to delete this varient"
                handleClose={handleClose}
                deleteModal={deleteVarient}
            />

            {isEdit && <EditVarientSingle editData={editData} saveSingleVarient={(item) => saveSingleVarient(item)} closeVarient={closeVarient} />}

        </Container>
    )
}

