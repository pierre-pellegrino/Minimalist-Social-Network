import loginReducer from "./redux/login/loginReducer";
import {createStore} from "redux";

const store = createStore(loginReducer);

export default store;
