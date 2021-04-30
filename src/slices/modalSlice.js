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
      const { type, extra } = action.payload;
      return { currentModal: type, open: true, extra };
    },
    closeModal: () => ({ open: false, currentModal: null, extra: null }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
