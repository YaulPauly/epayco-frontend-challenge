"use client";

import { useMutation } from "@tanstack/react-query";
import { postsService } from "@/services/jsonplaceholder/posts.service";
import { usePostsStore } from "@/store/posts.store";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import type { ApiError } from "@/services/http/api-error";
import type { PostCreateInput, PostUpdateInput } from "@/types/post";

function offlineError(): ApiError {
  return {
    kind: "offline",
    message: "Sin conexión a internet.",
  };
}

export function useCreatePost() {
  const addCreated = usePostsStore((state) => state.addCreated);
  const { online } = useNetworkStatus();

  return useMutation({
    mutationFn: async (payload: PostCreateInput) => {
      if (!online) {
        throw offlineError();
      }
      return postsService.createPost(payload);
    },
    onSuccess: (post, payload) => {
      const localId = Date.now() + Math.floor(Math.random() * 1000);
      addCreated({
        ...post,
        id: localId,
        userId: post.userId ?? payload.userId,
      });
    },
  });
}

export function useUpdatePost(id: number) {
  const addUpdated = usePostsStore((state) => state.addUpdated);
  const { online } = useNetworkStatus();

  return useMutation({
    mutationFn: async (payload: PostUpdateInput) => {
      if (!online) {
        throw offlineError();
      }
      return postsService.updatePost(id, payload);
    },
    onSuccess: (post) => {
      addUpdated(post);
    },
  });
}

export function useDeletePost() {
  const markDeleted = usePostsStore((state) => state.markDeleted);
  const { online } = useNetworkStatus();

  return useMutation({
    mutationFn: async (id: number) => {
      if (!online) {
        throw offlineError();
      }
      await postsService.deletePost(id);
      return id;
    },
    onSuccess: (deletedId) => {
      markDeleted(deletedId);
    },
  });
}
