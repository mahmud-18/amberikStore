export default function Hero() {
  return (
    <section className="hero-bg h-[950px] md:h-[1200px] w-full flex justify-center pt-4 md:pt-0 relative z-20 overflow-hidden">
      {/* Background overlay dengan gradien */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-transparent z-0"></div>

      {/* Background image */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/images/bg-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.9)",
        }}
      ></div>

      {/* Container untuk mengatur lebar konten */}
      <div className="xl:max-w-screen-2xl h-auto md:max-w-screen-md lg:max-w-screen-lg mx-auto w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-10 ">
        {/* Kolom teks di kiri */}
        <div className="text-left space-y-5  md:w-[50%]  bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <h2 className="text-pink-600 text-xl font-semibold uppercase tracking-wide">
            UNLOCK YOUR CHARM
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Discover Your Inner Radiance Through Perfect Hijabs
          </h1>
          <p className="text-gray-700 text-base md:text-lg font-medium">
            Elegan, nyaman, dan sesuai dengan gaya Anda sehari-hari
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => (window.location.href = "/shop")}
              className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-pink-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Belanja Sekarang
            </button>
            <button className="px-8 py-3 bg-white text-pink-500 border-2 border-pink-500 rounded-full hover:bg-pink-50 transition-all duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              Koleksi Terbaru
            </button>
          </div>
        </div>

        {/* Gambar hero di kanan */}
        <div className="hidden md:block md:w-[45%] relative">
          <img
            src="/images/Hero.png"
            alt="Koleksi Hijab Terbaru"
            className="object-cover rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
          />
          <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
            <p className="text-pink-600 font-bold">Diskon 20%</p>
            <p className="text-gray-600 text-sm">Untuk pembelian pertama</p>
          </div>
        </div>
      </div>

      {/* Fitur highlights */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-8 shadow-lg">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/deliver.png"
              alt="Fast Delivery"
              className="w-10 h-10"
            />
            <div>
              <p className="font-semibold text-gray-800">Pengiriman Cepat</p>
              <p className="text-xs text-gray-600">Seluruh Indonesia</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              src="/images/gift.png"
              alt="Special Offers"
              className="w-10 h-10"
            />
            <div>
              <p className="font-semibold text-gray-800">Penawaran Khusus</p>
              <p className="text-xs text-gray-600">Untuk member</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold text-gray-800">Kualitas Terjamin</p>
              <p className="text-xs text-gray-600">Bahan premium</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div>
              <p className="font-semibold text-gray-800">Belanja Mudah</p>
              <p className="text-xs text-gray-600">Pembayaran aman</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
