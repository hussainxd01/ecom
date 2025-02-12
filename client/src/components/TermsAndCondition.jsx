import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.",
    },
    {
      title: "2. Use of the Website",
      content:
        "You may use our website for lawful purposes only. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.",
    },
    {
      title: "3. Product Information",
      content:
        "We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content on this site are accurate, complete, reliable, current, or error-free.",
    },
    {
      title: "4. Pricing and Availability",
      content:
        "All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice. We shall not be liable to you or any third party for any modification, price change, or discontinuance of any product.",
    },
    {
      title: "5. Orders and Payments",
      content:
        "When you place an order, you offer to purchase the product at the price stated. All orders are subject to acceptance and availability. We reserve the right to refuse any order you place with us.",
    },
    {
      title: "6. Shipping and Delivery",
      content:
        "Shipping costs and delivery times may vary depending on the delivery address and the products ordered. We are not responsible for delays in delivery due to circumstances beyond our control.",
    },
    {
      title: "7. Returns and Refunds",
      content:
        "You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error.",
    },
    {
      title: "8. Intellectual Property",
      content:
        "All content included on this website, such as text, graphics, logos, images, and software, is the property of our company or our content suppliers and protected by international copyright laws.",
    },
    {
      title: "9. Privacy Policy",
      content:
        "Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.",
    },
    {
      title: "10. Governing Law",
      content:
        "These Terms and Conditions are governed by and construed in accordance with the laws of [Your Country/State], and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.",
    },
  ];

  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800 font-light">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Terms and Conditions
          </h1>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-2">
              If you have any questions about these Terms and Conditions, please
              contact us.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default TermsAndConditions;
