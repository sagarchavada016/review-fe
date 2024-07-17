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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button onClick={() => setShowAddModal(true)}>Add Freelancer</button>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Freelancers List
      </h1>
      {freelancerList && freelancerList.result.length > 0 ? (
        <>
          <ul className="divide-y divide-gray-300">
            {freelancerList.result.map((freelancer) => (
              <li
                key={freelancer.id}
                className="py-4 flex justify-between items-center hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
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
              </li>
            ))}
          </ul>
          <Pagination
            total={freelancerList.totalRecords}
            limit={limit}
            skip={skip}
            onPageChange={(newSkip) => setSkip(newSkip)}
          />
        </>
      ) : (
        <p className="text-center text-gray-600">No freelancers found.</p>
      )}
      <AddFreelancer
        isVisible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default Freelancers;
