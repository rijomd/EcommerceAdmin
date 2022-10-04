import { product_attributeconstant } from './constants'
import { product_attributeService } from '../_Service/product_attributeService'
import { alertActions } from "../_Actions/alertactions";


export const product_attributeAdd = (product_attribute) => {
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: product_attributeconstant.PRODUCT_ATTRIBUTE_ADDREQUEST });
            product_attributeService.product_attributeAdd(product_attribute).then(function (res) {
                let attributes = res.data;
                console.log(attributes, "attributes");
                dispatch({
                    type: product_attributeconstant.PRODUCT_ATTRIBUTE_ADDSUCCESS,
                    payload: attributes
                });
                return resolve(attributes);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: product_attributeconstant.PRODUCT_ATTRIBUTE_ADDFAILURE,
                    payload: err
                });
                dispatch(alertActions.error("product_attributes Add Error"));
                return reject(err);
            })
        });
}

export const product_attributeList = (product_attribute) => {
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: product_attributeconstant.PRODUCT_ATTRIBUTE_LISTREQUEST });
            product_attributeService.product_attributeList(product_attribute).then(function (res) {
                const product_attributes = res.data.docs;
                const pages = res.data.pages;
                const total = res.data.total;
                console.log(pages, total,"product_attribute");
                dispatch({
                    type: product_attributeconstant.PRODUCT_ATTRIBUTE_LISTSUCCESS,
                    payload: product_attributes,
                    pages:pages,
                    total:total
                });
                return resolve(product_attributes);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: product_attributeconstant.PRODUCT_ATTRIBUTE_LISTFAILURE,
                    payload: err
                });
                dispatch(alertActions.error("product_attributes Add Error"));
                return reject(err);
            })
        });
}