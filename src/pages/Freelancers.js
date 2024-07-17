import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listFreelancer } from "../redux/slices/reviewSlice";
import Pagination from "../components/Pagination";
import AddFreelancer from "../modals/AddFreelancer";

const Freelancers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { freelancerList } = useSelector((state) => state.review);

  const [skip, setSkip] = useState(0);
  const [ordering, setOrdering] = useState("-created_at");
  const limit = 10;

  useEffect(() => {
    dispatch(listFreelancer({ skip, limit, ordering }));
  }, [dispatch, skip, ordering]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleRowClick = (freelancerId) => {
    navigate(`/reviews/${freelancerId}`);
  };

  const handleAllReviewsClick = () => {
    navigate("/list-reviews");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-4 px-2 md:pt-8 md:px-0">
      <div className="w-full max-w-screen-lg px-4 md:px-8 py-6 space-y-4 md:space-y-6">
        <div className="flex justify-end">
          <button
            onClick={handleAllReviewsClick}
            className="bg-custom-green hover:bg-white text-white hover:text-custom-green font-bold py-1 md:py-2 px-2 md:px-4 rounded mb-2"
          >
            View All Reviews
          </button>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Freelancers List
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-custom-green hover:bg-white text-white hover:text-custom-green font-bold py-1 md:py-2 px-2 md:px-4 rounded"
        >
          Add Freelancer
        </button>
        <div className="flex justify-end mb-4">
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="text-sm md:text-md py-1 md:py-2 px-2 md:px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-green focus:border-custom-green"
          >
            <option value="-created_at">Newest First</option>
            <option value="created_at">Oldest First</option>
          </select>
        </div>
        {freelancerList && freelancerList.result.length > 0 ? (
          <div className="space-y-4">
            {freelancerList.result.map((freelancer) => (
              <div
                key={freelancer.id}
                className="flex flex-col md:flex-row justify-between items-start bg-white p-2 md:p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow w-full cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(freelancer.id)}
              >
                <div className="flex-1 mb-2 md:mb-0 md:flex md:items-center md:space-x-3 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">ID:</span>
                  <span
                    className="text-md md:text-lg font-semibold text-gray-900 truncate"
                    title={freelancer.id}
                  >
                    {freelancer.id}
                  </span>
                </div>
                <div className="flex-1 mb-2 md:mb-0 md:flex md:items-center md:space-x-1 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Name:
                  </span>
                  <span
                    className="text-md md:text-lg font-semibold text-custom-green truncate"
                    title={freelancer.name}
                  >
                    {freelancer.name}
                  </span>
                </div>
                <div className="flex-1 mb-2 md:mb-0 md:flex md:items-center md:space-x-1 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Review Count:
                  </span>
                  <span
                    className="text-md md:text-lg font-semibold text-custom-green truncate"
                    title={String(freelancer.review_count)}
                  >
                    {freelancer.review_count}
                  </span>
                </div>
                <div className="flex-1 md:flex md:items-center md:space-x-3 overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    Created At:
                  </span>
                  <span
                    className="text-md md:text-lg font-semibold text-gray-900 truncate"
                    title={new Date(freelancer.created_at).toLocaleString()}
                  >
                    {new Date(freelancer.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No freelancers found.</p>
        )}
        {freelancerList && freelancerList.totalRecords > 0 && (
          <Pagination
            total={freelancerList.totalRecords}
            limit={limit}
            skip={skip}
            onPageChange={(newSkip) => setSkip(newSkip)}
          />
        )}
      </div>
      <AddFreelancer
        isVisible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default Freelancers;
