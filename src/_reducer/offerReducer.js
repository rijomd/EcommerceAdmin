import { offerconstants } from '../_Actions/constants'

const initialState = {
    offersarray: [],
    offersSingle: {},
    isListing: false,
    isaddoffer: false,
    isaddofferitem:false,
    offeritemSingle:{},
    offeritemArray:[],
    pages: '',
    total: 0,
}

export const offerReducer = (state = initialState, action) => {

    switch (action.type) {
        //listing
        case offerconstants.OFFERLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                offersarray: [],
            }
            break;
        case offerconstants.OFFERLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                offersarray: action.payload,
                pages: action.pages,
                total: action.total,
            }
            break;
        case offerconstants.OFFERLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                offersarray: [],
            }
            break;


        //adding
        case offerconstants.ADDOFFER_REQUEST:
            state = {
                ...state,
                isaddoffer: true,
                offersSingle: {},
            }
            break;
        case offerconstants.ADDOFFER_SUCCESS:
            state = {
                ...state,
                isaddoffer: false,
                offersSingle: action.payload,
            }
            break;
        case offerconstants.ADDOFFER_FAILURE:
            state = {
                ...state,
                isaddoffer: false,
                offersSingle: {},
            }
            break;


        case offerconstants.OFFERITEMlIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                offeritemArray: [],
            }
            break;
        case offerconstants.OFFERITEMlIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                offeritemArray: action.payload,
                pages: action.pages,
                total: action.total,
            }
            break;
        case offerconstants.OFFERITEMlIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                offeritemArray: [],
            }
            break;


        //adding
        case offerconstants.ADDOFFERITEM_REQUEST:
            state = {
                ...state,
                isaddofferitem: true,
                offeritemSingle: {},
            }
            break;
        case offerconstants.ADDOFFERITEM_SUCCESS:
            state = {
                ...state,
                isaddofferitem: false,
                offeritemSingle: action.payload,
            }
            break;
        case offerconstants.ADDOFFERITEM_FAILURE:
            state = {
                ...state,
                isaddofferitem: false,
                offeritemSingle: {},
            }
            break;


    }
    return state;
}