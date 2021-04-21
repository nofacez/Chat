// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import { UserProvider } from './components/login/UserContext.jsx';
import './i18n';

import '../assets/application.scss';

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(
  <UserProvider>
    <App />
  </UserProvider>, document.getElementById('chat'),
);
