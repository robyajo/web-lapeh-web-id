import AuthorsList from "@/components/home/AuthorList";
import PageTitle from "@/components/home/PageTitle";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Authors  | Fyrre Magazine",
  description: "Our authors",
};

export default function AuthorsPage() {
  return (
    <main className="flex flex-col min-h-screen max-w-380 w-full mx-auto px-4 lg:pt-0 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <PageTitle
        className="sr-only"
        imgSrc="/images/titles/Authors.svg"
        imgAlt="The word 'Author' in uppercase, bold lettering"
      >
        Authors
      </PageTitle>
      <Suspense fallback={<Loading />}>
        <AuthorsList />
      </Suspense>
    </main>
  );
}
