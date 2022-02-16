import React from 'react';

const BoomCard = ({boom}) => {
  const date = new Date(boom.created_at).toLocaleString('en-EN', {hour12: false, month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });

  return (
    <div className="boom-wrapper">
      <div className="boom-top">
        <p className="tag">Boomed by : {boom.user.username}</p>
        <p>{date}</p>
      </div>
      <p className="boom-content">{boom.text}</p>
    </div>
  );
};

export default BoomCard;