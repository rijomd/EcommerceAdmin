import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import { ProductAttributes } from './_productAttributes';
import { ProductVarients } from './productVarients';
import { Editvarientlist } from './editvarientlist';



export const EditVarientProduct = (props) => {

    const { saveSavarientsArray } = props;
    const dispatch = useDispatch();
    const [isedit, setedit] = useState(false);
    const [attributesall, setattributesall] = useState([]);

    const setAttributes = (attributes) => {
        console.log(attributes, "attributes");
        setattributesall(attributes);

        if (attributes) {
            let obj = {
                index: 1,
                orginal_price: "",
                selling_price: "",
                varient_name: "",
                productPictures: [],
                availabile_qty: 1,
                type_product: "multi",
                atribute_value: [],
            };
            for (let i = 0; i < attributes.length; i++) {
                let key = attributes[i].key;
                obj[key] = ''
            }
            dispatch({
                type: "ATTRIBUTES_VALUE",
                data: attributes,
                varient_data: obj
            })
        }
    }

    const setAllVarients = (varients) => {
        console.log(varients, "varients");
        let newArray = [];
        newArray.push(varients);
        saveSavarientsArray(newArray);
    }
    return (
        <div>
            <ProductAttributes setAttributes={(attributes) => setAttributes(attributes)} edit_true={true} />

            <Editvarientlist />
            
            <ProductVarients
                setAllVarients={(varients) => setAllVarients(varients)}
            />

        </div>
    )
}

