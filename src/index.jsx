/* eslint-disable react/destructuring-assignment */
// @ts-check
import React from 'react';
import './i18n.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';
import App from './components/App.jsx';
import { UserProvider } from './components/context/UserContext.jsx';
// import store from './app/store.js';
import '../assets/application.scss';
import RollbarContext, { rollbar } from './components/context/RollbarContext.js';
// import init from './init.js';
import messagesReducer, { addMessage } from './slices/messagesSlice.js';
import channelsReducer, { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import modalReducer from './slices/modalSlice.js';
// import { useDispatch } from 'react-redux';
// import { addMessage } from './slices/messagesSlice.js';
// import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default (socket) => {
  const store = configureStore({
    reducer: {
      messagesInfo: messagesReducer,
      channelsInfo: channelsReducer,
      modal: modalReducer,
    },
  });
  const Root = () => {
    const dispatch = useDispatch();
    socket.on('newMessage', (message) => dispatch(addMessage(message)));

    socket.on('newChannel', (channel) => dispatch(addChannel(channel)));

    socket.on('removeChannel', (channel) => dispatch(removeChannel(channel)));

    socket.on('renameChannel', (channel) => dispatch(renameChannel(channel)));
    return (
      <RollbarContext.Provider value={rollbar}>
        <UserProvider>
          <App socket={socket} />
        </UserProvider>
      </RollbarContext.Provider>
    );
  };
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
