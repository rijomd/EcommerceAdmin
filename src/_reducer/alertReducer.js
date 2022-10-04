import { authconstants } from '../_Actions/constants'

const initState = {
  isError: false,
  message: 'empty'
};

export const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case authconstants.SUCCESS_ALERT:
      state = {
        ...state,
        message: action.message
      }
      break;
    case authconstants.ERROR_ALERT:
      state = {
        ...state,
        isError: true,
        message: action.message
      }
      break;
  }
  return state;
}