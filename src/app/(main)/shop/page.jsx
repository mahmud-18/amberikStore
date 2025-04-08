"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaFilter,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import ProductFilter from "@/app/components/ui/ProductFilter";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Shop() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    rating: "all",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const productsPerPage = 8;
  const { addToCart } = useCart();

  // Data dummy untuk contoh
  useEffect(() => {
    const dummyProducts = [
      {
        id: 1,
        name: "Hijab Pashmina Premium",
        price: 85000,
        category: "hijab",
        rating: 4.8,
        reviews: 124,
        image: "/images/hijab.png",
        description: "Hijab pashmina dengan bahan premium yang nyaman dipakai",
        createdAt: "2024-03-10",
      },
      {
        id: 2,
        name: "Hijab Segi Empat Basic",
        price: 45000,
        category: "hijab",
        rating: 4.5,
        reviews: 89,
        image: "/images/hijab.png",
        description: "Hijab segi empat untuk penggunaan sehari-hari",
        createdAt: "2024-03-09",
      },
      {
        id: 3,
        name: "Roti Maryam Original",
        price: 15000,
        category: "makanan",
        rating: 4.9,
        reviews: 200,
        image: "/images/maryam.jpg",
        description: "Roti maryam original dengan tekstur berlapis",
        createdAt: "2024-03-11",
      },
      {
        id: 4,
        name: "Roti Maryam Keju",
        price: 20000,
        category: "makanan",
        rating: 4.7,
        reviews: 150,
        image: "/images/maryam.jpg",
        description: "Roti maryam dengan taburan keju spesial",
        createdAt: "2024-03-10",
      },
      {
        id: 5,
        name: "Hijab Instan Basic",
        price: 55000,
        category: "hijab",
        rating: 4.6,
        reviews: 75,
        image: "/images/hijab.png",
        description: "Hijab instan praktis untuk aktivitas sehari-hari",
        createdAt: "2024-03-08",
      },
    ];
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  }, []);

  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Filter products
  const filterProducts = () => {
    let result = [...products];

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Filter by price range
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Filter by rating
    if (filters.rating !== "all") {
      result = result.filter(
        (product) => product.rating >= Number(filters.rating)
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredProducts(result);
  };

  useEffect(() => {
    filterProducts();
  }, [filters, sortBy, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleProductClick = (productId) => {
    router.push(`/shop/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Koleksi Kami</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden bg-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
        >
          <FaFilter />
          Filter
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Section */}
        <div className="lg:w-1/4">
          <ProductFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {/* Sort Bar */}
          <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Menampilkan {currentProducts.length} dari{" "}
              {filteredProducts.length} produk
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-gray-200 rounded-full text-gray-600 text-sm focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="newest">Terbaru</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                  >
                    {favorites.includes(product.id) ? (
                      <FaHeart className="text-pink-500" size={16} />
                    ) : (
                      <FaRegHeart className="text-gray-400" size={16} />
                    )}
                  </button>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-full bg-pink-500 text-white py-2 md:py-1 px-2 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart size={14} />
                    Add to cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === i + 1
                      ? "bg-pink-500 text-white"
                      : "bg-white text-gray-600 hover:bg-pink-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
