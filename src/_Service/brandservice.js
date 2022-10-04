import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const addBrand = async (data) => {
    return axios.post("/addBrand", data).then(callBackResponse);
}

const brandList = async (data) => {
    return axios.post("/brandList", data).then(callBackResponse);
}


export const brandService = {
    brandList, addBrand
}