import { offerconstants } from './constants'
import { offerService } from '../_Service/offerservice'
import { alertActions } from "../_Actions/alertactions";


export const offerList = (offer) => {
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({ type: offerconstants.OFFERLIST_REQUEST });
            offerService.offerList(offer).then(function (res) {
                const offer = res.data.docs;
                const pages = res.data.pages;
                const total = res.data.total;
                dispatch({
                    type: offerconstants.OFFERLIST_SUCCESS,
                    payload: offer,
                    pages: pages,
                    total: total,
                });
                return resolve(offer);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: offerconstants.OFFERLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })

        });
}


export const addoffer = (offer) => {
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: offerconstants.ADDOFFER_REQUEST });
            offerService.addOffer(offer).then(function (res) {
                const offer = res.data;
                console.log(offer, "offer");
                dispatch({
                    type: offerconstants.ADDOFFER_SUCCESS,
                    payload: offer
                });
                return resolve(offer);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: offerconstants.ADDOFFER_FAILURE,
                    payload: err
                });
                dispatch(alertActions.error("offer Add Error"));
                return reject(err);
            })
        });
}



export const offerItemList = (offerItem) => {
    console.log(offerItem, "offerItem");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: offerconstants.OFFERITEMlIST_REQUEST });
            offerService.offerItemList(offerItem).then(function (res) {
                const offerItem = res.data.docs;
                const pages = res.data.pages;
                const total = res.data.total;
                dispatch({
                    type: offerconstants.OFFERITEMlIST_SUCCESS,
                    payload: offerItem,
                    pages: pages,
                    total: total,
                });
                return resolve(offerItem);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: offerconstants.OFFERITEMlIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })

        });
}


export const addofferItem = (offerItem) => {
    console.log(offerItem, "offerItem");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: offerconstants.ADDOFFERITEM_REQUEST });
            offerService.addofferItem(offerItem).then(function (res) {
                const offerItem = res.data;
                console.log(offerItem, "offerItem");
                dispatch({
                    type: offerconstants.ADDOFFERITEM_SUCCESS,
                    payload: offerItem
                });
                return resolve(offerItem);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: offerconstants.ADDOFFERITEM_FAILURE,
                    payload: err
                });
                dispatch(alertActions.error("offerItem Add Error"));
                return reject(err);
            })
        });
}
