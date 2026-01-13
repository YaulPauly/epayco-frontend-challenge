"use client";

import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/jsonplaceholder/users.service";
import type { ApiError } from "@/services/http/api-error";

export function useUserDetail(id: number) {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: ({ signal }) => usersService.getUser(id, signal),
    enabled: Number.isFinite(id) && id > 0,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as ApiError | null,
    refetch: query.refetch,
  };
}
