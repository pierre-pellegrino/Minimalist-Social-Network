import React, { useState } from 'react';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/login/loginActions';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const data = {
    identifier: userName,
    password: password
  }

  const loginRequest = () => {
    fetch('http://localhost:1337/auth/local', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.jwt) {
        Cookies.set('token',response.jwt);
        dispatch(userLogin(response.jwt));
        setError('');
        navigate('/');
      }
      else {
        setError(`Error ${response.statusCode} : ${response.message[0].messages[0].message}`);
      }      
    })
    .catch((error) => console.log(error))
  }

  return (
    <div>
      <form className="signup-form">
        <h2>Log In</h2>

        <label htmlFor="login-username">Username</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} id="login-username"></input>

        <label htmlFor="login-password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="login-password"></input>

        <button id="login-btn btn" onClick={() => loginRequest()} type="button">Log In</button>
      </form>

      {error && <span className="error flash">{error}</span>}
    </div>
  );
};

export default LoginForm;