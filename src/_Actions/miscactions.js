import { authconstants, imageConstants } from './constants'
import { miscService } from '../_Service/miscService'
import { alertActions } from "../_Actions/alertactions";

const fileUpload = (file, name) => {
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: authconstants.FILEUPLOAD_REQUEST });
            miscService.fileUpload(file, name).then(function (res) {
                const data = res.data;
                console.log(data, "data");
                dispatch({
                    type: authconstants.FILEUPLOAD_SUCCESS,
                    payload: data.image
                });
                return resolve(data);
            }, function (err) {
                console.log(err, "err");
                reject(err);
                alertActions.error("File Upload Error");
            })

        });
}

const imageList = (data) => {
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: imageConstants.IMAGELIS_REQUEST });
            miscService.imageList(data).then(function (res) {
                const data = res.data.docs;
                console.log(data, "data");
                dispatch({
                    type: imageConstants.IMAGELIST_SUCCESS,
                    payload: data
                });
                return resolve(data);
            }, function (err) {
                console.log(err, "err");
                reject(err);
                alertActions.error("Image List error");
            })

        });
}

export const miscActions = {
    fileUpload, imageList
}