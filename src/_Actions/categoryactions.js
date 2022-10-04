import { categoryConstants } from './constants'
import { categoryService } from '../_Service/categoryservice'
import { alertActions } from "../_Actions/alertactions";


export const categoryList = (category) => {
    console.log(category, "category");
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({ type: categoryConstants.CATEGORYLIST_REQUEST });
            categoryService.CategoryList(category).then(function (res) {
                const category = res.data.docs;
                const pages = res.data.pages;
                const total = res.data.total;

                console.log(category, "categoryList");
                dispatch({
                    type: categoryConstants.CATEGORYLIST_SUCCESS,
                    payload: category,
                    pages: pages,
                    total: total,
                });
                return resolve(category);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: categoryConstants.CATEGORYLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}


export const categorysAdd = (category) => {
    console.log(category, "category");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: categoryConstants.ADDCATEGORY_REQUEST });
            categoryService.categoryAdd(category).then(function (res) {
                const category = res.data;
                console.log(category, "category");
                dispatch({
                    type: categoryConstants.ADDCATEGORY_SUCCESS,
                    payload: category
                });
                return resolve(category);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: categoryConstants.ADDCATEGORY_FAILURE,
                    payload: err
                });
                dispatch(alertActions.error("Category Add Error"));
                return reject(err);
            })
        });
}

export const categoryAllList = (category) => {
    console.log(category, "category");
    return async (dispatch) => {
        dispatch({ type: categoryConstants.CATEGORYALLLIST_REQUEST });
        categoryService.categoryAllList(category).then(function (res) {
            const category = res.data;
            console.log(category, "categoryList");
            dispatch({
                type: categoryConstants.CATEGORYALLLIST_SUCCESS,
                payload: category,
            });

        }, function (err) {
            console.log(err, "err");
            dispatch({
                type: categoryConstants.CATEGORYALLLIST_FAILURE,
                payload: err
            });

        })

    }
}
