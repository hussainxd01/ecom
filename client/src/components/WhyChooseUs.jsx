import { ChevronRight } from "lucide-react";

const WhyUsPage = () => {
  const reasons = [
    {
      title: "Timeless Design",
      description:
        "Our pieces transcend trends, offering enduring style that stands the test of time.",
    },
    {
      title: "Sustainable Craftsmanship",
      description:
        "Ethically sourced materials and responsible production practices for a cleaner future.",
    },
    {
      title: "Quality Over Quantity",
      description:
        "We believe in fewer, better things. Each item is made to last, reducing waste and enhancing your wardrobe.",
    },
    {
      title: "Minimalist Aesthetic",
      description:
        "Clean lines and subtle details that speak volumes without saying a word.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-12">
          Why Choose
          <br />
          Our Essence
        </h1>

        <p className="text-xl text-gray-700 mb-16 max-w-3xl">
          At the heart of our brand lies a commitment to simplicity, quality,
          and purpose. We create clothing that empowers you to do more with
          less.
        </p>

        <div className="grid gap-12 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {reason.title}
              </h2>
              <p className="text-gray-700">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <a
            href="/collection"
            className="inline-flex items-center text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300"
          >
            Explore Our Collection
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhyUsPage;
