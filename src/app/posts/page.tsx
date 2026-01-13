import type { Metadata } from "next";
import PostsPageClient from "@/components/pages/posts/PostsPageClient";

type PostsPageProps = {
  searchParams?: {
    userId?: string;
  };
};

export function generateMetadata({ searchParams }: PostsPageProps): Metadata {
  const userId = searchParams?.userId;

  if (userId) {
    return {
      title: `Posts de usuario ${userId} | Epayco`,
      description: `Listado de posts del usuario ${userId}.`,
    };
  }

  return {
    title: "Posts | Epayco",
    description: "Listado de posts con filtros por usuario.",
  };
}

export default function PostsPage() {
  return <PostsPageClient />;
}
