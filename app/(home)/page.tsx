import delay from "@/lib/delay";
import { Metadata } from "next";
import VPageHome from "./_components/v-page";
import NewsLoading from "@/components/home/NewsTicker/loading";
import LatestPodcastsLoading from "@/components/home/LatestPodcasts/loading";
import AuthorsLoading from "@/components/home/Authors/loading";

import PageTitle from "@/components/home/PageTitle";
import { Suspense } from "react";
import NewsTicker from "@/components/home/NewsTicker/NewsTicker";
import LatestArticles from "@/components/home/LatestArticles/LatestArticles";
import Subheading from "@/components/home/Subheading";
import Authors from "@/components/home/Authors/Authors";
import LatestPodcasts from "@/components/home/LatestPodcasts/LatestPodcasts";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};
export default async function Home() {
  await delay(1000);

  return (
    <>
      <main className="flex flex-col min-h-screen max-w-380 w-full mx-auto px-4 lg:pt-0 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        <PageTitle
          className="sr-only"
          imgSrc="/images/titles/Art&Life.svg"
          imgAlt="The words 'Art & Life' in bold uppercase lettering"
        >
          Art & Life
        </PageTitle>

        <Suspense fallback={<NewsLoading />}>
          <NewsTicker />
        </Suspense>

        <LatestArticles />

        <Subheading
          className="text-subheading"
          url="/podcasts"
          linkText="All episodes"
        >
          Podcast
        </Subheading>

        <Suspense fallback={<LatestPodcastsLoading />}>
          <LatestPodcasts />
        </Suspense>

        <Subheading
          className="text-subheading"
          url="/authors"
          linkText="All authors"
        >
          Authors
        </Subheading>

        <Suspense fallback={<AuthorsLoading />}>
          <Authors />
        </Suspense>
      </main>
    </>
  );
}
