import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const product_attributeAdd = async (data) => {
    return axios.post("/product_atributesAdd", data).then(callBackResponse);
}

const product_attributeList = async (data) => {
    return axios.post("/product_atributesList", data).then(callBackResponse);
}


export const product_attributeService = {
    product_attributeAdd, product_attributeList, 
}