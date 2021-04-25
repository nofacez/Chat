import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../chat/messagesSlice.js';
import channelsReducer from '../chat/channelsSlice.js';

// const preloadedState = {
//   channelsInfo: {
//     channels: [],
//     currentChannelId: null,
//   },
//   messagesInfo: {
//     messages: [],
//   },
// };

export default configureStore({
  reducer: {
    messagesInfo: messagesReducer,
    channelsInfo: channelsReducer,
  },
  // preloadedState,
});
