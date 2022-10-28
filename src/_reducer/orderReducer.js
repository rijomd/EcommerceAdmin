import { orderConstants } from '../_Actions/constants'

const initialState = {
    orderarray: [],
    isListing: false,
    pages: '',
    total: 0,
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {

        //listing
        case orderConstants.ORDER_REQUEST:
            state = {
                ...state,
                isListing: true,
                orderarray: [],
            }
            break;
        case orderConstants.ORDER_SUCCESS:
            state = {
                ...state,
                isListing: false,
                orderarray: action.payload,
                pages: action.pages,
                total: action.total,
            }
            break;
        case orderConstants.ORDER_FAIL:
            state = {
                ...state,
                isListing: false,
                orderarray: [],
            }
            break;

    }
    return state;
}