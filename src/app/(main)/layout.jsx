import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Suspense } from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background dengan gradien yang lebih halus */}
      <div
        className="fixed inset-0 z-[-1] bg-gradient-to-b from-pink-100 via-white to-pink-50"
        aria-hidden="true"
      />

      {/* Header */}
      <header>
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
