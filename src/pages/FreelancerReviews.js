import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  getFreelancerDetails,
  listReviewByFreelancer,
} from "../redux/slices/reviewSlice";
import Pagination from "../components/Pagination";
import AddReview from "../modals/AddReview";

const FreelancerReviews = () => {
  const { freelancerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviewsList, freelancerDetails } = useSelector(
    (state) => state.review
  );

  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [ordering, setOrdering] = useState("-created_at");

  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  useEffect(() => {
    dispatch(listReviewByFreelancer({ skip, limit, ordering, freelancerId }));
    dispatch(getFreelancerDetails({ freelancerId }));
  }, [dispatch, skip, freelancerId, ordering]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <div className="w-full max-w-4xl px-8 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="mr-2"
              onClick={() => navigate(-1)}
            />
            Reviews for Freelancer:{" "}
            {freelancerDetails ? freelancerDetails.name : "Loading..."}
          </h1>
        </div>
        <button
          onClick={() => setShowAddReviewModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Review
        </button>
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
        {reviewsList && reviewsList.result.length > 0 ? (
          <div className="space-y-4">
            {reviewsList.result.map((review) => (
              <div
                key={review.id}
                className="flex flex-col md:flex-row justify-between items-start bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex-1 mb-4 md:mb-0 md:flex md:items-center md:space-x-3 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Reviewer Name:
                  </span>
                  <span className="text-lg font-semibold text-gray-900 truncate">
                    {review.reviewer_name}
                  </span>
                </div>
                <div className="flex-1 mb-4 md:mb-0 md:flex md:items-center md:space-x-3 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Rating:
                  </span>
                  <span className="text-lg font-semibold text-indigo-600 truncate">
                    {review.rating}
                  </span>
                </div>
                <div className="flex-1 mb-4 md:mb-0 md:flex md:items-center md:space-x-3 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Content:
                  </span>
                  <span className="text-lg font-semibold text-indigo-600 truncate">
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
          <p className="text-center text-gray-600">No reviews found.</p>
        )}
        {reviewsList && reviewsList.totalRecords > 0 && (
          <Pagination
            total={reviewsList.totalRecords}
            limit={limit}
            skip={skip}
            onPageChange={(newSkip) => setSkip(newSkip)}
          />
        )}
      </div>
      <AddReview
        isVisible={showAddReviewModal}
        onClose={() => setShowAddReviewModal(false)}
        freelancerId={freelancerId}
      />
    </div>
  );
};

export default FreelancerReviews;
