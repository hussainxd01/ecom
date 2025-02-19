import React from "react";
import { useShop } from "../context/ShopContext";

const Newsletter = () => {
  const { postNewsletter, addToast } = useShop();
  const [formData, setFormData] = React.useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const { success, error } = await postNewsletter(email);
    if (success) {
      addToast("Subscribed successfully!", "success");
      setFormData({});
    } else {
      addToast(`Subscription failed: ${error || "Unknown error"}`, "error");
    }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-8">
          Join Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Stay updated with our latest collections and exclusive offers.
        </p>
        <form
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-200 focus:outline-none focus:border-gray-400 w-full"
            onChange={(e) => setFormData({ email: e.target.value })}
            value={formData.email}
            required
          />
          <button className="px-8 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors w-full sm:w-auto">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
