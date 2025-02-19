"use client";

import { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import {
  X,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  PinIcon as Pinterest,
} from "lucide-react";
import { Link } from "react-router-dom";
import IMAGE from "../assets/images/NEWS_IMAGE.jpg";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { postNewsletter, addToast } = useShop();
  const [formData, setFormData] = useState({ email: "" });

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email.trim();
    if (!email) return;

    const { success, error } = await postNewsletter(email);
    if (success) {
      addToast("Subscribed successfully!", "success");
      setFormData({ email: "" });
      setIsOpen(false);
    } else {
      addToast(`Subscription failed: ${error}`, "error"); // Show exact backend message
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white max-w-4xl w-full grid md:grid-cols-2 relative">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image section */}
        <div className="hidden md:block">
          <img
            src={IMAGE}
            alt="Fashion"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content section */}
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="text-center max-w-sm">
            <p className="text-sm font-medium tracking-wide text-gray-900 mb-3">
              NEWS AND UPDATES
            </p>
            <h2 className="text-3xl font-serif mb-6">Get 10% Off your order</h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm text-gray-600 mb-8">
              Be the first to know about new collections and exclusive offers.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-8 uppercase">
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="icon icon-instagram size-5"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#ccccc"
                    fill-rule="evenodd"
                    d="M13.23 3.492c-.84-.037-1.096-.046-3.23-.046-2.144 0-2.39.01-3.238.055-.776.027-1.195.164-1.487.273a2.43 2.43 0 0 0-.912.593 2.486 2.486 0 0 0-.602.922c-.11.282-.238.702-.274 1.486-.046.84-.046 1.095-.046 3.23 0 2.134.01 2.39.046 3.229.004.51.097 1.016.274 1.495.145.365.319.639.602.913.282.282.538.456.92.602.474.176.974.268 1.479.273.848.046 1.103.046 3.238.046 2.134 0 2.39-.01 3.23-.046.784-.036 1.203-.164 1.486-.273.374-.146.648-.329.921-.602.283-.283.447-.548.602-.922.177-.476.27-.979.274-1.486.037-.84.046-1.095.046-3.23 0-2.134-.01-2.39-.055-3.229-.027-.784-.164-1.204-.274-1.495a2.43 2.43 0 0 0-.593-.913 2.604 2.604 0 0 0-.92-.602c-.284-.11-.703-.237-1.488-.273ZM6.697 2.05c.857-.036 1.131-.045 3.302-.045 1.1-.014 2.202.001 3.302.045.664.014 1.321.14 1.943.374a3.968 3.968 0 0 1 1.414.922c.41.397.728.88.93 1.414.23.622.354 1.279.365 1.942C18 7.56 18 7.824 18 10.005c0 2.17-.01 2.444-.046 3.292-.036.858-.173 1.442-.374 1.943-.2.53-.474.976-.92 1.423a3.896 3.896 0 0 1-1.415.922c-.51.191-1.095.337-1.943.374-.857.036-1.122.045-3.302.045-2.171 0-2.445-.009-3.302-.055-.849-.027-1.432-.164-1.943-.364a4.152 4.152 0 0 1-1.414-.922 4.128 4.128 0 0 1-.93-1.423c-.183-.51-.329-1.085-.365-1.943C2.009 12.45 2 12.167 2 10.004c0-2.161 0-2.435.055-3.302.027-.848.164-1.432.365-1.942a4.44 4.44 0 0 1 .92-1.414 4.18 4.18 0 0 1 1.415-.93c.51-.183 1.094-.33 1.943-.366Zm.427 4.806a4.105 4.105 0 1 1 5.805 5.805 4.105 4.105 0 0 1-5.805-5.805Zm1.882 5.371a2.668 2.668 0 1 0 2.042-4.93 2.668 2.668 0 0 0-2.042 4.93Zm5.922-5.942a.958.958 0 1 1-1.355-1.355.958.958 0 0 1 1.355 1.355Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="icon icon-tiktok size-5"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#ccccc"
                    d="M10.511 1.705h2.74s-.157 3.51 3.795 3.768v2.711s-2.114.129-3.796-1.158l.028 5.606A5.073 5.073 0 1 1 8.213 7.56h.708v2.785a2.298 2.298 0 1 0 1.618 2.205L10.51 1.705Z"
                  ></path>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="icon icon-facebook size-5"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#ccccc"
                    d="M18 10.049C18 5.603 14.419 2 10 2c-4.419 0-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951Z"
                  ></path>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="icon icon-youtube size-5"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#ccccc"
                    d="M18.16 5.87c.34 1.309.34 4.08.34 4.08s0 2.771-.34 4.08a2.125 2.125 0 0 1-1.53 1.53c-1.309.34-6.63.34-6.63.34s-5.321 0-6.63-.34a2.125 2.125 0 0 1-1.53-1.53c-.34-1.309-.34-4.08-.34-4.08s0-2.771.34-4.08a2.173 2.173 0 0 1 1.53-1.53C4.679 4 10 4 10 4s5.321 0 6.63.34a2.173 2.173 0 0 1 1.53 1.53ZM8.3 12.5l4.42-2.55L8.3 7.4v5.1Z"
                  ></path>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="icon icon-twitter size-5"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.27274 2.8L10.8009 7.82176L15.2183 2.8H16.986L11.5861 8.93887L17.3849 17.1928H12.7272L8.99645 11.8828L4.32555 17.1928H2.55769L8.21157 10.7657L2.61506 2.8H7.27274ZM13.5151 15.9248L5.06895 4.10931H6.4743L14.9204 15.9248H13.5151Z"
                    fill="#ccccc"
                  ></path>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="icon icon-pinterest size-5"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#ccccc"
                    d="M10 2.01c2.124.01 4.16.855 5.666 2.353a8.087 8.087 0 0 1 1.277 9.68A7.952 7.952 0 0 1 10 18.04a8.164 8.164 0 0 1-2.276-.307c.403-.653.672-1.24.816-1.729l.567-2.2c.134.27.393.5.768.702.384.192.768.297 1.19.297.836 0 1.585-.24 2.248-.72a4.678 4.678 0 0 0 1.537-1.969c.37-.89.554-1.848.537-2.813 0-1.249-.48-2.315-1.43-3.227a5.061 5.061 0 0 0-3.65-1.374c-.893 0-1.729.154-2.478.461a5.023 5.023 0 0 0-3.236 4.552c0 .72.134 1.355.413 1.902.269.538.672.922 1.22 1.152.096.039.182.039.25 0 .066-.028.114-.096.143-.192l.173-.653c.048-.144.02-.288-.105-.432a2.257 2.257 0 0 1-.548-1.565 3.803 3.803 0 0 1 3.976-3.861c1.047 0 1.863.288 2.44.855.585.576.883 1.315.883 2.228 0 .768-.106 1.479-.317 2.122a3.813 3.813 0 0 1-.893 1.556c-.384.384-.836.576-1.345.576-.413 0-.749-.144-1.018-.451-.259-.307-.345-.672-.25-1.085.147-.514.298-1.026.452-1.537l.173-.701c.057-.25.086-.451.086-.624 0-.346-.096-.634-.269-.855-.192-.22-.451-.336-.797-.336-.432 0-.797.192-1.085.595-.288.394-.442.893-.442 1.499.005.374.063.746.173 1.104l.058.144c-.576 2.478-.913 3.938-1.037 4.36-.116.528-.154 1.153-.125 1.863A8.067 8.067 0 0 1 2 10.03c0-2.208.778-4.11 2.343-5.666A7.721 7.721 0 0 1 10 2.001v.01Z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
