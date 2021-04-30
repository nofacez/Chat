import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setInitialState: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      return { channels, currentChannelId };
    },
    setCurrentChannel: (state, action) => {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
    addChannel: (state, action) => {
      const newChannels = [...state.channels, action.payload];
      return { ...state, channels: newChannels };
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      const { channels, currentChannelId } = state;
      const filteredChannels = channels.filter((channel) => channel.id !== id);
      const newCurrentChannelId = currentChannelId === id ? 1 : currentChannelId;
      return { channels: filteredChannels, currentChannelId: newCurrentChannelId };
    },
  },
});

export const {
  setCurrentChannel, addChannel, removeChannel, setInitialState,
} = channelsSlice.actions;
export default channelsSlice.reducer;
