"use client";

import HeaderPage from "@/app/(admin)/_components/header-page";
import { Button } from "@/components/ui/button";
import FormPost from "../../_components/form/form-post";
import { useRouter } from "next/navigation";
export default function VpagePost() {
  const router = useRouter();
  return (
    <>
      <HeaderPage
        title="Create New Post"
        description="Create New Post"
        actions={
          <>
            <Button onClick={() => router.back()}>Back</Button>
          </>
        }
      />
      <div className="w-full max-w-full overflow-x-auto">
        <FormPost />
      </div>
    </>
  );
}
