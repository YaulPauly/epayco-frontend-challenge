"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import PostsTemplate from "@/components/templates/PostsTemplate";
import { EmptyState, ErrorState, LoadingSkeleton, OfflineBanner } from "@/components/states";
import { usePostDetail } from "@/hooks/posts/usePost";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useUserDetail } from "@/hooks/users/useUser";
import { useDeletePost } from "@/hooks/posts/usePostMutations";
import ConfirmModal from "@/components/molecules/ConfirmModal";
import ConfirmSheet from "@/components/molecules/ConfirmSheet";
import { useRouter } from "next/navigation";

export default function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const postId = Number(params.id);
  const { mergedData, isLoading, isError, error, refetch } = usePostDetail(postId);
  const userId = mergedData?.userId ?? 0;
  const userQuery = useUserDetail(userId);
  const { online } = useNetworkStatus();
  const deleteMutation = useDeletePost();
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  return (
    <PostsTemplate showHeader={false}>
      <div className="space-y-4">
        {!online ? <OfflineBanner onRetry={() => refetch()} /> : null}
        <Link className="text-sm font-medium text-blue-600" href="/posts">
          &lt; Volver
        </Link>
        {isLoading ? <LoadingSkeleton /> : null}
        {isError ? (
          <ErrorState message={error?.message} onRetry={() => refetch()} />
        ) : null}
        {!isLoading && !isError && !mergedData ? <EmptyState /> : null}
        {!isLoading && !isError && mergedData ? (
          <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
            <span className="text-xs text-gray-400">
              {userQuery.data?.name ?? `User ID: ${mergedData.userId}`}
            </span>
            <h1 className="mt-2 text-sm font-semibold text-gray-900">
              {mergedData.title}
            </h1>
            <p className="mt-3 text-xs text-gray-500">{mergedData.body}</p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <Button asChild>
                <Link href={`/posts/${params.id}/edit`}>Editar</Link>
              </Button>
              <Button
                variant="danger"
                onClick={() => setOpenConfirm(true)}
                disabled={!online || deleteMutation.isPending}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <ConfirmModal
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          deleteMutation.mutate(postId, {
            onSuccess: () => {
              setOpenConfirm(false);
              router.push("/posts?toast=deleted");
            },
          })
        }
      />
      <ConfirmSheet
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          deleteMutation.mutate(postId, {
            onSuccess: () => {
              setOpenConfirm(false);
              router.push("/posts?toast=deleted");
            },
          })
        }
      />
    </PostsTemplate>
  );
}
