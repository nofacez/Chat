import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const setInitialState = createAsyncThunk(
  'channelsInfo/setInitialState',
  async (token) => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('async', data);
    return data;
  },
);

export const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    // setInitialState: (state, action) => {
    //   console.log('INIT STATE');
    //   const { channels, currentChannelId } = action.payload;
    //   return { channels, currentChannelId };
    // },
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
  extraReducers: {
    [setInitialState.fulfilled]: (state, action) => {
      console.log('extra state');
      const { channels, currentChannelId } = action.payload;
      return { channels, currentChannelId };
    },
  },
});

export const {
  setCurrentChannel, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
