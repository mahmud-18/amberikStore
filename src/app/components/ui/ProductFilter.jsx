import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

const ProductFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: "all",
    color: [],
    material: [],
    sort: "newest",
  });

  const categories = [
    "Hijab Pashmina",
    "Hijab Segi Empat",
    "Hijab Instan",
    "Makanan",
  ];

  const colors = [
    "Hitam",
    "Putih",
    "Navy",
    "Marun",
    "Abu-abu",
    "Coklat",
    "Pink",
    "Hijau",
  ];

  const materials = ["Cotton", "Voal", "Ceruty", "Silk"];

  const priceRanges = [
    { label: "Semua Harga", value: "all" },
    { label: "Dibawah Rp50.000", value: "0-50000" },
    { label: "Rp50.000 - Rp100.000", value: "50000-100000" },
    { label: "Rp100.000 - Rp200.000", value: "100000-200000" },
    { label: "Diatas Rp200.000", value: "200000-up" },
  ];

  const sortOptions = [
    { label: "Terbaru", value: "newest" },
    { label: "Harga Terendah", value: "price-asc" },
    { label: "Harga Tertinggi", value: "price-desc" },
    { label: "Terpopuler", value: "popular" },
  ];

  const handleFilterChange = (type, value) => {
    let newFilters = { ...filters };

    if (type === "category" || type === "color" || type === "material") {
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
    } else {
      newFilters[type] = value;
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: [],
      priceRange: "all",
      color: [],
      material: [],
      sort: "newest",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-300"
      >
        <FaFilter />
        <span>Filter</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg p-6 w-80 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filter Produk</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Urutkan</h4>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Kategori</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category)}
                      onChange={() => handleFilterChange("category", category)}
                      className="rounded text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Rentang Harga</h4>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={filters.priceRange === range.value}
                      onChange={() =>
                        handleFilterChange("priceRange", range.value)
                      }
                      className="text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Warna</h4>
              <div className="grid grid-cols-2 gap-2">
                {colors.map((color) => (
                  <label key={color} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.color.includes(color)}
                      onChange={() => handleFilterChange("color", color)}
                      className="rounded text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-sm">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Bahan</h4>
              <div className="grid grid-cols-2 gap-2">
                {materials.map((material) => (
                  <label key={material} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.material.includes(material)}
                      onChange={() => handleFilterChange("material", material)}
                      className="rounded text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-sm">{material}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              Reset Filter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilter;
