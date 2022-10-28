import { authReducer } from './authReducer';
import { userReducer } from './useRreducer';
import { miscReducer } from './miscReducer';
import { optionsReducer } from './optionReducer';
import { categoryReducer } from './categoryreducer';
import { alertReducer } from './alertReducer';
import { productReducer } from './productReducer';
import { brandReducer } from './brandreducer';
import { product_attributeReducer } from './product_attributeReducer';
import { offerReducer } from './offerReducer';
import { ordersReducer } from './/orderReducer';


import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    misc: miscReducer,
    category: categoryReducer,
    options: optionsReducer,
    alert: alertReducer,
    product: productReducer,
    brand: brandReducer,
    product_attribute: product_attributeReducer,
    offer: offerReducer,
    order: ordersReducer,
});

export default rootReducer;
