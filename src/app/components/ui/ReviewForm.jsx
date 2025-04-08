"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCamera, FaTimes } from "react-icons/fa";

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("Maksimal 3 foto yang dapat diunggah");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewImages[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Mohon berikan rating");
      return;
    }
    if (comment.trim() === "") {
      alert("Mohon isi ulasan Anda");
      return;
    }

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    images.forEach((image) => {
      formData.append("images", image);
    });

    onSubmit(formData);

    // Reset form
    setRating(0);
    setComment("");
    setImages([]);
    setPreviewImages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <label className="block text-gray-700 mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl focus:outline-none"
            >
              <FaStar
                className={`${
                  star <= (hoverRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                } transition-colors duration-200`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="comment" className="block text-gray-700 mb-2">
          Ulasan Anda
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          rows="4"
          placeholder="Bagikan pengalaman Anda dengan produk ini..."
        ></textarea>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-gray-700 mb-2">
          Foto Produk (Maksimal 3)
        </label>
        <div className="flex flex-wrap gap-4">
          {previewImages.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-colors duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
              <FaCamera className="text-gray-400 text-2xl" />
            </label>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition-colors duration-300"
      >
        Kirim Ulasan
      </motion.button>
    </form>
  );
}
