import { authconstants, imageConstants } from '../_Actions/constants'

const initialState = {
    isMenuopen: false,
    isrequest:false,
    isfile_upload: true,
    imageData: "",
    imageArray: []
}

export const miscReducer = (state = initialState, action) => {
    switch (action.type) {
        case authconstants.ISMENUBAR_OPEN:
            state = {
                ...state,
                isMenuopen: action.data
            }
            break;
        //image upload
        case authconstants.FILEUPLOAD_REQUEST:
            state = {
                ...state,
                isfile_upload: true
            }
            break;
        case authconstants.FILEUPLOAD_SUCCESS:
            state = {
                ...state,
                imageData: action.payload,
                isfile_upload: false
            }
            break;
        case authconstants.FILEUPLOAD_FAILURE:
            state = {
                ...state,
                imageData: action.payload,
                isfile_upload: false
            }
            break;

        //imagelist
        case authconstants.IMAGELIS_REQUEST:
            state = {
                ...state,
                isrequest: true
            }
            break;
        case authconstants.IMAGELIST_SUCCESS:
            state = {
                ...state,
                imageArray: action.payload,
                isrequest: false
            }
            break;
    }
    return state;
}