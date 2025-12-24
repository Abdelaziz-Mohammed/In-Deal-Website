"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminLogout } from "@/lib/api/admin-auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

export const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    tooltip: "View dashboard",
  },
  {
    label: "Requests",
    href: "/admin/requests",
    icon: FileText,
    tooltip: "Review requests",
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
    tooltip: "Manage customers",
  },
  {
    label: "Adverts",
    href: "/admin/adverts",
    icon: Megaphone,
    tooltip: "Manage adverts",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={cn(
        "hidden md:flex bg-white border-r border-gray-200 flex-col h-screen sticky top-0 transition-all duration-200",
        isOpen ? "md:w-56" : "md:w-20"
      )}
    >
      <div
        className={cn(
          "px-4 border-b border-gray-200 flex items-center justify-between",
          isOpen ? "flex-row h-16" : "flex-col gap-2 py-3"
        )}
      >
        <Link
          href="/admin/dashboard"
          className={cn("flex items-center gap-2", isOpen ? "justify-start" : "justify-center")}
          title="InDeal"
        >
          <Image
            src="/assets/logo.svg"
            alt="In-Deal Logo"
            width={32}
            height={48}
            className="object-cover"
          />
          <span className={cn("font-medium text-base text-black", isOpen ? "block" : "hidden")}>
            InDeal
          </span>
        </Link>
        <button
          className="border border-neutral-200 rounded-lg p-1 hover:bg-neutral-100 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      <nav className={cn("flex-1 px-4 py-6 space-y-2 overflow-y-auto", isOpen ? "" : "px-2")}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          const link = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center w-full rounded-lg transition-all px-4 py-2.5",
                isOpen ? "gap-3 justify-start" : "justify-center gap-0",
                active
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span
                className={cn(
                  "font-medium text-sm transition-opacity duration-150",
                  isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"
                )}
              >
                {item.label}
              </span>
            </Link>
          );

          if (isOpen) {
            return (
              <div key={item.href} className="w-full">
                {link}
              </div>
            );
          }

          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right">{item.tooltip || item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={adminLogout}
          title="Logout"
          className={cn(
            "w-full flex items-center rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all px-4 py-2.5",
            isOpen ? "gap-3 justify-start" : "justify-center gap-0"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span
            className={cn(
              "font-medium text-sm transition-opacity duration-150",
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"
            )}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
