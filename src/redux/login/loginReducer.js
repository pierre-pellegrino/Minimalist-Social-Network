import { SET_BOOM_NUMBER_REQUEST, SET_BOOM_NUMBER_SUCCESS, USER_LOGIN } from "./loginTypes";
import { USER_LOGOUT } from "./loginTypes";
import { ADD_LIKE } from "./loginTypes";
import { REMOVE_LIKE } from "./loginTypes";
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const userId = Cookies.get('id');
const boomNb = Cookies.get('boomNb');
const likedBooms = Cookies.get('likedBooms');
const initialState = {
  is_connected: token ? true : false,
  token: token ? token : "",
  id: userId ? userId : "",
  boomCount: boomNb,
  likedBooms: likedBooms ? likedBooms.split(',').map(b => parseInt(b,10)) : []
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
    case ADD_LIKE:
      return {
        ...state,
        likedBooms: [...state.likedBooms, action.boomId]
      }
    case REMOVE_LIKE:
      return {
        ...state,
        likedBooms: [...state.likedBooms].filter((likedBoom) => likedBoom != action.boomId)
      }
    default:
      return state;
  }
}

export default loginReducer;