import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../redux/slices/reviewSlice";

const AddReview = ({ isVisible, onClose, freelancerId }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewData = {
      reviewer_name: reviewerName,
      rating: parseInt(rating, 10), // ensure the rating is an integer
      review_text: reviewText,
      freelancerId,
    };
    dispatch(addReview(reviewData))
      .unwrap()
      .then(() => {
        onClose(); // Close modal on success
        setReviewerName(""); // Reset state on successful addition
        setRating(""); // Reset state on successful addition
        setReviewText(""); // Reset state on successful addition
      })
      .catch((error) => {
        console.error("Failed to add review:", error);
      });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 py-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="reviewerName"
              className="block text-sm font-medium text-gray-700"
            >
              Reviewer Name:
            </label>
            <input
              id="reviewerName"
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-green focus:border-custom-green"
            />
          </div>
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating:
            </label>
            <input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              min="1"
              max="5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-green focus:border-custom-green"
            />
          </div>
          <div>
            <label
              htmlFor="reviewText"
              className="block text-sm font-medium text-gray-700"
            >
              Review Text:
            </label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-green focus:border-custom-green"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-custom-green hover:bg-indigo-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
