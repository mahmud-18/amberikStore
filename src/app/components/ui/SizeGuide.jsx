"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaRuler } from "react-icons/fa";

const SizeGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeData = {
    pashmina: [
      { size: "Regular", length: "175cm", width: "75cm" },
      { size: "XL", length: "190cm", width: "85cm" },
    ],
    segiEmpat: [
      { size: "S", length: "110cm", width: "110cm" },
      { size: "M", length: "115cm", width: "115cm" },
      { size: "L", length: "120cm", width: "120cm" },
    ],
    instan: [
      { size: "S", length: "Standard", coverage: "Dagu" },
      { size: "M", length: "Medium", coverage: "Dada" },
      { size: "L", length: "Long", coverage: "Perut" },
    ],
  };

  const tips = [
    "Ukur lingkar wajah Anda untuk menentukan ukuran yang tepat",
    "Pertimbangkan gaya dan cara pemakaian yang diinginkan",
    "Perhatikan bahan dan elastisitas kain",
    "Sesuaikan dengan tinggi badan Anda",
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors duration-300"
      >
        <FaRuler />
        <span>Panduan Ukuran</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Panduan Ukuran
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Size Tables */}
              <div className="space-y-8">
                {/* Pashmina */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Pashmina
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-pink-50">
                          <th className="p-3">Ukuran</th>
                          <th className="p-3">Panjang</th>
                          <th className="p-3">Lebar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeData.pashmina.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-3">{item.size}</td>
                            <td className="p-3">{item.length}</td>
                            <td className="p-3">{item.width}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Segi Empat */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Segi Empat
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-pink-50">
                          <th className="p-3">Ukuran</th>
                          <th className="p-3">Panjang</th>
                          <th className="p-3">Lebar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeData.segiEmpat.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-3">{item.size}</td>
                            <td className="p-3">{item.length}</td>
                            <td className="p-3">{item.width}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Tips Memilih Ukuran
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="text-gray-600">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Catatan: Ukuran dapat bervariasi 1-2cm karena proses produksi
                  manual. Jika Anda ragu, silakan hubungi customer service kami.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SizeGuide;
