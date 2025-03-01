import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAIResponse, setFeedback } from "../redux/chatSlice"; // Import feedback action
import axios from "axios"; // Import Axios

const Chat = () => {
  const [message, setMessage] = useState(""); // Input state
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const [hoverIndex, setHoverIndex] = useState(null); // Track which AI response is hovered

  const handleSend = async () => {
    if (message.trim() !== "") {
      const userMessage = message;
      setMessage(""); // Clear input immediately

      try {
        const response = await axios.post("http://localhost:5000/api/chat", { message: userMessage });

        // Dispatch new chat message to Redux store
        dispatch(setAIResponse({ userMessage, aiMessage: response.data.message, feedback: null }));
      } catch (error) {
        console.error("Error fetching AI response:", error);
        dispatch(setAIResponse({ userMessage, aiMessage: "Error fetching response.", feedback: null }));
      }
    }
  };

  const handleFeedback = (index, feedbackType) => {
    dispatch(setFeedback({ index, feedback: feedbackType }));
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Chat Box */}
      <div className="h-96 overflow-y-auto p-2 bg-gray-900 rounded-md">
        {conversations.map((chat, index) => (
          <div 
            key={index} 
            className="mb-4 relative"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <p className="text-blue-400">User: {chat.userMessage}</p>
            <p className="text-green-400">AI: {chat.aiMessage}</p>

            {/* Feedback buttons (appear on hover) */}
            {hoverIndex === index && (
              <div className="absolute right-0 top-0 flex space-x-2 bg-gray-800 p-1 rounded">
                <button 
                  onClick={() => handleFeedback(index, "thumbs-up")}
                  className="text-green-400 hover:text-green-500"
                >
                  👍
                </button>
                <button 
                  onClick={() => handleFeedback(index, "thumbs-down")}
                  className="text-red-400 hover:text-red-500"
                >
                  👎
                </button>
              </div>
            )}

            {/* Show feedback status */}
            {chat.feedback && (
              <p className="text-sm text-gray-400">
                Feedback: {chat.feedback === "thumbs-up" ? "👍 Liked" : "👎 Disliked"}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 text-white rounded-l-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
