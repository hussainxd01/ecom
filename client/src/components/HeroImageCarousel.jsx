import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Genevieve",
    subtitle: "Elevated styles with just a hint of saloon.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "New Horizons",
    subtitle: "Discover the latest trends for the season.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Timeless Beauty",
    subtitle: "Classic styles for a modern touch.",
  },
];

const HeroImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end items-start text-white p-10">
                <h2 className="text-4xl font-semibold">{slide.title}</h2>
                <p className="mt-3 text-lg opacity-80">{slide.subtitle}</p>
                <button className="mt-6 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-all">
                  Explore Now
                </button>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroImageCarousel;
