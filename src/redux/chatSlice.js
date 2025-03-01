import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    pastConversations: [],
    showFeedbackForm: false,
    finalFeedback: null, // Store final feedback separately
    selectedConversation: null,
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
    },
    storeConversation: (state) => {
      if (state.conversations.length > 0) {
        state.pastConversations.push({
          messages: [...state.conversations], // Store all messages
          feedback: state.finalFeedback || {}, // Store final feedback
        });
        state.conversations = []; // Clear ongoing chat
        state.finalFeedback = null; // Reset feedback for next chat
      }
    },
    clearConversation: (state) => {
      state.conversations = [];
      state.selectedConversation = null;
    },
    loadPastConversation: (state, action) => {
      state.selectedConversation = action.payload; // Load selected past conversation
    },
  },
});

export const {
  setAIResponse,
  setFeedback,
  toggleFeedbackForm,
  setFinalFeedback,
  storeConversation,
  clearConversation,
  loadPastConversation
} = chatSlice.actions;
export default chatSlice.reducer;
