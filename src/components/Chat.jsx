import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAIResponse, setFeedback, toggleFeedbackForm, storeConversation, clearConversation, saveConversationToBackend } from "../redux/chatSlice";
import { fetchPastConversations } from "../redux/chatSlice";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";

const Chat = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
 
  const selectedConversation = useSelector((state) => state.chat.selectedConversation);
  const showFeedbackForm = useSelector((state) => state.chat.showFeedbackForm);
  const [hoverIndex, setHoverIndex] = useState(null);

  //logging for debug
  console.log("Selected Conversation:", selectedConversation);

  useEffect(() => {
    dispatch(fetchPastConversations());
  }, [dispatch]);

  const displayedConversation = selectedConversation ? selectedConversation.messages : conversations;
  const feedbackData = selectedConversation?.feedback; // ✅ Fetch stored feedback if viewing past conversation

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

  const handleEndConversation = () => {
    // dispatch(saveConversationToBackend({ messages: conversations, feedback: null }));
    // dispatch(storeConversation());
    dispatch(toggleFeedbackForm(true)); // Show feedback form
  };

  const handleStartNewConversation = () => {
    dispatch(clearConversation());
  };

  return (
    <div className="flex-1 flex flex-col items-center p-4">{/* Adjusted width so Sidebar can remain in App.jsx */}
      <div className="w-full bg-gray-800 text-white rounded-lg shadow-lg p-4">
        <div className="h-[30rem] overflow-y-auto p-2 bg-gray-900 rounded-md">
          {displayedConversation.map((chat, index) => (
            <div
              key={index}
              className="mb-4 relative"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <p className="text-blue-400 text-right">User:<br/> {chat.userMessage}</p>
              <p className="text-green-400">AI:<br/> {chat.aiMessage}</p>
              
              {hoverIndex === index && (
                <div className="absolute flex space-x-2 bg-gray-800 p-1 rounded">
                  <button onClick={() => handleFeedback(index, "thumbs-up")}>👍</button>
                  <button onClick={() => handleFeedback(index, "thumbs-down")}>👎</button>
                </div>
              )}

              {chat.feedback && (
                <p className="text-sm text-gray-400">
                  Feedback: {chat.feedback === "thumbs-up" ? "👍 Liked" : "👎 Disliked"}
                </p>
              )}
            </div>
          ))}
        </div>
          {console.log(feedbackData)}
        {/* Show Submitted Feedback if viewing a past conversation */}
        {selectedConversation && feedbackData && (
          <div className="mt-4 p-3 bg-gray-700 rounded-md">
            <h3 className="text-lg font-semibold">Submitted Feedback</h3>
            <div className="flex space-x-2 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-2xl ${star <= feedbackData.rating ? "text-yellow-400" : "text-gray-400"}`}>
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-300">{feedbackData.comment || "No comments provided"}</p>
          </div>
        )}

        {/* Input + Send Button */}
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-700 text-white rounded-l-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={!!selectedConversation} // ✅ Disable input if viewing a past conversation
          />
          <button 
            onClick={handleSend} 
            className={`px-4 py-2 rounded-r-md ${selectedConversation ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={!!selectedConversation} // ✅ Disable send button if viewing past conversation
          >
            Send
          </button>
        </div>

        {/* End Conversation / Start New Conversation Button */}
        {!selectedConversation ? (
          conversations.length > 0 && (
            <button
              className="mt-4 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleEndConversation}
            >
              End Conversation
            </button>
          )
        ) : (
          <button
            className="mt-4 w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleStartNewConversation}
          >
            Start New Conversation
          </button>
        )}

        {/* Feedback Form (Popup) */}
        {showFeedbackForm && <FeedbackForm />}
      </div>
    </div>
  );
};

export default Chat;
