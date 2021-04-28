import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    currentModal: null,
    extra: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { type } = action.payload;
      return { ...state, currentModal: type, open: true };
    },
    closeModal: () => ({ open: false, currentModal: null, extra: null }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
