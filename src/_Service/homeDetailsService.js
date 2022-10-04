import axios from 'axios';
import { api } from '../_helpers/urlConstants';
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

const optionList = (data) => {
    return axios({
        url: api + "/optionList",
        method: "POST",
        headers: headers,
        data: data,
    }).then(callBackResponse);

}
const optionAdd = (data) => {
    return axios({
        url: api + "/optionAdd",
        method: "POST",
        headers: headers,
        data: data,
    }).then(callBackResponse);

}

export const homeDetailService = {
    optionList, optionAdd
};