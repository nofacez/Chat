// @ts-check
// import 'core-js/stable/index.js';
// import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { UserProvider } from './components/context/UserContext.jsx';
// import './i18n';
import store from './app/store.js';
// import '../assets/application.scss';
import SocketContext, { socket } from './components/context/SocketContext.js';
import RollbarContext, { rollbar } from './components/context/RollbarContext.js';

// @ts-ignore
export default () => {
  const container = document.querySelector('#chat');
  console.log(container);
  console.log(document.body);
  render(
    <Provider store={store}>
      <RollbarContext.Provider value={rollbar}>
        <SocketContext.Provider value={socket}>
          <UserProvider>
            <App />
          </UserProvider>
        </SocketContext.Provider>
      </RollbarContext.Provider>
    </Provider>,
    container,
  );
};
