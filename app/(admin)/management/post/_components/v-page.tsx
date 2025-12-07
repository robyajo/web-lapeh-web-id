import React, { Suspense } from "react";
import TabelData from "./data-table";
import HeaderPage from "@/app/(admin)/_components/header-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function VpagePost() {
  return (
    <>
      <HeaderPage
        title="Post"
        description="Manage all posts"
        actions={
          <>
            <Button>
              <Link href="/management/post/create">Create New Post</Link>
            </Button>
          </>
        }
      />
      <div className="w-full max-w-full overflow-x-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <TabelData />
        </Suspense>
      </div>
    </>
  );
}
