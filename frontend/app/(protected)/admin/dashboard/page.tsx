"use client";

import OrderStats from "@/components/admin/OrderStatus";
import UserList from "@/components/admin/UserList";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <OrderStats />
      <UserList />
    </div>
  );
}
