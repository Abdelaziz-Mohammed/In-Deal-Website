"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type SidebarContextValue = {
  isMobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const value = useMemo(
    () => ({
      isMobileOpen,
      openMobile: () => setIsMobileOpen(true),
      closeMobile: () => setIsMobileOpen(false),
    }),
    [isMobileOpen]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return ctx;
}
