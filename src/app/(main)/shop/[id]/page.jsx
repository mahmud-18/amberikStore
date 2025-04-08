"use client";
import { useState, use } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useCart } from "../../../context/CartContext";
import Image from "next/image";
import SizeGuide from "@/app/components/ui/SizeGuide";
import ReviewForm from "@/app/components/ui/ReviewForm";
import ImageZoom from "@/app/components/ui/ImageZoom";

export default function ProductDetail({ params }) {
  const id = use(params).id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Data dummy untuk contoh
  const product = {
    id: id,
    name: "Hijab Pashmina Premium",
    price: 85000,
    description:
      "Hijab pashmina premium dengan bahan yang lembut dan nyaman dipakai. Tersedia dalam berbagai warna yang cantik dan elegan. Cocok untuk acara formal maupun casual.",
    category: "hijab",
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: "Siti Rahma",
        rating: 5,
        comment: "Bahannya sangat lembut dan nyaman dipakai. Suka banget!",
        date: "2024-03-01",
        image: "/images/review1.jpg",
      },
      {
        id: 2,
        user: "Anisa Putri",
        rating: 4,
        comment: "Warnanya cantik, sesuai dengan foto. Pengiriman juga cepat.",
        date: "2024-02-28",
      },
    ],
    images: [
      "/images/hijab.png",
      "/images/hijab.png",
      "/images/hijab.png",
      "/images/hijab.png",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Pink", "Navy", "Cream", "Black"],
    features: [
      "Bahan Premium Cotton",
      "Jahitan Rapi",
      "Tidak Mudah Kusut",
      "Anti Geser",
    ],
    careInstructions: [
      "Cuci dengan air dingin",
      "Jangan gunakan pemutih",
      "Setrika suhu rendah",
      "Jemur di tempat teduh",
    ],
  };

  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Silakan pilih ukuran terlebih dahulu");
      return;
    }
    addToCart({
      ...product,
      quantity,
      selectedSize,
    });
  };

  // Share buttons
  const shareButtons = [
    {
      icon: FaFacebook,
      color: "bg-blue-600",
      label: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
    },
    {
      icon: FaTwitter,
      color: "bg-sky-500",
      label: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(product.name)}`,
    },
    {
      icon: FaWhatsapp,
      color: "bg-green-500",
      label: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(
        `${product.name} - ${window.location.href}`
      )}`,
    },
  ];

  const handleReviewSubmit = (reviewData) => {
    // Implementasi submit review
    console.log("Review submitted:", reviewData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery with Zoom */}
        <div className="space-y-4">
          <ImageZoom
            images={product.images}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews.length} ulasan)
              </span>
            </div>
            <p className="text-2xl font-bold text-pink-600">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">Ukuran</h3>
                <SizeGuide />
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full ${
                      selectedSize === size
                        ? "bg-pink-500 text-white"
                        : "bg-white text-gray-600 hover:bg-pink-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Warna</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 bg-white rounded-full text-sm text-gray-600"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Jumlah</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-white rounded-full text-gray-600 hover:bg-pink-50"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-white rounded-full text-gray-600 hover:bg-pink-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 bg-pink-500 text-white py-3 md:py-1 px-2 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <FaShoppingCart size={18} />
              Add to cart
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <button className="p-3 bg-white rounded-full text-gray-600 hover:bg-pink-50">
                <FaShare size={18} />
              </button>
              <div className="absolute right-0 mt-2 hidden group-hover:block">
                <div className="bg-white rounded-xl shadow-lg p-2 space-y-2">
                  {shareButtons.map((btn, index) => (
                    <a
                      key={index}
                      href={btn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-white ${btn.color}`}
                    >
                      <btn.icon size={14} />
                      <span className="text-sm">{btn.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4 pt-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Deskripsi</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Fitur</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Cara Perawatan
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.careInstructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Ulasan Produk</h2>

        {/* Existing Reviews */}
        <div className="mb-8">
          {product.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-md p-6 mb-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-gray-800">{review.user}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        size={14}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              {review.image && (
                <div className="mt-4">
                  <Image
                    src={review.image}
                    alt="Review image"
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Tambah Ulasan
          </h3>
          <ReviewForm
            productId={id}
            onSubmit={handleReviewSubmit}
            maxImageSize={2048000}
          />
        </div>
      </div>
    </div>
  );
}
