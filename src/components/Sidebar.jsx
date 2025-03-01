import { useSelector } from "react-redux";

const Sidebar = ({ onConversationClick }) => {
  const pastConversations = useSelector((state) => state.chat.pastConversations);

  return (
    <div className="w-1/4 bg-gray-800 p-4 text-white overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">Past Conversations</h2>
      {pastConversations.length === 0 ? (
        <p className="text-gray-400">No past conversations yet.</p>
      ) : (
        pastConversations.map((session, idx) => (
          <div
            key={idx}
            className="mb-3 p-2 bg-gray-700 rounded cursor-pointer"
            onClick={() => onConversationClick(session)}
          >
            <p className="text-sm text-gray-300">Chat {idx + 1}</p>
            <div className="text-xs text-gray-400 max-h-20 overflow-hidden">
              {session.messages.map((chat, index) => (
                <p  className=" text-md font-bold" key={index}>
                  <span className="  text-blue-300">U:</span> {chat.userMessage}
                </p>
              ))}
            </div>
            {/* {session.feedback && (
              <p className="text-yellow-400 text-xs mt-1">⭐ {session.feedback.rating}</p>
            )} */}
          </div>
        ))
      )}
    </div>
  );
};

export default Sidebar;
