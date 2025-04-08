"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [adminName, setAdminName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Cek apakah ada token admin di cookies
    const checkAdmin = () => {
      const adminToken = Cookies.get("admin_token");
      const adminUsername = Cookies.get("username");
      const adminName = Cookies.get("adminName");

      if (adminToken === "true") {
        setIsAdmin(true);
        setUsername(decodeURIComponent(adminUsername || ""));
        setAdminName(decodeURIComponent(adminName || ""));
      }
    };

    checkAdmin();
  }, []);

  const login = (email) => {
    // Set cookie admin dan username dengan expire time
    Cookies.set("admin_token", "true", { expires: 7 }); // Expire dalam 7 hari
    Cookies.set("username", encodeURIComponent(email), { expires: 7 });
    Cookies.set("adminName", encodeURIComponent("Admin Amberik"), {
      expires: 7,
    });

    setIsAdmin(true);
    setUsername(email);
    setAdminName("Admin Amberik");

    // Redirect ke dashboard admin
    router.push("/admin/dashboard");
  };

  const logout = () => {
    // Hapus cookie admin dan username
    Cookies.remove("admin_token");
    Cookies.remove("username");
    Cookies.remove("adminName");

    setIsAdmin(false);
    setUsername("");
    setAdminName("");

    router.push("/");
  };

  return (
    <AdminContext.Provider
      value={{ isAdmin, username, adminName, login, logout }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
