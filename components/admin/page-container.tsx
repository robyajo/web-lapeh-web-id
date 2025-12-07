"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Menu,
  Search,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import AlertModal from "../modal/alert-modal";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:text-primary ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};

export default function PageContainerDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Posts",
      href: "/posts",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Comments",
      href: "/comments",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Users",
      href: "/users",
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div>
      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <aside className="hidden w-64 flex-col border-r bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 lg:flex">
          <div className="flex h-14 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl font-bold text-primary">AdminPanel</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="grid items-start px-4 text-sm font-medium">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={
                    pathname === item.href || pathname?.startsWith(item.href)
                  }
                />
              ))}
            </nav>
          </div>
          <div className="mt-auto border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-semibold"
                    >
                      <span className="text-xl font-bold text-primary">
                        AdminPanel
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="grid gap-2 text-lg font-medium mt-4">
                  {sidebarItems.map((item) => (
                    <SidebarItem
                      key={item.href}
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                      isActive={
                        pathname === item.href ||
                        pathname?.startsWith(item.href)
                      }
                    />
                  ))}
                </nav>
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() =>
                      signOut({ callbackUrl: "/", redirect: true })
                    }
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src="https://github.com/shadcn.png"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
