import React, { useState } from "react";

const AddFreelancer = ({ isVisible, onClose }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting New Freelancer:", name);
    // Make API call here to add freelancer
    onClose(); // Close modal after submission
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <form onSubmit={handleSubmit}>
          <label>
            Freelancer Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Freelancer</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFreelancer;
