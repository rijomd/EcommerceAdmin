import React, { useState } from 'react'
import {
    Button,
    Container,
    Form,
    Navbar,
    Row
} from 'react-bootstrap';


export const SearchBar = (props) => {
    const {
        titile,
        command,
        addModal,
        handleSearch,
        placeholder,
        filtervalue,
        filtershow
    } = props;
    const [selectedvalue, setValue] = useState('');

    const handleSearching = (values) => {
        console.log(values, "valuees")
        handleSearch(values);
    }
    const handleSelectChange = (e) => {
        console.log(e.currentTarget.value, "valuees")
        setValue(e.currentTarget.value);
        filtervalue(e.currentTarget.value);
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand>{titile}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" style={{ justifyContent: 'right' }}>
                    <Form className="d-flex" style={{ marginTop: "1rem" }}>
                        <Form.Control type="search"
                            placeholder={placeholder}
                            className="me-2"
                            aria-label="Search"
                            onChange={
                                (e) => handleSearching(e.currentTarget.value)
                            } />

                        {filtershow && <Row style={
                            {
                                width: "100%",
                                marginLeft: "0px",
                            }
                        }>
                            <select className="form-select" aria-label="Filter"
                                onChange={handleSelectChange}
                                value={selectedvalue}>
                                <option selected value="">Clear All</option>
                                <option value="1">Admin Users</option>
                                <option value="2">General Users</option>
                                <option value="3">Seller Users</option>
                            </select>
                        </Row>}
                        <Button variant="primary"
                            onClick={addModal}>
                            {command}</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
