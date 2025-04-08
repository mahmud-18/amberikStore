"use client";
import { useState, useEffect } from "react";
import TutorialSection from "@/app/components/ui/TutorialSection";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topBuyProducts, setTopBuyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [featuredResponse, topBuyResponse] = await Promise.all([
        fetch("/api/products?featured=true"),
        fetch("/api/products?topBuy=true"),
      ]);

      if (!featuredResponse.ok || !topBuyResponse.ok) {
        throw new Error("Gagal mengambil data produk");
      }

      const [featuredData, topBuyData] = await Promise.all([
        featuredResponse.json(),
        topBuyResponse.json(),
      ]);

      setFeaturedProducts(featuredData);
      setTopBuyProducts(topBuyData);
    } catch (err) {
      console.error("Error fetching products:", err);
      // Tidak perlu menampilkan error ke user
      setFeaturedProducts([]);
      setTopBuyProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Selamat Datang di Toko Amberik
          </h1>
          <p className="text-xl mb-8">
            Temukan produk berkualitas dengan harga terbaik
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Lihat Produk
          </button>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Produk Unggulan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => {
                          // Implementasi keranjang belanja akan ditambahkan nanti
                          alert("Fitur keranjang belanja akan segera hadir!");
                        }}
                      >
                        Beli
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Buy Products */}
      {topBuyProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Produk Terlaris
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topBuyProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => {
                          // Implementasi keranjang belanja akan ditambahkan nanti
                          alert("Fitur keranjang belanja akan segera hadir!");
                        }}
                      >
                        Beli
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tutorial Section */}
      <TutorialSection />
    </div>
  );
};

export default HomePage;
