"use client";

import {
  Activity,
  Archive,
  ChevronRight,
  FileText,
  Home,
  Layers,
  LayoutDashboard,
  MapPin,
  Menu,
  ShieldCheck,
  Shirt,
  SoapDispenserDroplet,
  Store,
  Users,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { CollapsibleMenu } from "./collapsible-menu";
import { useSession } from "next-auth/react";

export function MainDashboard() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem
        className={
          pathname.includes("/dashboard") ||
          pathname.startsWith("/dashboard") ||
          pathname.endsWith("/dashboard")
            ? "active bg-primary outline-border outline-2 rounded-md text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            : ""
        }
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton
              asChild
              className={
                pathname.includes("/dashboard") ||
                pathname.startsWith("/dashboard") ||
                pathname.endsWith("/dashboard") ||
                "/dashboard".includes(pathname) ||
                pathname ===
                  "/dashboard".replace(/^\//, `/${pathname.split("/")[1]}/`)
                  ? "active bg-primary outline-border outline-2 rounded-md text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                  : ""
              }
            >
              <Link href="/dashboard">
                <LayoutDashboard />
                <span className="group-data-[collapsible=icon]:hidden">
                  Dashboard
                </span>
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
