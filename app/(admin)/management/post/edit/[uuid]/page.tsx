import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import PageContainerDashboard from "@/app/(admin)/_components/page-container";
import { BreadcrumbType } from "@/types";
import FormPost from "../../_components/form/form-post";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Props = {
  params: Promise<{ uuid: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${API_BASE}/api/admin/post/show/${uuid}`, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${session?.data?.token || ""}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch post");

    const json = await res.json();
    const data = json?.data || {};

    const title = "Edit Post";
    const description = data?.description || data?.tags || "Edit post";
    const image = data?.image_url || undefined;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        images: image ? [{ url: image }] : undefined,
      },
      twitter: {
        card: image ? "summary_large_image" : "summary",
        title,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Edit Post",
      description: "Edit post",
    };
  }
}
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Posts",
    href: "/post",
  },
  {
    label: "Edit Post",
    href: "/post/edit",
    isCurrent: true,
  },
];
export default async function Page({ params }: Props) {
  const { uuid } = await params;

  return (
    <PageContainerDashboard breadcrumb={breadcrumbs}>
      <FormPost mode="edit" postId={uuid} />
    </PageContainerDashboard>
  );
}
