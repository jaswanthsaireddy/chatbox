import React from "react";
import { useSelector } from "react-redux";

const ChatFeedback = () => {
    const selectedConversation = useSelector((state) => state.chat.selectedConversation);

    // Ensure feedback exists to avoid errors
    const feedback = selectedConversation?.feedback || { rating: 0, comment: "No feedback provided." };

    // Check if the comment is null or empty
    const commentText = feedback.comment?.trim() ? feedback.comment : "No comment";

    if (!selectedConversation) return null; // If no conversation is selected, return nothing

    return (
        <div className="p-4 bg-gray-700 text-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Conversation Rating</h2>

            {/* ⭐ Star Rating Display */}
            <div className="flex space-x-2 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`p-1 text-2xl ${
                            star <= feedback.rating ? "text-yellow-400" : "text-gray-400"
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>

            {/* Feedback Comment (Read-Only) */}
            <p className="w-full p-2 bg-gray-600 rounded mt-2 text-white">
                {commentText}
            </p>
        </div>
    );
};

export default ChatFeedback;
