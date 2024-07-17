import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listFreelancer } from "../redux/slices/reviewSlice";
import Pagination from "../components/Pagination";
import AddFreelancer from "../modals/AddFreelancer";

const Freelancers = () => {
  const dispatch = useDispatch();
  const { loading, error, freelancerList } = useSelector(
    (state) => state.review
  );

  const [skip, setSkip] = useState(0);
  const limit = 10;

  useEffect(() => {
    dispatch(listFreelancer({ skip, limit }));
  }, [dispatch, skip]);

  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) {
    return <p className="text-center text-blue-500 text-lg">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <div className="w-full max-w-4xl px-8 py-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Freelancers List</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Freelancer
        </button>
        {freelancerList && freelancerList.result.length > 0 ? (
          <div className="space-y-4">
            {freelancerList.result.map((freelancer) => (
              <div
                key={freelancer.id}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <span className="text-sm font-medium text-gray-600">ID:</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {freelancer.id}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600">
                    Name:
                  </span>
                  <span className="text-lg font-semibold text-indigo-600">
                    {freelancer.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No freelancers found.</p>
        )}
        <Pagination
          total={freelancerList.totalRecords}
          limit={limit}
          skip={skip}
          onPageChange={(newSkip) => setSkip(newSkip)}
        />
      </div>
      <AddFreelancer
        isVisible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default Freelancers;
