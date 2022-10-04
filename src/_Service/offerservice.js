import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const addOffer = async (data) => {
    return axios.post("/addOffer", data).then(callBackResponse);
}

const offerList = async (data) => {
    return axios.post("/offerList", data).then(callBackResponse);
}

const addofferItem = async (data) => {
    return axios.post("/addOfferItm", data).then(callBackResponse);
}

const offerItemList = async (data) => {
    return axios.post("/offerItemList", data).then(callBackResponse);
}

export const offerService = {
    offerList, addOffer, offerItemList, addofferItem
}