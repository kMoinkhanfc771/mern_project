import React from "react";
import heroimg from "../assets/heroimg.jpg"

const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-end px-8 md:px-20">
      {/* Background Image */}
      <img
        src={heroimg}
        alt="Furniture Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Hero Content */}
      <div className="w-[643px] h-[443px] bg-[#FFF3E3] p-10 md:p-12 rounded-lg flex flex-col justify-center shadow-lg">
        <h4 className="text-lg md:text-xl font-bold text-gray-700 uppercase tracking-wide">
          New Arrival
        </h4>
        <h1 className="text-4xl md:text-5xl font-bold text-[#b88e2f] mt-2">
          Discover Our <br /> New Collection
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-4 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <a
          href="#"
          className="mt-6 px-5 py-3 bg-[#b88e2f] text-white text-sm font-semibold rounded-md hover:bg-[#8a6a21] transition duration-300 w-fit"
        >
          BUY NOW
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
