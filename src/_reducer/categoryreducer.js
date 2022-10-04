import { categoryConstants } from '../_Actions/constants'

const initialState = {
    categoryfullData: [],
    category_ProductList:[],
    categorySingle: {},
    isListing: false,
    isaddcategory: false,
    pages: '',
    total: 0,
}

export const categoryReducer = (state = initialState, action) => {

    switch (action.type) {

        //listing
        case categoryConstants.CATEGORYLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                categoryfullData: [],
            }
            break;
        case categoryConstants.CATEGORYLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                categoryfullData: action.payload,
                pages: action.pages,
                total: action.total,
            }
            break;
        case categoryConstants.CATEGORYLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                categoryfullData: [],
            }
            break;


        //adding
        case categoryConstants.ADDCATEGORY_REQUEST:
            state = {
                ...state,
                isaddcategory: true,
                categorySingle: {},
            }
            break;
        case categoryConstants.ADDCATEGORY_SUCCESS:
            state = {
                ...state,
                isaddcategory: false,
                categorySingle: action.payload,
            }
            break;
        case categoryConstants.ADDCATEGORY_FAILURE:
            state = {
                ...state,
                isaddcategory: false,
                categorySingle: {},
            }
            break;


            case categoryConstants.CATEGORYALLLIST_REQUEST:
                state = {
                    ...state,
                    isListing: true,
                    category_ProductList: [],
                }
                break;
            case categoryConstants.CATEGORYALLLIST_SUCCESS:
                state = {
                    ...state,
                    isListing: false,
                    category_ProductList: action.payload,
                }
                break;
            case categoryConstants.CATEGORYALLLIST_FAILURE:
                state = {
                    ...state,
                    isListing: false,
                    category_ProductList: [],
                }
                break;

    }
    return state;
}