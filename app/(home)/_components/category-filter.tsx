"use client";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories = [
    { id: "semua", label: "Semua Berita" },
    { id: "teknologi", label: "Teknologi" },
    { id: "bisnis", label: "Bisnis" },
    { id: "sains", label: "Sains" },
    { id: "startup", label: "Startup" },
    { id: "digital", label: "Digital" },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-6">
        Jelajahi Kategori
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-muted"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
