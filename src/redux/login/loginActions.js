import { USER_LOGIN } from "./loginTypes";
import { USER_LOGOUT } from "./loginTypes";
import { ADD_BOOM } from './loginTypes';
import { SET_BOOM_NUMBER_REQUEST } from "./loginTypes";
import { SET_BOOM_NUMBER_SUCCESS } from "./loginTypes";
import Cookies from 'js-cookie';

export const userLogin = (token, id) => {
  return {
    type: USER_LOGIN,
    token,
    id
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
}


export const fetchBoomNumber = (token) => {
  return (dispatch) => { 
    fetchBoomNumberRequest();
    fetch('http://localhost:1337/posts/count', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      dispatch(fetchBoomNumberSuccess(response));
    })
  }
}

export const fetchBoomNumberRequest = () => {
  return {
    type: SET_BOOM_NUMBER_REQUEST
  }
}

export const fetchBoomNumberSuccess = (nb) => {
  Cookies.set('boomNb', nb);
  return {
    type: SET_BOOM_NUMBER_SUCCESS,
    nb: nb
  }
}

export const addBoom = () => {
  return {
    type: ADD_BOOM
  }
}