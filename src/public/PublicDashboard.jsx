import React from 'react';

const PublicDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Tournament Pro</h1>
      <p className="text-lg text-gray-600">
        This is the public dashboard. You can view tournament information, but you cannot make any changes.
      </p>
      <p className="text-lg text-gray-600 mt-4">
        Please use the sidebar to navigate through the different pages.
      </p>
    </div>
  );
};

export default PublicDashboard;
