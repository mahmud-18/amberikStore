"use client";
import { useState, useEffect } from "react";
import { useAdmin } from "@/app/context/AdminContext";
import { useRouter } from "next/navigation";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const TutorialsPage = () => {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }
    fetchTutorials();
  }, [isAdmin, router]);

  const fetchTutorials = async () => {
    try {
      const response = await fetch("/api/tutorials");
      if (!response.ok) throw new Error("Gagal mengambil data tutorial");
      const data = await response.json();
      setTutorials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus tutorial ini?")) return;
    try {
      const response = await fetch(`/api/tutorials/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Gagal menghapus tutorial");
      fetchTutorials();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Tutorial</h1>
        <button
          onClick={() => router.push("/admin/tutorials/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <FaPlus /> Tambah Tutorial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={tutorial.thumbnail}
              alt={tutorial.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tutorial.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {tutorial.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{tutorial.duration}</span>
                <span>{tutorial.difficulty}</span>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2">
              <button
                onClick={() =>
                  router.push(`/admin/tutorials/${tutorial.id}/edit`)
                }
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(tutorial.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsPage;
