import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background py-12 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-lg font-semibold uppercase">
              Sign up for <span className="font-inter">10%</span> off
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              Subscribe to get special offers & once-in-a-lifetime deals.
            </p>
            <form className="flex gap-2">
              <Input
                placeholder="Enter your email address"
                type="email"
                className="flex-grow"
              />
              <Button type="submit" variant="outline">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="lg:w-2/3 flex flex-wrap justify-end gap-8 lg:gap-16">
            <div>
              <h3 className="text-sm font-semibold uppercase mb-4">About us</h3>
              <nav className="flex flex-col space-y-2">
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
            <div>
              <h3 className="text-sm font-semibold uppercase mb-4">
                Assistance
              </h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/term-condition"
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
            <div>
              <h3 className="text-sm font-semibold uppercase mb-4">
                Contact us
              </h3>
              <nav className="flex flex-col space-y-2">
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
        <div className="border-t border-border pt-8">
          <nav className="flex justify-center space-x-6 mb-6">
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
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()},{" "}
            <span className="uppercase tracking-wide">All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
