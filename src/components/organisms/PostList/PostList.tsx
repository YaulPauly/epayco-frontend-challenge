import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/atoms/Button";
import ConfirmModal from "@/components/molecules/ConfirmModal";
import ConfirmSheet from "@/components/molecules/ConfirmSheet";
import { useDeletePost } from "@/hooks/posts/usePostMutations";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import type { Post } from "@/types/post";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteMutation = useDeletePost();
  const { online } = useNetworkStatus();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    if (!selectedId) {
      return;
    }
    deleteMutation.mutate(selectedId, {
      onSuccess: () => {
        setOpenConfirm(false);
        setSelectedId(null);
        const params = new URLSearchParams(searchParams.toString());
        params.set("toast", "deleted");
        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      },
    });
  };

  const handleCancel = () => {
    setOpenConfirm(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex h-full flex-col rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          >
          <span className="text-xs text-gray-400">ID: {post.id}</span>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-xs text-gray-500">{post.body}</p>
            <div className="mt-auto flex items-center justify-end gap-2 pt-4">
              <Button variant="ghost" className="px-2 py-1 text-xs" asChild>
                <Link href={`/posts/${post.id}`}>Ver</Link>
              </Button>
              <Button variant="secondary" className="px-2 py-1 text-xs" asChild>
                <Link href={`/posts/${post.id}/edit`}>Editar</Link>
              </Button>
              <Button
                variant="danger"
                className="px-2 py-1 text-xs"
                onClick={() => handleDeleteClick(post.id)}
                disabled={!online || deleteMutation.isPending}
              >
                Eliminar
              </Button>
            </div>
          </article>
        ))}
      </div>
      <ConfirmModal
        open={openConfirm}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <ConfirmSheet
        open={openConfirm}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
