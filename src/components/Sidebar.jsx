import { useSelector, useDispatch } from "react-redux";
import { loadPastConversation } from "../redux/chatSlice"; // ✅ Import existing action

const Sidebar = () => {
  const pastConversations = useSelector((state) => state.chat.pastConversations);
  const selectedConversation = useSelector((state) => state.chat.selectedConversation);
  const dispatch = useDispatch();

  return (
    <div className="w-1/4 bg-gray-800 p-4 text-white overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Past Conversations</h2>
      <div className="space-y-2">
        {pastConversations.length === 0 ? (
          <p className="text-gray-400">No past conversations</p>
        ) : (
          pastConversations.map((conversation, index) => (
            <button 
              key={index} 
              className={`w-full p-2 rounded 
                ${selectedConversation === conversation ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`} // ✅ Highlight selected button
              onClick={() => dispatch(loadPastConversation(conversation))} // ✅ Use loadPastConversation
            >
              Conversation {index + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
