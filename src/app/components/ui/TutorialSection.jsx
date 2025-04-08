"use client";
import { useState, useEffect } from "react";
import { FaPlay, FaClock, FaUserGraduate } from "react-icons/fa";

const TutorialSection = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await fetch("/api/tutorials");
      if (!response.ok) throw new Error("Gagal mengambil data tutorial");
      const data = await response.json();
      setTutorials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Tutorial Video
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => window.open(tutorial.videoUrl, "_blank")}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity"
                >
                  <FaPlay className="text-white text-4xl" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{tutorial.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserGraduate />
                    <span>{tutorial.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorialSection;
