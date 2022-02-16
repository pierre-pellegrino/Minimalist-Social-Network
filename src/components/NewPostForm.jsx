import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchBoomNumber } from '../redux/login/loginActions';

const NewPostForm = () => {
  const [content, setContent] = useState("");
  const userState = useSelector(state => state);
  const dispatch = useDispatch();

  const data = {
    text: content,
    user: userState.id
  }

  const createPost = () => {
    if (content.trim().length>0 && content.length<=180) {
      fetch(`http://localhost:1337/posts`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${userState.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((response) => {
        setContent('');
        dispatch(fetchBoomNumber(userState.token))
      });
    }
  }

  return (
    <div>
      <form className="signup-form">
        <h2>New Boom</h2>

        <label htmlFor="boom-content">Write your Boom :</label>
        <input className={`${!content && 'error'}`} maxLength="180" type="text" value={content} onChange={(e) => setContent(e.target.value)} id="boom-content"></input>
        <p className="input-info">Max. 140 characters</p>

        <button id="boom-btn btn" onClick={() => createPost()} type="button">Post</button>
      </form>
    </div>
  );
};

export default NewPostForm;