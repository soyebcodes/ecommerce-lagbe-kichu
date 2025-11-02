"use client";
import OrderList from "@/components/buyer/OrderList";

export default function BuyerDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
      <OrderList />
    </div>
  );
}
