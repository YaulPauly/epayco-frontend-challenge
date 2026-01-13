"use client";

import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/jsonplaceholder/users.service";
import type { ApiError } from "@/services/http/api-error";

export function useUsersList() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => usersService.getUsers(signal),
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as ApiError | null,
    refetch: query.refetch,
  };
}
