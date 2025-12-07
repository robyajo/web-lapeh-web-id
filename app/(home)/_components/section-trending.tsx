import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Eye } from "lucide-react";
import Link from "next/link";

const trendingPosts = [
  {
    id: 1,
    title: "10 AI Tools That Will Transform Your Workflow in 2024",
    category: "Technology",
    views: "12.5K",
    readTime: "8 min",
    trend: "+45%",
  },
  {
    id: 2,
    title: "The Rise of Sustainable Fashion: A Complete Guide",
    category: "Lifestyle",
    views: "9.2K",
    readTime: "6 min",
    trend: "+32%",
  },
  {
    id: 3,
    title: "Mastering Remote Work: Tips from Top Companies",
    category: "Business",
    views: "8.7K",
    readTime: "5 min",
    trend: "+28%",
  },
];

export default function SectionTrending() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <p className="text-muted-foreground">
              Most popular articles this week
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trendingPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                      <TrendingUp className="h-3 w-3" />
                      {post.trend}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-4xl font-bold text-primary/20 mb-2">
                      0{index + 1}
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
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
