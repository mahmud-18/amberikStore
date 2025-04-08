"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaUser,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { useAdmin } from "../../context/AdminContext";

const Navbar = () => {
  const [mobMenu, setMobMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const { getCartTotal, cartItems, generateWhatsAppMessage } = useCart();
  const router = useRouter();
  const { isAdmin, logout, adminName } = useAdmin();

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Produk", href: "/shop" },
    { name: "Tentang", href: "/about" },
    { name: "Kontak", href: "#kontak" },
    { name: "Tutorial", href: "/tutorial" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang belanja Anda masih kosong");
      return;
    }
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/6281564964988?text=${message}`, "_blank");
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const footer = document.querySelector("#kontak");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    logout();
    setMobMenu(false);
  };

  return (
    <div className="flex flex-col shadow-md">
      {/* Top bar dengan login dan sosial media */}
      <header className="px-4 py-2 flex bg-white justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-1.5 text-sm text-pink-500 transition-all duration-300 ease-in-out hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-full px-3 py-1"
          aria-label={isAdmin ? "Keluar dari akun" : "Login ke akun"}
          onClick={() =>
            isAdmin ? handleLogout() : (window.location.href = "/admin/login")
          }
        >
          <span>{isAdmin ? adminName : "Masuk"}</span>
          <FaUser
            size={15}
            className="text-pink-500 transition-all duration-300 ease-in-out"
          />
        </motion.button>

        <Link href="/" aria-label="Amberik - Kembali ke beranda">
          <Image
            src="/images/Amberik.svg"
            alt="Amberik Logo"
            width={95}
            height={95}
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Search button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-pink-500 hover:text-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-full p-1"
            aria-label="Cari produk"
          >
            <FaSearch size={18} />
          </motion.button>

          {/* Cart button with counter */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/cart")}
            className="text-pink-500 hover:text-pink-600 transition-colors duration-300 relative focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-full p-1"
            aria-label={`Keranjang belanja, ${getCartTotal()} item`}
          >
            <FaShoppingCart size={18} />
            {getCartTotal() > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartTotal()}
              </span>
            )}
          </motion.button>

          {/* Social media icons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="https://instagram.com/amberik"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-pink-500 hover:text-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-full p-1"
              aria-label="Kunjungi Instagram kami"
            >
              <FaInstagram size={18} />
            </motion.a>
            <motion.a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-green-500 hover:text-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full p-1"
              aria-label="Hubungi kami via WhatsApp"
            >
              <FaWhatsapp size={18} />
            </motion.a>
          </div>
        </div>
      </header>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-gray-100 px-4 py-3"
          >
            <div className="max-w-3xl mx-auto relative">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                autoFocus
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main navigation */}
      <nav className="bg-pink-500 p-0 relative h-14 md:h-auto">
        <div className="flex items-center justify-center h-full">
          <ul className="hidden md:flex space-x-8 py-4">
            {navigation.map((link, index) => (
              <motion.li
                key={index}
                onHoverStart={() => setHoveredLink(link.href)}
                onHoverEnd={() => setHoveredLink(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href={link.href}
                  onClick={link.isScroll ? scrollToContact : undefined}
                  className={`relative text-white font-medium text-sm cursor-pointer transition-colors duration-300 hover:text-pink-100 focus:outline-none focus:text-pink-100 ${
                    activeLink === link.href ? "font-semibold" : ""
                  }`}
                  aria-current={activeLink === link.href ? "page" : undefined}
                >
                  <span className="relative z-10 px-1 py-2">
                    {link.name}
                    {(hoveredLink === link.href ||
                      activeLink === link.href) && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>
                </Link>
              </motion.li>
            ))}
            {isAdmin && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href="/admin/dashboard"
                  className={`relative text-white font-medium text-sm cursor-pointer transition-colors duration-300 hover:text-pink-100 focus:outline-none focus:text-pink-100 ${
                    activeLink === "/admin/dashboard" ? "font-semibold" : ""
                  }`}
                  aria-current={
                    activeLink === "/admin/dashboard" ? "page" : undefined
                  }
                >
                  <span className="relative z-10 px-1 py-2">
                    Dashboard
                    {(hoveredLink === "/admin/dashboard" ||
                      activeLink === "/admin/dashboard") && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>
                </Link>
              </motion.li>
            )}
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobMenu(!mobMenu)}
            className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500 rounded-full absolute right-4 top-1/2 transform -translate-y-1/2"
            aria-expanded={mobMenu}
            aria-label="Menu navigasi"
          >
            <CiMenuFries size={24} />
          </motion.button>
        </div>

        <AnimatePresence>
          {mobMenu && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg rounded-b-lg overflow-hidden absolute top-full left-0 right-0 z-50"
            >
              <ul className="divide-y divide-gray-100">
                {navigation.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className=""
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobMenu(false)}
                      className={`block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition duration-300 ${
                        activeLink === link.href
                          ? "bg-pink-50 text-pink-600 font-medium"
                          : ""
                      }`}
                      aria-current={
                        activeLink === link.href ? "page" : undefined
                      }
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                {isAdmin && (
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: navigation.length * 0.1,
                    }}
                    className=""
                  >
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setMobMenu(false)}
                      className={`block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition duration-300 ${
                        activeLink === "/admin/dashboard"
                          ? "bg-pink-50 text-pink-600 font-medium"
                          : ""
                      }`}
                      aria-current={
                        activeLink === "/admin/dashboard" ? "page" : undefined
                      }
                    >
                      Dashboard
                    </Link>
                  </motion.li>
                )}
                <li className="p-4 flex justify-center space-x-6">
                  <motion.a
                    href="https://instagram.com/amberik"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-pink-500"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={20} />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-green-500"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </motion.a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
