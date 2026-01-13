"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Spinner from "@/components/atoms/Spinner";
import PostList from "@/components/organisms/PostList";
import { EmptyState, ErrorState, LoadingSkeleton, OfflineBanner } from "@/components/states";
import { usePostsList } from "@/hooks/posts/usePosts";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useUsersList } from "@/hooks/users/useUsers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/atoms/Toast";

export default function PostsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userFilter = searchParams.get("userId") ?? "";
  const selectedUserId = userFilter ? Number(userFilter) : undefined;
  const { mergedData, isLoading, isError, error, refetch } = usePostsList(
    selectedUserId
  );
  const { online } = useNetworkStatus();
  const { data: users } = useUsersList();
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const hasShownLoadToast = useRef(false);

  useEffect(() => {
    const toastParam = searchParams.get("toast");
    if (!toastParam) {
      return;
    }
    if (toastParam === "created") {
      setToast({ message: "Post creado correctamente.", variant: "success" });
    } else if (toastParam === "updated") {
      setToast({ message: "Post actualizado correctamente.", variant: "success" });
    } else if (toastParam === "deleted") {
      setToast({ message: "Post eliminado correctamente.", variant: "success" });
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("toast");
    const query = params.toString();
    const currentQuery = searchParams.toString();
    if (query !== currentQuery) {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }

    const timeoutId = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timeoutId);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (isLoading || isError || hasShownLoadToast.current) {
      return;
    }
    const toastParam = searchParams.get("toast");
    if (toastParam) {
      return;
    }
    setToast({ message: "Posts cargados correctamente.", variant: "success" });
    hasShownLoadToast.current = true;
    const timeoutId = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timeoutId);
  }, [isError, isLoading, searchParams]);

  const handleUserFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("userId", value);
    } else {
      params.delete("userId");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-gray-900">Posts</h1>
      </div>
      <div className="mt-4">
        {!online ? <OfflineBanner onRetry={() => refetch()} /> : null}
        {toast ? (
          <Toast
            message={toast.message}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select
            value={userFilter}
            onChange={(event) => handleUserFilterChange(event.target.value)}
            className="sm:flex-1 sm:w-auto"
          >
            <option value="">Todos los usuarios</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <Button
            className="w-full sm:w-auto"
            onClick={() => handleUserFilterChange("")}
            disabled={!userFilter}
          >
            Limpiar filtro
          </Button>
        </div>
        <Button className="w-full sm:w-auto mt-2 mb-2" asChild>
          <Link href="/posts/new">Nuevo post</Link>
        </Button>
        {isLoading ? <LoadingSkeleton /> : null}
        {isError ? (
          <ErrorState message={error?.message} onRetry={() => refetch()} />
        ) : null}
        {!isLoading && !isError && mergedData.length === 0 ? <EmptyState /> : null}
        {!isLoading && !isError && mergedData.length > 0 ? (
          <PostList posts={mergedData} />
        ) : null}
        {isLoading ? (
          <div className="flex flex-col items-center gap-2 py-6 text-xs text-gray-400">
            <Spinner />
            <span>Cargando posts...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
