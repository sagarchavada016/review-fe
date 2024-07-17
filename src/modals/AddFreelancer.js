import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFreelancer } from "../redux/slices/reviewSlice";

const AddFreelancer = ({ isVisible, onClose }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addFreelancer({ name }))
      .unwrap()
      .then(() => {
        onClose(); // Close modal on success
        setName(""); // Reset input field after successful addition
      })
      .catch((error) => {
        console.error("Failed to add freelancer:", error);
      });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 py-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Freelancer</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="freelancerName"
              className="block text-sm font-medium text-gray-700"
            >
              Freelancer Name:
            </label>
            <input
              id="freelancerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFreelancer;
