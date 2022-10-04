import { authconstants } from '../_Actions/constants'

const initialState = {
    isSighnup: false,
    userSignData: {},
    message: "",
    isListing: false,
    isAdduser: false,
    userData: {},
    userSingle: {},
    total: '',
    pages: "",
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case authconstants.SIGHNUP_REQUEST:
            state = {
                ...state,
                isSighnup: true
            }
            break;

        case authconstants.SIGHNUP_SUCCESS:
            state = {
                ...state,
                isSighnup: false,
                message: "Succesfully Registered!",
            }
            break;

        case authconstants.SIGHNUP_FAILURE:
            state = {
                ...state,
                isSighnup: false,
                userSignData: {},
                message: action.payload,
            }
            break;


        //listing
        case authconstants.USERLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                userData: {},
            }
            break;
        case authconstants.USERLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                userData: action.payload,
                pages: action.pages,
                total: action.total
            }
            break;
        case authconstants.USERLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                userData: {},
            }
            break;


        //add by admin
        case authconstants.ADDUSER_REQUEST:
            state = {
                ...state,
                isAdduser: true,
                userSingle: {},
            }
            break;
        case authconstants.ADDUSER_SUCCESS:
            state = {
                ...state,
                isAdduser: false,
                userSingle: action.payload,
            }
            break;
        case authconstants.ADDUSER_FAILURE:
            state = {
                ...state,
                isAdduser: false,
                userSingle: {},
            }
            break;


    }
    return state;
}