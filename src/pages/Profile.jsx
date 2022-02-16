import React, { useState } from 'react';
import {Navigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import EditProfileForm from '../components/EditProfileForm';
import { TailSpin } from  'react-loader-spinner'

const Profile = () => {
  const [fetchedProfile, setFetchedProfile] = useState('');
  const loginInfos = useSelector(state => state);

  if (loginInfos.is_connected && !fetchedProfile) {
    fetch('http://localhost:1337/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${loginInfos.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setFetchedProfile(response);
    })
    
    return (
      <div className="profile-wrapper">
        <h1>Profile</h1>
        <div className="spinner"><TailSpin style={{textAlign:"center"}} color="#00BFFF" height={80} width={80} /></div>
        <p className="loading">Loading...</p>
      </div>
    );
  }
  else if (loginInfos.is_connected && fetchedProfile) {
    return (
      <div className="profile-wrapper">
        <h1>Profile</h1>
        <p className="underline">Username : <span>{fetchedProfile.username}</span> </p>
        <p className="underline">Email : <span>{fetchedProfile.email}</span> </p>
        <p className="underline">Description : <span>{fetchedProfile.description ? fetchedProfile.description : "You don't have a description yet." }</span> </p>
        
        <EditProfileForm profile={fetchedProfile} onFetched={() => setFetchedProfile()}/>
      </div>
    );
  }
  else {
    return <Navigate to="/" />
  }
};

export default Profile;