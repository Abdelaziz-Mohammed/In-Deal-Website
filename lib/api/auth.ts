import api from "../api";
import { clearAuth } from "../auth";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  user: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
  };
  company: {
    name: string;
    description: string;
    phone: string;
    website: string;
    companyType: string;
    companyIndustry: string;
  };
};

export type AuthResponse = {
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
    company: {
      id: number;
      agentId: number;
      name: string;
      description: string;
      address: string;
      phone: string;
      website: string;
      companyType: string;
      companyIndustry: string;
      manufacturingStrategy: string;
      status: string;
      contacts: string[];
      locations: string[];
      createdAt: string;
      updatedAt: string;
    };
  };
};

export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data.data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data.data;
}

export async function uploadFile(file: File) {
  // const formData = new FormData();
  // formData.append("file", file);

  // return api.post("/files/upload-url", formData);

  const res = await api.post("/files/upload-url", {
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  });

  return res.data;
}

export function logout() {
  clearAuth();
  window.location.href = "/auth/login";
}

export async function forgotPassword(email: string) {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
}

export async function verifyOtp(email: string, otp: string) {
  const { data } = await api.post("/auth/verify-otp", { email, otp });
  return data;
}

export async function resetPassword(payload: {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}) {
  const { data } = await api.post("/auth/reset-password", payload);
  return data;
}
