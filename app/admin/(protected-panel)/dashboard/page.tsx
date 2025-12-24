"use client";

import { AdminNavbar } from "@/components/admin/AdminNavbar";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminNavbar title="Dashboard" />
      <div className="flex-1 overflow-y-auto">
        <div className="py-4 px-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p className="text-gray-600">Dashboard content coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
}
