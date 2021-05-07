import React from 'react';
import { io } from 'socket.io-client';
import { render } from 'react-dom';
import Root from './init.jsx';

const socket = io();
render(<Root socket={socket} />, document.getElementById('chat'));
