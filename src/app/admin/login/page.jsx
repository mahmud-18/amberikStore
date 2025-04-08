"use client";

import { useState } from "react";
import { useAdmin } from "@/app/context/AdminContext";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/lib/validations/auth";
import Image from "next/image";
import Link from "next/link";

const AdminLoginPage = () => {
  const { login } = useAdmin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validasi input
      const validatedData = loginSchema.parse(formData);

      // Cek kredensial admin (contoh sederhana)
      if (
        validatedData.email === "admin@amberik.com" &&
        validatedData.password === "admin123"
      ) {
        login(validatedData.email);
        const from = searchParams.get("from") || "/admin/dashboard";
        router.push(from);
      } else {
        setError("Email atau password salah");
      }
    } catch (err) {
      setError(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <div>
          <Link
            href="/"
            className="flex justify-center transform hover:scale-105 transition-transform duration-300"
          >
            <Image
              src="/images/Amberik.svg"
              alt="Amberik Logo"
              width={120}
              height={120}
              className="mb-3 drop-shadow-lg"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
            Login Admin
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-t-xl relative block w-full px-4 py-3 border border-pink-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-b-xl relative block w-full px-4 py-3 border border-pink-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
