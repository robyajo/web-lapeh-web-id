"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FeaturedStory() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto">
          {/* Label */}
          <div className="text-xs font-semibold text-primary tracking-widest uppercase mb-4">
            Cerita Utama
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Featured Image */}
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Featured story"
                fill
                className="object-cover"
              />
            </div>

            {/* Featured Content */}
            <div className="flex flex-col justify-center">
              <div className="text-sm text-muted-foreground mb-4 font-medium">
                Nov 23, 2025
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-balance">
                Inovasi Terbaru dalam Teknologi Masa Depan Mengubah Industri
              </h1>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Perusahaan teknologi terkemuka mengumumkan terobosan baru yang
                akan merevolusi cara kita bekerja dan berkomunikasi. Penemuan
                ini mencakup AI canggih dan otomasi intelligent yang dapat
                meningkatkan produktivitas hingga 300%.
              </p>
              <button className="w-fit flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Baca Selengkapnya
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
