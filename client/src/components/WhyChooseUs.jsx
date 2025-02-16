import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyUsPage = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const reasonRefs = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      reasonRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: reasonRefs.current[0],
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  const reasons = [
    {
      title: "Timeless Design",
      description:
        "Our pieces transcend trends, offering enduring style that stands the test of time.",
    },
    {
      title: "Sustainable Craftsmanship",
      description:
        "Ethically sourced materials and responsible production practices for a cleaner future.",
    },
    {
      title: "Quality Over Quantity",
      description:
        "We believe in fewer, better things. Each item is made to last, reducing waste and enhancing your wardrobe.",
    },
    {
      title: "Minimalist Aesthetic",
      description:
        "Clean lines and subtle details that speak volumes without saying a word.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-12 opacity-0"
        >
          Why Choose
          <br />
          Our Clothing
        </h1>

        <p
          ref={descRef}
          className="text-xl text-gray-700 mb-16 max-w-3xl opacity-0"
        >
          At the heart of our brand lies a commitment to simplicity, quality,
          and purpose. We create clothing that empowers you to do more with
          less.
        </p>

        <div className="grid gap-12 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={(el) => (reasonRefs.current[index] = el)}
              className="bg-white p-8 border border-gray-200 opacity-0"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {reason.title}
              </h2>
              <p className="text-gray-700">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 opacity-0" ref={ctaRef}>
          <Link
            to="/shop"
            className="inline-flex items-center text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300"
          >
            Explore Our Collection
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyUsPage;
