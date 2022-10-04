import { brandconstant } from '../_Actions/constants'

const initialState = {
    brandarray: [],
    brandSingle: {},
    isListing: false,
    isaddbrand: false,
    pages: '',
    total: 0,
}

export const brandReducer = (state = initialState, action) => {

    switch (action.type) {
        //listing
        case brandconstant.BRANDLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                brandarray: [],
            }
            break;
        case brandconstant.BRANDLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                brandarray: action.payload,
                pages: action.pages,
                total: action.total,
            }
            break;
        case brandconstant.BRANDLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                brandarray: [],
            }
            break;


        //adding
        case brandconstant.ADDBRAND_REQUEST:
            state = {
                ...state,
                isaddbrand: true,
                brandSingle: {},
            }
            break;
        case brandconstant.ADDBRAND_SUCCESS:
            state = {
                ...state,
                isaddbrand: false,
                brandSingle: action.payload,
            }
            break;
        case brandconstant.ADDBRAND_FAILURE:
            state = {
                ...state,
                isaddbrand: false,
                brandSingle: {},
            }
            break;


    }
    return state;
}