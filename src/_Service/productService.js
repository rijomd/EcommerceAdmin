import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const productAdd = async (data) => {
    return axios.post("/productAdd", data).then(callBackResponse);
}

const ProductList = async (data) => {
    return axios.post("/productlist", data).then(callBackResponse);
}

const productListHomeAdd = async (data) => {
    return axios.post("/addproductlisthome", data).then(callBackResponse);
}

const productListHome = async (data) => {
    return axios.post("/getproductlisthome", data).then(callBackResponse);
}

const varientList = async (data) => {
    return axios.post("/varientList", data).then(callBackResponse);
}

const varientsAdd = async (data) => {
    return axios.post("/varientsAdd", data).then(callBackResponse);
}

export const productService = {
    productAdd, ProductList, productListHome, productListHomeAdd,varientList,varientsAdd
}