import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background py-8 px-4 md:py-12 md:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8 lg:mb-12">
          {/* Newsletter Section */}
          <div className="w-full lg:w-1/3 space-y-4">
            <h2 className="text-lg font-semibold uppercase text-center lg:text-left">
              Sign up for <span className="font-inter">10%</span> off
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-wide text-center lg:text-left">
              Subscribe to get special offers & once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter your email address"
                type="email"
                className="flex-grow"
              />
              <Button
                type="submit"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:justify-end lg:gap-16">
            {/* About Us Section */}
            <div className="w-full">
              <h3 className="text-sm font-semibold uppercase mb-4 text-center sm:text-left">
                About us
              </h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                <Link
                  to="/our-story"
                  className="text-sm uppercase hover:underline"
                >
                  Our Story
                </Link>
                <Link
                  to="/made-with-care"
                  className="text-sm uppercase hover:underline"
                >
                  Made with Care
                </Link>
                <Link to="/blog" className="text-sm uppercase hover:underline">
                  Blog
                </Link>
              </nav>
            </div>

            {/* Assistance Section */}
            <div className="w-full">
              <h3 className="text-sm font-semibold uppercase mb-4 text-center sm:text-left">
                Assistance
              </h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                <Link
                  to="/terms-and-conditions"
                  className="text-sm uppercase hover:underline"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/privacy-policy"
                  className="text-sm uppercase hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link to="/shop" className="text-sm uppercase hover:underline">
                  Shop
                </Link>
              </nav>
            </div>

            {/* Contact Us Section */}
            <div className="w-full col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold uppercase mb-4 text-center sm:text-left">
                Contact us
              </h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                <Link
                  to="/find-store"
                  className="text-sm uppercase hover:underline"
                >
                  Find a store
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-border pt-6">
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
            <Link to="#" className="text-sm uppercase hover:underline">
              Instagram
            </Link>
            <Link to="#" className="text-sm uppercase hover:underline">
              TikTok
            </Link>
            <Link to="#" className="text-sm uppercase hover:underline">
              Facebook
            </Link>
            <Link to="#" className="text-sm uppercase hover:underline">
              Pinterest
            </Link>
          </nav>
          <div className="text-center text-sm text-muted-foreground px-4">
            &copy; {new Date().getFullYear()},{" "}
            <span className="uppercase tracking-wide">All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
