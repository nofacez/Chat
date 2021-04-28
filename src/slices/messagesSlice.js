import { createSlice } from '@reduxjs/toolkit';
import { setInitialState } from './channelsSlice.js';

export const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      console.log('newmsg', action.payload);
      const updatedMsgs = [...state.messages, action.payload];
      return { messages: updatedMsgs };
    },
  },
  extraReducers: {
    [setInitialState.fulfilled]: (state, action) => {
      const { messages } = action.payload;
      return { messages };
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
