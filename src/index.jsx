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
// import modalReducer from './slices/modalSlice.js';
// import { useDispatch } from 'react-redux';
// import { addMessage } from './slices/messagesSlice.js';
// import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default (socket) => {
  // const store = configureStore({
  //   reducer: {
  //     messagesInfo: messagesReducer,
  //     channelsInfo: channelsReducer,
  //     modal: modalReducer,
  //   },
  // });
  const store = getStore();

  const Root = () => {
    // const dispatch = useDispatch();
    socket.on('newMessage', (message) => store.dispatch(addMessage(message)));

    socket.on('newChannel', (channel) => store.dispatch(addChannel(channel)));

    socket.on('removeChannel', (channel) => store.dispatch(removeChannel(channel)));

    socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));
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
