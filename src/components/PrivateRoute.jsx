import React from 'react';
import {Route, Navigate} from "react-router-dom";
import Cookies from 'js-cookie';

const checkAuth = () => {
  return Cookies.get('token') ? true : false;
}

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
   <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Navigate to={{ pathname: '/'}} />
      )
   )} />
  );
};

export default PrivateRoute;