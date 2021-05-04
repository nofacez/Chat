import React from 'react';
import Rollbar from 'rollbar';
import token from '../../token.js';

export const rollbar = new Rollbar({
  accessToken: token,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const RollbarContext = React.createContext(rollbar);
export default RollbarContext;
