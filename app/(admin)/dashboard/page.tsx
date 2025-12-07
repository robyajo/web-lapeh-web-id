import { Metadata } from "next";
import PageContainerDashboard from "../_components/page-container";
import { BreadcrumbType } from "@/types";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    isCurrent: true,
  },
];
export default function Page() {
  return (
    <PageContainerDashboard breadcrumb={breadcrumbs}>
      <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
      <div className="bg-muted/50 mx-auto h-screen w-full max-w-3xl rounded-xl" />
    </PageContainerDashboard>
  );
}
