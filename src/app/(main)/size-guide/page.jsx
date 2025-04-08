"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const sizeData = {
  pashmina: {
    title: "Panduan Ukuran Hijab Pashmina",
    description:
      "Hijab pashmina kami tersedia dalam beberapa ukuran untuk memenuhi kebutuhan Anda. Pilih ukuran yang sesuai dengan gaya dan kenyamanan Anda.",
    sizes: [
      {
        size: "S",
        length: "175 cm",
        width: "75 cm",
        recommended: "Cocok untuk wajah kecil-sedang",
      },
      {
        size: "M",
        length: "185 cm",
        width: "85 cm",
        recommended: "Cocok untuk wajah sedang",
      },
      {
        size: "L",
        length: "195 cm",
        width: "95 cm",
        recommended: "Cocok untuk wajah sedang-besar",
      },
    ],
    tips: [
      "Ukur panjang dari ujung ke ujung hijab",
      "Lebar diukur pada bagian tengah hijab",
      "Pertimbangkan gaya hijab yang diinginkan",
      "Pilih ukuran yang lebih besar jika ragu",
    ],
  },
  segiEmpat: {
    title: "Panduan Ukuran Hijab Segi Empat",
    description:
      "Hijab segi empat kami dirancang dengan berbagai ukuran untuk memberikan tampilan yang sempurna. Temukan ukuran yang tepat untuk Anda.",
    sizes: [
      {
        size: "S",
        length: "110 cm",
        width: "110 cm",
        recommended: "Cocok untuk wajah kecil",
      },
      {
        size: "M",
        length: "115 cm",
        width: "115 cm",
        recommended: "Cocok untuk wajah sedang",
      },
      {
        size: "L",
        length: "120 cm",
        width: "120 cm",
        recommended: "Cocok untuk wajah besar",
      },
    ],
    tips: [
      "Ukur dari sudut ke sudut diagonal",
      "Pastikan ukuran sisi sama panjang",
      "Perhatikan ketebalan bahan",
      "Sesuaikan dengan gaya yang diinginkan",
    ],
  },
};

export default function SizeGuide() {
  const [activeType, setActiveType] = useState("pashmina");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Panduan Ukuran
      </h1>

      {/* Type Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full bg-gray-100 p-1">
          {Object.keys(sizeData).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeType === type
                  ? "bg-pink-500 text-white"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              {type === "pashmina" ? "Pashmina" : "Segi Empat"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Title and Description */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {sizeData[activeType].title}
            </h2>
            <p className="text-gray-600">{sizeData[activeType].description}</p>
          </div>

          {/* Size Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-pink-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                    Ukuran
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                    Panjang
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                    Lebar
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                    Rekomendasi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sizeData[activeType].sizes.map((size, index) => (
                  <tr
                    key={index}
                    className="hover:bg-pink-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {size.size}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {size.length}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {size.width}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {size.recommended}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tips Memilih Ukuran
            </h3>
            <ul className="space-y-2">
              {sizeData[activeType].tips.map((tip, index) => (
                <li key={index} className="flex items-start text-gray-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center mr-2 mt-0.5 text-sm">
                    {index + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Illustration */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Butuh bantuan mengukur? Hubungi kami melalui WhatsApp
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
        </motion.div>
      </div>
    </div>
  );
}
