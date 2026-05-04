# Execution — [Nama]

## Step 1: [membuat landing page portfolio network engineer modern dengan terminal hero]

### Prompt
pahami dan implementasikan file 02-details.md

### RTCC-O Check
- R: ✅
- T: ✅
- C: ✅
- C: ✅
- O: ✅

### AI Response
Viewed 02-details.md:1-68
Edited index.html
Edited styles.css
Edited script.js

Saya telah memahami spesifikasi dari file `plan/02-details.md` dan mengimplementasikan seluruh kebutuhan tersebut menjadi 3 file terpisah. 

Berikut adalah file yang telah saya buat di dalam direktori `c:\xampp\htdocs\retnopebriana-portfolio\`:
1. **`index.html`**:
   - Struktur HTML5 yang murni menggunakan semantic tag (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`).
   - Meta tag untuk SEO (Open Graph dan Structured Data JSON-LD).
   - Telah menggunakan elemen _"Interactive Terminal Hero"_ pada _Hero Section_ sesuai instruksi.
   - Tidak menggunakan bundler atau kerangka kerja eksternal apa pun.
2. **`styles.css`**:
   - Skema warna _Dark Mode_ yang modern (warna Slate 900, Slate 800, dll.).
   - Tipografi yang sangat _fluid_ (responsif) menggunakan fungsi CSS `clamp()`.
   - Mengimplementasikan aksesibilitas seperti `contrast`, min `touch target` (44x44px), dan indikator fokus kustom saat navigasi keyboard (`:focus-visible`).
   - Desain yang bersifat _mobile-first_ menggunakan breakpoints pada media query.
   - Transisi hover pada _button_ dan navigasi.
   - Fitur `@media (prefers-reduced-motion)` untuk menonaktifkan efek animasi jika pengguna mengurangi gerak (seperti _scroll reveal_ dan _terminal typing effect_).
3. **`script.js`**:
   - **IntersectionObserver**: Untuk fitur _Scroll Reveal_ agar elemen perlahan muncul saat discroll.
   - **Smooth Scroll Native JS**: Untuk mengatur pergeseran pada menu navigasi anchor.
   - **Active Navigation**: Mendeteksi scroll pengguna dan memberikan efek aktif pada menu navbar yang sedang dilihat.
   - **Interactive Terminal Hero**: Mengetikkan perintah `whoami` dan simulasi proses `ping` seperti terminal Linux (dengan _fallback_ yang baik bila `prefers-reduced-motion` aktif).
   - Logika _hamburger menu_ untuk ukuran tampilan perangkat bergerak.

**Cara Membuka:**
Cukup buka file `index.html` langsung di browser web Anda secara normal, atau jika Anda menggunakan XAMPP (karena berada di `htdocs`), Anda bisa membukanya melalui alamat `http://localhost/retnopebriana-portfolio/`. Tidak ada proses _build_ maupun _bundler_ yang dibutuhkan.

### Review
- [✅] Sesuai constraints dan mungkin butuh penyesuaian kembali sesuai brainstorm yang telah dipilih.
- [✅] Format sesuai dengan apa yang diintruksikan 
- [✅] Bisa dipahami
- Changes: perlu ada penyesuaian kembali sesuai brainstorm yang telah dipilih.

---
