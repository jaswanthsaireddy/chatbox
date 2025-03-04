import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    pastConversations: [],
    showFeedbackForm: false,
    conversationFeedback: {}, 
    selectedConversation: {},
    darkMode: true,
  },
  reducers: {
    setAIResponse: (state, action) => {
      state.conversations.push(action.payload);
    },
    setMessageFeedback: (state, action) => { 
      const { index, messageFeedback } = action.payload;
      if (state.conversations[index]) {
        state.conversations[index].messageFeedback = messageFeedback; 
      }
    },
    toggleFeedbackForm: (state, action) => {
      state.showFeedbackForm = action.payload;
    },
    setConversationFeedback: (state, action) => { 
      state.conversationFeedback = action.payload;
    },
    storeConversation: (state) => {
      if (state.conversations.length > 0) {
        state.pastConversations.push({
          savedConversations: [...state.conversations], 
          conversationFeedback: state.conversationFeedback || {}, 
        });
        state.conversations = []; 
        state.conversationFeedback = null; 
      }
    },
    clearConversation: (state) => {
      state.conversations = [];
      state.selectedConversation = null;
    },
    loadPastConversation: (state, action) => {
      state.conversations = [...action.payload.savedConversations]; 
      state.selectedConversation = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  setAIResponse,
  setMessageFeedback, 
  toggleFeedbackForm,
  setConversationFeedback, 
  storeConversation,
  clearConversation,
  loadPastConversation,
  toggleDarkMode,
} = chatSlice.actions;
export default chatSlice.reducer;
