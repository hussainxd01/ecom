"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const OurStory = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-white z-50 border-b"
      >
        <Navbar />
      </motion.nav>
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16"
        >
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-6xl font-light leading-tight max-w-3xl"
          >
            Creating timeless fashion pieces that embody elegance, comfort and
            sustainability.
          </motion.h1>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn} className="space-y-6">
              <h2 className="text-lg font-light uppercase tracking-wider">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Creating a sustainable fashion legacy through mindful design and
                ethical manufacturing. We blend traditional craftsmanship with
                modern aesthetics, using only the finest materials that have
                been carefully sourced from responsible suppliers around the
                world.
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="relative h-[400px] overflow-hidden"
            >
              <img
                src="https://image.hm.com/assets/hm/f4/58/f45827bc8c3fdd799ffb4c6935d8fa382d2cee91.jpg?imwidth=564"
                alt="Fashion atelier"
                className="w-full h-full object-cover items-center"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Large Image Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
        >
          <div className="relative h-[600px] overflow-hidden">
            <img
              src="https://image.hm.com/assets/hm/5e/b2/5eb2dda465875e9cf575ade5049ba93c79d07803.jpg?imwidth=564"
              alt="Fashion collection"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Craftsmanship",
                description:
                  "Every piece is meticulously crafted by skilled artisans who bring decades of experience to their work.",
              },
              {
                title: "Sustainability",
                description:
                  "We're committed to responsible fashion, using eco-friendly materials and ethical production methods.",
              },
              {
                title: "Innovation",
                description:
                  "Combining traditional techniques with modern technology to create forward-thinking designs.",
              },
            ].map((value, index) => (
              <motion.div key={index} variants={fadeIn} className="space-y-4">
                <h3 className="text-lg font-light">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Collection Preview */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              variants={fadeIn}
              className="relative h-[500px] overflow-hidden"
            >
              <img
                src="https://image.hm.com/assets/hm/36/68/3668957b8c1328ed38cad8c4bb26d769a6166e45.jpg?imwidth=384"
                alt="Latest collection"
                className="w-full h-full object-cover items-center"
              />
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="flex flex-col justify-center space-y-6"
            >
              <h2 className="text-lg font-light uppercase tracking-wider">
                Latest Collection
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our newest collection embodies our commitment to timeless design
                and sustainable fashion. Each piece is thoughtfully created to
                seamlessly blend into your wardrobe while standing the test of
                time.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/collections"
                  className="inline-block border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-colors w-fit"
                >
                  View Collection
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default OurStory;
