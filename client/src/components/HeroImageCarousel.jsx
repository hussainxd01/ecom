import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroImageCarousel = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const containerRef = useRef(null);

  // Default slides if no data is passed
  const defaultSlides = [
    {
      image: "https://example.com/slide1.jpg",
      link: "/collection/summer",
      title: "Summer Collection",
    },
    {
      image: "https://example.com/slide2.jpg",
      link: "/collection/winter",
      title: "Winter Essentials",
    },
  ];

  // Use passed slides or default
  const carouselSlides = slides.length > 0 ? slides : defaultSlides;

  useEffect(() => {
    // Automatic slide change every 5 seconds
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  useEffect(() => {
    // GSAP animation for slide transitions
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselSlides.length - 1 : prev - 1
    );
  };

  // Prevent context menu and drag
  const handleImageProps = {
    draggable: false,
    onContextMenu: (e) => e.preventDefault(),
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[90vh] overflow-hidden bg-black"
    >
      {carouselSlides.map(
        (slide, index) =>
          index === currentSlide && (
            <div
              key={index}
              ref={slideRef}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundPosition: "center",
                  filter: "brightness(0.8)",
                }}
              />

              {/* Overlay Content */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white max-w-2xl px-4">
                  <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider uppercase">
                    {slide.title}
                  </h1>
                  <a
                    href={slide.link}
                    className="inline-block border border-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          )
      )}

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }
            `}
          />
        ))}
      </div>

      {/* Optional Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl opacity-50 hover:opacity-100 transition-opacity"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl opacity-50 hover:opacity-100 transition-opacity"
      >
        →
      </button>
    </section>
  );
};

export default HeroImageCarousel;
