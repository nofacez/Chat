import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../slices/messagesSlice.js';
import channelsReducer from '../slices/channelsSlice.js';
import modalReducer from '../slices/modalSlice.js';

export default () => configureStore({
  reducer: {
    messagesInfo: messagesReducer,
    channelsInfo: channelsReducer,
    modal: modalReducer,
  },
});
