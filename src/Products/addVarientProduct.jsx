import React, { useState } from "react";
import { ProductAttributes } from './_productAttributes';
import { ProductVarients } from './productVarients';
import { useDispatch } from 'react-redux';



export const AddVarientProduct = (props) => {

    const { saveSavarientsArray, category } = props;
    const dispatch = useDispatch();
    const [attributesall, setattributesall] = useState([]);
    const [varientsAll, setVarientAll] = useState([]);

    const setAttributes = (attributes) => {
        console.log(attributes, "attributes");
        setattributesall(attributes); //this value saved in product; in saved_Attributes[key,value pair];
        // attributes arrranged inorder of selected manner 
        // eg : (color,ram,rom) selected ram,rom then ==> (Ram,Rom); 
        // saved attributes values in varients in order ==> (4gb,32gb);  in atribute_value[values only];
        // already added attributes and need add new attribute   (color) then ==> selected (Ram,rom,Color);  this order
        // (Ram,rom,Color) in this order varients attributes values are stores ==>(4gb,32gb,red)
        if (attributes) {
            let obj = {
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
        varientsAll.push(varients);
        setVarientAll(varientsAll);
        saveSavarientsArray(varientsAll);
    }
    return (
        <div>
            {category && <ProductAttributes setAttributes={(attributes) => setAttributes(attributes)} edit_true={false} />}

            {attributesall.length > 0 && <ProductVarients
                setAllVarients={(varients) => setAllVarients(varients)}
            />}

        </div>
    )
}

