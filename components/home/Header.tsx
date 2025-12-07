"use client";
import Link from "next/link";
import menuLinks from "@/data/menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeSwitcher } from "../theme-switcher";
import { useSession } from "next-auth/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { data: session, status } = useSession();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <header className="flex flex-col max-w-380 w-full mx-auto px-4 md:pt-6 pt-4 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        <div className="hidden md:flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              aria-label="Search"
              className="text-foreground"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="16.5"
                  y1="16.5"
                  x2="22"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Link>
            <Link href="#">U.S.</Link>
            <Link href="#">International</Link>
            <Link href="#">Canada</Link>
            <Link href="#">Español</Link>
            <Link href="#">中文</Link>
          </div>
          <div className="flex items-center gap-3">
            {status === "authenticated" ? (
              <Link
                href="/dashboard"
                className="px-3 py-1 border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1 border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 items-center md:mb-0 mb-3">
          <div className="hidden md:flex flex-col">
            <span className="text-xs">{today}</span>
            <Link href="#" className="text-xs underline">
              Today's Paper
            </Link>
          </div>
          <div className="flex justify-center col-span-2 md:col-span-1">
            <Link href="/" aria-label="Return to homepage">
              <span className="font-serif text-3xl md:text-5xl tracking-tight">
                Fyrre Magazine
              </span>
            </Link>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="text-xs flex items-center gap-3">
              <span>Market</span>
              <span>+1.2%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="hidden md:flex sticky top-0 z-50 bg-background border-t border-b border-border">
        <div className="max-w-380 w-full mx-auto px-4 py-2 flex items-center">
          <div className="flex-1 flex justify-center">
            <NavigationMenu viewport={isMobile}>
              <NavigationMenuList className="flex-wrap">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                            href="/"
                          >
                            <div className="mb-2 text-lg font-medium sm:mt-4">
                              Fyrre Magazine
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              Beautifully designed stories and podcasts.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/magazine" title="Magazine">
                        Latest articles and features.
                      </ListItem>
                      <ListItem href="/podcasts" title="Podcasts">
                        Listen to our latest episodes.
                      </ListItem>
                      <ListItem href="/authors" title="Authors">
                        Meet our contributors.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Sections</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {menuLinks.map((m) => (
                        <ListItem key={m.href} href={m.href} title={m.label}>
                          Explore {m.label} content.
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {menuLinks.map((menuItem, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={menuItem.href}>{menuItem.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
      {/* Mobile Sticky Header */}
      <div className="md:hidden sticky top-0 z-50 bg-background border-b border-border px-4 py-2 flex items-center justify-between shadow-sm">
        <Link href="/" aria-label="Return to homepage">
          <span className="font-serif text-xl tracking-tight">
            Fyrre Magazine
          </span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger aria-label="Menu" className="p-2 text-foreground">
            <svg
              aria-hidden="true"
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="2" fill="currentColor" />
              <rect y="6" width="20" height="2" fill="currentColor" />
              <rect y="12" width="20" height="2" fill="currentColor" />
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
            <SheetTitle></SheetTitle>
            <div className="flex flex-col h-full">
              <div className="border-b border-border p-6">
                <h2 className="font-serif text-2xl mb-4">Fyrre Magazine</h2>
                <div className="flex flex-col gap-2">
                  {status === "authenticated" ? (
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 border border-border text-center text-sm font-medium rounded hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="px-4 py-2 border border-border text-center text-sm font-medium rounded hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="home">
                    <AccordionTrigger className="px-6 py-3 text-base border-b border-border">
                      Home
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid gap-2 px-4 py-2">
                        <li>
                          <Link
                            href="/magazine"
                            className="block px-4 py-2 rounded hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                          >
                            Magazine
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/podcasts"
                            className="block px-4 py-2 rounded hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                          >
                            Podcasts
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/authors"
                            className="block px-4 py-2 rounded hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                          >
                            Authors
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="sections">
                    <AccordionTrigger className="px-6 py-3 text-base border-b border-border">
                      Sections
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid gap-2 px-4 py-2">
                        {menuLinks.map((m) => (
                          <li key={m.href}>
                            <Link
                              href={m.href}
                              className="block px-4 py-2 rounded hover:bg-muted"
                              onClick={() => setIsOpen(false)}
                            >
                              {m.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="mt-2 flex flex-col">
                  {menuLinks.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      className="px-6 py-3 text-base border-b border-border hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-border p-6">
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <Link href="#" className="hover:underline">
                    U.S.
                  </Link>
                  <Link href="#" className="hover:underline">
                    International
                  </Link>
                  <Link href="#" className="hover:underline">
                    Canada
                  </Link>
                  <Link href="#" className="hover:underline">
                    Español
                  </Link>
                  <Link href="#" className="hover:underline">
                    中文
                  </Link>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Link
                    href="/search"
                    aria-label="Search"
                    className="p-2 hover:bg-muted rounded-full transition-colors text-foreground"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="16.5"
                        y1="16.5"
                        x2="22"
                        y2="22"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function ListItem({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={
            "from-background to-muted/50 focus:shadow-md block select-none space-y-1 rounded-md bg-linear-to-b p-3 no-underline outline-hidden transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
