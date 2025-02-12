import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect personal information that you provide directly to us, such as your name, email address, postal address, phone number, and payment information when you make a purchase. We also automatically collect certain information about your device and how you interact with our website.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to process your orders, communicate with you, improve our services, personalize your shopping experience, and send you marketing communications (if you opt in). We may also use your information to comply with our legal obligations and enforce our policies.",
    },
    {
      title: "3. Information Sharing and Disclosure",
      content:
        "We do not sell your personal information. We may share your information with service providers who help us operate our business, with your consent, or as required by law. We may also share aggregated or de-identified information that cannot reasonably be used to identify you.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure.",
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to collect and track information about your browsing activities on our website. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.",
    },
    {
      title: "6. Third-Party Links",
      content:
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of such websites. We encourage you to review the privacy policies of any third-party sites you visit.",
    },
    {
      title: "7. Your Rights and Choices",
      content:
        "Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. You can also opt out of receiving marketing communications from us at any time.",
    },
    {
      title: "8. Children's Privacy",
      content:
        "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, please do not provide any information on this website.",
    },
    {
      title: "9. Changes to This Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date at the bottom of this page.",
    },
    {
      title: "10. Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at privacy@ourcompany.com or by mail at [Your Company Address].",
    },
  ];

  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800 font-light">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Privacy Policy
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
              If you have any questions about our Privacy Policy, please don't
              hesitate to contact us.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PrivacyPolicy;
