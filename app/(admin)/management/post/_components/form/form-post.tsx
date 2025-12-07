"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@/components/blocks/editor-x/editor";
import { SerializedEditorState } from "lexical";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  postSchemaCreate,
  postSchemaEdit,
  type PostFormValues,
} from "./post-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function FormPost({
  mode = "create",
  postId,
  initialValues,
}: {
  mode?: "create" | "edit";
  postId?: number | string;
  initialValues?: Partial<PostFormValues>;
}) {
  const { data: session } = useSession();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const router = useRouter();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(mode === "edit" ? postSchemaEdit : postSchemaCreate),
    defaultValues: {
      name: initialValues?.name ?? "",
      categori_id: initialValues?.categori_id ?? undefined,
      status: initialValues?.status ?? "draft",
      tags: initialValues?.tags ?? "",
      image: undefined,
      content: initialValues?.content ?? "",
      description: initialValues?.description ?? "",
    },
    mode: "onTouched",
  });

  const [contentSerialized, setContentSerialized] = useState<
    SerializedEditorState | undefined
  >(() => {
    try {
      const val = form.getValues("content");
      return val ? (JSON.parse(val) as SerializedEditorState) : undefined;
    } catch {
      return undefined;
    }
  });

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/categori`, {
          headers: { Authorization: `Bearer ${session?.data?.token || ""}` },
        });
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data?.data) ? data.data : [];
          setCategories(
            items.map((c: { id: number; name: string }) => ({
              id: c.id,
              name: c.name,
            }))
          );
        }
      } catch {}
    };
    run();
  }, [API_BASE, session?.data?.token]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!(mode === "edit" && postId && !initialValues)) return;
      if (!session?.data?.token) return;
      try {
        const res = await fetch(`${API_BASE}/api/admin/post/show/${postId}`, {
          headers: { Authorization: `Bearer ${session?.data?.token || ""}` },
        });
        if (res.ok) {
          const data = await res.json();
          const p = data?.data ?? {};
          form.reset({
            name: p.name ?? "",
            categori_id: p.categori_id ?? undefined,
            status: p.status ?? "draft",
            tags: p.tags ?? "",
            content: p.content ?? "",
            description: p.description ?? "",
          });
          setImagePreview(p.image_url || null);
          try {
            setContentSerialized(
              p.content
                ? (JSON.parse(p.content) as SerializedEditorState)
                : undefined
            );
          } catch {}
        }
      } catch {}
    };
    fetchPost();
  }, [API_BASE, mode, postId, initialValues, session?.data?.token]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageInputKey, setImageInputKey] = useState<number>(0);

  const onSubmit = async (values: PostFormValues) => {
    try {
      setLoading(true);
      const isEdit = mode === "edit" && postId !== undefined && postId !== null;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append(
        "categori_id",
        values.categori_id !== undefined && values.categori_id !== null
          ? typeof values.categori_id === "string"
            ? values.categori_id
            : String(values.categori_id)
          : ""
      );
      formData.append("status", values.status ?? "draft");
      if (values.tags) formData.append("tags", values.tags);
      if (values.image instanceof File) formData.append("image", values.image);
      formData.append("content", values.content);
      if (values.description)
        formData.append("description", values.description);

      if (isEdit) {
        formData.append("_method", "POST");
      }

      const res = await fetch(
        isEdit
          ? `${API_BASE}/api/admin/post/update/${postId}`
          : `${API_BASE}/api/admin/post/store`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.data?.token || ""}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(
          errText ||
            (isEdit ? "Failed to update post" : "Failed to create post")
        );
      }

      toast.success(
        isEdit ? "Post berhasil diperbarui" : "Post berhasil dibuat"
      );
      form.reset();
      router.push("/management/post");
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Terjadi kesalahan menyimpan post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === "edit" ? "Edit Post" : "Buat Post Baru"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {mode === "edit"
            ? "Perbarui informasi post Anda"
            : "Isi formulir di bawah untuk membuat post baru"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Informasi Dasar */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Informasi Dasar</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Isi informasi dasar tentang post Anda
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Judul Post *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukkan judul post"
                        className="mt-2"
                      />
                    </FormControl>
                    <FormDescription>
                      Judul yang menarik akan meningkatkan engagement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categori_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.length === 0 ? (
                            <SelectItem value="none" disabled>
                              Tidak ada kategori
                            </SelectItem>
                          ) : (
                            categories.map((c) => (
                              <SelectItem key={c.id} value={String(c.id)}>
                                {c.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Draft tidak akan ditampilkan di publik
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Media & Metadata */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Media & Metadata</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Tambahkan gambar dan tags untuk post Anda
              </p>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>
                      Gambar Sampul {mode === "create" && "*"}
                    </FormLabel>
                    <div className="rounded-lg border bg-card overflow-hidden">
                      {imagePreview ? (
                        <div className="relative">
                          <Image
                            width={100}
                            height={100}
                            src={imagePreview}
                            alt="Preview"
                            className="h-auto w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-48 w-full items-center justify-center bg-muted">
                          <p className="text-muted-foreground">
                            Belum ada gambar
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <FormControl>
                        <Input
                          key={imageInputKey}
                          {...field}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file ?? null);
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setImagePreview(url);
                            }
                          }}
                        />
                      </FormControl>
                      {value instanceof File || imagePreview ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            onChange(null);
                            setImagePreview(null);
                            setImageInputKey((k) => k + 1);
                          }}
                        >
                          Hapus gambar
                        </Button>
                      ) : null}
                    </div>
                    <FormDescription>
                      {mode === "edit"
                        ? "Upload gambar baru jika ingin mengganti gambar sampul"
                        : "Upload gambar untuk sampul post (JPG, PNG, atau WebP)"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="mt-2"
                        placeholder="teknologi, programming, web development"
                      />
                    </FormControl>
                    <FormDescription>
                      Pisahkan tags dengan koma (,)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Singkat</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="mt-2"
                        rows={3}
                        placeholder="Tulis deskripsi singkat tentang post ini..."
                      />
                    </FormControl>
                    <FormDescription>
                      Deskripsi ini akan muncul di preview dan SEO
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Konten Utama */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Konten Post *</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Tulis konten lengkap post Anda di sini
              </p>
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="min-h-[400px]">
                      <Editor
                        editorSerializedState={contentSerialized}
                        onSerializedChange={(value) => {
                          setContentSerialized(value);
                          field.onChange(JSON.stringify(value));
                        }}
                        rows={18}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between rounded-lg border bg-card p-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/management/post")}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? mode === "edit"
                  ? "Memperbarui..."
                  : "Menyimpan..."
                : mode === "edit"
                ? "Perbarui Post"
                : "Simpan Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
