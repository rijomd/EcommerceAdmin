import { authconstants } from './constants'
import { authService } from '../_Service/authService'

export const login = (user) => {
    console.log(user, "user")
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: authconstants.LOGIN_REQUEST });
            authService.Login(user).then(function (res) {
                const { token, user } = res.data;
                console.log(user, "res");
                localStorage.setItem('token', token);
                // localStorage.setItem('token', access_token);
                // localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authconstants.LOGIN_SUCCESS,
                    user: user,
                    token: token
                });
                return resolve(user);

            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: authconstants.LOGIN_FAILURE,
                    payload: { err }
                });
                return reject(err);
            })
        });
}

export const userSighnUp = (user) => {
    console.log(user, "user")
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: authconstants.SIGHNUP_REQUEST });
            authService.userSighnUp(user).then(function (res) {
                console.log(res, "res");
                const { user } = res.data;
                dispatch({
                    type: authconstants.SIGHNUP_SUCCESS,
                    payload: user
                });
                return resolve(user);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: authconstants.SIGHNUP_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}

export const userList = (user) => {
    console.log(user, "user");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: authconstants.USERLIST_REQUEST });
            authService.userList(user).then(function (res) {
                console.log(res, "userList");
                const user = res.data;
                const user2 = res.data.docs;
                const pages = res.data.pages;
                const total = res.data.total;
                dispatch({
                    type: authconstants.USERLIST_SUCCESS,
                    payload: user,
                    pages: pages,
                    total: total
                });
                return resolve(user2);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: authconstants.USERLIST_FAILURE,
                    payload: err
                });
                return reject(err);

            })
        });
}

export const addUser = (user) => {
    console.log(user, "user")
    return async (dispatch) => {

        dispatch({ type: authconstants.ADDUSER_REQUEST });

        authService.userAdd(user)
            .then((res) => {
                console.log(res.data, "response");
                dispatch({
                    type: authconstants.ADDUSER_SUCCESS,
                    payload: user
                });
            },
                (err) => {
                    alert("useradd error")
                }
            )
    }
}
