"use client";

import Image from "next/image";
import { User } from "lucide-react";

interface ArticleGridProps {
  category: string;
}

export default function ArticleGrid({ category }: ArticleGridProps) {
  const articles = [
    {
      id: 1,
      title: "Blockchain Mengubah Cara Transaksi Digital",
      excerpt:
        "Teknologi blockchain terbukti meningkatkan keamanan dan efisiensi transaksi online hingga level yang belum pernah terjadi sebelumnya.",
      category: "teknologi",
      image:
        "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Nov 22, 2025",
      author: "Rina Wijaya",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Startup Indonesia Raih Pendanaan $50 Juta",
      excerpt:
        "Perusahaan fintech lokal berhasil mendapatkan investasi dari venture capital global terkemuka di Asia Tenggara.",
      category: "startup",
      image:
        "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Nov 21, 2025",
      author: "Ahmad Setiawan",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "Quantum Computing Mencapai Milestone Baru",
      excerpt:
        "Para ilmuwan berhasil menciptakan quantum computer yang stabil dan dapat digunakan untuk aplikasi praktis industri.",
      category: "sains",
      image:
        "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Nov 20, 2025",
      author: "Dr. Budi Santoso",
      readTime: "8 min",
    },
    {
      id: 4,
      title: "E-commerce Platform Terbaru Mengguncang Pasar",
      excerpt:
        "Aplikasi belanja online dengan AI recommendation engine mengalami pertumbuhan pengguna 400% dalam sebulan pertama.",
      category: "bisnis",
      image:
        "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Nov 19, 2025",
      author: "Siti Nurhaliza",
      readTime: "6 min",
    },
    {
      id: 5,
      title: "Tren Digital Marketing Tahun 2025",
      excerpt:
        "Video marketing dan personalisasi konten menjadi strategi utama brand untuk meningkatkan engagement dengan audience.",
      category: "digital",
      image:
        "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Nov 18, 2025",
      author: "Maya Kusuma",
      readTime: "5 min",
    },
    {
      id: 6,
      title: "Green Technology: Solusi untuk Planet",
      excerpt:
        "Inovasi energi terbarukan mencapai titik balik dalam persaingan dengan energi fosil dari segi biaya dan efisiensi.",
      category: "teknologi",
      image:
        "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Nov 17, 2025",
      author: "Hendra Pratama",
      readTime: "7 min",
    },
  ];

  const filteredArticles =
    category === "semua"
      ? articles
      : articles.filter((article) => article.category === category);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-balance">
        {category === "semua"
          ? "Berita Terbaru"
          : `Kategori: ${category.charAt(0).toUpperCase() + category.slice(1)}`}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                  {article.category.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
                {article.date} • {article.readTime}
              </p>
              <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {article.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User size={14} />
                  <span>{article.author}</span>
                </div>
                <button className="text-xs font-semibold text-primary hover:opacity-70 transition-opacity">
                  Baca →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Tidak ada artikel dalam kategori ini.
          </p>
        </div>
      )}
    </div>
  );
}
