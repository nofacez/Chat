import { createSlice } from '@reduxjs/toolkit';
import { setInitialState } from './channelsSlice.js';

export const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {},
  reducers: {
    addMessage: (state) => console.log(state),
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
