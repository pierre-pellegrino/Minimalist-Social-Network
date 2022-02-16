import loginReducer from "./redux/login/loginReducer";
import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from 'redux-thunk';

// Prod
// const store = createStore(
//   loginReducer,
//   applyMiddleware(thunkMiddleware)
// );

// Dev
const store = createStore(
  loginReducer,
  compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
