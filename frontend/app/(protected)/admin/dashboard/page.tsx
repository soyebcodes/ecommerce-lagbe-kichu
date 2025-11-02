"use client";

import UserList from "@/components/admin/UserList";
import OrderStats from "@/components/admin/OrderStats";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <OrderStats />
      <UserList />
    </div>
  );
}
