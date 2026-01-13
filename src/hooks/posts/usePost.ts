"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { postsService } from "@/services/jsonplaceholder/posts.service";
import { usePostsStore } from "@/store/posts.store";
import type { ApiError } from "@/services/http/api-error";

export function usePostDetail(id: number) {
  const updated = usePostsStore((state) => state.updated);
  const deleted = usePostsStore((state) => state.deleted);
  const created = usePostsStore((state) => state.created);

  const query = useQuery({
    queryKey: ["post", id],
    queryFn: ({ signal }) => postsService.getPost(id, signal),
    enabled: Number.isFinite(id) && id > 0,
  });

  const mergedData = useMemo(() => {
    if (!id || deleted[id]) {
      return null;
    }

    const createdMatch = created.find((post) => post.id === id);
    if (createdMatch) {
      return createdMatch;
    }

    if (!query.data) {
      return null;
    }

    return updated[id] ?? query.data;
  }, [created, deleted, id, query.data, updated]);

  return {
    data: query.data,
    mergedData,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as ApiError | null,
    refetch: query.refetch,
  };
}
