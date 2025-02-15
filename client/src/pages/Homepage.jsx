import React from "react";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import HeroImageCarousel from "../components/HeroImageCarousel";
import FeaturedProduct from "../components/FeaturedProduct";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
const Homepage = () => {
  return (
    <section>
      <Navbar />
      <div className="sm:hidden flex">
        <ImageCarousel />
      </div>
      <div className="sm:flex hidden">
        <HeroImageCarousel />
      </div>
      <FeaturedProduct />
      <Newsletter />
      <Footer />
    </section>
  );
};

export default Homepage;
