import React from 'react';
import { Link } from 'react-router-dom';

const BoomCard = ({boom}) => {
  const date = new Date(boom.created_at).toLocaleString('en-EN', {hour12: false, month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });

  return (
    <div className="boom-wrapper">
      <div className="boom-top">
        <p className="tag">Boomed by : <Link className="boom-user" to={`/user/${boom.user.id}`}>{boom.user.username}</Link></p>
        <p>{date}</p>
      </div>
      <p className="boom-content">{boom.text}</p>
    </div>
  );
};

export default BoomCard;