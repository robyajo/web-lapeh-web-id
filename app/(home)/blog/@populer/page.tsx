import delay from '@/lib/delay'
import { usePostsPopuler } from '@/hooks/use-posts'
import React from 'react'

export default async function page() {
   await delay(5000)
    const data = await usePostsPopuler()
     const posts = data?.posts || []
  return (
    <div>
       {posts.map((post) => (
            <article key={post.id} className="group relative flex flex-col space-y-2 border-b border-border pb-6 last:border-0">
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">
                    {post.body}
                </p>
                <div className="flex items-center gap-2 pt-2">
                    {post.tags?.map(tag => (
                        <span key={tag} className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10">
                            #{tag}
                        </span>
                    ))}
                </div>
            </article>
        ))}
    </div>
  )
}
