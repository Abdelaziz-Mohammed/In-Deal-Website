"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { AuthCard } from "@/components/auth/AuthCard";
import AuthNav from "@/components/auth/AuthNav";
import LanguageToggler from "@/components/shared/LanguageToggler";

const HIDE_AUTH_NAV_ROUTES = ["/auth/forgot-password", "/auth/verify-otp", "/auth/reset-password"];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideAuthNav = HIDE_AUTH_NAV_ROUTES.some((route) => pathname.endsWith(route));

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted bg-cover bg-center bg-[url('/assets/base-bg.png')]">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 bg-transparent py-3">
        <Logo />
        <LanguageToggler />
      </header>
      <AuthCard>
        {!hideAuthNav && <AuthNav />}
        {children}
      </AuthCard>
    </div>
  );
}
