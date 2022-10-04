import { productconstants } from '../_Actions/constants'

const initialState = {
    productArray: [],
    productlisthome: [],
    producthome: {},
    productSingledata: {},
    isListing: false,
    isproductAdd: false,
    producthomedat: {},
    varientsArray: [],
    editAttributtesArray: [],
    pages: '',
    total: '',

    //for listing varints details
    attributesall: [],
    varient_data: {},
    edit_Varients: [],

    // filter option
    isfilteropen: false,
}

export const productReducer = (state = initialState, action) => {

    switch (action.type) {

        //listing
        case productconstants.PRODUCTLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                productArray: {},
            }
            break;
        case productconstants.PRODUCTLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                productArray: action.payload,
                pages: action.pages,
                total: action.total
            }
            break;
        case productconstants.PRODUCTLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                productArray: {},
            }
            break;


        //adding
        case productconstants.PRODUCTADD_REQUEST:
            state = {
                ...state,
                isproductAdd: true,
                productSingledata: {},
            }
            break;
        case productconstants.PRODUCTADD_SUCCESS:
            state = {
                ...state,
                isproductAdd: false,
                productSingledata: action.payload,
            }
            break;
        case productconstants.PRODUCTADD_FAILURE:
            state = {
                ...state,
                isproductAdd: false,
                productSingledata: {},
            }
            break;


        //listing
        case productconstants.PRODUCTLISTHOME_REQUEST:
            state = {
                ...state,
                isListing: true,
                productlisthome: [],
            }
            break;
        case productconstants.PRODUCTLISTHOME_SUCCESS:
            state = {
                ...state,
                isListing: false,
                productlisthome: action.payload,
            }
            break;
        case productconstants.PRODUCTLISTHOME_FAILURE:
            state = {
                ...state,
                productlisthome: [],
            }
            break;


        //Addding
        case productconstants.PRODUCTLISTHOMEADD_REQUEST:
            state = {
                ...state,
                isListing: true,
                producthomedat: {}
            }
            break;
        case productconstants.PRODUCTLISTHOMEADDSUCCESS:
            state = {
                ...state,
                isListing: false,
                producthomedat: action.payload,
            }
            break;
        case productconstants.PRODUCTLISTHOMEADD_FAILURE:
            state = {
                ...state,
                isListing: false,
                producthomedat: {}
            }
            break;

        //PRODUCT VARIENTS LISTING
        case productconstants.VARIENTLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                varientsArray: [],
                editAttributtesArray: []
            }
            break;
        case productconstants.VARIENTLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                varientsArray: action.payload,
            }
            break;
        case productconstants.VARIENTLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                varientsArray: [],
                editAttributtesArray: []
            }
            break;

        //ADD ATTRIBUTES OF VARIENTSf
        case "ATTRIBUTES_VALUE":
            state = {
                ...state,
                attributesall: action.data,
                varient_data: action.varient_data,
            }
            break;


        case "EDIT_VARIENTS":
            state = {
                ...state,
                edit_Varients: action.data,
            }
            break;

        case "ISFILTERBAR_OPEN":
            state = {
                ...state,
                isfilteropen: action.data,
            }
            break;

    }
    return state;
}