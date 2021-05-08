import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import { setInitialState } from '../slices/channelsSlice.js';
// import {
//   setInitialState, addChannel, removeChannel, renameChannel,
// } from '../slices/channelsSlice.js';
// import { addMessage } from '../slices/messagesSlice.js';

// import routes from '../routes.js';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';
import { useUser } from './context/UserContext.jsx';

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { localStorage } = window;
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { messages } = useSelector((state) => state.messagesInfo);
  const { user } = useUser();

  // const getInitialState = async () => {
  //   const response = await axios.get(routes.dataPath(), {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   dispatch(setInitialState(response.data));
  // };

  useEffect(() => {
    dispatch(setInitialState(token));
  }, []);

  return (
    <div className="row pb-5 flex-grow-1 h-75 pb-3">
      <Channels channels={channels} currentChannelId={currentChannelId} />
      <Messages
        messages={messages}
        currentChannelId={currentChannelId}
        user={user}
        socket={socket}
      />
    </div>
  );
};

export default Home;
