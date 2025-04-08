"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleLogout = () => {
    // Implementasi logout
    router.push("/admin/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaChartBar },
    { id: "products", label: "Produk", icon: FaBox },
    { id: "orders", label: "Pesanan", icon: FaShoppingCart },
    { id: "customers", label: "Pelanggan", icon: FaUsers },
    { id: "settings", label: "Pengaturan", icon: FaCog },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeMenu === item.id
                    ? "bg-pink-50 text-pink-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="mr-3" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Back to Home Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                <FaHome size={16} />
                <span>Kembali ke Beranda</span>
              </motion.button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-pink-50 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Penjualan</p>
                  <p className="text-2xl font-bold text-gray-800">Rp 15.2M</p>
                </div>
                <div className="bg-pink-100 p-3 rounded-full">
                  <FaChartBar className="text-pink-500" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pesanan</p>
                  <p className="text-2xl font-bold text-gray-800">1,234</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaShoppingCart className="text-blue-500" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Produk</p>
                  <p className="text-2xl font-bold text-gray-800">89</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaBox className="text-green-500" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pelanggan</p>
                  <p className="text-2xl font-bold text-gray-800">456</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaUsers className="text-purple-500" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pesanan Terbaru
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Pesanan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pelanggan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((order) => (
                    <tr key={order}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #ORD-{order.toString().padStart(4, "0")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Pelanggan {order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rp {(order * 100000).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Selesai
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date().toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
