import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("access_token");

  if (!token) {
    redirect("/en/auth/login");
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
