"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher";
import { useSession } from "next-auth/react";
import { Twitter, Facebook, Linkedin, Mail } from "lucide-react";

export default function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { data: session } = useSession();
  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">My App</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <SheetTitle></SheetTitle>
                <div className="px-7">
                  <Link href="/" className="flex items-center">
                    <span className="font-bold">My App</span>
                  </Link>
                </div>
                <div className="flex flex-col gap-4 py-4 px-7">
                  <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Home
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                  <div className="pt-4 flex flex-col gap-2">
                    <Button variant="outline" className="w-full justify-start">
                      Login
                    </Button>
                    <Button className="w-full justify-start">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <span className="font-bold">My App</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* Search or other controls could go here */}
            </div>
            <nav className="flex items-center space-x-2">
              <ThemeSwitcher />
              {session?.user ? (
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hidden md:flex"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" className="hidden md:flex">
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 md:py-16 mx-auto px-4 ">
        <div className="container mx-auto px-4">
          {/* Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span>PRESS</span>
                <span className="opacity-70">.mag</span>
              </h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Platform berita digital terdepan dengan konten berkualitas
                tinggi dan jurnalisme yang terpercaya.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest">
                Navigasi
              </h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link
                    href="#"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Kategori
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest">
                Kategori
              </h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link
                    href="#"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Teknologi
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Bisnis
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Sains
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Digital
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest">
                Ikuti Kami
              </h4>
              <div className="flex gap-3 mb-6">
                <Link
                  href="#"
                  className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition-colors"
                >
                  <Twitter size={18} />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition-colors"
                >
                  <Facebook size={18} />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition-colors"
                >
                  <Linkedin size={18} />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition-colors"
                >
                  <Mail size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
              <p>&copy; 2025 PRESS Magazine. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="#" className="hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:opacity-100 transition-opacity">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
