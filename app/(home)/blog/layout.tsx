export default function Layout({
  children,
  article,
  populer,
}: {
  children: React.ReactNode;
  article: React.ReactNode;
  populer: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <main className="mx-auto max-w-7xl space-y-8">
        {/* Header / Navigation could go here */}
        <header className="mb-8">
            {children}
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content - Article (Left) */}
          <div className="lg:col-span-8">
             <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-6 border-b border-border pb-4">
                    <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
                </div>
                {article}
             </div>
          </div>

          {/* Sidebar - Popular (Right) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sticky top-8">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Popular Posts</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Trending
                    </span>
                </div>
                {populer}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
