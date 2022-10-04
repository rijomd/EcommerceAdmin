import { optionConstants } from '../_Actions/constants'

const initialState = {
    options: {},
    optionsData: {},
    isListing: false,
    isAddOptions: false,
}

export const optionsReducer = (state = initialState, action) => {

    switch (action.type) {

        //adding
        case optionConstants.ADDOPTIONS_REQUEST:
            state = {
                ...state,
                isAddOptions: true,
                optionsData: {},
            }
            break;
        case optionConstants.ADDOPTIONS_SUCCESS:
            state = {
                ...state,
                isAddOptions: false,
                optionsData: action.payload,
            }
            break;
        case optionConstants.ADDOPTIONS_FAILURE:
            state = {
                ...state,
                isAddOptions: false,
                optionsData: {},
            }
            break;


        //LISTING
        case optionConstants.OPTIONSLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                options: {},
            }
            break;
        case optionConstants.OPTIONSLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                options: action.payload,
            }
            break;
        case optionConstants.OPTIONSLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                options: {},
            }
            break;


    }
    return state;
}