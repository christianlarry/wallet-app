# **Wallet App (Personal Finance Manager)**

Aplikasi manajemen keuangan pribadi berbasis mobile yang dibangun dengan **React Native (Expo)**. Aplikasi ini dirancang untuk mencatat pemasukan, pengeluaran, dan melacak total aset (Net Worth) secara offline (Local-first).

## **📱 Fitur Utama (MVP)**

* **Dashboard Net Worth:** Melihat total kekayaan dari seluruh akun (Bank, Cash, E-Wallet, Investasi).  
* **Pencatatan Transaksi:** Input pemasukan, pengeluaran, dan transfer antar akun dengan cepat.  
* **Manajemen Akun:** Tambah dan kelola berbagai sumber dana (Dompet, BCA, Bibit, dll).  
* **History:** Riwayat transaksi lengkap.  
* **Offline First:** Data tersimpan aman di perangkat menggunakan SQLite.

## **🛠 Tech Stack**

* **Framework:** [Expo](https://expo.dev/) (Managed Workflow)  
* **Language:** TypeScript  
* **UI Library:** React Native Paper  
* **Navigation:** React Navigation (Native Stack)  
* **Database:** Expo SQLite (Local Database)  
* **State Management:** Zustand

## **🚀 Cara Menjalankan (Getting Started)**

Ikuti langkah ini untuk menjalankan aplikasi di komputer Anda.

### **Prasyarat**

Pastikan Anda sudah menginstal:

* [Node.js](https://nodejs.org/) (LTS Version)  
* Aplikasi **Expo Go** di HP Android/iOS Anda (download di Play Store/App Store).

### **Instalasi**

1. **Clone repositori ini** (atau buat folder baru):  
   git clone \[https://github.com/username/wallet-app.git\](https://github.com/username/wallet-app.git)  
   cd wallet-app

2. **Install Dependencies:**  
   npm install  
   \# atau  
   yarn install

3. **Jalankan Development Server:**  
   npx expo start

4. **Jalankan di HP:**  
   * Akan muncul QR Code di terminal.  
   * Buka aplikasi **Expo Go** di HP Anda.  
   * Scan QR Code tersebut.  
   * Aplikasi akan berjalan (Hot Reload aktif).

## **📂 Struktur Folder**

/src  
  ├── /components    \# Komponen UI reusable (Card, Button, Input)  
  ├── /screens       \# Halaman aplikasi (Dashboard, AddTransaction, etc)  
  ├── /database      \# Konfigurasi SQLite dan Query functions  
  ├── /store         \# State management (Zustand)  
  ├── /utils         \# Helper functions (Formatter mata uang, Tanggal)  
  └── /types         \# Definisi tipe TypeScript  
App.tsx              \# Entry point & Navigasi utama

## **💾 Skema Database (SQLite)**

Aplikasi ini menggunakan 3 tabel utama:

1. **Accounts:** Menyimpan data dompet/bank (id, name, type, balance).  
2. **Categories:** Label transaksi (id, name, type, icon).  
3. **Transactions:** Mencatat arus uang (id, amount, date, note, account\_id, category\_id).

## **📝 To-Do / Roadmap**

* \[ \] Setup Project & Navigation  
* \[ \] Implementasi Database SQLite  
* \[ \] UI Dashboard & Account List  
* \[ \] Fitur Tambah Transaksi (Income/Expense)  
* \[ \] Fitur Transfer antar Akun  
* \[ \] Chart/Laporan Keuangan (Future Release)

## **💡 Tips Pengembangan**

* Gunakan console.log untuk debugging cepat, lihat output di terminal Expo.  
* Selalu bungkus Screen utama dengan SafeAreaView agar tidak tertutup notch HP.  
* Format mata uang menggunakan Intl.NumberFormat('id-ID', ...) agar otomatis menjadi format Rupiah.

**Happy Coding\!** 🚀