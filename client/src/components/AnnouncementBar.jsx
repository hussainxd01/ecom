import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const announcements = [
  { text: "Free Shipping on Orders Over $50", link: "/shipping" },
  { text: "New Arrivals Just Dropped!", link: "/new-arrivals" },
  { text: "Limited-Time Discounts - Shop Now", link: "/sale" },
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white text-sm py-1 overflow-hidden relative">
      <div className="container mx-auto flex justify-center items-center h-6  tracking-wider">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            <Link
              to={announcements[index].link}
              className="hover:underline transition-opacity"
            >
              {announcements[index].text}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnnouncementBar;
