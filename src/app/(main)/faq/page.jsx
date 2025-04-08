"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-semibold text-gray-800">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-gray-500" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqData = {
  pembelian: [
    {
      question: "Bagaimana cara melakukan pemesanan?",
      answer:
        "Anda dapat melakukan pemesanan dengan memilih produk yang diinginkan, menambahkannya ke keranjang, dan melakukan checkout melalui WhatsApp. Tim kami akan segera memproses pesanan Anda.",
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI) dan e-wallet (GoPay, OVO, DANA).",
    },
    {
      question: "Berapa lama proses pengiriman?",
      answer:
        "Proses pengiriman biasanya memakan waktu 2-3 hari kerja untuk wilayah Jabodetabek dan 3-7 hari kerja untuk wilayah lainnya.",
    },
  ],
  produk: [
    {
      question: "Apakah produk dijamin original?",
      answer:
        "Ya, semua produk yang kami jual adalah produk original dengan kualitas terbaik dan telah melalui quality control yang ketat.",
    },
    {
      question: "Bagaimana cara merawat hijab agar tetap awet?",
      answer:
        "Cuci hijab dengan air dingin, hindari pemutih, setrika dengan suhu rendah, dan simpan di tempat yang kering dan bersih.",
    },
  ],
  pengembalian: [
    {
      question: "Apa kebijakan pengembalian produk?",
      answer:
        "Kami menerima pengembalian produk dalam waktu 3 hari setelah penerimaan jika terdapat cacat produksi atau kesalahan pengiriman.",
    },
    {
      question: "Bagaimana proses refund?",
      answer:
        "Proses refund akan dilakukan setelah produk diterima kembali dan diperiksa oleh tim kami. Refund akan ditransfer dalam waktu 3-5 hari kerja.",
    },
  ],
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("pembelian");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Frequently Asked Questions
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full bg-gray-100 p-1">
          {Object.keys(faqData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === category
                  ? "bg-pink-500 text-white"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {faqData[activeCategory].map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Masih punya pertanyaan? Hubungi kami
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-300"
        >
          Chat WhatsApp
        </a>
      </div>
    </div>
  );
}
