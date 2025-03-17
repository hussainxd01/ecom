import React from "react";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import HeroImageCarousel from "../components/HeroImageCarousel";
import FeaturedProduct from "../components/FeaturedProduct";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Statement from "../components/Statement";
import AnnouncementBar from "../components/AnnouncementBar";
import ShopByCategory from "../components/ShopByCategory";
import CameraCapture from "../components/CameraCapture";
const Homepage = () => {
  return (
    <section>
      <AnnouncementBar />
      <Navbar />
      <div className="sm:hidden flex">
        <ImageCarousel />
      </div>
      <div className="sm:flex hidden">
        <HeroImageCarousel />
      </div>
      <Statement />
      <ShopByCategory />
      <FeaturedProduct />
      <Newsletter />
      <Footer />
      <CameraCapture />
    </section>
  );
};

export default Homepage;
