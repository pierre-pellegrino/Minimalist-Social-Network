import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoomNumber } from '../redux/login/loginActions';
import LikeBtn from './LikeBtn';

const BoomCard = ({boom}) => {
  const loginInfos = useSelector(state => state);
  const date = new Date(boom.created_at).toLocaleString('en-EN', {hour12: false, month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
  const dispatch = useDispatch();
  
  const deleteBoom = (id) => {
    fetch(`http://localhost:1337/posts/${id}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${loginInfos.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      dispatch(fetchBoomNumber(loginInfos.token));
    })
  }

  return (
    <div className="boom-wrapper">
      <div className="boom-top">
        {parseInt(loginInfos.id,10) === boom.user.id && <p onClick={() => deleteBoom(boom.id)} className="boom-delete">Delete this boom</p>}
        <p className="tag">Boomed by : <Link className="boom-user" to={`/user/${boom.user.id}`}>{boom.user.username}</Link></p>
        <LikeBtn likeNb={boom.like} boomId={boom.id} />
        <p>{date}</p>
      </div>
      <p className="boom-content">{boom.text}</p>
    </div>
  );
};

export default BoomCard;