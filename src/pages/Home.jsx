import React, { useState } from 'react';
import BoomsList from '../components/BoomsList';
import NewPostForm from '../components/NewPostForm';
import { useSelector } from 'react-redux';

const Home = () => {
  const loginInfos = useSelector(state => state);

  if (loginInfos.is_connected) {
    return (
      <>
        <NewPostForm />
        <BoomsList />
      </>
    );
  }
  else {
    return (
      <div className="home-wrapper">
        <p className="align-center">Welcome on My Social Network. This website is a training to Redux and React. 
          We are using auth and routing to create a small social media website.
        </p>
        <p className="align-center">
          Don't forget to sign up and post your first <span className="bold">boom</span>, gramps.
        </p>

        <BoomsList />
      </div>
    );
  }
};

export default Home;