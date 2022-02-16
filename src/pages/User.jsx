import React, { useState } from 'react';
import { useParams, Navigate} from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner';
import { useSelector } from 'react-redux';
import BoomsList from '../components/BoomsList';

const User = () => {
  const { username } = useParams();
  const [fetchUser, setFetchUser] = useState("");
  const loginInfos = useSelector(state => state);

  if (loginInfos.is_connected && !fetchUser) {
    fetch(`http://localhost:1337/users/${username}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${loginInfos.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setFetchUser(response);
    })
    
    return (
      <div className="profile-wrapper">
        <h1>Profile</h1>
        <div className="spinner"><TailSpin style={{textAlign:"center"}} color="#00BFFF" height={80} width={80} /></div>
        <p className="loading">Loading...</p>
      </div>
    );
  }
  else if (loginInfos.is_connected && fetchUser) {
    return (
      <>
        <div className="profile-wrapper">
          <h1>Profile</h1>
          <p className="underline">Username : <span>{fetchUser.username}</span> </p>
          <p className="underline">Email : <span>{fetchUser.email}</span> </p>
          <p className="underline">Description : <span>{fetchUser.description ? fetchUser.description : "This user doesn't have a description yet." }</span> </p>
        </div>

        <BoomsList user={fetchUser}/>
      </>
    );
  }
  else {
    return <Navigate to="/" />
  }

};

export default User;

