/* eslint-disable react/jsx-filename-extension */
// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
render(<h1> Hi worlds  </h1>, document.getElementById('chat'));
