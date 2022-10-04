import { authconstants } from '../_Actions/constants'

const initState = {
    // token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token:"",
    user:"",
    failed: false,
    authenticating: false,
    authenticate: false,
    loading: false,
    message: '',

};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authconstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authconstants.LOGIN_FAILURE:
            state = {
                ...state,
                user: {},
                message: action.payload.err,
                failed: true
            }
            break;
        case authconstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.user,
                token: action.token,
                authenticate: true,
                authenticating: false,
                message: "Success"
            }
            break;
        case authconstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authconstants.LOGOUT_SUCCESS:
            state = {
                ...state,
                user: null,
                token:null,
                authenticate: false,
                failed: false,
            }
            break;
        case authconstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;

    }
    return state;
}