import React from "react";
import { useSelector } from "react-redux";

const ChatFeedback = () => {
    const selectedConversation = useSelector((state) => state.chat.selectedConversation);
    const darkMode = useSelector((state) => state.chat.darkMode);

    // Ensure feedback exists to avoid errors
    const conversationFeedback = selectedConversation?.conversationFeedback || { rating: 0, comment: "No feedback provided." };

    // Check if the comment is null or empty
    const commentText = conversationFeedback.comment?.trim() ? conversationFeedback.comment : "No comment";

    // If no conversation is selected, return nothing
    if (!selectedConversation) return null;  

    return (
        <div className={`p-4 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} shadow-lg`}>
            <h2 className="text-lg font-semibold">Conversation Rating</h2>

            {/* ⭐ Star Rating Display */}
            <div className="flex space-x-2 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`p-1 text-2xl ${
                            star <= conversationFeedback.rating ? "text-yellow-400" : "text-gray-400"
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>

            {/* Feedback Comment (Read-Only) */}
            <p className={`w-full p-2 ${darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"} rounded mt-2`}>
                {commentText}
            </p>
        </div>
    );
};

export default ChatFeedback;
