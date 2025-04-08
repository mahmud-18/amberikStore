"use client";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-pink-400 rounded-2xl p-10 text-center text-white shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white opacity-10"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white opacity-10"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bergabunglah dengan Keluarga Amberik
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Dapatkan diskon 10% untuk pembelian pertama Anda dan ikuti
              perkembangan terbaru dari Amberik
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="/shop"
                className="bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-pink-100 transition-colors duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Belanja Sekarang
              </motion.a>
              <motion.a
                href="/contact"
                className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hubungi Kami
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
