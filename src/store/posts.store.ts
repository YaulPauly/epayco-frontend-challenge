import { create } from "zustand";
import type { Post } from "@/types/post";

type PostsState = {
  created: Post[];
  updated: Record<number, Post>;
  deleted: Record<number, true>;
  addCreated: (post: Post) => void;
  addUpdated: (post: Post) => void;
  markDeleted: (id: number) => void;
  reset: () => void;
};

export const usePostsStore = create<PostsState>((set) => ({
  created: [],
  updated: {},
  deleted: {},
  addCreated: (post) =>
    set((state) => ({
      created: [post, ...state.created],
    })),
  addUpdated: (post) =>
    set((state) => ({
      updated: {
        ...state.updated,
        [post.id]: post,
      },
    })),
  markDeleted: (id) =>
    set((state) => ({
      deleted: {
        ...state.deleted,
        [id]: true,
      },
    })),
  reset: () => set({ created: [], updated: {}, deleted: {} }),
}));
