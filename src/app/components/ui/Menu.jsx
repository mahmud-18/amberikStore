import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

// Komponen untuk memilih kategori
const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { addToCart } = useCart();

  // Efek untuk membuat animasi latar belakang
  useEffect(() => {
    // Generate posisi random hanya di client-side dengan jumlah yang lebih sedikit untuk performa
    setShapes(
      [...Array(4)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 10 + Math.random() * 15, // Ukuran yang bervariasi
        duration: 8 + Math.random() * 4, // Random durasi animasi
        delay: Math.random() * 2, // Random delay
      }))
    );
  }, []);

  // Data kategori dengan standarisasi warna
  const categories = [
    {
      id: "hijab",
      name: "Kerudung",
      gradient: "from-pink-300 to-pink-500",
      illustration: "/images/hijab.png",
      description: "Tampil cantik dan syar'i dengan koleksi hijab premium kami",
      pattern: "bg-gradient-to-br from-pink-50 to-pink-100 opacity-20",
      items: [
        {
          id: 1,
          name: "Hijab Pashmina",
          price: 85000,
          image: "/images/hijab.png",
          rating: 4.8,
          reviews: 124,
        },
        {
          id: 2,
          name: "Hijab Segi Empat",
          price: 75000,
          image: "/images/hijab.png",
          rating: 4.7,
          reviews: 98,
        },
        {
          id: 3,
          name: "Hijab Instan",
          price: 65000,
          image: "/images/hijab.png",
          rating: 4.5,
          reviews: 76,
        },
        {
          id: 4,
          name: "Hijab Paris",
          price: 55000,
          image: "/images/hijab.png",
          rating: 4.6,
          reviews: 112,
        },
      ],
    },
    {
      id: "food",
      name: "Makanan",
      gradient: "from-orange-300 to-orange-500",
      illustration: "/images/maryam.jpg",
      description: "Kelezatan dalam setiap gigitan dengan resep istimewa",
      pattern: "bg-gradient-to-br from-orange-50 to-orange-100 opacity-20",
      items: [
        {
          id: 1,
          name: "Roti Maryam",
          price: 25000,
          image: "/images/maryam.jpg",
          rating: 4.9,
          reviews: 156,
        },
        {
          id: 2,
          name: "Kue Basah",
          price: 20000,
          image: "/images/maryam.jpg",
          rating: 4.6,
          reviews: 87,
        },
        {
          id: 3,
          name: "Brownies",
          price: 35000,
          image: "/images/maryam.jpg",
          rating: 4.8,
          reviews: 134,
        },
        {
          id: 4,
          name: "Cookies",
          price: 30000,
          image: "/images/maryam.jpg",
          rating: 4.7,
          reviews: 92,
        },
      ],
    },
  ];

  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handler untuk memilih kategori
  const handleCategorySelect = (categoryId) => {
    setIsLoading(true);
    // Simulasi loading
    setTimeout(() => {
      setSelectedCategory(categoryId);
      setIsLoading(false);
    }, 300);
  };

  // Handler untuk kembali ke daftar kategori
  const handleBackToCategories = () => {
    setIsLoading(false); // Pastikan tidak dalam loading state
    setSelectedCategory(null);
  };

  // Mendapatkan data kategori yang dipilih
  const selectedCategoryData = selectedCategory
    ? categories.find((cat) => cat.id === selectedCategory)
    : null;

  const handleAddToCart = (item) => {
    addToCart(item);
    // Tambahkan feedback visual
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    toast.textContent = `${item.name} ditambahkan ke keranjang`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  };

  return (
    <section
      className="min-h-screen relative bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-center py-16 px-4 sm:p-6 -mt-16 w-screen"
      id="menu"
    >
      {/* Animasi latar belakang */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: `${shape.size}rem`,
              height: `${shape.size}rem`,
              top: shape.top,
              left: shape.left,
              background:
                "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.05))",
              backdropFilter: "blur(8px)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.5, 0.3],
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="mt-14 w-full text-center relative z-10 mb-10">
        <h2 className="text-sm font-semibold text-pink-600 uppercase tracking-wider mb-2">
          Pilihan Kami
        </h2>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          {selectedCategory ? selectedCategoryData.name : "Kategori Produk"}
        </h1>
        <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {selectedCategory
            ? selectedCategoryData.description
            : "Pilih kategori produk favorit Anda dan temukan berbagai pilihan menarik yang kami sediakan khusus untuk Anda"}
        </p>
      </header>

      {/* Konten utama */}
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          // Tampilan kategori
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row justify-center mt-6 space-y-6 sm:space-y-0 sm:space-x-8 w-full max-w-5xl z-10"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`
                  relative w-full sm:w-80 h-[550px] rounded-3xl shadow-xl overflow-hidden cursor-pointer
                  bg-gradient-to-br ${category.gradient} transform transition-all duration-300
                  hover:shadow-2xl focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-pink-300
                `}
                whileTap={{ scale: 0.98 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                tabIndex={0}
                role="button"
                aria-label={`Pilih kategori ${category.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCategorySelect(category.id);
                    e.preventDefault();
                  }
                }}
              >
                {/* Pattern Background */}
                <div
                  className={`absolute top-0 left-0 w-full h-full ${category.pattern} mix-blend-overlay`}
                ></div>

                {/* Subtle Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

                {/* Card Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Icon and Title */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-white  drop-shadow-sm">
                      {category.name}
                    </h2>
                  </div>

                  {/* Illustration */}
                  <div className="flex-grow flex items-center justify-center mb-4">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      className="relative"
                    >
                      <img
                        src={category.illustration}
                        alt={category.name}
                        className="w-48 sm:w-56 h-48 sm:h-56 object-cover rounded-full border-4 border-white shadow-lg"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-white opacity-0"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <div className="text-center">
                    <p className="text-white text-lg font-medium mb-4 drop-shadow-sm">
                      {category.description}
                    </p>
                    <motion.div
                      className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-white font-bold">Lihat Produk</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Tampilan produk dalam kategori
          <motion.div
            key="selected-category"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-6xl mt-4 z-10"
          >
            {/* Back Button */}
            <motion.button
              onClick={handleBackToCategories}
              className="mb-8 px-5 py-2.5 bg-white text-pink-600 border border-pink-200 rounded-full flex items-center gap-2 hover:bg-pink-50 transition-colors duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              whileHover={{ scale: 1.03, x: -3 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Kembali ke daftar kategori"
            >
              <FaArrowLeft size={14} />
              <span>Kembali ke Kategori</span>
            </motion.button>

            {/* Loading Indicator */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <motion.div
                  className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {selectedCategoryData.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item.id * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
                    whileHover={{ y: -5 }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                        style={{
                          transform:
                            hoveredItem === item.id ? "scale(1.1)" : "scale(1)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-medium">
                            {item.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mb-3">
                        {item.reviews} ulasan
                      </p>

                      <div className="flex justify-between items-center">
                        <p className="text-pink-600 font-bold">
                          {formatPrice(item.price)}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Tambahkan ${item.name} ke keranjang`}
                        >
                          <FaShoppingCart size={14} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CategorySelection;
