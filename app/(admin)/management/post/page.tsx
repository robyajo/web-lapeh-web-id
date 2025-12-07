import { Metadata } from "next";
import PageContainerDashboard from "../../_components/page-container";
import { BreadcrumbType } from "@/types";
import VpagePost from "./_components/v-page";
export const metadata: Metadata = {
  title: "Posts",
  description: "Posts",
};
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Posts",
    href: "/posts",
    isCurrent: true,
  },
];
export default function Page() {
  return (
    <PageContainerDashboard breadcrumb={breadcrumbs}>
      <VpagePost />
    </PageContainerDashboard>
  );
}
