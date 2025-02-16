import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
  const { products } = useShop();
  const scrollContainerRef = useRef(null);
  const productRefs = useRef([]);

  useEffect(() => {
    if (productRefs.current.length === 0) return;

    requestAnimationFrame(() => {
      gsap.fromTo(
        productRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 80%",
          },
        }
      );
    });

    // Optional: Auto-scroll on load
    gsap.to(scrollContainerRef.current, {
      scrollLeft: 50,
      duration: 1,
      ease: "power3.inOut",
    });
  }, [products]); // Re-run when products change

  return (
    <section className="container mx-auto px-4 md:px-24 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="sm:text-3xl text-xl font-base tracking-wide">
          Featured Products
        </h2>
        <div className="flex sm:gap-2 gap-1 items-center justify-center">
          <Link className="sm:text-sm text-xs hover:underline">Shop all</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="sm:size-5 size-4"
          >
            <path
              fillRule="evenodd"
              d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {products.map((product, index) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            ref={(el) => (productRefs.current[index] = el)}
            className="flex-none w-full md:w-[calc((100%-3rem)/3)] snap-start group"
          >
            <div className="relative aspect-[3/4] mb-4 overflow-hidden">
              <img
                src={product.images[0] || "/api/placeholder/300/400"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-sm font-medium uppercase">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              ₹{product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
