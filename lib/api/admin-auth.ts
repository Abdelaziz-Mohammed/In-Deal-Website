import api from "../api";

export type AdminLoginPayload = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  status: string;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      jobTitle: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export async function adminLogin(payload: AdminLoginPayload) {
  const { data } = await api.post<AdminLoginResponse>("/auth/admin/login", payload);
  return data.data;
}
