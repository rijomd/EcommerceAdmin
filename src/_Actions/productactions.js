import { productconstants } from './constants'
import { productService } from '../_Service/productService'
import { alertActions } from "../_Actions/alertactions";


export const ProductList = (product) => {
    console.log(product, "product");
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: productconstants.PRODUCTLIST_REQUEST });
            productService.ProductList(product).then(function (res) {
                const product = res.data.docs;
                const pages = res.data.pages;
                const total = res.data.total;
                console.log(product, "ProductList");
                dispatch({
                    type: productconstants.PRODUCTLIST_SUCCESS,
                    payload: product,
                    pages: pages,
                    total: total
                });
                return resolve(product)
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: productconstants.PRODUCTLIST_FAILURE,
                    payload: err
                });
                return reject(err)
            })

        });
}


export const productsAdd = (product) => {
    console.log(product, "product");
    return async (dispatch) =>

        new Promise((resolve, reject) => {

            dispatch({ type: productconstants.PRODUCTADD_REQUEST });
            productService.productAdd(product).then(function (res) {
                const product = res.data;
                console.log(product, "product");
                dispatch({
                    type: productconstants.PRODUCTADD_SUCCESS,
                    payload: product
                });
                return resolve(product)
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: productconstants.PRODUCTADD_FAILURE,
                    payload: err
                });
                dispatch(alertActions.error("product Add Error"));
                return reject(err)
            })

        });
}


export const productListHome = (productListHome) => {
    console.log(productListHome, "productListHome");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: productconstants.PRODUCTLISTHOME_REQUEST });
            productService.productListHome(productListHome).then(function (res) {
                const productListHome = res.data.docs;
                console.log(productListHome, "productListHomeList");
                dispatch({
                    type: productconstants.PRODUCTLISTHOME_SUCCESS,
                    payload: productListHome,
                });
                return resolve(productListHome);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: productconstants.PRODUCTLISTHOME_FAILURE,
                    payload: err
                });
                return reject(err);
            });

        });
}


export const productListHomeAdd = (productListHome) => {
    console.log(productListHome, "productListHome");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: productconstants.PRODUCTLISTHOMEADD_REQUEST });
            productService.productListHomeAdd(productListHome).then(function (res) {
                const productListHome = res.data.docs;
                console.log(productListHome, "productListHome");
                dispatch({
                    type: productconstants.PRODUCTLISTHOME_SUCCESS,
                    payload: productListHome,
                });
                return resolve(productListHome);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: productconstants.PRODUCTLISTHOMEADD_FAILURE,
                    payload: err
                });
                dispatch(alertActions.error("productListHome Add Error"));
                return reject(err);
            })
        });
}

export const varientList = (product) => {
    console.log(product, "product");
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({ type: productconstants.VARIENTLIST_REQUEST });
            productService.varientList(product).then(function (res) {
                const product = res.data.docs;
                console.log(product, "ProductList");
                dispatch({
                    type: productconstants.VARIENTLIST_SUCCESS,
                    payload: product,
                });
                return resolve(product);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: productconstants.VARIENTLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}


export const varientsAdd = (product) => {
    console.log(product, "product");
    return async (dispatch) => {
        dispatch({ type: productconstants.VARIENTLIST_REQUEST });
        productService.varientsAdd(product).then(function (res) {
            const product = res.data.docs;
            console.log(product, "ProductList");
            dispatch({
                type: productconstants.VARIENTLIST_SUCCESS,
                payload: product,
            });
        }, function (err) {
            console.log(err, "err");
            dispatch({
                type: productconstants.VARIENTLIST_FAILURE,
                payload: err
            });

        })
    }
}