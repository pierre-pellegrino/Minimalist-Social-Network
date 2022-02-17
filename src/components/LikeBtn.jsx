import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { addLike } from '../redux/login/loginActions';
import { removeLike } from '../redux/login/loginActions';
import Cookies from 'js-cookie';
import { fetchBoomNumber } from '../redux/login/loginActions';

const LikeBtn = ({likeNb, boomId, onRefresh}) => {
  const dispatch = useDispatch();
  const userInfos = useSelector(state => state);

  const handleLike = () => {
    dispatch(addLike(boomId));
    // Now add fetch to add / remove likes
    fetchLike(1);
  }
  const handleRemoveLike = () => {
    dispatch(removeLike(boomId));
    fetchLike(-1);
  }

  const fetchLike = (value) => {
    const data = {
      like: value + likeNb
    }

    fetch(`http://localhost:1337/posts/${boomId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfos.token}`
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      dispatch(fetchBoomNumber(userInfos.token));
      onRefresh();
    })
  }

  useEffect(() => {
    Cookies.set('likedBooms', userInfos.likedBooms);
  }, [userInfos.likedBooms])

  return (
    <div className="like-wrapper">
      <p className="boom-liked tag">{likeNb} liked</p>
      {!userInfos.likedBooms.includes(boomId) && <p onClick={() => handleLike()}><i className="far fa-heart like-btn"></i></p>}
      {!userInfos.likedBooms.includes(boomId) && <p className="like-label">Like it</p>}
      {userInfos.likedBooms.includes(boomId) && <p onClick={() => handleRemoveLike()}><i className="fas fa-heart like-btn"></i></p>}
      {userInfos.likedBooms.includes(boomId) && <p className="like-label">Liked</p>}
    </div>
  );
};

export default LikeBtn;