import React from 'react';

const Home = () => {
  return (
    <div className="mt-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to MyStore</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div key={item} className="border p-4 rounded shadow-sm">
            <div className="bg-gray-200 h-40 rounded mb-3"></div>
            <h2 className="text-lg font-semibold">Product {item}</h2>
            <p className="text-gray-600">Some description...</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
