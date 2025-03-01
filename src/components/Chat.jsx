import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAIResponse, setFeedback, toggleFeedbackForm } from "../redux/chatSlice";
import axios from "axios";
import FeedbackForm from "./FeedbackForm"; // Import Feedback Form

const Chat = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const showFeedbackForm = useSelector((state) => state.chat.showFeedbackForm);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleSend = async () => {
    if (message.trim() !== "") {
      const userMessage = message;
      setMessage("");

      try {
        const response = await axios.post("http://localhost:5000/api/chat", { message: userMessage });

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

            {/* Thumbs-up/down on hover */}
            {hoverIndex === index && (
              <div className="absolute right-0 top-0 flex space-x-2 bg-gray-800 p-1 rounded">
                <button onClick={() => handleFeedback(index, "thumbs-up")} >👍</button>
                <button onClick={() => handleFeedback(index, "thumbs-down")} >👎</button>
              </div>
            )}

            {/* Show feedback */}
            {chat.feedback && (
              <p className="text-sm text-gray-400">
                Feedback: {chat.feedback === "thumbs-up" ? "👍 Liked" : "👎 Disliked"}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Input + Send Button */}
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 text-white rounded-l-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600">Send</button>
      </div>

      {/* End Conversation Button */}
      {conversations.length > 0 && (
        <button
          className="mt-4 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => dispatch(toggleFeedbackForm(true))}
        >
          End Conversation
        </button>
      )}

      {/* Feedback Form (Popup) */}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Chat;
