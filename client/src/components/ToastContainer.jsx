"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 space-y-4 z-50 font-sans">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

const Toast = ({ toast, removeToast }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => removeToast(toast.id), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div
      className={`bg-white  text-black px-6 py-4 max-w-sm w-full transition-all duration-300 ease-in-out border border-gray-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="flex justify-between items-start">
        <p className="text-xs font-medium tracking-wider pr-8">
          {toast.message}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;
