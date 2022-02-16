import { SET_BOOM_NUMBER_REQUEST, SET_BOOM_NUMBER_SUCCESS, USER_LOGIN } from "./loginTypes";
import { USER_LOGOUT } from "./loginTypes";
import { ADD_BOOM } from "./loginTypes";
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const userId = Cookies.get('id');
const boomNb = Cookies.get('boomNb');

const initialState = {
  is_connected: token ? true : false,
  token: token ? token : "",
  id: userId ? userId : "",
  boomCount: boomNb
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        is_connected: true,
        token: action.token,
        id: action.id,
      };
    case USER_LOGOUT:
      return {
        ...state,
        is_connected: false,
        token: '',
        id: ''
      }
    case ADD_BOOM:
      return {
        ...state,
        boomCount: state.boomCount + 1
      }
    case SET_BOOM_NUMBER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SET_BOOM_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        boomCount: action.nb
      }
    default:
      return state;
  }
}

export default loginReducer;