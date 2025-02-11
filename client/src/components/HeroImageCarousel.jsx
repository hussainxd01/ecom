import React, { useState, useEffect } from "react";

const HeroImageCarousel = () => {
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides with object-fit and centered positioning */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-none w-full h-full relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-start bg-black/40 text-white p-8">
              <h2 className="text-4xl font-bold">{slide.title}</h2>
              <p className="mt-4 text-lg">{slide.subtitle}</p>
              <div className="mt-6">
                <button className="bg-white text-black px-4 py-2 rounded-md mr-4 hover:bg-gray-200 transition">
                  See Collection
                </button>
                <button className="border border-white px-4 py-2 rounded-md hover:bg-white/20 transition">
                  Shop All
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons with hover effects */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all"
        onClick={handlePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all"
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-1 rounded-full transition-colors duration-300 ${
              index === currentSlide
                ? "bg-white"
                : "bg-gray-500 hover:bg-gray-300"
            }`}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroImageCarousel;
