import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Statement = () => {
  const textRefs = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRefs.current[0],
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animating each line differently
    tl.fromTo(
      textRefs.current[0], // First line
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        textRefs.current[1], // Second line
        { opacity: 0, x: -50, rotate: -5 },
        { opacity: 1, x: 0, rotate: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        textRefs.current[2], // Third line
        { opacity: 0, y: 50, scale: 1.05 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-none tracking-tight space-y-4">
          <span
            ref={(el) => (textRefs.current[0] = el)}
            className="block opacity-0 leading-tight"
          >
            Because real style
          </span>
          <span
            ref={(el) => (textRefs.current[1] = el)}
            className="block opacity-0 leading-tight"
          >
            doesn't need to shout—
          </span>
          <span
            ref={(el) => (textRefs.current[2] = el)}
            className="block text-gray-700 opacity-0 leading-tight"
          >
            it just fits, perfectly.
          </span>
        </h1>
        <Link to={"/shop"} className="block mt-8">
          <button
            ref={buttonRef}
            className="px-8 py-4 bg-gray-900 text-white text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 ease-in-out opacity-0"
          >
            Discover Your Style
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Statement;
