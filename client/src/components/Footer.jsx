import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          {/* About Us */}
          <div>
            <h3 className="text-xs font-medium uppercase mb-4">About us</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/our-story"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Our Story
              </Link>
              <Link
                to="/made-with-care"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Made with Care
              </Link>
              <Link
                to="/blog"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Assistance */}
          <div>
            <h3 className="text-xs font-medium uppercase mb-4">Assistance</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/terms-and-conditions"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                to="/shop"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Shop
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-medium uppercase mb-4">Contact</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/find-store"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Find a store
              </Link>
            </nav>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8 uppercase">
          <Link
            to="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Instagram
          </Link>
          <Link
            to="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            TikTok
          </Link>
          <Link
            to="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Facebook
          </Link>
          <Link
            to="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Pinterest
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
