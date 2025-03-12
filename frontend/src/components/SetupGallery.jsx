import React from "react";
import sd1 from "../assets/sd1.png";
import sd2 from "../assets/sd2.png";
import sd3 from "../assets/sd3.png";
import sd4 from "../assets/sd4.png";
import sd5 from "../assets/sd5.png";
import sd6 from "../assets/sd6.png";

const SetupGallery = () => {
  return (
    <div className="max-w-6xl mx-auto py-8"> {/* px-0 ya hata di horizontal padding */}
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Share your setup with</h1>
        <div className="text-3xl font-bold text-gray-900">#FuniroFurniture</div>
      </header>
      
      <div className="grid grid-cols-12 gap-4 auto-rows-[300px]">
        <div className="col-span-3 row-span-2 overflow-hidden">
          <img
            src={sd1}
            alt="Modern workspace with laptop and vintage radio"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="col-span-3 row-span-1 overflow-hidden">
          <img
            src={sd2}
            alt="Decorative setup with camera and vase"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="col-span-3 row-span-1 overflow-hidden">
          <img
            src={sd3}
            alt="Minimalist furniture arrangement"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="col-span-3 row-span-2 overflow-hidden">
          <img
            src={sd4}
            alt="Dining room setup"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="col-span-3 row-span-1 overflow-hidden">
          <img
            src={sd5}
            alt="Modern bedroom with white furniture"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="col-span-3 row-span-1 overflow-hidden">
          <img
            src={sd6}
            alt="Workspace with natural lighting"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default SetupGallery;
