import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Layers } from "lucide-react";

const categories = [
  {
    name: "Technology",
    icon: "💻",
    count: 245,
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    name: "Design",
    icon: "🎨",
    count: 189,
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    name: "Business",
    icon: "💼",
    count: 167,
    color: "from-green-500/10 to-emerald-500/10",
  },
  {
    name: "Lifestyle",
    icon: "✨",
    count: 203,
    color: "from-orange-500/10 to-yellow-500/10",
  },
  {
    name: "Health",
    icon: "🏃",
    count: 156,
    color: "from-red-500/10 to-rose-500/10",
  },
  {
    name: "Travel",
    icon: "✈️",
    count: 134,
    color: "from-indigo-500/10 to-blue-500/10",
  },
];

export default function SectionCategories() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Explore Categories</h2>
            <p className="text-muted-foreground">Find articles by topic</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div
                    className={`bg-linear-gradient-to-br ${category.color} rounded-xl p-6 mb-4 flex items-center justify-center`}
                  >
                    <span className="text-5xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {category.count} articles
                    </p>
                    <Badge
                      variant="secondary"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Explore
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
