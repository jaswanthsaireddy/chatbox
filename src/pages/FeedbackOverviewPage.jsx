import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeedbackOverview = () => {
    const pastConversations = useSelector((state) => state.chat.pastConversations);

    // Navigation back to chat page
    const navigate = useNavigate();
    
    // State for sorting and filtering
    const [sortOrder, setSortOrder] = useState("desc"); // Default: highest rating first
    const [filterRating, setFilterRating] = useState("all"); // Default: show all

    // Extract feedback from past conversations
    const feedbackData = pastConversations
        .map((conversation, index) => ({
            id: index, // Using index as the ID
            rating: conversation.feedback?.rating || 0, 
            comment: conversation.feedback?.comment?.trim() || "No comment"
        }))
        .filter(item => filterRating === "all" || item.rating === Number(filterRating)) // Apply filter
        .sort((a, b) => sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating); // Apply sorting

    return (
        <div className="p-6 bg-gray-800 text-white min-h-screen">

            <button 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => navigate('/')} // Navigation back to chat page
            >
                Back to Chat
            </button>
            <h2 className="text-2xl font-bold mb-4">Feedback Overview</h2>

            {/* Sorting & Filtering Controls */}
            <div className="flex space-x-4 mb-4">
                {/* Sort Dropdown */}
                <select 
                    className="p-2 bg-gray-700 rounded"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">Sort by Rating: High to Low</option>
                    <option value="asc">Sort by Rating: Low to High</option>
                </select>

                {/* Filter Dropdown */}
                <select 
                    className="p-2 bg-gray-700 rounded"
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                >
                    <option value="all">Show All Ratings</option>
                    <option value="5">Only 5 Stars</option>
                    <option value="4">Only 4 Stars</option>
                    <option value="3">Only 3 Stars</option>
                    <option value="2">Only 2 Stars</option>
                    <option value="1">Only 1 Star</option>
                </select>
            </div>

            {/* Feedback Table */}
            <table className="w-full bg-gray-700 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-900 text-left">
                        <th className="p-3">Conversation ID</th>
                        <th className="p-3">Rating</th>
                        <th className="p-3">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackData.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="p-4 text-center text-gray-400">No feedback available</td>
                        </tr>
                    ) : (
                        feedbackData.map(({ id, rating, comment }) => (
                            <tr key={id} className="border-t border-gray-600 hover:bg-gray-600">
                                <td className="p-3">Conversation {id + 1}</td>
                                <td className="p-3 text-yellow-400">⭐ {rating}</td>
                                <td className="p-3">{comment}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackOverview;
