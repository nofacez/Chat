// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { UserProvider } from './components/context/UserContext.jsx';
import './i18n';
import store from './app/store.js';
import '../assets/application.scss';
import RollbarContext, { rollbar } from './components/context/RollbarContext.js';

// @ts-ignore
const Root = ({ socket }) => (
  <Provider store={store}>
    <RollbarContext.Provider value={rollbar}>
      <UserProvider>
        <App socket={socket} />
      </UserProvider>
    </RollbarContext.Provider>
  </Provider>
);

export default Root;
