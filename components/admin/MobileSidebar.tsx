"use client";

import Link from "next/link";
import Image from "next/image";
import { X, LogOut } from "lucide-react";
import { navItems } from "./AdminSidebar";
import { useSidebar } from "./SidebarProvider";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/lib/api/admin-auth";
import { cn } from "@/lib/utils";

export function MobileSidebar() {
  const pathname = usePathname();
  const { isMobileOpen, closeMobile } = useSidebar();

  if (!isMobileOpen) return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={closeMobile} aria-hidden="true" />

      <div className="relative h-full w-80 max-w-[85vw] bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
          <Link href="/admin/dashboard" className="flex items-center gap-2" onClick={closeMobile}>
            <Image src="/assets/logo.svg" alt="In-Deal Logo" width={32} height={48} />
            <span className="font-medium text-base text-black">InDeal</span>
          </Link>
          <button
            onClick={closeMobile}
            className="border border-neutral-200 rounded-lg p-2 hover:bg-neutral-100 transition"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                  active
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              closeMobile();
              adminLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
