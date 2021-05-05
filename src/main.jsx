import React from 'react';
import { render } from 'react-dom';
import Root from './init.jsx';

import { socket } from './components/context/SocketContext.js';

render(<Root socket={socket} />, document.getElementById('chat'));
