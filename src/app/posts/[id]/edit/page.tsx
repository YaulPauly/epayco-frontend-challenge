"use client";

import Link from "next/link";
import PostForm from "@/components/organisms/PostForm";
import PostsTemplate from "@/components/templates/PostsTemplate";
import { EmptyState, ErrorState, LoadingSkeleton, OfflineBanner } from "@/components/states";
import { usePostDetail } from "@/hooks/posts/usePost";
import { useUpdatePost } from "@/hooks/posts/usePostMutations";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/atoms/Toast";

export default function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const postId = Number(params.id);
  const { mergedData, isLoading, isError, error, refetch } = usePostDetail(postId);
  const updateMutation = useUpdatePost(postId);
  const { online } = useNetworkStatus();
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  return (
    <PostsTemplate showHeader={false}>
      <div className="space-y-3">
        {!online ? <OfflineBanner onRetry={() => refetch()} /> : null}
        <Link className="text-sm font-medium text-blue-600" href="/posts">
          &lt; Volver
        </Link>
        {isLoading ? <LoadingSkeleton /> : null}
        {isError ? (
          <ErrorState message={error?.message} onRetry={() => refetch()} />
        ) : null}
        {toast ? (
          <Toast
            message={toast.message}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        ) : null}
        {!isLoading && !isError && !mergedData ? <EmptyState /> : null}
        {!isLoading && !isError && mergedData ? (
          <PostForm
            title="Editar post"
            submitLabel="Guardar"
            isSubmitting={updateMutation.isPending}
            onCancel={() => router.push("/posts")}
            onSubmit={(values) => {
              const patch = {
                ...(values.title !== mergedData.title ? { title: values.title } : {}),
                ...(values.body !== mergedData.body ? { body: values.body } : {}),
                ...(values.userId !== mergedData.userId
                  ? { userId: values.userId }
                  : {}),
              };

              return updateMutation.mutate(patch, {
                onSuccess: () => router.push("/posts?toast=updated"),
                onError: () => {
                  setToast({
                    message: "No se pudo actualizar el post.",
                    variant: "error",
                  });
                },
              });
            }}
            defaultValues={{
              title: mergedData.title,
              body: mergedData.body,
              userId: mergedData.userId,
            }}
          />
        ) : null}
      </div>
    </PostsTemplate>
  );
}
