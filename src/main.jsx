// import React from 'react';
import { io } from 'socket.io-client';
import { render } from 'react-dom';
// import Root from './init.jsx';
// import init from './init.js';
import init from './index.jsx';

const socket = io();
render(init(socket), document.getElementById('chat'));
