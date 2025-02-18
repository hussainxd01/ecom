"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import image from "../assets/images/contact_image.webp";
export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-[600px] bg-gray-100">
              <img
                src={image}
                alt="Aesthetic"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Form Section */}
            <div className="space-y-8 md:pl-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
                  ENQUIRE
                </h2>
                <p className="text-gray-600 mb-8">
                  Connect with us about our latest collection and bespoke
                  services.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border-b border-gray-300 py-2 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border-b border-gray-300 py-2 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows="4"
                    className="w-full border-b border-gray-300 py-2 placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-black text-white hover:bg-gray-900 transition-colors"
                >
                  SEND
                </button>
              </form>

              <div className="space-y-2 pt-8 text-sm text-gray-600">
                <p>contact@elvn.com</p>
                <div>
                  <p>Monday-Saturday: 10:00-18:00</p>
                  <p>Sunday: 11:00-17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
