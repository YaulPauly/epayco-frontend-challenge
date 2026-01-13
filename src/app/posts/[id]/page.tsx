import type { Metadata } from "next";
import type { Post } from "@/types/post";
import PostDetailClient from "@/components/pages/posts/PostDetailClient";

type PostDetailPageProps = {
  params: { id: string };
};

async function fetchPost(id: number): Promise<Post | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

  try {
    const response = await fetch(`${baseUrl}/posts/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Post;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const postId = Number(params.id);
  const post = Number.isFinite(postId) ? await fetchPost(postId) : null;
  const fallbackTitle = `Post ${params.id}`;

  return {
    title: `${post?.title ?? fallbackTitle} | Epayco`,
    description: post?.body
      ? post.body.slice(0, 140)
      : "Detalle del post seleccionado.",
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  return <PostDetailClient params={params} />;
}
