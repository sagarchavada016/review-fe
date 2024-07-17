import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listReviews } from "../redux/slices/reviewSlice";
import Pagination from "../components/Pagination";

const Reviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, allReviewsList } = useSelector(
    (state) => state.review
  );

  const [skip, setSkip] = useState(0);
  const [ordering, setOrdering] = useState("-created_at");
  const limit = 10;

  useEffect(() => {
    dispatch(listReviews({ skip, limit, ordering }));
  }, [dispatch, skip, ordering]);

  if (loading) {
    return <p className="text-center text-blue-500 text-lg">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <div className="w-full max-w-4xl px-8 py-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Reviews List</h1>
        <div className="flex justify-end mb-4">
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
                className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-3 mb-4 md:mb-0 w-full">
                  <div className="flex items-start md:items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600">
                      Reviewer Name:
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {review.reviewer_name}
                    </span>
                  </div>
                  <div className="flex items-start md:items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600">
                      Rating:
                    </span>
                    <span className="text-lg font-semibold text-indigo-600">
                      {review.rating}
                    </span>
                  </div>
                  <div className="flex items-start md:items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600">
                      Review Text:
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {review.review_text}
                    </span>
                  </div>
                  <div className="flex items-start md:items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600">
                      Created At:
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {new Date(review.created_at).toLocaleString()}
                    </span>
                  </div>
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
