import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ productName }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-gray-500 mb-4 uppercase text-xs">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          let href = "/" + pathSegments.slice(0, index + 1).join("/");
          let displayName = segment;

          // ✅ Fix: If this is the product detail page, ensure it comes from "/shop/"
          if (segment === "product" && pathSegments.length === index + 2) {
            href = "/shop";
            displayName = "Shop";
          } else if (index === pathSegments.length - 1 && productName) {
            displayName = productName; // Replace product ID with product name
          }

          return (
            <li key={index} className="flex items-center space-x-2">
              <span>/</span>
              <Link
                to={href}
                className="hover:text-gray-900 transition-colors uppercase text-xs"
              >
                {displayName}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
