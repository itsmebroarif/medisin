# 🏥 Medisin - Clinic Management System

Medisin adalah Sistem Manajemen Klinik modern yang dibangun dengan arsitektur decoupled (terpisah):
- **Backend**: Laravel 11/13 (API Service) menggunakan PHP 8.3
- **Frontend**: Quasar Framework (Vue 3 / Vite) menggunakan Node.js 22

Proyek ini telah dikonfigurasi untuk memudahkan setup otomatis dan deployment di berbagai komputer dengan konfigurasi lingkungan PHP 8.3 dan Node.js 22.

---

## 📋 Prasyarat Sistem

Sebelum melakukan instalasi, pastikan komputer Anda telah terpasang:
1. **PHP >= 8.3** (Disarankan menggunakan Laragon atau XAMPP terbaru yang mendukung PHP 8.3)
2. **Node.js >= 22** (Disarankan versi LTS terbaru)
3. **Composer** (Untuk dependensi PHP)
4. **Git**

---

## ⚡ Instalasi Cepat (Setup Otomatis)

Kami telah menyediakan skrip setup otomatis untuk mempercepat proses instalasi di berbagai PC. Anda hanya perlu menjalankan satu perintah.

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/itsmebroarif/medisin.git
   cd clinic-management
   ```

2. **Jalankan Setup Otomatis:**
   Di terminal root proyek, jalankan perintah berikut:
   ```bash
   npm run setup
   ```
   *Skrip ini akan otomatis melakukan:*
   - Memeriksa versi PHP, Node.js, dan Composer.
   - Menginstal semua package PHP Laravel (`composer install`).
   - Membuat file `.env` dari `.env.example`.
   - Membuat database SQLite default (`database/database.sqlite`) jika konfigurasi `.env` adalah SQLite.
   - Membuat App Key Laravel (`key:generate`).
   - Menjalankan migrasi database (`migrate`).
   - Menginstal package npm backend.
   - Menginstal package npm frontend Quasar (`npm install`).

3. **Jalankan Aplikasi:**
   Setelah instalasi selesai, Anda dapat menjalankan backend dan frontend sekaligus dengan perintah:
   ```bash
   npm run serve
   ```
   Aplikasi backend akan berjalan di `http://localhost:8000` dan frontend di `http://localhost:9000` (atau port default Quasar lainnya).

---

## 🛠️ Instalasi Manual (Langkah-demi-Langkah)

Jika Anda ingin melakukan setup secara manual atau skrip setup otomatis mengalami kendala, ikuti langkah berikut:

### 1. Setup Backend (Laravel)
```bash
# Pindah ke direktori backend
cd backend

# Instal dependensi PHP
composer install

# Duplikat file environment
cp .env.example .env

# Generate security key
php artisan key:generate

# Konfigurasi Database (Pilih salah satu):
# A. Jika menggunakan SQLite (Bawaan .env.example)
# Buat file database kosong di database/database.sqlite
touch database/database.sqlite

# B. Jika menggunakan MySQL (Laragon/XAMPP)
# Buka file .env dan ubah bagian DB_* sesuai database MySQL Anda:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=nama_db_anda
# DB_USERNAME=root
# DB_PASSWORD=

# Jalankan migrasi database
php artisan migrate

# Instal dependensi npm backend
npm install
```

### 2. Setup Frontend (Quasar)
```bash
# Kembali ke root, lalu masuk ke direktori frontend
cd ../frontend

# Instal dependensi npm frontend
npm install
```

---

## 🚀 Menjalankan Aplikasi Secara Terpisah

Jika Anda ingin menjalankan atau memantau backend dan frontend secara terpisah:

- **Menjalankan Backend Laravel:**
  ```bash
  cd backend
  php artisan serve
  ```
- **Menjalankan Frontend Quasar:**
  ```bash
  cd frontend
  npm run dev
  ```

---

## 📁 Struktur Folder Proyek
- `/backend`: Kode program Laravel API.
- `/frontend`: Antarmuka pengguna (UI) menggunakan Quasar & Vue 3.
- `package.json` (Root): Berisi perintah global untuk mengontrol setup dan menjalankan kedua modul sekaligus.
- `setup.js` (Root): Skrip orkestrator instalasi cross-platform.
