import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { userLogout } from '../redux/login/loginActions';

const Navbar = () => {
  const token = useSelector(state => state.is_connected);
  const dispatch = useDispatch();

  const logOut = () => {
    Cookies.remove('token');
    dispatch(userLogout());
  }

  return (
    <nav className="navbar">
      <h2><Link className="home-link" to="/">FaceHook</Link></h2>
      <div className="navbar-links">
        {!token && <Link className="signup-btn" to="/register">Sign up</Link>}
        {!token && <Link className="regular-link" to="/login">Log In</Link>}
        {token && <Link className="regular-link" to="/profile">Profile</Link>}
        {token && <a className="regular-link" href="/" onClick={()=>logOut()}>Log Out</a>}
      </div>
    </nav>
  );
};

export default Navbar;