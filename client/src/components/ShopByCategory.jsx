import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import womenImage from "../assets/images/women-category.webp";
import menImage from "../assets/images/mens-category.webp";
import kidsImage from "../assets/images/kids-category.webp";
import accessoriesImage from "../assets/images/watch-category.webp";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ShopByCategory = () => {
  const categoriesRef = useRef([]);
  const sectionRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Women",
      image: womenImage,
      link: "#women",
    },
    {
      id: 2,
      name: "Men",
      image: menImage,
      link: "#men",
    },
    {
      id: 3,
      name: "Kids",
      image: kidsImage,
      link: "#kids",
    },
    {
      id: 4,
      name: "Accessories",
      image: accessoriesImage,
      link: "#accessories",
    },
  ];

  useEffect(() => {
    // Simple fade-in animation on first appearance only
    const ctx = gsap.context(() => {
      categoriesRef.current.forEach((cardRef, index) => {
        // Set initial state
        gsap.set(cardRef, {
          opacity: 0,
          y: 30,
          scale: 0.95,
        });

        // Create the animation that runs once
        ScrollTrigger.create({
          trigger: cardRef,
          start: "top 90%", // Trigger earlier in the viewport
          once: true, // Only trigger once
          onEnter: () => {
            gsap.to(cardRef, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: {
                amount: 0.2,
                from: "start",
              },
            });
          },
        });
      });
    }, sectionRef);

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-normal uppercase tracking-wider mb-2">
          Shop By Category
        </h2>
        <p className="text-gray-500">Explore our collections</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <a
            key={category.id}
            href={category.link}
            ref={(el) => (categoriesRef.current[index] = el)}
            className="group block relative overflow-hidden"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={category.image || "/placeholder.svg"}
                alt={`${category.name} category`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 flex items-end p-4">
              <div className="bg-white/90 py-2 px-4 w-full text-center transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-lg uppercase tracking-wider font-light">
                  {category.name}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
