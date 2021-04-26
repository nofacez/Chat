import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes.js';

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
  extraReducers: {
    [setInitialState.fulfilled]: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      return { channels, currentChannelId };
    },
  },
});

export default channelsSlice.reducer;
