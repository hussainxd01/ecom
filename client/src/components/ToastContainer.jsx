"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

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
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => removeToast(toast.id), 300);
  };

  const variants = {
    success: {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
    },
  };

  const { icon, bgColor, borderColor, textColor } =
    variants[toast.type] || variants.info;

  return (
    <div
      className={`${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded-lg shadow-md w-80 transition-all duration-300 ease-in-out border ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      role="alert"
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0">{icon}</div>

        {/* Text Content */}
        <div className="w-auto min-w-[200px] flex-1">
          <p className="text-sm font-medium truncate">{toast.title}</p>
          <p className="mt-1 text-sm break-words">{toast.message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;
