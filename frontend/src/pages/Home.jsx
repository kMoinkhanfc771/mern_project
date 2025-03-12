import React from 'react';
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import SetupGallery from "../components/SetupGallery";
import BrowseRange from "../components/BrowserRange";
import RoomSlider from "../components/RoomSlider";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BrowseRange />
      <ProductGrid />
      <SetupGallery />
      <RoomSlider />
    </div>
  );
};

export default Home;
