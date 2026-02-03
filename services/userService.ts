import { User } from "../types";
import { request } from "./api";

export const userService = {
  list: async (): Promise<User[]> => request<User[]>("/users"),
  get: async (id: number): Promise<User> => request<User>(`/users/${id}`),
  create: async (payload: Partial<User>) =>
    request<User>("/users", { method: "POST", body: JSON.stringify(payload) }),
  update: async (id: number, payload: Partial<User>) =>
    request<User>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  remove: async (id: number) =>
    request<void>(`/users/${id}`, { method: "DELETE" }),
};
