"use client";
import {
  useGetSellerOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/store/sellerApi";

export default function SellerOrdersPage() {
  const { data: orders } = useGetSellerOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = (id: string, status: string) =>
    updateStatus({ id, status });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Seller Orders</h1>
      <ul>
        {orders?.map((order) => (
          <li key={order._id}>
            {order.product.title} - {order.status}
            <button onClick={() => handleStatusChange(order._id, "Processing")}>
              Processing
            </button>
            <button
              onClick={() => handleStatusChange(order._id, "Out for Delivery")}
            >
              Out for Delivery
            </button>
            <button onClick={() => handleStatusChange(order._id, "Completed")}>
              Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
