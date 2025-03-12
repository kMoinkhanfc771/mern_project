import React from "react";
import img1 from "../assets/img1.png"; // Replace with actual image path
import img2 from "../assets/img2.png"; // Replace with actual image path
import img3 from "../assets/img3.png"; // Replace with actual image path

const BrowseRange = () => {
  return (
    <section className="max-w-7xl mx-auto text-center py-12 px-6">
      <h2 className="text-3xl font-bold text-gray-900">Browse The Range</h2>
      <p className="text-gray-600 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src={img1}
            alt="Furniture Range 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src={img2}
            alt="Furniture Range 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src={img3}
            alt="Furniture Range 3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BrowseRange;
