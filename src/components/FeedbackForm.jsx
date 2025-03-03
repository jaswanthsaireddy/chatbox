import { useDispatch, useSelector } from "react-redux";
import { setFinalFeedback, toggleFeedbackForm, storeConversation } from "../redux/chatSlice";
import { useState } from "react";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.chat.darkMode); // Get dark mode state from Redux
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0) {
      dispatch(setFinalFeedback({ rating, comment }));
      dispatch(storeConversation()); 
      dispatch(toggleFeedbackForm(false));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`p-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg shadow-lg`}>
        <h2 className="text-lg font-semibold">Rate this conversation</h2>

        {/* ⭐ Star Rating with Hover Effect */}
        <div className="flex space-x-2 my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`p-1 text-2xl transition-colors duration-200 
                ${hoverRating >= star || rating >= star ? "text-yellow-400" : "text-gray-400"}`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        {/* Feedback Text */}
        <textarea
          className={`w-full p-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'} rounded mt-2`}
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Submit Button */}
        <button
          className={`mt-3 px-4 py-2 rounded 
            ${rating > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 cursor-not-allowed"}`}
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
