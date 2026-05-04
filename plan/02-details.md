## R — Role
Network Engineer dengan 5 tahun pengalaman bekerja di instansi pemerintah, ahli dalam mengelola infrastruktur jaringan dan keamanan jaringan dengan keahlian mengelola router, switch, server dan firewall. 
---

## T — Task
Buatkan portfolio website satu halaman yang menunjukkan kualitas sebagai Network Engineer, dengan  kode yang clean, , mobile-first, desain yang modern, profesional dan memorable.
---

## C — Context
HANYA vanilla HTML5 + CSS3 + JavaScript — tanpa framework, tanpa library pihak ketiga.tanpa bundler. mobile first, production ready. Konten realistis untuk network engineer berpengalaman. Portfolio ini akan digunakan untuk melamar kerja dan freelance. 
---

## C — Constraints
Contraints :
 ARSITEKTUR & SEMANTIK:
  - ZERO non-semantic div — gunakan elemen HTML5 yang tepat
  - File terstruktur: index.html, styles.css, script. js
  - SEO- ready: meta tags, Open Graph, structured data (JSON-LD)

  AKSESIBILITAS (WCAG 2.1 AA):
  - Contrast 4.5:1 (body), 3:1 (large text)
  - Focus indicators pada SEMUA elemen interaktif
  - Touch target min 44x44px
  - JetBrains Mono, Inter, alt text deskriptif
  - Keyboard navigable, screen reader friendly

  RESPONSIF :
  - Sempurna di 320px—1440px+
  - clamp() untuk semua typography            
  - Mobile-first breakpoints: 480px, 768px,1024px
  - Container max-width + margin auto
  - overflow-x: hidden pada body

  INTERAKSI (Vanilla JS - Tanpa Library) :
  - Scroll reveal: IntersectionObserver untuk animasi masuk section
  - Smooth scroll: JS native untuk navigasi anchor
  - Active nav highlight: track scroll position, highlight menu aktif
  - Hover: transform + transition CSS (150-300ms)
  - Active states pada semua button/ link
  - elemen interaktif di bagian paling atas (Hero Section) dengan tema modern terminal "Interactive Terminal Hero". Alih-alih teks statis, buat animasi teks yang terlihat seperti sedang mengetik perintah di Linux/CMD.
      "retno@portfolio:~$" 
      "whoami"
      "Network Engineer graduate. Specialist in routing, switching, and security."
      "retno@portfolio:~$"
      "ping opportunities..."
      "Reply from HR_Company: bytes=32 time=10ms TTL=64"
  - prefers- reduced-motion: disable semua animasi non-esensial
  - Hamburger menu: hanya muncul ketika diakses pada Layar kecil

  PERFORMANCE:
  - Lighthouse target: Performance 90+, Accessibility 95+
  - Lazy load images (loading="lazy")
  - Defer script.js
  - Minimize reflows, gunakan transform/opacity untuk animasi
  - Total file < 50KB (HTML + CSS + JS combined)

  KONTEN :
  - Hero: tagline memorable + CTA jelas
  - About: bio realistis + pengalaman kerja
  - Skills: visual badges, bukan list biasa
  - Projects: 3+ proyek dengan tech stack, link source/demo
  - Contact: form fungsional + info kontak + social links
---

## O — Output
Output: 3 file terpisah — index.html, styles.css, script.js.
        Kode bersih, ter-organize, dengan komentar section.
        Sertakan instruksi cara buka (cukup buka index. html di browser) .