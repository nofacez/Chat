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
    setCurrentChannel: (state, action) => {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
    addChannel: (state, action) => {
      const newChannels = [...state.channels, action.payload];
      return { ...state, channels: newChannels };
    },
  },
  extraReducers: {
    [setInitialState.fulfilled]: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      return { channels, currentChannelId };
    },
  },
});

export const { setCurrentChannel, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
