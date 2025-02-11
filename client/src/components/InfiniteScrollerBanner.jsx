import React from "react";
import { motion } from "framer-motion";

const InfiniteScrollBanner = () => {
  const bannerText =
    "MADE IN INDIA FOR THE WORLD // FLAT 20% OFF ON PURCHASES ABOVE 4599 // ";

  return (
    <div className="relative overflow-hidden bg-white/50 py-1 font-sans ">
      <motion.div
        className="whitespace-nowrap"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            className="mx-2 font-semibold text-xs tracking-widest text-black"
          >
            {bannerText}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScrollBanner;
