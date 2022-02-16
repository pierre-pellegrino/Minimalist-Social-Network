import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoomNumber, userLogin } from '../redux/login/loginActions';

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = {
    username: userName,
    email: email,
    password: password
  }

  const signupRequest = () => {
    fetch('http://localhost:1337/auth/local/register', {
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
        Cookies.set('id', response.user.id);
        dispatch(userLogin(response.jwt, response.user.id));
        dispatch(fetchBoomNumber(response.jwt));
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
        <h2>Sign Up</h2>

        <label htmlFor="username">Username</label>
        <input type="text" maxLength="20" value={userName} onChange={(e) => setUserName(e.target.value)} id="username"></input>

        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email"></input>

        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password"></input>

        <button id="signup-btn btn" onClick={() => signupRequest()} type="button">Sign Up</button>
      </form>

      {error && <span className="error flash">{error}</span>}

      {/* <div><Link to="/profile">Mon profil</Link></div> */}
    </div>
  );
};

export default RegisterForm;