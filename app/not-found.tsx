"use client";
import PageTitle from "@/components/home/PageTitle";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="flex flex-col min-h-screen max-w-380 w-full mx-auto px-4 lg:pt-0 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <div>
        <PageTitle
          className="sr-only"
          imgSrc="/images/titles/NotFound.svg"
          imgAlt="The words 'Not Found' in bold uppercase lettering"
        >
          Not Found
        </PageTitle>
        <h2>
          The page you&apos;re looking for does not exist. Click{" "}
          <Link className="font-semibold" href="/">
            here to return home
          </Link>
          or click{" "}
          <Link
            className="font-semibold"
            href="/login"
            onClick={() => router.back()}
          >
            here to go back
          </Link>
        </h2>
      </div>
    </main>
  );
}
