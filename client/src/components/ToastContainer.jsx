"use client";
import { useEffect, useState } from "react";
import { X, AlertTriangle, CheckCircle, InfoIcon } from "lucide-react";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
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
    alert: {
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      className: "border-red-500 text-red-900 bg-white",
    },
    success: {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      className: "border-green-500 text-green-900 bg-white",
    },
    info: {
      icon: <InfoIcon className="w-5 h-5 text-blue-600" />,
      className: "border-blue-500 text-blue-900 bg-white",
    },
    default: {
      icon: <InfoIcon className="w-5 h-5 text-gray-600" />,
      className: "border-black text-gray-900 bg-white",
    },
  };

  const { icon, className } = variants[toast.type] || variants.default;

  return (
    <div
      className={`
        ${className}
        border  
        p-3 w-72 
        transition-all duration-300 ease-in-out
        shadow-sm
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      role="alert"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">{icon}</div>

        <div className="flex-1 mr-2">
          <p className="text-sm font-medium line-clamp-1">{toast.title}</p>
          <p className="text-xs opacity-70 mt-1 line-clamp-2 tracking-wide capitalize">
            {toast.message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="text-current opacity-50 hover:opacity-80 focus:outline-none"
        >
          <span className="sr-only">Close</span>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;
