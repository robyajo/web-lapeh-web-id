import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

const featuredPosts = [
  {
    id: 1,
    title: "Building Scalable Applications with Next.js 14",
    excerpt:
      "Learn how to create high-performance web applications using the latest features of Next.js.",
    category: "Development",
    author: "Sarah Johnson",
    date: "Nov 20, 2024",
    image: "💻",
    featured: true,
  },
  {
    id: 2,
    title: "The Art of Minimalist Design",
    excerpt:
      "Discover the principles of minimalism and how to apply them to your design projects.",
    category: "Design",
    author: "Mike Chen",
    date: "Nov 19, 2024",
    image: "🎨",
  },
  {
    id: 3,
    title: "Cryptocurrency Trends for 2024",
    excerpt:
      "An in-depth analysis of the crypto market and what to expect in the coming year.",
    category: "Finance",
    author: "Alex Rivera",
    date: "Nov 18, 2024",
    image: "💰",
  },
  {
    id: 4,
    title: "Healthy Living: A Beginner's Guide",
    excerpt:
      "Simple steps to improve your health and wellness through diet and exercise.",
    category: "Health",
    author: "Emma Wilson",
    date: "Nov 17, 2024",
    image: "🏃",
  },
];

export default function SectionFeatured() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
            <p className="text-muted-foreground">Handpicked stories for you</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className={`bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center ${
                      index === 0 ? "h-80" : "h-48"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={
                          index === 0 ? "text-8xl mb-4" : "text-6xl mb-2"
                        }
                      >
                        {post.image}
                      </div>
                      <Badge>{post.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className={`font-bold group-hover:text-primary transition-colors mb-2 ${
                        index === 0 ? "text-2xl" : "text-lg"
                      } line-clamp-2`}
                    >
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
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
