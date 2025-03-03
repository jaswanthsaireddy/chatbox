import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loadPastConversation } from "../redux/chatSlice"; 
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const pastConversations = useSelector((state) => state.chat.pastConversations);
  const selectedConversation = useSelector((state) => state.chat.selectedConversation);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered conversation

  // Function to generate shareable link
  const handleShare = (conversationId) => {
    const shareableLink = `${window.location.origin}/chat/${conversationId}`;
    navigator.clipboard.writeText(shareableLink);
    alert(`Link copied: ${shareableLink}`);
  };

  return (
    <>
      <div className={"w-1/4 bg-gray-800 p-4 text-white overflow-y-auto fixed md:static top-0 left-0 h-full md:h-auto flex flex-col h-full"}>
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
        {/* <div className="sticky bottom-0 w-max p-4 bg-gray-800">
          <button 
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate('/feedback-overview')}
          >
            Go to Feedback Overview
          </button>
        </div> */}
        <div className="w-full p-4 bg-gray-800 mt-auto flex">
          <button 
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate('/feedback-overview')}
          >
            Go to Feedback Overview
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
