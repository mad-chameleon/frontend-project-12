import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const initialState = {
  messages: [],
};

/* eslint-disable */
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter((msg) => msg.channelId !== id);
    });
  },
});

export const { fetchMessages, addMessage} = messagesSlice.actions;
export default messagesSlice.reducer;
