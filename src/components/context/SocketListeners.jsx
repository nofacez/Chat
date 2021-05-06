import React from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from './SocketContext.js';

import { addMessage } from '../../slices/messagesSlice.js';

const SocketListeners = ({ children }) => {
  const dispatch = useDispatch();
  const socket = React.useContext(SocketContext);
  socket.on('newMessage', (message) => dispatch(addMessage(message)));
  return (
    <div className="h-100 d-flex flex-column">
      { children }
    </div>
  );
};

export default SocketListeners;
