import { request, setToken, clearToken, getToken } from "./api";

export const authService = {
  async login(credentials: Record<string, any>) {
    const data = await request<{ token?: string; user?: any }>("/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (data?.token) {
      setToken(data.token);
    }

    return data;
  },

  async register(payload: Record<string, any>) {
    return request<{ token?: string; user?: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async logout() {
    try {
      await request<void>("/auth/logout", { method: "POST" });
    } finally {
      clearToken();
    }
  },

  async getProfile() {
    try {
      return request<any>("/auth/me");
    } catch (err) {
      return request<any>("/users/me");
    }
  },

  async refresh() {
    return request<{ token: string }>("/auth/refresh", { method: "POST" });
  },

  isAuthenticated() {
    return !!getToken();
  },
};
