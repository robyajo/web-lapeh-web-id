import PageContainerDashboard from "@/components/admin/page-container";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "./_components/sidebar-left";
import { Separator } from "@/components/ui/separator";
import { SidebarRight } from "./_components/sidebar-right";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <SidebarLeft />
        {children}
        {/* <SidebarRight /> */}
      </SidebarProvider>
    </>
  );
}
