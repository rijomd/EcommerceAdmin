import { authconstants } from './constants'



function success(message) {
    return { type: authconstants.SUCCESS_ALERT, message };
}

function error(message) {
    console.log(message, "message")
    return async (dispatch) => {
        dispatch({
            type: authconstants.ERROR_ALERT, message
        });
    }
}

export const alertActions = {
    success,
    error,
};
