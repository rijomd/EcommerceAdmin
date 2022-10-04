import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const fileUpload = async (file, name) => {
    console.log(file, name);
    let data = new FormData();
    data.append("file", file);
    console.log(data, "dataaa");

    return axios.post("/imageAdd", data).then(callBackResponse);
}

const imageList = async (data) => {
    return axios.post("/imagelist", data).then(callBackResponse);
}
const timeToDate = (data) => {
    let date = new Date(data);
    let dateToStr = date.toLocaleDateString().split(' ');
    let cleanDate = dateToStr[0];
    return cleanDate;
}

export const miscService = {
    fileUpload, imageList, timeToDate
}