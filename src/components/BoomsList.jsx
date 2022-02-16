import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TailSpin } from  'react-loader-spinner'
import BoomCard from './BoomCard';

const BoomsList = ({user}) => {

  const [fetchedBooms, setFetchedBooms] = useState([]);
  const loginInfos = useSelector(state => state);

  if (fetchedBooms.length === 0 || fetchedBooms.length !== parseInt(loginInfos.boomCount,10)) {
    fetch('http://localhost:1337/posts?_sort=created_at:desc', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${loginInfos.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setFetchedBooms(response);
    })
    
    return (
      <div className="booms-list">
        <div className="spinner"><TailSpin style={{textAlign:"center"}} color="#00BFFF" height={80} width={80} /></div>
        <p className="loading align-center">Loading...</p>
      </div>
    );
  }
  else {
    return (
      <div className="booms-list align-center">
        <h2> Latest Booms </h2>
        {fetchedBooms.map((boom, i) => {
          return (
           !user ? <BoomCard key={i} boom={boom} /> : boom.user.id === user.id && <BoomCard key={i} boom={boom} />
          )
        })}
      </div>
    )
  }
  
};

export default BoomsList;