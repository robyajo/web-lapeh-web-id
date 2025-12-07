import { Metadata } from "next";
import PageContainerDashboard from "@/app/(admin)/_components/page-container";
import { BreadcrumbType } from "@/types";
import VpagePost from "./_components/v-page";
export const metadata: Metadata = {
  title: "Create New Post",
  description: "Create New Post",
};
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Posts",
    href: "/posts",
  },
  {
    label: "Create New Post",
    href: "/posts/create",
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
