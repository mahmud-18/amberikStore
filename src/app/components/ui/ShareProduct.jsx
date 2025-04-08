import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShareAlt,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

const ShareProduct = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Lihat ${product.name} di Amberik Store!`;

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-green-500" size={20} />,
      url: `https://wa.me/?text=${encodeURIComponent(
        shareText + "\n" + shareUrl
      )}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600" size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-blue-400" size={20} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="text-blue-500" size={20} />,
      url: `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  const handleShare = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors duration-300"
      >
        <FaShareAlt />
        <span>Bagikan</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-full mb-2 right-0 bg-white rounded-xl shadow-lg p-4 w-64 z-50"
          >
            <h3 className="font-medium text-gray-800 mb-3">
              Bagikan ke Media Sosial
            </h3>
            <div className="space-y-2">
              {shareLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleShare(link.url)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                >
                  {link.icon}
                  <span className="text-sm text-gray-600">{link.name}</span>
                </button>
              ))}
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-300"
              >
                {copied ? (
                  <FaCheck className="text-green-500" size={20} />
                ) : (
                  <FaCopy className="text-gray-400" size={20} />
                )}
                <span className="text-sm text-gray-600">
                  {copied ? "Tersalin!" : "Salin Link"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareProduct;
