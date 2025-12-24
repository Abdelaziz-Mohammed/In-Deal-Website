"use client";

import { Bell, Settings, User, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AdminUser } from "@/lib/api/admin-auth";
import { useSidebar } from "./SidebarProvider";

interface AdminNavbarProps {
  title: string;
}

export function AdminNavbar({ title }: AdminNavbarProps) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const { openMobile } = useSidebar();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          onClick={openMobile}
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {user ? `${user.firstName} ${user.lastName}` : "Admin"}
            </p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
