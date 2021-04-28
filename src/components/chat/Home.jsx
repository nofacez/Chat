import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { setInitialState, addChannel } from '../../slices/channelsSlice.js';
import { addMessage } from '../../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Home = () => {
  const socket = io('http://localhost:5000');
  const dispatch = useDispatch();
  const { localStorage } = window;
  const user = JSON.parse(localStorage.getItem('user'));
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { messages } = useSelector((state) => state.messagesInfo);

  useEffect(() => {
    dispatch(setInitialState(user.token));
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', (message) => dispatch(addMessage(message)));
  }, []);

  useEffect(() => {
    socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
  }, []);

  return (
    <div className="row pb-5 flex-grow-1 pb-3">
      <Channels channels={channels} currentChannelId={currentChannelId} />
      <Messages
        messages={messages}
        currentChannelId={currentChannelId}
        socket={socket}
        user={user}
      />
    </div>
  );
};

export default Home;
