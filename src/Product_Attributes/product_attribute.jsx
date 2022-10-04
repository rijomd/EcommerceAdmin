import React, { useEffect, useState } from 'react'
import { Button, Row, Container, Col, Table, Card } from 'react-bootstrap';
import { product_attributeAdd, product_attributeList } from "../_Actions/product_attributeactions";
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from "../Components/loader";
import { ProductValues } from "./productValues";
import './attributes.css';
import { DeleteModal } from '../Components/DeleteModal';
import { CategorySelect } from './categorySelect'
import { SearchBar } from "../Components/searchBar";
import ReactPaginate from "react-paginate";

export const Product_attribute = () => {

    const [key, setKey] = useState('');
    const [common, setCommon] = useState(true);
    const [separate, setSeparate] = useState(false);
    const [category_id, setCategory] = useState(0);
    const [keyAttribute, setAttributeData] = useState({});
    const [title, setTitle] = useState('');
    const [attributevalues, setValues] = useState(["Add values"]);
    const [isShowAttributes, setShowAttributeValues] = useState(false);
    const [isDelete, setdelete] = useState(false);
    const [deleteDataid, deleteItem] = useState('');
    const [filtername, setFilterName] = useState("Common")
    const [product_attributes, setproductAttributes] = useState(
        {
            key: "",
            value: [],
            common: true
        }
    );
    const [query, setQuery] = useState({
        pageVo: {
            pageNo: 1,
            noOfItems: 30,
        },
        status: 1
    });
    const product_attribute = useSelector(state => state.product_attribute);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(product_attributeList(query)) }, [product_attribute.product_attribute_single]);


    const handleChange = (value, type) => {
        console.log(value, "value");
        if (type) {
            if (type === "common") {
                setCommon(value);
                setSeparate(!value);
            }
            if (type === "separate") {
                setSeparate(value);
                setCommon(!value);
            }
        }
        else {
            setKey(value)
        }
    }
    const selectCategory = (_id) => {
        setCategory(_id)
    }
    const onSubmitKey = () => {
        product_attributes.key = key;
        if (category_id !== 0) {
            product_attributes.category_id = category_id;
        }
        if (common) {
            product_attributes.common = common;
        }
        if (separate) {
            product_attributes.common = false;
        }
        if (product_attributes.key) {
            dispatch(product_attributeAdd(product_attributes)).then((res) => {
                if (res) {
                    setproductAttributes({
                        key: "",
                        value: [],
                        common: true
                    })
                }
            })
        }
    }
    //edit
    const attributeAddEdit = (item) => {
        console.log(item, "item")
        setAttributeData(item);
        setTitle(item.key)
        if (item.value.length > 0) {
            console.log(item.value, "111")
            setValues(item.value);
        }
        else {
            let newarray = [''];
            setValues(newarray);
        }
        setTimeout(setShowAttributeValues(true), 1000);
    }
    const handleCloseAttribute = () => {
        setShowAttributeValues(false);
    }
    //for deletion
    const deleteConfirm = (attribute_Id) => {
        setdelete(true);
        deleteItem(attribute_Id);
    }
    const handleClose = () => {
        setdelete(false);
    }
    const deleteAttribute = () => {
        if (deleteDataid) {
            console.log(deleteDataid, "deleteDataid");
            dispatch(product_attributeAdd({ _id: deleteDataid, delete: true }));
            setdelete(false);
        }
    }
    const filterCommon = () => {
        if (filtername === "Common") {
            query.common = true;
            dispatch(product_attributeList(query));
            setFilterName("All");
        }
        if (filtername === "All") {
            dispatch(product_attributeList(query));
            setFilterName("Common");
        }
    }
    const handleSearch = (value) => {
        console.log(value, "value");
        query.searchKey = value;
        dispatch(product_attributeList(query));
    }
    const renderValues = (valuearray) => {
        let newarray = [];
        for (let i = 0; i < valuearray.length; i++) {
            newarray.push(
                <p>
                    {valuearray[i]}
                </p>
            )
        }
        return newarray;
    }
    //paination
    let pageCount = product_attribute.pages
    const changePage = ({ selected }) => {
        console.log(selected, "selected")
        query.pageVo.pageNo = selected + 1;
        dispatch(product_attributeList(query));
    };
    const renderAttributes = (attributes) => {
        let myArray = [];
        for (let attribute of attributes) {
            myArray.push(
                <tr>
                    <td>{attribute.key}</td>
                    <td>{renderValues(attribute.value)}</td>
                    <td>{attribute.category_id ? attribute.category_id.name : "Common"}</td>
                    <td>
                        <i className="fas fa-pencil-alt" onClick={() => attributeAddEdit(attribute)} />
                        <i className="far fa-trash-alt" onClick={() => deleteConfirm(attribute._id)} />
                    </td>
                </tr>
            )
        }
        return myArray;
    }

    return (
        <>

            <Container>
                <Row className='attributes'>
                    <Col md={6}>
                        <Row>
                            <h7>Add Attributes</h7>
                        </Row>
                        <Row>
                            <input type="text" className="form-control" placeholder="Name"
                                value={key}
                                onChange={(e) => handleChange(e.target.value)}>
                            </input>
                        </Row>
                        <Row>
                            <label style={{ padding: 0 }}>Common for all categories</label>
                        </Row>
                        <Row className='common_attributes'>
                            <Col>
                                <label>Yes</label>
                                <input type="checkbox" className=""
                                    checked={common}
                                    onChange={(e) => handleChange(e.target.checked, "common",)}>
                                </input>
                            </Col>
                            <Col>
                                <label>No</label>
                                <input type="checkbox" className=""
                                    checked={separate}
                                    onChange={(e) => handleChange(e.target.checked, "separate")}>
                                </input>
                            </Col>
                        </Row>
                        {separate && <CategorySelect category_id={(category_id) => selectCategory(category_id)} />}
                        <Row>
                            <Button onClick={() => onSubmitKey()}>Save</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container className=" mt-3 mb-4">
                <Col lg={12} className=" mt-4 mt-lg-0">
                    <Row >
                        <Col md={12} >
                            <Container className="category-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">

                                <Card >
                                    <Card.Body>
                                        <SearchBar
                                            titile="Attribute List"
                                            command={filtername}
                                            placeholder="Search with  Category"
                                            addModal={filterCommon}
                                            handleSearch={(value) => handleSearch(value)}
                                            filtershow={false}
                                        />
                                    </Card.Body>
                                </Card>

                                {product_attribute.product_attribute_array && product_attribute.product_attribute_array.length > 0 &&
                                    <Table className="table manage-candidates-top mb-0">
                                        <thead>
                                            <tr>
                                                <th >Attribute Name</th>
                                                <th >Attribute Values</th>
                                                <th >Category</th>
                                                <th className="action text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderAttributes(product_attribute.product_attribute_array)}
                                        </tbody>
                                    </Table>}

                                {product_attribute.isListing && <Loader />}
                                {product_attribute.product_attribute_array && product_attribute.product_attribute_array.length == 0 && <p> No Items Found</p>}

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


            <ProductValues
                show={isShowAttributes}
                handleCloseAttribute={handleCloseAttribute}
                keyAttribute={keyAttribute}
                attribute_values={attributevalues}
                title={title}
            />

            <DeleteModal
                show={isDelete}
                title="Delete Attribute"
                message="Are you sure to delete Attribute"
                handleClose={handleClose}
                deleteModal={deleteAttribute}
            />
        </>
    )
}

