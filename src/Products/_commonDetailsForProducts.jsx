import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';

export const CommonDetailsForProducts = (props) => {
    const { handleChange, product, cod,returnvalue } = props;
    const [checked, setChecked] = useState(false);
    const [returnable, setReturnable] = useState(true);

    const handleChecked = (value) => {
        setChecked(!value);
        cod(!value);
    }
    const handleReturnable = (value) => {
        setReturnable(!value);
        returnvalue(!value);
    }
    return (
        <div>
            <Row className="form-row margin-2-res">
                <Col md={4}>
                    <label>Product Name</label>
                </Col>
                <Col md={8}>
                    <input type="text" className="form-control" placeholder="Name" value={product.name}
                        onChange={(e) => handleChange("name", e.target.value)}></input>
                </Col>
            </Row>

            <Row className="form-row margin-2-res">
                <Col md={4}>
                    <label>Product Description</label>
                </Col>
                <Col md={8}>
                    <textarea className="form-control" placeholder="Description" value={product.description}
                        onChange={(e) => handleChange("description", e.target.value)}></textarea>
                </Col>
            </Row>


            <Row className="form-row margin-2-res">
                <Col md={4}>
                    <label>Product Short Description</label>
                </Col>
                <Col md={8}>
                    <textarea className="form-control" placeholder="Short Description" value={product.short_desc}
                        onChange={(e) => handleChange("short_desc", e.target.value)}></textarea>
                </Col>
            </Row>

            <Row className="form-row margin-2-res">
                <Col md={4}>
                    <label>Cash on delivery</label>
                </Col>
                <Col md={8}>
                <label style={{ paddingRight: "5px" }}>Yes</label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleChecked(checked)}
                    />
                </Col>
            </Row>

            <Row className="form-row margin-2-res">
                <Col md={4}>
                    <label>Returnable Product</label>
                </Col>
                <Col md={8}>
                <label style={{ paddingRight: "5px" }}>Yes</label>
                    <input
                        type="checkbox"
                        checked={returnable}
                        onChange={() => handleReturnable(returnable)}
                    />
                </Col>
            </Row>


        </div>
    )
}

