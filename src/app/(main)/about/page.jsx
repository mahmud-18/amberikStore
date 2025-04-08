"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaAward, FaUsers, FaStore } from "react-icons/fa";

export default function About() {
  const stats = [
    {
      icon: <FaStore className="text-3xl text-pink-500" />,
      value: "2020",
      label: "Tahun Berdiri",
    },
    {
      icon: <FaUsers className="text-3xl text-pink-500" />,
      value: "10,000+",
      label: "Pelanggan Setia",
    },
    {
      icon: <FaHeart className="text-3xl text-pink-500" />,
      value: "98%",
      label: "Tingkat Kepuasan",
    },
    {
      icon: <FaAward className="text-3xl text-pink-500" />,
      value: "50+",
      label: "Penghargaan",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Wijaya",
      role: "Founder & CEO",
      image: "/images/team/sarah.jpg",
      quote:
        "Kami berkomitmen untuk memberikan produk terbaik dengan kualitas premium.",
    },
    {
      name: "Ahmad Fadli",
      role: "Creative Director",
      image: "/images/team/ahmad.jpg",
      quote: "Desain dan kenyamanan adalah prioritas utama kami.",
    },
    // Tambahkan anggota tim lainnya jika diperlukan
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/90 to-pink-600/90 z-10" />
        <Image
          src="/images/about-hero.jpg"
          alt="About Amberik"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Tentang Amberik
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            Mewujudkan Keanggunan dalam Setiap Detail
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Kisah Kami
            </h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 leading-relaxed">
              Amberik didirikan pada tahun 2020 dengan visi sederhana namun
              kuat: menyediakan hijab berkualitas premium dan makanan lezat yang
              memenuhi standar tertinggi. Kami percaya bahwa setiap wanita
              berhak tampil cantik dan anggun, serta menikmati makanan yang
              lezat dan berkualitas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nilai-Nilai Kami
            </h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-6 bg-white rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Kualitas
              </h3>
              <p className="text-gray-600">
                Kami berkomitmen untuk menghadirkan produk dengan kualitas
                terbaik tanpa kompromi.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 bg-white rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Inovasi
              </h3>
              <p className="text-gray-600">
                Terus berinovasi dalam desain dan layanan untuk memberikan
                pengalaman terbaik.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 bg-white rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Kepuasan
              </h3>
              <p className="text-gray-600">
                Kepuasan pelanggan adalah prioritas utama dalam setiap aspek
                layanan kami.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tim Kami</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 relative h-60 md:h-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-pink-500 mb-4">{member.role}</p>
                  <p className="text-gray-600 italic">"{member.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
