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
  Newspaper,
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

export function MainMenu() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <SidebarGroup>
      <>
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
          Configuration
        </SidebarGroupLabel>
        <SidebarMenu>
          <CollapsibleMenu
            item={{
              title: "Permission Role",
              url: "/configuration/permission",
              icon: ShieldCheck,
              isActive:
                pathname.includes("/configuration/permission") ||
                pathname.startsWith("/configuration/permission") ||
                pathname.endsWith("/configuration/permission") ||
                pathname.includes("/configuration/role") ||
                pathname.startsWith("/configuration/role") ||
                pathname.endsWith("/configuration/role"),
              items: [
                {
                  title: "Permission",
                  url: "/configuration/permission",
                },
                {
                  title: "Role",
                  url: "/configuration/role",
                },
              ],
            }}
          />
          <CollapsibleMenu
            item={{
              title: "Post",
              url: "/management/post",
              icon: Newspaper,
              isActive:
                (pathname.startsWith("/management/post") ||
                  pathname.endsWith("/management/post") ||
                  pathname.includes("/management/post")) &&
                !pathname.startsWith("/management/post/category"),
              items: [
                {
                  title: "Category",
                  url: "/management/category",
                },
                {
                  title: "Post",
                  url: "/management/post",
                },
              ],
            }}
          />
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  className={
                    pathname.includes("/configuration/mosque") ||
                    pathname.startsWith("/configuration/mosque") ||
                    pathname.endsWith("/configuration/mosque")
                      ? "active bg-primary outline-border outline-2 rounded-md text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                      : ""
                  }
                >
                  <Link href="/configuration/mosque">
                    <FileText />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Mosque
                    </span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right">Mosque</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  className={
                    pathname.includes("/configuration/users") ||
                    pathname.startsWith("/configuration/users") ||
                    pathname.endsWith("/configuration/users")
                      ? "active bg-primary outline-border outline-2 rounded-md text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                      : ""
                  }
                >
                  <Link href="/configuration/users">
                    <Users />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Users
                    </span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right">Users </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  className={
                    pathname.includes("/configuration/activity") ||
                    pathname.startsWith("/configuration/activity") ||
                    pathname.endsWith("/configuration/activity")
                      ? "active bg-primary outline-border outline-2 rounded-md text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                      : ""
                  }
                >
                  <Link href="/configuration/activity">
                    <Activity />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Users Activity
                    </span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right">Users Activity</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  className={
                    pathname.includes("/configuration/locations") ||
                    pathname.startsWith("/configuration/locations") ||
                    pathname.endsWith("/configuration/locations")
                      ? "active bg-primary outline-border outline-2 rounded-md text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                      : ""
                  }
                >
                  <Link href="/configuration/locations">
                    <MapPin />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Locations
                    </span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right">Locations</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </>
    </SidebarGroup>
  );
}
