import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function SectionNewsletter() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary/80 p-8 md:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-size-[24px_24px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Mail className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get the latest articles, insights, and exclusive content delivered
              straight to your inbox. Join 10,000+ readers.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/50 h-12"
                required
              />
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>

            <p className="text-sm text-white/70 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
