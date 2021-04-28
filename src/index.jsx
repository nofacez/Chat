// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { UserProvider } from './components/login/UserContext.jsx';
import './i18n';
import store from './app/store.js';
import '../assets/application.scss';

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>, document.getElementById('chat'),
);
