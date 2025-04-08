"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Produk",
      links: [
        { name: "Hijab Pashmina", href: "/shop/hijab-pashmina" },
        { name: "Hijab Segi Empat", href: "/shop/hijab-segiempat" },
        { name: "Hijab Instan", href: "/shop/hijab-instan" },
        { name: "Makanan", href: "/shop/makanan" },
      ],
    },
    {
      title: "Informasi",
      links: [
        { name: "Tentang Kami", href: "/about" },
        { name: "Cara Pemesanan", href: "/how-to-order" },
        { name: "Tutorial Hijab", href: "/tutorial" },
      ],
    },
    {
      title: "Bantuan",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Kontak Kami", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-pink-100 mt-16">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" aria-label="Amberik - Kembali ke beranda">
              <Image
                src="/images/Amberik.svg"
                alt="Amberik Logo"
                width={120}
                height={120}
                className="mb-3"
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Amberik menyediakan berbagai pilihan hijab berkualitas dan makanan
              lezat untuk memenuhi kebutuhan Anda.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a
                href="https://instagram.com/amberik"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#E1306C" }}
                className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                aria-label="Instagram Amberik"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#25D366" }}
                className="text-gray-500 hover:text-green-500 transition-colors duration-300"
                aria-label="WhatsApp Amberik"
              >
                <FaWhatsapp size={20} />
              </motion.a>
              <motion.a
                href="https://tiktok.com/@amberik"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#000000" }}
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
                aria-label="TikTok Amberik"
              >
                <FaTiktok size={18} />
              </motion.a>
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((column, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-gray-800 font-semibold text-lg">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-pink-500 transition-colors duration-300 text-sm inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div className="space-y-4" id="kontak">
            <h3 className="text-gray-800 font-semibold text-lg">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-pink-500 mt-1 flex-shrink-0" />
                <span>
                  Jl. Contoh No. 123, Kota Bandung, Jawa Barat, Indonesia
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <FaEnvelope className="text-pink-500 flex-shrink-0" />
                <a
                  href="mailto:info@amberik.com"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  info@amberik.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <FaPhone className="text-pink-500 flex-shrink-0" />
                <a
                  href="tel:+6281234567890"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Rabs Store. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
