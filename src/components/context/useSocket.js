import { useContext } from 'react';

import socketContext from './socketContext.js';

const useSocket = () => useContext(socketContext);

export default useSocket;
