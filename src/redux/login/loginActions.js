import { USER_LOGIN } from "./loginTypes";
import { USER_LOGOUT } from "./loginTypes";

export const userLogin = (token) => {
  return {
    type: USER_LOGIN,
    token
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
}