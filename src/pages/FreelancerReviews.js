import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  freelancerWiseAvgReview,
  getFreelancerDetails,
  listReviewByFreelancer,
} from "../redux/slices/reviewSlice";
import Pagination from "../components/Pagination";
import AddReview from "../modals/AddReview";

const FreelancerReviews = () => {
  const { freelancerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviewsList, freelancerDetails, freelancerAvgReview } = useSelector(
    (state) => state.review
  );

  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [ordering, setOrdering] = useState("-created_at");

  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  useEffect(() => {
    dispatch(listReviewByFreelancer({ skip, limit, ordering, freelancerId }));
    dispatch(getFreelancerDetails({ freelancerId }));
    dispatch(freelancerWiseAvgReview({ freelancerId }));
  }, [dispatch, skip, freelancerId, ordering]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <div className="w-full max-w-screen-lg px-8 py-6 space-y-6">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="mr-2 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            Reviews for Freelancer:{" "}
            {freelancerDetails ? freelancerDetails.name : "Loading..."}
          </h1>
        </div>
        <button
          onClick={() => setShowAddReviewModal(true)}
          className="bg-custom-green hover:bg-white text-white hover:text-custom-green font-bold py-2 px-4 rounded"
        >
          Add Review
        </button>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg font-semibold text-gray-800">
              Average Rating:{" "}
            </span>
            <span className="text-lg font-semibold text-custom-green">
              {freelancerAvgReview.average_rating
                ? parseFloat(freelancerAvgReview.average_rating).toFixed(2)
                : "No Ratings"}
            </span>
          </div>
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-green focus:border-custom-green"
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
                  <span className="text-lg font-semibold text-custom-green truncate">
                    {review.rating}
                  </span>
                </div>
                <div className="flex-1 mb-4 md:mb-0 md:flex md:items-center md:space-x-1 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Content:
                  </span>
                  <span className="text-lg font-semibold text-custom-green truncate">
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
