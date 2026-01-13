"use client";

import Link from "next/link";
import PostForm from "@/components/organisms/PostForm";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/posts/usePostMutations";

export default function NewPostClient() {
  const router = useRouter();
  const createMutation = useCreatePost();

  return (
    <div className="space-y-3">
      <Link className="text-sm font-medium text-blue-600" href="/posts">
        &lt; Volver
      </Link>
      <PostForm
        onCancel={() => router.push("/posts")}
        submitLabel="Crear"
        isSubmitting={createMutation.isPending}
        onSubmit={(values) =>
          createMutation.mutate(values, {
            onSuccess: () => router.push("/posts?toast=created"),
          })
        }
      />
    </div>
  );
}
