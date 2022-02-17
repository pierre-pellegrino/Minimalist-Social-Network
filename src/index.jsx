import React from "react";
import ReactDOM, { render } from "react-dom";
import RegisterForm from "./components/RegisterForm";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from "./pages/Profile";
import Cookies from 'js-cookie';
import Home from "./pages/Home";
import './style.scss';
import Navbar from "./components/Navbar";
import store from "./store";
import { Provider } from "react-redux";
import LoginForm from "./components/LoginForm";
import User from "./pages/User";


export const checkAuth = () => {
  return Cookies.get('token') ? true : false;
}

const App = () => {

  return (    
    <Provider store={store}>
      <div className="global-wrapper">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:username" element={<User />} />
          </Routes>

        </Router>
      </div>
    </Provider>
  );
};

render(<App />, document.getElementById('root'));