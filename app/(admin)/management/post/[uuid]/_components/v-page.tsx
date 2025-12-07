"use client";
import { $generateHtmlFromNodes } from "@lexical/html";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import { createEditor } from "lexical";
import { nodes } from "@/components/blocks/editor-x/nodes";
import HeaderPage from "@/app/(admin)/_components/header-page";

type PostDetail = {
  id: number;
  uuid: string;
  user_id: number;
  categori_id: number | null;
  name: string;
  slug: string;
  image: string | null;
  image_url: string | null;
  status: "draft" | "published";
  views: string;
  likes: string;
  dislikes: string;
  comments: string;
  shares: string;
  favorites: string;
  tags: string | null;
  content: string | null;
  description?: string | null;
};

export default function VPage({ uuid }: { uuid: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostDetail | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!session?.data?.token) {
          throw new Error("Token autentikasi tidak ditemukan");
        }

        console.log(
          "Fetching post:",
          `${API_BASE}/api/admin/post/show/${uuid}`
        );

        const res = await fetch(`${API_BASE}/api/admin/post/show/${uuid}`, {
          headers: {
            Authorization: `Bearer ${session.data.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);

        const contentType = res.headers.get("content-type");

        // Check if response is JSON
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Non-JSON response:", text.substring(0, 500));
          throw new Error(
            `Server mengembalikan HTML/Text, bukan JSON. Status: ${res.status}. ` +
              `Kemungkinan: endpoint salah, middleware error, atau CORS issue.`
          );
        }

        const json = await res.json();
        console.log("Response JSON:", json);

        if (!res.ok) {
          throw new Error(
            json?.message || `Error ${res.status}: Gagal mengambil detail post`
          );
        }

        if (!json?.data) {
          throw new Error("Data post tidak ditemukan dalam response");
        }

        setPost(json.data);
      } catch (e: any) {
        console.error("Error fetching post:", e);
        setError(e?.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    if (uuid && session?.data?.token) {
      run();
    } else if (!session?.data?.token) {
      setError("Silakan login terlebih dahulu");
      setLoading(false);
    }
  }, [API_BASE, uuid, session?.data?.token]);

  const getContentHTML = () => {
    if (!post?.content) return null;

    try {
      const editor = createEditor({
        namespace: "Viewer",
        nodes,
        onError: () => {},
      });
      const parsedState = editor.parseEditorState(post.content);
      editor.setEditorState(parsedState);

      const html = editor.getEditorState().read(() => {
        return $generateHtmlFromNodes(editor);
      });
      return html as string;
    } catch (err) {
      console.error("Gagal parse Lexical:", err);
      return post.content;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 rounded bg-muted" />
          <div className="h-6 w-1/4 rounded bg-muted" />
          <div className="h-64 w-full rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto max-w-7xl py-6">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-destructive">{error || "Post tidak ditemukan"}</p>
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/management/post")}
            >
              Kembali
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tagsList = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];

  return (
    <>
      <HeaderPage
        title="Detail Post"
        description={"Post Detail"}
        actions={
          <>
            <Button onClick={() => router.back()}>Back</Button>
          </>
        }
      />
      <div className="py-4">
        {/* Header */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Konten Utama */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gambar */}
            <div className="rounded-lg border bg-card overflow-hidden">
              {post.image_url ? (
                <img
                  src={post.image_url}
                  alt={post.name}
                  className="h-auto w-full object-cover"
                />
              ) : (
                <div className="flex h-64 w-full items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Tidak ada gambar</p>
                </div>
              )}
            </div>

            {/* Deskripsi */}
            {post.description && (
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-3 text-lg font-semibold">Deskripsi</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              </div>
            )}

            {/* Konten */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Konten</h2>

              {getContentHTML() ? (
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: getContentHTML()! }}
                />
              ) : (
                <p className="text-muted-foreground italic">Konten kosong</p>
              )}
            </div>

            {/* Tags */}
            {tagsList.length > 0 && (
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-3 text-lg font-semibold">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Statistik */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Statistik</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Views</span>
                  </div>
                  <span className="font-semibold">{post.views}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">Likes</span>
                  </div>
                  <span className="font-semibold">{post.likes}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ThumbsDown className="h-4 w-4" />
                    <span className="text-sm">Dislikes</span>
                  </div>
                  <span className="font-semibold">{post.dislikes}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">Comments</span>
                  </div>
                  <span className="font-semibold">{post.comments}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Shares</span>
                  </div>
                  <span className="font-semibold">{post.shares}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Favorites</span>
                  </div>
                  <span className="font-semibold">{post.favorites}</span>
                </div>
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Informasi</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Post ID</p>
                  <p className="font-medium">{post.id}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">User ID</p>
                  <p className="font-medium">{post.user_id}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{post.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
