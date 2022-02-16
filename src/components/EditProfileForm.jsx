import React, { useState } from 'react';
import { useSelector } from 'react-redux'

const EditProfileForm = ({profile, onFetched}) => {

  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const token = useSelector(state => state.token);

  const data = {
    username: userName,
    description: description
  }

  const editProfile = () => {
    fetch(`http://localhost:1337/users/me`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      // Only used by laziness to re-render profile page
      onFetched(profile);
    })
  }

  return (
    <form className="edit-profile">
      <p className="align-center">Want a fresh profile ?</p>

      <label htmlFor="profile-username">Username</label>
      <input type="text" maxLength="20" value={userName} onChange={(e) => setUserName(e.target.value)} id="profile-username"></input>

      <label htmlFor="profile-description">Description</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="profile-description"></input>
      <button type="button" onClick={() => editProfile()}>Edit</button>
    </form>
  );
};

export default EditProfileForm;