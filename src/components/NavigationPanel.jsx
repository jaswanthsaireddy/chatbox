import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPastConversation, toggleDarkMode } from "../redux/chatSlice"; 
import { useNavigate } from "react-router-dom";

const NavigationPanel = () => {
  const pastConversations = useSelector((state) => state.chat.pastConversations);
  const selectedConversation = useSelector((state) => state.chat.selectedConversation);
  const darkMode = useSelector((state) => state.chat.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [hoveredIndex, setHoveredIndex] = useState(null); 

  const handleShare = useCallback((conversationId) => {
    const shareableLink = `${window.location.origin}/chat/${conversationId}`;
    navigator.clipboard.writeText(shareableLink);
    alert(`Link copied: ${shareableLink}`);
  }, []);

  const handleToggleDarkMode = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const getTrimmedMessage = useCallback((message) => {
    const maxLength = 15;
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  }, []);

  return (
    <div className={`w-1/4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 overflow-y-auto fixed md:static top-0 left-0 h-full md:h-auto flex flex-col`}>
      <h2 className="text-lg font-bold mb-4">Navigation Panel</h2>
      <button 
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate('/feedback-overview')}
      >
        Go to Feedback Overview
      </button>
      <h2 className="text-lg font-bold mb-4">Past Conversations</h2>
      <div className="space-y-2">
        {pastConversations.length === 0 ? (
          <p className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>No past conversations</p>
        ) : (
          pastConversations.map((conversation, index) => (
            <div 
              key={index} 
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button 
                className={`w-full p-2 rounded flex justify-between items-center
                  ${selectedConversation === conversation ? "bg-blue-500" : darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-200"}`}
                onClick={() => dispatch(loadPastConversation(conversation))} 
              >
                {`Conv-${index + 1}: ${getTrimmedMessage(conversation.savedConversations[0].userMessage)}`}
                {hoveredIndex === index && (
                  <span 
                    className="ml-2 text-sm text-gray-300 bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(index+1);
                    }}
                  >
                    Share
                  </span>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(NavigationPanel);
