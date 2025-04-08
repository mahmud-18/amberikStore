"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaHistory, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Data dummy untuk suggestions
  const dummyProducts = [
    "Hijab Pashmina Premium",
    "Hijab Segi Empat",
    "Hijab Instan",
    "Roti Maryam",
    "Kue Basah",
    "Brownies",
  ];

  // Filter suggestions berdasarkan query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = dummyProducts.filter((product) =>
        product.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Handle search
  const handleSearch = (searchQuery) => {
    if (!searchQuery) return;

    // Simpan ke history
    const newHistory = [
      searchQuery,
      ...searchHistory.filter((item) => item !== searchQuery),
    ].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    // Navigate ke halaman hasil pencarian
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  // Clear history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  // Remove item from history
  const removeFromHistory = (item) => {
    const newHistory = searchHistory.filter((h) => h !== item);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-white rounded-full border border-gray-200 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-opacity-50">
        <FaSearch className="ml-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Cari produk..."
          className="w-full px-4 py-2 text-gray-700 focus:outline-none"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="mr-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <AnimatePresence>
        {(showSuggestions || searchHistory.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-50"
          >
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-500 px-3 py-2">
                  Saran Pencarian
                </h3>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-pink-50 rounded-lg flex items-center gap-2"
                  >
                    <FaSearch className="text-gray-400" size={12} />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="border-t border-gray-100 p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500">
                    Riwayat Pencarian
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-pink-500 hover:text-pink-600"
                  >
                    Hapus Semua
                  </button>
                </div>
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 hover:bg-pink-50 rounded-lg group"
                  >
                    <button
                      onClick={() => handleSearch(item)}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <FaHistory className="text-gray-400" size={12} />
                      <span>{item}</span>
                    </button>
                    <button
                      onClick={() => removeFromHistory(item)}
                      className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
