import { optionConstants } from './constants'
import { homeDetailService } from '../_Service/homeDetailsService'
import { alertActions } from "./alertactions";

export const OptionsList = (Options, login) => {
    console.log(Options, "Options");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: optionConstants.OPTIONSLIST_REQUEST });
            homeDetailService.optionList(Options).then(function (res) {
                if (login === "login") {
                    const Options = res.data.docs;
                    return resolve(Options)
                }
                else {
                    const Options = res.data.docs[0];
                    dispatch({
                        type: optionConstants.OPTIONSLIST_SUCCESS,
                        payload: Options
                    });
                    return resolve(Options);
                }
              
            }, function (err) {
                // console.log(err, "err");
                dispatch({
                    type: optionConstants.OPTIONSLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })

        });

}


export const OptionsAdd = (Options) => {
    console.log(Options, "Options");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: optionConstants.ADDOPTIONS_REQUEST });
            homeDetailService.optionAdd(Options).then(function (res) {
                const Options = res.data;
                console.log(Options, "Options");
                dispatch({
                    type: optionConstants.ADDOPTIONS_SUCCESS,
                    payload: Options
                });
                return resolve(Options);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: optionConstants.ADDOPTIONS_FAILURE,
                    payload: err
                });
                dispatch(alertActions.error("Category Add Error"));
                return reject(err);

            })

        });
}