import { PodcastType, getPodcasts } from "@/functions/getPodcasts";
import LatestPodcasts from "@/components/home/LatestPodcasts/LatestPodcasts";
import PostNavigation from "@/components/home/PostNavigation";
import SocialSharing from "@/components/home/SocialSharing";
import PodcastContextProvider from "@/context/PodcastContext";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  const podcast: PodcastType[] = await getPodcasts();
  const slug = decodeURIComponent(title).trim().toLowerCase();

  const podcastData = podcast.find(
    (p: PodcastType) => p.slug.toLowerCase() === slug
  );

  return {
    title: `${podcastData ? podcastData.title : "Podcast not found"} | Fyrre Magazine`,
  };
}

export default async function PodcastDetails(
  { params }: { params: Promise<{ title: string }> }
) {
  try {
    const { title } = await params;
    const podcast: PodcastType[] = await getPodcasts();

    const slug = decodeURIComponent(title).trim().toLowerCase();
    const podcastData = podcast.find(
      (p: PodcastType) => p.slug.toLowerCase() === slug
    );

    if (!podcastData) {
      notFound();
    }

    return (
      <main className="max-w-380 w-full mx-auto px-4 pb-12 sm:pt-4 xs:pt-2 md:pb-4 sm:pb-2 xs:pb-2">
        <PostNavigation href="/podcasts">Podcast</PostNavigation>
        <article className="max-w-300 w-full mx-auto flex flex-wrap gap-24">
          <article className="flex flex-col lg:w-1/4">
            <img className="" src={podcastData.img} alt={podcastData.imgAlt} />
            <div className="flex justify-between mt-8 pb-12 border-b border-black">
              <p className="text-xl font-semibold">Listen On</p>
              <SocialSharing
                links={[
                  {
                    href: "#",
                    ariaLabel: "Visit our Spotify page",
                    src: "/icons/ri_spotify-fill.svg",
                    alt: "Instagram logo",
                  },
                  {
                    href: "#",
                    ariaLabel: "Visit our Apple page",
                    src: "/icons/ri_apple-fill.svg",
                    alt: "Twitter logo",
                  },
                  {
                    href: "#",
                    ariaLabel: "Visit our Soundcloud page",
                    src: "/icons/ri_soundcloud-line.svg",
                    alt: "YouTube logo",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-4 pt-8">
              <div className="flex flex-wrap justify-between">
                <p className="font-semibold">Date</p>
                <time dateTime={podcastData.date}>{podcastData.date}</time>
              </div>
              <div className="flex flex-wrap justify-between">
                <p className="font-semibold">Duration</p>
                <p>{podcastData.duration}</p>
              </div>
              <div className="flex flex-wrap justify-between">
                <p className="flex font-semibold">Share</p>
                <SocialSharing
                  links={[
                    {
                      href: "#",
                      ariaLabel: "Visit our Instagram page",
                      src: "/icons/ri_instagram-line.svg",
                      alt: "Instagram logo",
                    },
                    {
                      href: "#",
                      ariaLabel: "Visit our Twitter page",
                      src: "/icons/ri_twitter-fill.svg",
                      alt: "Twitter logo",
                    },
                    {
                      href: "#",
                      ariaLabel: "Visit our YouTube page",
                      src: "/icons/ri_youtube-fill.svg",
                      alt: "YouTube logo",
                    },
                  ]}
                />
              </div>
            </div>
          </article>

          <article className="flex flex-col flex-1 w-full">
            <p className="uppercase font-semibold">{podcastData.episode}</p>
            <h1 className="podcast-title">{podcastData.title}</h1>
            {podcastData.content.map((podcastItem, index) => (
              <div key={index}>
                <p className="text-blog-summary pt-8 pb-16">
                  {podcastItem.summary}
                </p>
                <p>{podcastItem.section1}</p>
                <div className="border-t-2 border-b-2 border-black my-6">
                  <div className="py-12">
                    <p className="text-blog-quote pb-6">
                      &ldquo;{podcastItem.quote[0]}
                    </p>
                    <p> {podcastItem.quote[1]}</p>
                  </div>
                </div>
                <p>{podcastItem.section2}</p>
              </div>
            ))}
          </article>
        </article>
        <div className="pb-12 md:pb-48">
          <h2 className="text-blog-subheading border-t-2 border-black mt-38 pt-12 pb-12 md:pb-24">
            Latest Episodes
          </h2>
          <PodcastContextProvider limit={3}>
            <LatestPodcasts />
          </PodcastContextProvider>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error in PodcastDetails component:", error);
    return <div>Error loading podcast details</div>;
  }
}
