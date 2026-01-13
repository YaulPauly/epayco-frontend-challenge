"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { postsService } from "@/services/jsonplaceholder/posts.service";
import { usePostsStore } from "@/store/posts.store";
import { mergePosts } from "@/utils/mergePosts";
import type { ApiError } from "@/services/http/api-error";

export function usePostsList(userId?: number) {
  const created = usePostsStore((state) => state.created);
  const updated = usePostsStore((state) => state.updated);
  const deleted = usePostsStore((state) => state.deleted);

  const query = useQuery({
    queryKey: ["posts", userId],
    queryFn: ({ signal }) => postsService.getPosts({ userId, signal }),
  });

  const mergedData = useMemo(() => {
    if (!query.data) {
      return [];
    }

    return mergePosts(query.data, created, updated, deleted);
  }, [created, deleted, query.data, updated]);

  return {
    data: query.data,
    mergedData,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as ApiError | null,
    refetch: query.refetch,
  };
}
