"use client";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaTrash } from "react-icons/fa";
import Link from "next/link";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

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
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Wishlist Saya</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">Wishlist Anda masih kosong</p>
          <Link
            href="/shop"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600 transition-colors duration-300"
                  aria-label="Hapus dari wishlist"
                >
                  <FaTrash size={16} />
                </button>
              </div>
              <div className="p-4">
                <Link href={`/shop/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 mb-1 hover:text-pink-500 transition-colors duration-300">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-pink-600 font-bold mb-2">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={12}
                        className={
                          i < Math.floor(item.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({item.reviews})
                  </span>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart size={14} />
                  Tambah ke Keranjang
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
