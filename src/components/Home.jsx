import React, { useEffect } from 'react';
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

const Home = () => {
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
      console.log(response);
      dispatch(setInitialState(response.data));
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getInitialState();
  }, []);

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
