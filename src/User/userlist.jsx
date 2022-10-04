import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userList, addUser } from "../_Actions/authactions";
import { Card, Container, Button, Row } from 'react-bootstrap';
import { Loader } from "../Components/loader";
import { Link } from "react-router-dom";
import { UserAdd } from './userAdd';
import { UserEdit } from './userEdit';
import { DeleteModal } from '../Components/DeleteModal';
import { SearchBar } from "../Components/searchBar";
import ReactPaginate from "react-paginate";
import { miscService } from '../_Service/miscService';


export const Userlist = () => {

    const [isDelete, setdelete] = useState(false);
    const [deleteDataid, deleteItem] = useState('');
    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 15,
        },
        status: 1
    });

    //adding
    const [isUseradd, setUseradd] = useState(false);
    const [isError, setError] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [isLoading, setLoading] = useState(false);

    //editing 
    const [isUseredit, setUserEdit] = useState(false);
    const [editdata, setUserEditData] = useState(false);


    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    //listing data
    useEffect(() => { dispatch(userList({ status: 1 })); setLoading(false) }, [user.userSingle]);




    if (user.userData) {
        let dataArray = user.userData;
        console.log(dataArray, "dataArray")
    }
    //for deletion
    const deleteConfirm = (userdata_id) => {
        setdelete(true);
        deleteItem(userdata_id);
    }
    const handleClose = () => {
        setdelete(false);
    }
    const deleteUser = () => {
        if (deleteDataid) {
            console.log(deleteDataid, "deleteDataid");
            dispatch(addUser({ _id: deleteDataid, delete: true }));
            setdelete(false);
        }
    }
    const blockCustomer = (data) => {
        data.block_status ? data.block_status = 0 : data.block_status = 1;
        dispatch(addUser(data));
    }
    //for searching data
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        dispatch(userList(query));
    }

    //user add
    const userAddmodal = () => {
        setUseradd(true)
    }
    const handleCloseUserAdd = () => {
        setError(false);
        setUseradd(false);
        setUserEdit(false);
    }
    const onSumbitUser = (user) => {
        console.log(user, "user");
        if (user.password !== user.confirmpassword) {
            setError(true);
            setErrmsg("Password does'nt match");
        }
        else if (user.name && user.phone && user.password) {
            setLoading(true);
            dispatch(addUser(user));
            setUseradd(false);
        }
        else {
            setError(true);
            setErrmsg("Please fill all details");
        }
    }
    //paination
    let pageCount = user.pages
    const changePage = ({ selected }) => {
        console.log(selected, "selected")
        query.pageVo.pageNo = selected + 1;
        dispatch(userList(query));
    };

    const filtervalue = (value) => {
        console.log(value, "value");
        query.role = parseInt(value);
        setQuery(query);
        dispatch(userList(query));
    }

    //edit
    const userEditmodal = (item) => {
        console.log(item, "item")
        setUserEditData(item);
        setUserEdit(true);
    }
    const onSumbitEditUser = (user) => {
        console.log(user, "user");
        if (user._id && user.name && user.phone && user.password) {
            setLoading(true);
            dispatch(addUser(user));
            setUserEdit(false);
        }
        else {
            setError(true);
            setErrmsg("please fill all details");
        }
    }

    return (
        <>
            <Container className="mt-3 mb-4">
                <Card >
                    <Card.Body>
                        <SearchBar
                            titile="User List"
                            command=" Add Seller"
                            placeholder="Search User"
                            addModal={userAddmodal}
                            handleSearch={(value) => handleSearch(value)}
                            filtervalue={(value) => filtervalue(value)}
                            filtershow={true}

                        />
                    </Card.Body>
                </Card>
            </Container>

            <div className="container mt-3 mb-4">
                <div className="col-lg-12 mt-4 mt-lg-0">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                {user.userData && user.userData.docs && user.userData.docs.length > 0 && <table className="table manage-candidates-top mb-0">
                                    <thead>
                                        <tr>
                                            <th> Name</th>
                                            <th className="text-center">Type</th>
                                            <th className="text-center">Date</th>
                                            <th className="text-center">Status</th>
                                            <th className="action text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            user.userData.docs.map((item) => {
                                                return (<tr key={item._id} className="candidates-list">
                                                    <td className="title">
                                                        {/* <div className="thumb">
                                                            {item.image ? item.image :
                                                                <img
                                                                    className="img-fluid"
                                                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                                    alt=""
                                                                />
                                                            }
                                                        </div> */}
                                                        <div className="candidate-list-details">
                                                            <div className="candidate-list-info">
                                                                <div className="candidate-list-title">
                                                                    <h5 className="mb-0">
                                                                        <a>{item.name}</a>
                                                                    </h5>
                                                                </div>
                                                                <div className="candidate-list-option">
                                                                    <ul className="list-unstyled">
                                                                        <li>
                                                                            <i className="fas fa-filter pr-1" />
                                                                            {item.phone}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="candidate-list-favourite-time text-center">
                                                        <span className="candidate-list-time order-1">
                                                            {item.role == 3 && "Seller"}
                                                            {item.role == 1 && "Admin"}
                                                            {item.role == 2 && "Customer"}
                                                        </span>
                                                    </td>
                                                    <td className="candidate-list-favourite-time text-center">
                                                        <span className="candidate-list-time order-1">
                                                            {miscService.timeToDate(item.createdtime)}
                                                        </span>
                                                    </td>
                                                    <td className="candidate-list-favourite-time text-center">
                                                        <span className="candidate-list-time order-1">
                                                            {item.block_status ? "Blocked" : "Active"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <ul className="list-unstyled mb-0 d-flex">
                                                            <li>
                                                                <Link to={{ pathname: "/user/" + item._id }}
                                                                    className="text-primary"
                                                                    data-toggle="tooltip"
                                                                    title=""
                                                                    data-original-title="view"
                                                                >
                                                                    <i className="far fa-eye" />
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <i className="fas fa-pencil-alt" onClick={() => userEditmodal(item)} />
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="text-danger"
                                                                    data-toggle="tooltip"
                                                                    title=""
                                                                    data-original-title="Delete"
                                                                >
                                                                    <i className="far fa-trash-alt" onClick={() => deleteConfirm(item._id)} />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <Button variant="dark" onClick={() => blockCustomer(item)}>{item.block_status ? "Unblock" : "Block"}</Button>
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>}

                                {user.isListing && <Loader />}
                                {user.userData && !user.userData.docs && <p> No Users Found</p>}

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


                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {/* delete user modal */}
            <DeleteModal
                show={isDelete}
                title="Delete User"
                message="Are you sure to delete User"
                handleClose={handleClose}
                deleteModal={deleteUser}
            />


            {/* add user modal from admin */}
            <UserAdd
                show={isUseradd}
                handleCloseUserAdd={handleCloseUserAdd}
                onSumbitUser={(user) => onSumbitUser(user)}
                isError={isError}
                errmsg={errmsg}
                isLoading={isLoading}
            />


            {/* edit user modal */}
            <UserEdit
                show={isUseredit}
                handleCloseUserAdd={handleCloseUserAdd}
                isError={isError}
                errmsg={errmsg}
                editdata={editdata}
                isLoading={isLoading}
                onSumbitEditUser={(user) => onSumbitEditUser(user)}
            />

        </>
    )
}
