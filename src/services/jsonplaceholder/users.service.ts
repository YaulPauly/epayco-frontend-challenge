import { httpClient } from "@/services/http/client";
import type { User } from "@/types/user";

export const usersService = {
  async getUser(id: number, signal?: AbortSignal): Promise<User> {
    const response = await httpClient.get<User>(`/users/${id}`, { signal });
    return response.data;
  },
  async getUsers(signal?: AbortSignal): Promise<User[]> {
    const response = await httpClient.get<User[]>(`/users`, { signal });
    return response.data;
  },
};
