export interface PostAdmin {
  id: number;
  name: string | null;
  content: string | null;
  categori: {
    id: number;
    uuid: string;
    user_id: number;
    name: string;
    slug: string;
    description: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface PostsResponse {
  message: string;
  data: PostAdmin[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
    total_pages: number;
    has_more_pages: boolean;
    has_previous_pages: boolean;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  page_links: Array<{ url: string; label: number; active: boolean }>;
  sorting: {
    current_sort_by: string;
    current_sort_order: string;
    available_sort_fields: string[];
  };
  filters: {
    title: string | null;
    search: string | null;
    category: string | null;
  };
}

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const usePosts = async ({
  category,
  search,
  sort_by = "id",
  sort_order = "desc",
  page = 1,
  per_page = 10,
  token,
}: {
  category?: string;
  search?: string;
  sort_by?: string;
  sort_order?: string;
  page?: number;
  per_page?: number;
  token?: string;
} = {}): Promise<PostsResponse | undefined> => {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (search) params.append("search", search);
    params.append("sort_by", sort_by);
    params.append("sort_order", sort_order);
    params.append("page", String(page));
    params.append("per_page", String(per_page));

    const response = await fetch(`${api}/api/admin/post?${params.toString()}`, {
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    const data = await response.json();
    return data as PostsResponse;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return undefined;
  }
};
export const usePostsPopuler = async (): Promise<
  { posts: any[] } | undefined
> => {
  try {
    const response = await fetch(`${api}/api/dummy/posts`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    // Assuming data.data contains { posts: [...] }
    if (data.data && Array.isArray(data.data.posts)) {
      return {
        ...data.data,
        posts: data.data.posts.slice(0, 3),
      };
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return undefined;
  }
};

export const usePostsId = async (id: number): Promise<any | undefined> => {
  try {
    const response = await fetch(`${api}/api/dummy/posts/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post ${id}: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return undefined;
  }
};
