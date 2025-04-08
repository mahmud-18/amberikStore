import { Poppins, Ephesis, MuseoModerno } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AdminProvider } from "./context/AdminContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const ephesis = Ephesis({
  variable: "--font-ephesis",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const museoModerno = MuseoModerno({
  variable: "--font-museomoderno",
  subsets: ["latin"],
  style: ["normal"],
  weight: ["500"],
  display: "swap",
});

export const metadata = {
  title: "Amberik Store - Hijab & Makanan Premium",
  description:
    "Temukan koleksi hijab berkualitas dan makanan lezat di Amberik Store. Pengalaman berbelanja terbaik dengan produk premium dan layanan prima.",
  keywords: [
    "hijab",
    "fashion muslim",
    "makanan halal",
    "roti maryam",
    "online shop",
    "bandung",
  ],
  authors: [{ name: "Amberik Store" }],
  creator: "Amberik Store",
  publisher: "Amberik Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Amberik Store - Hijab & Makanan Premium",
    description:
      "Temukan koleksi hijab berkualitas dan makanan lezat di Amberik Store",
    url: "https://amberik.com",
    siteName: "Amberik Store",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Amberik Store - Hijab & Makanan Premium",
    description:
      "Temukan koleksi hijab berkualitas dan makanan lezat di Amberik Store",
    creator: "@amberik",
    images: ["/images/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#ec4899",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Amberik Store",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${ephesis.variable} ${museoModerno.variable}`}
    >
      <head>
        <meta name="application-name" content="Amberik Store" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Amberik Store" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <AdminProvider>
          <CartProvider>
            <WishlistProvider>
              <main>{children}</main>
            </WishlistProvider>
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
