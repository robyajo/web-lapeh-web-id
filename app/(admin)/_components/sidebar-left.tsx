"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MainMenu } from "./main-menu";
import { MainDashboard } from "./main-dashboard";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="text-2xl font-bold">hahah</div>
        <MainDashboard />
      </SidebarHeader>
      <SidebarContent>
        <MainMenu />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={session?.data?.user} status={status} />
      </SidebarFooter>
    </Sidebar>
  );
}
