import type { Post } from "@/types/post";

export function mergePosts(
  serverPosts: Post[],
  created: Post[],
  updated: Record<number, Post>,
  deleted: Record<number, true>
) {
  const merged = serverPosts
    .filter((post) => !deleted[post.id])
    .map((post) => updated[post.id] ?? post);

  const createdVisible = created.filter((post) => !deleted[post.id]);

  return [...createdVisible, ...merged].sort((a, b) => b.id - a.id);
}
