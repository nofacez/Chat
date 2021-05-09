/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
// @ts-check
import React from 'react';
import './i18n.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
// import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { UserProvider } from './components/context/UserContext.jsx';
import getStore from './app/store.js';
import '../assets/application.scss';
import RollbarContext, { rollbar } from './components/context/RollbarContext.js';
// import init from './init.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import socketContext from './components/context/socketContext.js';
// import modalReducer from './slices/modalSlice.js';
// import { useDispatch } from 'react-redux';
// import { addMessage } from './slices/messagesSlice.js';
// import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default (socket) => {
  const store = getStore();
  socket.on('newMessage', (message) => store.dispatch(addMessage(message)));

  socket.on('newChannel', (channel) => store.dispatch(addChannel(channel)));

  socket.on('removeChannel', (channel) => store.dispatch(removeChannel(channel)));

  socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));

  const SocketProvider = ({ children }) => {
    const sendMessage = (message) => {
      socket.emit('newMessage', message, () => {});
    };

    const addChannel = (channel) => {
      socket.emit('newChannel', channel, () => {});
    };

    const removeChannel = (channel) => {
      socket.emit('removeChannel', channel, () => {});
    };

    const renameChannel = (channel) => {
      socket.emit('renameChannel', channel, () => {});
    };
    return (
      <socketContext.Provider value={{
        sendMessage, addChannel, removeChannel, renameChannel,
      }}
      >
        {children}
      </socketContext.Provider>
    );
  };

  return (
    <Provider store={store}>
      <RollbarContext.Provider value={rollbar}>
        <SocketProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </SocketProvider>
      </RollbarContext.Provider>
    </Provider>
  );
};
