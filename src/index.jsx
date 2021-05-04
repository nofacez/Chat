// @ts-check
import React from 'react';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './i18n.js';

import Root from './init.jsx';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default () => <Root />;
