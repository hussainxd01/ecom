"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section>
      <Navbar />
      <div className="bg-white min-h-screen flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We'd love to hear from you
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Other Ways to Reach Us
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Email: contact@minimalclothing.com
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Phone: +1 (555) 123-4567
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Address: 123 Fashion Street, Style City, 12345
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ContactUs;
