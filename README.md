# Panduan Konfigurasi Amberik Store

## Bagian yang Perlu Diubah

### 1. Tutorial Video (`src/app/components/ui/TutorialVideo.jsx`)

```javascript
const tutorials = [
  {
    id: 1,
    title: "Tutorial Hijab Pashmina Simple",
    thumbnail: "/images/tutorials/pashmina-simple.jpg", // Ubah dengan gambar Anda
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1", // Ganti VIDEO_ID_1 dengan ID video YouTube Anda
    duration: "5:30",
    difficulty: "Pemula",
  },
  // ... tambahkan atau ubah tutorial lainnya
];
```

#### Yang perlu disiapkan:

1. Gambar thumbnail tutorial (ukuran yang disarankan: 640x360px)
   - `/public/images/tutorials/pashmina-simple.jpg`
   - `/public/images/tutorials/segiempat-modern.jpg`
   - `/public/images/tutorials/pashmina-pesta.jpg`
2. ID video YouTube untuk setiap tutorial
   - Contoh URL YouTube: `https://www.youtube.com/watch?v=ABC123XYZ`
   - ID video adalah `ABC123XYZ`

### 2. Kontak dan Media Sosial (`src/app/components/ui/Navbar.jsx`)

```javascript
// Ubah link WhatsApp
<motion.a
  href="https://wa.me/6281234567890" // Ganti dengan nomor WhatsApp Anda
  target="_blank"
  rel="noopener noreferrer"
  // ...
>

// Ubah link Instagram
<motion.a
  href="https://instagram.com/amberik" // Ganti dengan username Instagram Anda
  target="_blank"
  rel="noopener noreferrer"
  // ...
>
```

### 3. Placeholder Images

Siapkan gambar placeholder berikut:

1. `/public/images/placeholder.svg` (sudah ada)
2. `/public/images/error-placeholder.svg` (sudah ada)

### 4. Logo dan Branding

1. `/public/images/Amberik.svg` - Ganti dengan logo Anda
2. Favicon dan PWA icons di `/public` folder

### 5. Sistem Review Produk (`src/app/components/ui/ProductReview.jsx`)

```javascript
const reviews = [
  {
    id: 1,
    productId: "hijab-pashmina-1",
    rating: 5,
    author: "Nama Pembeli",
    date: "2024-03-20",
    comment: "Kualitas bagus, pengiriman cepat",
    image: "/images/reviews/review-1.jpg", // Opsional: foto review
    verified: true,
  },
  // ... tambahkan review lainnya
];
```

#### Yang perlu disiapkan untuk Review:

1. Folder untuk gambar review

   ```bash
   mkdir -p public/images/reviews
   ```

2. Format data review:

   - Rating (1-5 bintang)
   - Nama pembeli
   - Tanggal pembelian
   - Komentar
   - Gambar review (opsional)
   - Status verifikasi pembeli

3. Komponen yang terkait:
   - `ProductReview.jsx` - Menampilkan review untuk produk
   - `ReviewForm.jsx` - Form untuk menambah review
   - `RatingStars.jsx` - Komponen bintang rating

#### Konfigurasi Review:

1. **Setup Folder Gambar**

```bash
   # Buat folder untuk gambar review
   mkdir -p public/images/reviews
```

2. **Format Gambar Review**

   - Ukuran maksimal: 1024x1024px
   - Format: JPG/JPEG
   - Kualitas: 80%
   - Nama file: `review-[id].jpg`

3. **Pengaturan Review**
   - Maksimal 5 gambar per review
   - Ukuran file maksimal: 2MB per gambar
   - Format komentar: minimal 10 karakter
   - Rating wajib diisi (1-5 bintang)

#### Fitur Review:

1. **Filter dan Sorting**

   - Filter berdasarkan rating
   - Sort berdasarkan tanggal/rating
   - Filter review dengan foto

2. **Moderasi Review**

   - Verifikasi pembeli
   - Pengecekan konten review
   - Penandaan review bermanfaat

3. **Statistik Review**
   - Rating rata-rata
   - Distribusi rating
   - Jumlah review dengan foto
   - Persentase pembeli terverifikasi

#### Contoh Penggunaan:

```jsx
// Di halaman produk
<ProductReview
  productId="hijab-pashmina-1"
  showFilters={true}
  allowImages={true}
  maxImagesPerReview={5}
/>

// Form tambah review
<ReviewForm
  productId="hijab-pashmina-1"
  onSubmit={handleReviewSubmit}
  maxImageSize={2048000} // 2MB in bytes
/>
```

## Langkah-langkah Konfigurasi

1. **Tutorial Video**

   ```bash
   # Buat folder untuk thumbnail tutorial
   mkdir -p public/images/tutorials

   # Salin gambar thumbnail ke folder tersebut
   cp path/to/your/thumbnails/*.jpg public/images/tutorials/
   ```

2. **Update Video ID**

   - Buka `src/app/components/ui/TutorialVideo.jsx`
   - Ganti `VIDEO_ID_1`, `VIDEO_ID_2`, dan `VIDEO_ID_3` dengan ID video YouTube Anda
   - Update judul, durasi, dan tingkat kesulitan sesuai dengan video Anda

3. **Update Kontak**

   - Buka `src/app/components/ui/Navbar.jsx`
   - Ganti nomor WhatsApp dan username Instagram
   - Pastikan format nomor WhatsApp: 628xxxxxxxxxx (tanpa tanda + atau spasi)

4. **Logo dan Branding**
   ```bash
   # Salin logo Anda ke folder public
   cp path/to/your/logo.svg public/images/Amberik.svg
   ```

## Catatan Penting

1. **Format Gambar**

   - Thumbnail: JPG/JPEG, rasio 16:9 (640x360px)
   - Logo: SVG (untuk kualitas terbaik)
   - Placeholder: SVG

2. **Video YouTube**

   - Pastikan video tidak di-private
   - Aktifkan opsi "Allow embedding" di pengaturan video YouTube

3. **WhatsApp**

   - Format nomor: 628xxxxxxxxxx
   - Pastikan nomor sudah terverifikasi di WhatsApp Business (jika menggunakan WhatsApp Business)

4. **Optimasi Gambar**
   - Semua gambar akan dioptimasi secara otomatis menggunakan komponen `OptimizedImage`
   - Kualitas default: 75%
   - Maksimum width: 1920px

## Pengujian

Setelah melakukan perubahan, pastikan untuk menguji:

1. Thumbnail tutorial muncul dengan benar
2. Video dapat diputar di modal
3. Link sosial media berfungsi
4. Gambar teroptimasi dan dimuat dengan baik
5. Placeholder muncul saat loading
6. Error placeholder muncul saat gambar gagal dimuat
7. Review dapat ditambahkan dengan benar
8. Gambar review dapat diunggah
9. Filter dan sorting review berfungsi
10. Statistik review akurat
11. Moderasi review berjalan dengan baik

## Keamanan

1. **Validasi Input**

   - Sanitasi input review
   - Validasi format gambar
   - Pembatasan ukuran file
   - Pencegahan spam review

2. **Moderasi Konten**
   - Filter kata-kata tidak pantas
   - Verifikasi pembeli
   - Pencegahan review duplikat
   - Sistem pelaporan review
