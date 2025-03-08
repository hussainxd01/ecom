import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AuthPage = () => {
  const { login, register, addToast } = useShop();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

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
          addToast("Welcome back! You're logged in.", "success");
          navigate("/");
        } else {
          addToast(`Login failed: ${result.error || "Unknown error"}`, "error");
          return; // Stop execution here to prevent further actions
        }
      } else {
        const result = await register(formData);
        if (result.success) {
          addToast("Account Created Successfully!", "success");
          navigate("/");
        } else {
          addToast(
            `There was a problem creating your account: ${
              result.error || "Unknown error"
            }`,
            "error"
          );
          return;
        }
      }
    } catch (error) {
      addToast("An error occurred during the request.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, you would use OAuth here
      // For now, we'll just redirect to the Google sign-in component
      navigate("/google-signin");
    } catch (error) {
      addToast("Error connecting with Google. Please try again.", "error");
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

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full h-12 mb-4 text-sm font-normal border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span>
              {isLogin ? "Continue with Google" : "Sign up with Google"}
            </span>
          </button>

          <div className="relative flex items-center justify-center my-6">
            <hr className="w-full border-gray-300" />
            <span className="absolute bg-white px-4 text-xs text-gray-500">
              OR
            </span>
          </div>

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
