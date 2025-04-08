import TutorialVideo from "@/app/components/ui/TutorialVideo";
import Breadcrumb from "../components/ui/Breadcrumb";

export const metadata = {
  title: "Tutorial Hijab - Amberik Store",
  description:
    "Pelajari berbagai tutorial hijab dari yang pemula hingga lanjutan di Amberik Store.",
};

export default function TutorialPage() {
  return (
    <main className="container mx-auto px-4">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tutorial Hijab
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pelajari berbagai gaya dan teknik menggunakan hijab dari yang paling
            sederhana hingga gaya untuk acara formal. Ikuti tutorial kami yang
            mudah dipahami.
          </p>
        </div>

        <TutorialVideo />

        <div className="mt-12 bg-pink-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tips Menggunakan Hijab
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Persiapan</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Siapkan ciput atau inner hijab yang nyaman</li>
                <li>Pastikan rambut terikat rapi</li>
                <li>Gunakan jarum pentul yang aman</li>
                <li>Setrika hijab sebelum digunakan</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                Perawatan Hijab
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Cuci dengan air dingin</li>
                <li>Hindari pemutih</li>
                <li>Jemur di tempat teduh</li>
                <li>Simpan dengan rapi setelah disetrika</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
