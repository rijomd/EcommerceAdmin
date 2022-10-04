import axios from 'axios';
import { api } from '../_helpers/urlConstants';
// import { useDispatch } from 'react-redux';

// const cors = require('cors');
const token = window.localStorage.getItem('token');

const headers = {
    Authorization: token ? `${token}` : '',
    'Content-Type': 'application/json',
};

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const Login = async (data) => {
    return axios({
        url: api + "/login",
        method: "POST",
        headers: headers,
        data: data,
    }).then(callBackResponse);

}

const userSighnUp = (data) => {
    return axios({
        url: api + "/signup",
        method: "POST",
        headers: headers,
        data: data,
    }).then(callBackResponse);

}

const userList = (data) => {
    return axios({
        url: api + "/userlist",
        method: "POST",
        headers: headers,
        data: data,
    }).then(callBackResponse);

}

// const Logout = () => {
//     localStorage.clear();
//     const dispatch = useDispatch();
//     let token = null;
//     let user = null;
//     dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: {
//             token, user
//         }
//     });
// }

const userAdd = (data) => {
    return axios({
        url: api + "/addUser",
        method: "POST",
        headers: headers,
        data: data,
    }).then(callBackResponse);
}

export const authService = {
    Login, userSighnUp, userList, userAdd
};