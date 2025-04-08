"use client";
import { motion } from "framer-motion";

// Komponen untuk testimonial individual
const TestimonialCard = ({ name, role, image, quote }) => (
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

const Testimonials = () => {
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
    <section className="w-full py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Apa Kata Mereka?
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
            Dengarkan pengalaman pelanggan kami yang telah merasakan kualitas
            produk dan layanan Amberik
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
