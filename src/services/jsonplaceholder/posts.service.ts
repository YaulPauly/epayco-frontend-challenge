import { httpClient } from "@/services/http/client";
import type { Post, PostCreateInput, PostUpdateInput } from "@/types/post";

export const postsService = {
  async getPosts(
    options?: { userId?: number; signal?: AbortSignal }
  ): Promise<Post[]> {
    const response = await httpClient.get<Post[]>("/posts", {
      signal: options?.signal,
      params: options?.userId ? { userId: options.userId } : undefined,
    });
    return response.data;
  },
  async getPost(id: number, signal?: AbortSignal): Promise<Post> {
    const response = await httpClient.get<Post>(`/posts/${id}`, { signal });
    return response.data;
  },
  async createPost(payload: PostCreateInput, signal?: AbortSignal): Promise<Post> {
    const response = await httpClient.post<Post>("/posts", payload, { signal });
    return response.data;
  },
  async updatePost(
    id: number,
    payload: PostUpdateInput,
    signal?: AbortSignal
  ): Promise<Post> {
    const response = await httpClient.patch<Post>(`/posts/${id}`, payload, {
      signal,
    });
    return response.data;
  },
  async deletePost(id: number, signal?: AbortSignal): Promise<void> {
    await httpClient.delete(`/posts/${id}`, { signal });
  },
};
