import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import PageContainer from "@/components/home/page-container";
import Container from "@/components/ui/container";
import ArticleContextProvider from "@/context/ArticleContext";
import PodcastContextProvider from "@/context/PodcastContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <PageContainer>
    <ArticleContextProvider>
      <PodcastContextProvider>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </PodcastContextProvider>
    </ArticleContextProvider>
    // </PageContainer>
  );
}
