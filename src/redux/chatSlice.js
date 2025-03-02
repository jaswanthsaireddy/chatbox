import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to save conversation in backend
export const saveConversationToBackend = createAsyncThunk(
  "chat/saveConversation",
  async ({ messages, feedback }) => {
    const response = await axios.post("http://localhost:5000/api/conversations", { messages, feedback });
    console.log("Saved Conversation Response:", response.data);
    return response.data.conversation;
  }
);

// Async thunk to fetch past conversations
export const fetchPastConversations = createAsyncThunk(
  "chat/fetchPastConversations",
  async () => {
    const response = await axios.get("http://localhost:5000/api/conversations");
    console.log("Fetched Conversations Response:", response.data);
    return response.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    pastConversations: [],
    showFeedbackForm: false,
    finalFeedback: null,
    selectedConversation: null,
  },
  reducers: {
    setAIResponse: (state, action) => {
      state.conversations.push(action.payload);
      console.log("Updated Conversations:", state.conversations);
    },
    setFeedback: (state, action) => {
      const { index, feedback } = action.payload;
      if (state.conversations[index]) {
        state.conversations[index].feedback = feedback;
      }
      console.log("Updated Feedback:", state.conversations);
    },
    toggleFeedbackForm: (state, action) => {
      state.showFeedbackForm = action.payload;
      console.log("Show Feedback Form:", state.showFeedbackForm);
    },
    setFinalFeedback: (state, action) => {
      state.finalFeedback = action.payload;
      console.log("Final Feedback:", state.finalFeedback);
    },
    clearConversation: (state) => {
      state.conversations = [];
      state.selectedConversation = null;
      console.log("Cleared Conversations and Selected Conversation");
    },
    loadPastConversation: (state, action) => {
      state.selectedConversation = action.payload;
      console.log("Loaded Past Conversation:", state.selectedConversation);
    },
    storeConversation: (state) => {
      if (state.conversations.length > 0) {
        state.pastConversations.push({
          messages: [...state.conversations],
          feedback: state.finalFeedback
        });
        state.conversations = [];
        state.finalFeedback = null;
        state.selectedConversation = null;
        console.log("Stored Conversation:", state.pastConversations);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveConversationToBackend.fulfilled, (state, action) => {
        state.pastConversations.push(action.payload);
        state.conversations = []; // Clear after storing
        state.finalFeedback = null;
        console.log("Conversation Saved and Cleared State");
      })
      .addCase(fetchPastConversations.fulfilled, (state, action) => {
        state.pastConversations = action.payload;
        console.log("Updated Past Conversations:", state.pastConversations);
      });
  },
});

export const {
  setAIResponse,
  setFeedback,
  toggleFeedbackForm,
  setFinalFeedback,
  clearConversation,
  loadPastConversation,
  storeConversation
} = chatSlice.actions;
export default chatSlice.reducer;
