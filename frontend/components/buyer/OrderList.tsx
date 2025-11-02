"use client";

import { useGetMyOrdersQuery, useCancelOrderMutation } from "@/store/buyerApi";

export default function OrderList() {
  const { data: orders, isLoading } = useGetMyOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();

  if (isLoading) return <p>Loading orders...</p>;
  if (!orders || orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">My Orders</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Order ID</th>
            <th className="border px-2">Product</th>
            <th className="border px-2">Status</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td className="border px-2">{order._id}</td>
              <td className="border px-2">{order.product.title}</td>
              <td className="border px-2">{order.status}</td>
              <td className="border px-2">
                {order.status === "Pending" && (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
