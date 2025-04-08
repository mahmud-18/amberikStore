"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTimes } from "react-icons/fa";
import {
  useLazyImage,
  ImageErrorBoundary,
  optimizeImageUrl,
} from "@/app/utils/imageOptimization";

const tutorials = [
  {
    id: 1,
    title: "Tutorial Hijab Pashmina Simple",
    thumbnail: "/images/tutorials/pashmina-simple.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    duration: "5:30",
    difficulty: "Pemula",
  },
  {
    id: 2,
    title: "Tutorial Hijab Segi Empat Modern",
    thumbnail: "/images/tutorials/segiempat-modern.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    duration: "7:15",
    difficulty: "Menengah",
  },
  {
    id: 3,
    title: "Tutorial Hijab Pashmina untuk Pesta",
    thumbnail: "/images/tutorials/pashmina-pesta.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    duration: "8:45",
    difficulty: "Lanjutan",
  },
];

const TutorialThumbnail = ({ tutorial, onClick }) => {
  const [thumbnailSrc, isLoaded] = useLazyImage(
    optimizeImageUrl(tutorial.thumbnail, { width: 640, quality: 75 }),
    "/images/placeholder.svg"
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative aspect-video">
        <ImageErrorBoundary
          src={thumbnailSrc}
          alt={tutorial.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          fallback="/images/error-placeholder.svg"
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <button
          onClick={onClick}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors duration-300"
        >
          <FaPlay className="text-white text-4xl" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{tutorial.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{tutorial.duration}</span>
          <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded-full">
            {tutorial.difficulty}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const TutorialVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tutorial Hijab</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <TutorialThumbnail
            key={tutorial.id}
            tutorial={tutorial}
            onClick={() => setSelectedVideo(tutorial)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {selectedVideo.title}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TutorialVideo;
