"use client";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { FaTrash, FaWhatsapp, FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    generateWhatsAppMessage,
    getTotalPrice,
  } = useCart();

  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang belanja Anda masih kosong");
      return;
    }
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/6281564964988?text=${message}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Keranjang Belanja
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">
            Keranjang belanja Anda masih kosong
          </p>
          <Link
            href="/"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daftar Item */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0 w-24 h-24">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-pink-600 font-bold mt-1">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-gray-500 hover:text-pink-600 p-1"
                            aria-label="Kurangi jumlah"
                          >
                            <FaMinus size={12} />
                          </motion.button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-gray-500 hover:text-pink-600 p-1"
                            aria-label="Tambah jumlah"
                          >
                            <FaPlus size={12} />
                          </motion.button>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 p-2"
                      aria-label={`Hapus ${item.name} dari keranjang`}
                    >
                      <FaTrash size={18} />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ringkasan Belanja */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Ringkasan Belanja
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total Item:</span>
                  <span>{cartItems.length} item</span>
                </div>
                <div className="flex justify-between font-semibold text-lg text-gray-800">
                  <span>Total Harga:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <FaWhatsapp size={20} />
                <span>Checkout via WhatsApp</span>
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
