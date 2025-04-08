"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FaCheckCircle className="text-green-500" size={20} />,
    error: <FaTimesCircle className="text-red-500" size={20} />,
    info: <FaInfoCircle className="text-blue-500" size={20} />,
  };

  const bgColors = {
    success: "bg-green-50",
    error: "bg-red-50",
    info: "bg-blue-50",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div
            className={`${bgColors[type]} px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-[200px]`}
          >
            {icons[type]}
            <p className="text-gray-700">{message}</p>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
