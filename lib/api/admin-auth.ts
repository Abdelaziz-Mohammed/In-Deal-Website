import api from "../api";
import { clearAuth } from "../auth";

export type AdminLoginPayload = {
  email: string;
  password: string;
};

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  role: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminLoginResponse = {
  status: string;
  message: string;
  data: {
    token: string;
    user: AdminUser;
  };
};

export async function adminLogin(payload: AdminLoginPayload) {
  const { data } = await api.post<AdminLoginResponse>("/auth/admin/login", payload);
  return data.data;
}

export function adminLogout() {
  clearAuth();
  window.location.href = "/admin/auth/login";
}
