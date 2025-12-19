import React from "react";
import Logo from "@/components/shared/Logo";
import { AuthCard } from "@/components/auth/AuthCard";
import AuthNav from "@/components/auth/AuthNav";
import LanguageToggler from "@/components/shared/LanguageToggler";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted bg-cover bg-center bg-[url('/assets/base-bg.png')]">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 bg-transparent py-3">
        <Logo />
        <LanguageToggler />
      </header>
      <AuthCard>
        <AuthNav />
        {children}
      </AuthCard>
    </div>
  );
}
