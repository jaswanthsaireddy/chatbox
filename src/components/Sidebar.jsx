import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loadPastConversation } from "../redux/chatSlice"; 

const Sidebar = () => {
  const pastConversations = useSelector((state) => state.chat.pastConversations);
  const selectedConversation = useSelector((state) => state.chat.selectedConversation);
  const dispatch = useDispatch();

  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered conversation

  // Function to generate shareable link
  const handleShare = (conversationId) => {
    const shareableLink = `${window.location.origin}/chat/${conversationId}`;
    navigator.clipboard.writeText(shareableLink);
    alert(`Link copied: ${shareableLink}`);
  };

  return (
    <div className="w-1/4 bg-gray-800 p-4 text-white overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Past Conversations</h2>
      <div className="space-y-2">
        {pastConversations.length === 0 ? (
          <p className="text-gray-400">No past conversations</p>
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
                  ${selectedConversation === conversation ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => dispatch(loadPastConversation(conversation))} 
              >
                Conversation {index + 1}
                {hoveredIndex === index && (
                  <button 
                    className="ml-2 text-sm text-gray-300 bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent selecting the conversation when clicking "Share"
                      handleShare(index);
                    }}
                  >
                    Share
                  </button>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
