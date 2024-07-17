import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-custom-blue"></div>
      <p className="text-lg font-semibold ml-3 text-custom-blue">Loading...</p>
    </div>
  );
};

export default Loader;
