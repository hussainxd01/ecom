import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "../hooks/use-toast";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AuthPage = () => {
  const { login, register } = useShop();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = await login({
          email: formData.email,
          password: formData.password,
        });
        if (result.success) {
          toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
            action: (
              <ToastAction altText="Go to dashboard">
                Go to dashboard
              </ToastAction>
            ),
          });
          navigate("/");
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: result.error,
          });
        }
      } else {
        const result = await register(formData);
        if (result.success) {
          toast({
            title: "Account created!",
            description: "You've successfully signed up.",
            action: (
              <ToastAction altText="Go to dashboard">
                Go to dashboard
              </ToastAction>
            ),
          });
          navigate("/");
        } else {
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: result.error,
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Navbar />
      <div className="flex items-center justify-center py-10 bg-white">
        <div className="w-full max-w-md px-4">
          <h1 className="text-2xl font-normal text-center mb-1">
            {isLogin ? "Sign in" : "Create account"}
          </h1>
          <p className="text-sm text-center text-gray-600 mb-8">
            {isLogin
              ? "Welcome back! Sign in to your account."
              : "Become a member — don't miss out on deals, offers, discounts and bonus vouchers."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required={!isLogin}
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-12 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required={!isLogin}
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-12 text-sm"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-12 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="h-12 text-sm"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="text-gray-600">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-gray-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-sm font-normal bg-black hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : isLogin
                ? "Sign in"
                : "Create account"}
            </Button>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full h-12 text-sm border border-black hover:bg-gray-50"
            >
              {isLogin ? "Create account" : "Sign in instead"}
            </button>
          </form>

          <CardFooter className="flex justify-center mt-8">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </CardFooter>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default AuthPage;
