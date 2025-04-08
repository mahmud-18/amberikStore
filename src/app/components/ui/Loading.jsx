"use client";
import { motion } from "framer-motion";

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <motion.div
      className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export const LoadingSkeleton = () => (
  <div className="space-y-4 w-full">
    <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
    </div>
  </div>
);

export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default { LoadingSpinner, LoadingSkeleton, PageTransition };
