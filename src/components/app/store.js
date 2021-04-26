import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../chat/messagesSlice.js';
import channelsReducer from '../chat/channelsSlice.js';

export default configureStore({
  reducer: {
    messagesInfo: messagesReducer,
    channelsInfo: channelsReducer,
  },
});
