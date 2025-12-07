import { SiteConfig } from "@/types"; 

// Environment Variables
const nameApp = process.env.NEXT_PUBLIC_APP_NAME || "Next.js 16";
const urlApp = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const siteConfig: SiteConfig = {
  name: `${nameApp}`,
  author: "Roby Ajo",
  description: `${nameApp} - Portal berita dan artikel terkini yang menyajikan informasi mendalam seputar teknologi, gaya hidup, dan wawasan global. Temukan inspirasi dan pengetahuan baru setiap hari.`,
  keywords: [
    `${nameApp}`,
    "Berita Terkini",
    "Artikel",
    "Blog",
    "Teknologi",
    "Gaya Hidup",
    "Wawasan",
    "Informasi",
    "Edukasi",
    "Inspirasi",
    "Tutorial",
    "Tips & Trik",
    "Review",
    "Opini",
    "Trending",
    "Viral",
    "Kesehatan",
    "Bisnis",
    "Keuangan",
    "Travel",
    "Kuliner",
    "Sains",
    "Budaya",
    "Otomotif",
    "Olahraga",
    "Hiburan",
    "Politik",
    "Ekonomi",
    "Sosial",
    "Lingkungan",
  ],
  url: {
    base: `${urlApp}`,
    author: "https://portfolio-roby.vercel.app",
  },
  links: {
    github: "https://github.com/robyajo",
  },
  ogImage: `${urlApp}/og.png`,
  locale: "id_ID",
  type: "website",
  publishedTime: new Date().toISOString(),
  twitterCard: "summary_large_image",
};

export const menuConfig = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/about", label: "Tentang" },
];