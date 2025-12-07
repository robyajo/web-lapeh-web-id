import Articles from "@/components/home/Articles/Articles";
import Loading from "@/components/home/Articles/loading";
import PageTitle from "@/components/home/PageTitle";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
};

export default function MagazinePage() {
  return (
    <main className="flex flex-col min-h-screen max-w-380 w-full mx-auto px-4 lg:pt-0 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <PageTitle
        className="sr-only"
        imgSrc="/images/titles/Magazine.svg"
        imgAlt="The word 'Magazine' in bold, uppercase lettering"
      >
        Magazine
      </PageTitle>
      <Suspense fallback={<Loading />}>
        <Articles />
      </Suspense>
    </main>
  );
}
