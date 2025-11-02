"use client";

import { useGetAllOrdersQuery } from "@/store/adminApi";

export default function OrderStats() {
  const { data: orders, isLoading } = useGetAllOrdersQuery();

  if (isLoading) return <p>Loading orders...</p>;

  const totalOrders = orders?.length || 0;
  const pendingOrders =
    orders?.filter((o: any) => o.status === "Pending")?.length || 0;
  const completedOrders =
    orders?.filter((o: any) => o.status === "Completed")?.length || 0;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-gray-100 rounded">
        <h3>Total Orders</h3>
        <p>{totalOrders}</p>
      </div>
      <div className="p-4 bg-yellow-100 rounded">
        <h3>Pending Orders</h3>
        <p>{pendingOrders}</p>
      </div>
      <div className="p-4 bg-green-100 rounded">
        <h3>Completed Orders</h3>
        <p>{completedOrders}</p>
      </div>
    </div>
  );
}
