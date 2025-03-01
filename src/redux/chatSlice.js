import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
  },
  reducers: {
    setAIResponse: (state, action) => {
      state.conversations.push(action.payload
      );
    },
    setFeedback: (state, action) => {
      const { index, feedback } = action.payload;
      if(state.conversations[index]){
        state.conversations[index].feedback = feedback; // Store feedback
      }
      
    },
},
});

export const { setAIResponse,setFeedback } = chatSlice.actions;
export default chatSlice.reducer;
