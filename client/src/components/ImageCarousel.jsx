import React, { useState } from "react";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://www.snitch.com/_next/image?url=https%3A%2F%2Fd2d5n4ft74bagm.cloudfront.net%2Fmedia%2Fbanners%2Fd12642b9-b1be-4eb1-b185-259f6ade3117%2F1737111216.jpeg&w=1920&q=50",
    "https://www.snitch.com/_next/image?url=https%3A%2F%2Fd2d5n4ft74bagm.cloudfront.net%2Fmedia%2Fbanners%2F30b86c8b-96a9-48b0-b171-6fcadbce3700%2F1737111183.jpeg&w=1920&q=50",
    "https://www.snitch.com/_next/image?url=https%3A%2F%2Fd2d5n4ft74bagm.cloudfront.net%2Fmedia%2Fbanners%2F8ce7dff9-3af6-459f-b22b-17723c0c4cbd%2F1737477945.jpeg&w=1920&q=50",
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="shrink-0 w-full md:w-1/2 lg:w-1/3 ">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer">
        <button onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
        <button onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
