import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setInitialState: (state, action) => {
      console.log('INIT STATE');
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
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (!channel) return;
      channel.name = name;
    },
  },
});

export const {
  setCurrentChannel, addChannel, removeChannel, setInitialState, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
