import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
  },
  reducers: {
    setAIResponse: (state, action) => {
      state.conversations.push(action.payload);
    },
  },
});

export const { setAIResponse } = chatSlice.actions;
export default chatSlice.reducer;
