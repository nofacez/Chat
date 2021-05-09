import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setInitialState } from '../slices/channelsSlice.js';
// import {
//   setInitialState, addChannel, removeChannel, renameChannel,
// } from '../slices/channelsSlice.js';
// import { addMessage } from '../slices/messagesSlice.js';

import routes from '../routes.js';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';
import { useUser } from './context/UserContext.jsx';

const Spinner = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <div className="spinner-border text-secondary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { localStorage } = window;
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { user } = useUser();

  const getInitialState = async () => {
    try {
      const response = await axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setInitialState(response.data));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  useEffect(() => {
    getInitialState();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="row pb-5 flex-grow-1 h-75 pb-3">
        <Channels />
        <Messages
          user={user}
        />
      </div>
    </>
  );
};

export default Home;
