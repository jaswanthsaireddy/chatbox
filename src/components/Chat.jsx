import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAIResponse, setMessageFeedback, toggleFeedbackForm, clearConversation } from "../redux/chatSlice";
import FeedbackForm from "./FeedbackForm";

const Chat = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const selectedConversation = useSelector((state) => state.chat.selectedConversation);
  const showFeedbackForm = useSelector((state) => state.chat.showFeedbackForm);
  const darkMode = useSelector((state) => state.chat.darkMode); 
  const [hoverIndex, setHoverIndex] = useState(null);

  const displayedConversation = Array.isArray(selectedConversation) ? selectedConversation : conversations;
  const isPastConversation = selectedConversation !== null;

  const handleNewConversation = () => {
    dispatch(clearConversation()); // Reset chat when starting a new conversation
  };

  // Array of random messages
  const messages = [
    "Hello! How can I assist you?",
    "I'm just a mock AI, but I'll try my best!",
    "That sounds interesting! Tell me more.",
    "I'm here to help!",
    "Can you elaborate on that?",
    "That's a great question!",
    "I'm still learning, but I'll do my best!",
    "How can I make your experience better?",
    "Interesting! What else can you share?",
    "I appreciate your input!",
    "I'm always here to chat!",
    "Would you like me to summarize that?",
    "Tell me more about your thoughts!",
    "That sounds exciting!",
    "Hmm, let me think about that.",
    "I see! Do you want to continue this topic?",
    "Great point! What do you think should happen next?",
    "I love discussing this! What’s your perspective?",
    "Let's explore that idea further.",
    "I’m curious to hear more!",
    "That’s an interesting way to look at it.",
    "I’d love to help! Can you clarify a bit?",
    "Let’s keep the conversation going!",
    "I appreciate you sharing that!",
    "You’re making great points!"
  ];

  // Function to fetch a random message
  const getRandomMessage = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return randomMessage;
  };

  const handleSend = async () => {
    if (message.trim() !== "") {
      const userMessage = message;
      setMessage("");

      dispatch(setAIResponse({ userMessage, aiMessage: getRandomMessage(), messageFeedback: null }));
    }
  };

  const handleFeedback = (index, feedbackType) => {
    dispatch(setMessageFeedback({ index, messageFeedback: feedbackType }));
  };

  const handleEndConversation = () => {
    dispatch(toggleFeedbackForm(true));
    setMessage(""); // If user enter a text in input and clicks on end conversation (to clear the input)
  };

  return (
    <div className={`flex h-screen w-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Chatbox */}
      <div className="flex-1 flex flex-col items-center p-4">
        <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>AI Chat Assistant</h1>
        <div className={`w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-lg shadow-lg p-4`}>
          <div className={`h-[28rem] overflow-y-auto p-2 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-md`}>
            {displayedConversation.map((chat, index) => (
              <div
                key={index}
                className="mb-4 relative"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <p className={`text-right ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>User:<br/> {chat.userMessage}</p>
                <p className={`text-green-400 ${darkMode ? '' : 'text-green-600'}`}>AI:<br/> {chat.aiMessage}</p>
                {hoverIndex === index && (
                  <div className={`absolute flex space-x-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-400'} p-1 rounded`}>
                    <button 
                      onClick={() => !isPastConversation && handleFeedback(index, "thumbs-up")}
                      disabled={isPastConversation}
                      className={isPastConversation ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      👍
                    </button>
                    <button 
                      onClick={() => !isPastConversation && handleFeedback(index, "thumbs-down")}
                      disabled={isPastConversation}
                      className={isPastConversation ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      👎
                    </button>
                  </div>
                )}
                {chat.messageFeedback && (
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Status: {chat.messageFeedback === "thumbs-up" ? "👍 Liked" : "👎 Disliked"}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Input + Send Button */}
          <div className="flex mt-4">
            <input
              type="text"
              className={`flex-1 p-2 ${darkMode ? 'bg-gray-700 text-white placeholder-white' : 'bg-gray-300 text-black placeholder-black'} rounded-l-md`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isPastConversation) {
                  e.preventDefault(); 
                  handleSend();
                }
              }}
              placeholder={isPastConversation ? "Viewing past conversation , Click on new conversation" : "Type a message..."}
              disabled={isPastConversation}
            />
            <button 
              onClick={handleSend}
              className={`px-4 py-2 rounded-r-md ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-300 hover:bg-blue-400'}`}
              disabled={isPastConversation}
            >
              Send
            </button>
          </div>
          {isPastConversation ? (
            <button
              className="mt-4 w-full p-2 bg-green-500 text-white rounded hover:bg-green-700"
              onClick={handleNewConversation} 
            >
              New Conversation
            </button>
          ) : (
            conversations.length > 0 && (
              <button
                className="mt-4 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleEndConversation} 
              >
                End Conversation
              </button>
            )
          )}
          {/* Feedback Form (Popup) */}
          {showFeedbackForm && <FeedbackForm />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
