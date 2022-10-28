import axios from '../_helpers/axios';
import { orderConstants } from './constants'


export const getOrder = () => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: orderConstants.ORDER_REQUEST });
        let response = await axios.post("/getOrder", {});
        if (response.status === 200) {
            let payload = response.data.data.docs;
            const pages = response.data.data.pages;
            const total = response.data.data.total;
            await dispatch({
                type: orderConstants.ORDER_SUCCESS,
                payload: payload,
                pages: pages,
                total: total,
            });
        }
        else {
            await dispatch({
                type: orderConstants.ORDER_FAIL,
                payload: "Error"
            });
        }
        return response;
    }

}



