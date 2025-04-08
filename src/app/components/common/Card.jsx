"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Card = ({ cards }) => {
  return (
    <Swiper
    slidesPerView={'auto'}
    centeredSlides={true}
    spaceBetween={20}
    className="bg-red-200  "
  >
      {cards.map((card, index) => (
        <SwiperSlide key={index} className="w-64 transition-all duration-500">
          <div className="w-64 h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
            {/* Gambar Produk */}
            <div className="w-full h-48 bg-gray-200">
              <img
                src={card.image || "https://via.placeholder.com/150"}
                alt={card.label}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Detail Produk */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {card.label}
              </h3>
              <p className="text-pink-500 font-bold mt-1">
                Rp {card.price || "-"}
              </p>
            </div>
            {/* Tombol Beli */}
            <div className="p-4">
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-medium transition-all">
                Beli Sekarang
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Card;
