"use client";
import React, { useState, useEffect } from "react";
import Hero from "../components/ui/Hero";
import Menu from "../components/ui/Menu";
import Testimonials from "../components/ui/Testimonials";
import CTA from "../components/ui/CTA";
import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaRegCreditCard,
  FaHeadset,
  FaGift,
} from "react-icons/fa";

// Komponen untuk bagian Testimonial
const Testimonial = ({ name, role, image, quote }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-md"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-4">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-pink-200"
      />
      <div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 italic">"{quote}"</p>
  </motion.div>
);

// Komponen untuk bagian Feature
const Feature = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-pink-100 p-4 rounded-full mb-4 text-pink-500">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Data testimonial
  const testimonials = [
    {
      name: "Siti Rahma",
      role: "Pelanggan Setia",
      image: "/images/hijab.png",
      quote:
        "Hijab dari Amberik sangat nyaman dipakai dan bahannya premium. Saya sudah berlangganan selama 2 tahun dan tidak pernah kecewa!",
    },
    {
      name: "Anisa Putri",
      role: "Beauty Influencer",
      image: "/images/hijab.png",
      quote:
        "Sebagai influencer, saya sangat memperhatikan kualitas produk yang saya rekomendasikan. Amberik adalah pilihan terbaik untuk hijab berkualitas.",
    },
    {
      name: "Dian Sastro",
      role: "Ibu Rumah Tangga",
      image: "/images/maryam.jpg",
      quote:
        "Roti Maryam dari Amberik adalah favorit keluarga kami. Rasanya lezat dan teksturnya sempurna. Anak-anak selalu minta tambah!",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Mengapa Memilih Kami?
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-pink-500 mx-auto rounded-full mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Amberik hadir untuk memberikan pengalaman berbelanja terbaik
              dengan produk berkualitas dan layanan prima
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature
              icon={<FaShippingFast size={24} />}
              title="Pengiriman Cepat"
              description="Kami mengirimkan pesanan Anda dengan cepat ke seluruh Indonesia dengan layanan pengiriman terpercaya."
            />
            <Feature
              icon={<FaRegCreditCard size={24} />}
              title="Pembayaran Aman"
              description="Berbagai metode pembayaran yang aman dan terpercaya untuk kenyamanan Anda berbelanja."
            />
            <Feature
              icon={<FaHeadset size={24} />}
              title="Layanan Pelanggan"
              description="Tim layanan pelanggan kami siap membantu Anda dengan pertanyaan dan kebutuhan Anda."
            />
            <Feature
              icon={<FaGift size={24} />}
              title="Program Loyalitas"
              description="Dapatkan reward dan diskon spesial untuk pelanggan setia Amberik."
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <Menu />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
