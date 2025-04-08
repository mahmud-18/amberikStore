import { useState, useEffect } from "react";

// Custom hook untuk lazy loading gambar
export const useLazyImage = (src, placeholder) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return [imageSrc, isLoaded];
};

// Fungsi untuk mengoptimalkan URL gambar
export const optimizeImageUrl = (url, { width, quality = 75 } = {}) => {
  if (!url) return "";

  // Jika menggunakan Cloudinary
  if (url.includes("cloudinary")) {
    return url
      .replace("/upload/", `/upload/q_${quality},w_${width}/`)
      .replace(/\.[^/.]+$/, ".webp");
  }

  // Jika menggunakan Next.js Image Optimization
  if (url.startsWith("/")) {
    return `/_next/image?url=${encodeURIComponent(
      url
    )}&w=${width}&q=${quality}`;
  }

  return url;
};

// Fungsi untuk memvalidasi dimensi gambar
export const validateImageDimensions = async (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        resolve({
          isValid: img.width <= maxWidth && img.height <= maxHeight,
          width: img.width,
          height: img.height,
        });
      };
    };
  });
};

// Fungsi untuk mengompres gambar sebelum upload
export const compressImage = async (
  file,
  { maxWidth = 1920, quality = 0.8 } = {}
) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Hitung dimensi yang proporsional
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth * height) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Gambar ke canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Konversi ke blob
        canvas.toBlob(
          (blob) => {
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
            );
          },
          "image/jpeg",
          quality
        );
      };
    };
  });
};

// Fungsi untuk menghasilkan placeholder blur
export const generateBlurPlaceholder = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  // Implementasi sederhana, bisa diganti dengan library seperti plaiceholder
  return `data:image/svg+xml;base64,${Buffer.from(
    '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>'
  ).toString("base64")}`;
};

// Komponen untuk menangani error loading gambar
export const ImageErrorBoundary = ({ src, fallback, alt, ...props }) => {
  const [error, setError] = useState(false);

  if (error) {
    return <img src={fallback} alt={alt} {...props} onError={null} />;
  }

  return <img src={src} alt={alt} {...props} onError={() => setError(true)} />;
};

// Konstanta untuk konfigurasi gambar
export const IMAGE_CONFIG = {
  thumbnailSize: {
    width: 300,
    height: 300,
  },
  productSize: {
    width: 800,
    height: 800,
  },
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  quality: {
    high: 90,
    medium: 75,
    low: 60,
  },
};
