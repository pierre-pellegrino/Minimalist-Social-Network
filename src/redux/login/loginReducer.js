import { USER_LOGIN } from "./loginTypes";
import { USER_LOGOUT } from "./loginTypes";
import Cookies from 'js-cookie';

const token = Cookies.get('token');

const initialState = {
  is_connected: token ? true : false,
  token: token ? token : ""
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        is_connected: true,
        token: action.token,
        profile: action.response
      };
    case USER_LOGOUT:
      return {
        ...state,
        is_connected: false,
        token: '',
        profile: ''
      }
    default:
      return state;
  }
}

export default loginReducer;