import { USER_LOGIN } from "./loginTypes";
import { USER_LOGOUT } from "./loginTypes";
import { SET_BOOM_NUMBER_REQUEST } from "./loginTypes";
import { SET_BOOM_NUMBER_SUCCESS } from "./loginTypes";
import { ADD_LIKE } from "./loginTypes";
import { REMOVE_LIKE } from "./loginTypes";
import Cookies from 'js-cookie';


// Login / Logout
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

// Adds/Removes entries from array containing likes
export const addLike = (boomId) => {
  return {
    type: ADD_LIKE,
    boomId
  }
}

export const removeLike = (boomId) => {
  return {
    type: REMOVE_LIKE,
    boomId
  }
}


// Gets total number of booms
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