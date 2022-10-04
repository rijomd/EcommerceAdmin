import { product_attributeconstant } from '../_Actions/constants'

const initialState = {
    product_attribute_array: [],
    product_attribute_single: {},
    isListing: false,
    isAddproduct_attribute: false,
    pages:'',
    total:''
}

export const product_attributeReducer = (state = initialState, action) => {

    switch (action.type) {
        //listing
        case product_attributeconstant.PRODUCT_ATTRIBUTE_LISTREQUEST:
            state = {
                ...state,
                isListing: true,
                product_attribute_array: [],
            }
            break;
        case product_attributeconstant.PRODUCT_ATTRIBUTE_LISTSUCCESS:
            state = {
                ...state,
                isListing: false,
                product_attribute_array: action.payload,
                pages:action.pages,
                total:action.total
            }
            break;
        case product_attributeconstant.PRODUCT_ATTRIBUTE_LISTFAILURE:
            state = {
                ...state,
                isListing: false,
                product_attribute_array: [],
            }
            break;


        //adding
        case product_attributeconstant.PRODUCT_ATTRIBUTE_ADDREQUEST:
            state = {
                ...state,
                isAddproduct_attribute: true,
                product_attribute_single: {},
            }
            break;
        case product_attributeconstant.PRODUCT_ATTRIBUTE_ADDSUCCESS:
            state = {
                ...state,
                isAddproduct_attribute: false,
                product_attribute_single: action.payload,
            }
            break;
        case product_attributeconstant.PRODUCT_ATTRIBUTE_ADDFAILURE:
            state = {
                ...state,
                isAddproduct_attribute: false,
                product_attribute_single: {},
            }
            break;


    }
    return state;
}