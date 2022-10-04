import { brandconstant } from './constants'
import { brandService } from '../_Service/brandservice'
import { alertActions } from "../_Actions/alertactions";


export const brandList = (brand) => {
    console.log(brand, "brand");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: brandconstant.BRANDLIST_REQUEST });
            brandService.brandList(brand).then(function (res) {
                const brand = res.data.docs;
                const pages = res.data.pages;
                const total = res.data.total;
                dispatch({
                    type: brandconstant.BRANDLIST_SUCCESS,
                    payload: brand,
                    pages: pages,
                    total: total,
                });
                return resolve(brand);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: brandconstant.BRANDLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })

        });
}


export const addBrand = (brand) => {
    console.log(brand, "brand");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: brandconstant.ADDBRAND_REQUEST });
            brandService.addBrand(brand).then(function (res) {
                const brand = res.data;
                console.log(brand, "brand");
                dispatch({
                    type: brandconstant.ADDBRAND_SUCCESS,
                    payload: brand
                });
                return resolve(brand);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: brandconstant.ADDBRAND_FAILURE,
                    payload: err
                });
                dispatch(alertActions.error("brand Add Error"));
                return reject(err);
            })
        });
}