import { FlickeringGrid } from "@/components/ui/flickering-grid";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 -z-10"
        squareSize={4}
        gridGap={6}
        color="#60a5fa"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      {/* <div className="bg-[linear-gradient(15deg,#0f2027_0%,#203a43_45%,#2c5364_70%,#f05f57_100%)] absolute inset-0 -z-10" /> */}
      <div className="w-full max-w-sm md:max-w-4xl z-10">{children}</div>
    </div>
  );
}
