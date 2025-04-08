import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    category: "Produk",
    items: [
      {
        question: "Apakah bahan hijab aman untuk kulit sensitif?",
        answer:
          "Ya, kami menggunakan bahan berkualitas tinggi yang aman untuk semua jenis kulit. Bahan-bahan kami telah melalui proses pengujian dan sertifikasi keamanan.",
      },
      {
        question: "Bagaimana cara merawat hijab agar tetap awet?",
        answer:
          "Cuci dengan air dingin, hindari pemutih, jemur di tempat teduh, dan simpan dengan rapi setelah disetrika dengan suhu rendah sampai sedang.",
      },
    ],
  },
  {
    category: "Pemesanan",
    items: [
      {
        question: "Berapa lama waktu pengiriman?",
        answer:
          "Waktu pengiriman tergantung lokasi Anda, biasanya 2-5 hari kerja untuk wilayah Jawa dan 5-7 hari kerja untuk luar Jawa.",
      },
      {
        question: "Apakah bisa melakukan pengembalian barang?",
        answer:
          "Ya, Anda dapat melakukan pengembalian dalam waktu 7 hari setelah barang diterima jika terdapat cacat produksi.",
      },
    ],
  },
  {
    category: "Pembayaran",
    items: [
      {
        question: "Metode pembayaran apa saja yang tersedia?",
        answer:
          "Kami menerima pembayaran melalui transfer bank, e-wallet (OVO, GoPay, DANA), dan kartu kredit.",
      },
      {
        question: "Apakah ada biaya tambahan untuk pembayaran?",
        answer:
          "Tidak ada biaya tambahan untuk semua metode pembayaran kecuali kartu kredit yang dikenakan biaya administrasi 2.5%.",
      },
    ],
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [expandedCategories, setExpandedCategories] = useState(
    faqData.reduce((acc, category) => {
      acc[category.category] = true;
      return acc;
    }, {})
  );

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleItem = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Pertanyaan yang Sering Diajukan
      </h2>

      {/* Search */}
      <div className="relative mb-8">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari pertanyaan..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-6">
        {filteredFAQ.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleCategory(category.category)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <h3 className="font-semibold text-gray-800">
                {category.category}
              </h3>
              <motion.div
                animate={{
                  rotate: expandedCategories[category.category] ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedCategories[category.category] && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="divide-y">
                    {category.items.map((item, itemIndex) => {
                      const key = `${categoryIndex}-${itemIndex}`;
                      return (
                        <div key={itemIndex}>
                          <button
                            onClick={() => toggleItem(categoryIndex, itemIndex)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-300"
                          >
                            <p className="text-left text-gray-700">
                              {item.question}
                            </p>
                            <motion.div
                              animate={{
                                rotate: expandedItems[key] ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <FaChevronDown className="text-gray-400" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedItems[key] && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="p-4 bg-gray-50 text-gray-600">
                                  {item.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {filteredFAQ.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Tidak ada pertanyaan yang sesuai dengan pencarian Anda.
        </div>
      )}
    </div>
  );
};

export default FAQ;
