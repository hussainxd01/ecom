import React from "react";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import HeroImageCarousel from "../components/HeroImageCarousel";
import FeaturedProduct from "../components/FeaturedProduct";
import { Toaster } from "@/components/ui/toaster";
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
      <Toaster />
    </section>
  );
};

export default Homepage;
