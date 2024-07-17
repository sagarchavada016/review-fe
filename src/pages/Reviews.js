import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getReviewsAvg, listReviews } from "../redux/slices/reviewSlice";
import Pagination from "../components/Pagination";

const Reviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allReviewsList, avgReview } = useSelector((state) => state.review);

  const [skip, setSkip] = useState(0);
  const [ordering, setOrdering] = useState("-created_at");
  const limit = 10;

  useEffect(() => {
    dispatch(listReviews({ skip, limit, ordering }));
    dispatch(getReviewsAvg());
  }, [dispatch, skip, ordering]);

  const handleAllFreelancerClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <div className="w-full max-w-screen-lg px-8 py-6 space-y-6">
        <div className="flex justify-end">
          <button
            onClick={handleAllFreelancerClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            View All Freelancer
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Reviews List</h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg font-semibold text-gray-800">
              Average Rating:{" "}
            </span>
            <span className="text-lg font-semibold text-indigo-600">
              {avgReview.average_rating
                ? parseFloat(avgReview.average_rating).toFixed(2)
                : "No Ratings"}
            </span>
          </div>
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="-created_at">Newest First</option>
            <option value="created_at">Oldest First</option>
            <option value="rating">Rating: Low to High</option>
            <option value="-rating">Rating: High to Low</option>
          </select>
        </div>
        {allReviewsList && allReviewsList.result.length > 0 ? (
          <div className="space-y-4">
            {allReviewsList.result.map((review) => (
              <div
                key={review.id}
                className="flex flex-col md:flex-row justify-between items-start bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow w-full"
              >
                <div className="flex-1 mb-4 md:mb-0 md:flex md:items-center md:space-x-3 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Reviewer Name:
                  </span>
                  <span className="text-lg font-semibold text-gray-900 truncate">
                    {review.reviewer_name}
                  </span>
                </div>
                <div className="flex-1 mb-4 md:mb-0 md:flex md:items-center md:space-x-1 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Rating:
                  </span>
                  <span className="text-lg font-semibold text-indigo-600 truncate">
                    {review.rating}
                  </span>
                </div>
                <div className="flex-1 mb-4 md:mb-0 md:flex md:items-center md:space-x-1 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Review Text:
                  </span>
                  <span className="text-lg font-semibold text-gray-900 truncate">
                    {review.review_text}
                  </span>
                </div>
                <div className="flex-1 mb-4 md:mb-0 md:flex md:items-center md:space-x-3 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Created At:
                  </span>
                  <span className="text-lg font-semibold text-gray-900 truncate">
                    {new Date(review.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No Reviews found.</p>
        )}
        {allReviewsList && allReviewsList.totalRecords > 0 && (
          <Pagination
            total={allReviewsList.totalRecords}
            limit={limit}
            skip={skip}
            onPageChange={(newSkip) => setSkip(newSkip)}
          />
        )}
      </div>
    </div>
  );
};

export default Reviews;
