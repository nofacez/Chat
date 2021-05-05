import { createSlice } from '@reduxjs/toolkit';
import { setInitialState, removeChannel } from './channelsSlice.js';

export const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      console.log('newmsg', action.payload);
      const updatedMsgs = [...state.messages, action.payload];
      console.log('msgs list', updatedMsgs);
      return { messages: updatedMsgs };
    },
  },
  extraReducers: {
    [setInitialState]: (state, action) => {
      const { messages } = action.payload;
      return { messages };
    },
    [removeChannel]: (state, action) => {
      const { id } = action.payload;
      const filteredMessages = state.messages.filter(({ channelId }) => channelId !== id);
      return { messages: filteredMessages };
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
