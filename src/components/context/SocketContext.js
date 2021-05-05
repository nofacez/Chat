import React from 'react';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000/', { transport: ['websocket'] });
console.log('socket', socket);
console.log('io', io);
const SocketContext = React.createContext(socket);
export default SocketContext;
