"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const { addToCart } = useCart();

  // Data dummy untuk contoh
  useEffect(() => {
    setLoading(true);
    // Simulasi API call
    setTimeout(() => {
      const dummyResults = [
        {
          id: 1,
          name: "Hijab Pashmina Premium",
          price: 85000,
          rating: 4.8,
          reviews: 124,
          image: "/images/hijab.png",
          relevance: 0.95,
        },
        // Tambahkan hasil lainnya...
      ].filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

      // Sort results
      const sortedResults = [...dummyResults].sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          default:
            return b.relevance - a.relevance;
        }
      });

      setResults(sortedResults);
      setLoading(false);
    }, 500);
  }, [query, sortBy]);

  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Hasil Pencarian untuk "{query}"
        </h1>
        <p className="text-gray-600">Ditemukan {results.length} produk</p>
      </div>

      {/* Sort Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex justify-between items-center">
        <p className="text-gray-600">Menampilkan {results.length} hasil</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border-gray-200 rounded-full text-gray-600 text-sm focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="relevance">Paling Relevan</option>
          <option value="price-low">Harga: Rendah ke Tinggi</option>
          <option value="price-high">Harga: Tinggi ke Rendah</option>
          <option value="rating">Rating Tertinggi</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Tidak ada hasil yang ditemukan
          </h2>
          <p className="text-gray-600">
            Coba cari dengan kata kunci lain atau periksa ejaan Anda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-pink-600 font-bold mb-2">
                  {formatPrice(product.price)}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={12}
                        className={
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart size={14} />
                  Add to cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
