"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/admin/SidebarProvider";
import { MobileSidebar } from "@/components/admin/MobileSidebar";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <MobileSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </SidebarProvider>
  );
}
