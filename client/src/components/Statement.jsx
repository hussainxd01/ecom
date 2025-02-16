import React from "react";
import { Link } from "react-router-dom";

const Statement = () => {
  return (
    <div className="w-full min-h-screen flex items-center bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
          Because real style
          <br className="hidden sm:block" /> doesn't need to shout—
          <br className="hidden sm:block" />
          <span className="text-gray-700">it just fits, perfectly.</span>
        </h1>
        <Link to={"/shop"}>
          <button className="mt-12 px-8 py-4 bg-gray-900 text-white text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 ease-in-out">
            Discover Your Style
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Statement;
