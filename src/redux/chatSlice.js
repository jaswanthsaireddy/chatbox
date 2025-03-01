import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    showFeedbackForm: false,
  },
  reducers: {
    setAIResponse: (state, action) => {
      state.conversations.push(action.payload);
    },
    setFeedback: (state, action) => {
      const { index, feedback } = action.payload;
      if (state.conversations[index]) {
        state.conversations[index].feedback = feedback;
      }
    },
    toggleFeedbackForm: (state, action) => {
      state.showFeedbackForm = action.payload;
    },
    setFinalFeedback: (state, action) => {
        state.finalFeedback = action.payload;
      console.log("Final Feedback:", action.payload);
    },
    clearConversation: (state) => {
      state.conversations = [];
    },
  },
});

export const { setAIResponse, setFeedback, toggleFeedbackForm, setFinalFeedback, clearConversation } = chatSlice.actions;
export default chatSlice.reducer;
