import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">Unauthorized</h1>
      <p className="text-lg text-gray-500">You are not authorized to access this page.</p>
    </div>
  );
};

export default UnauthorizedPage