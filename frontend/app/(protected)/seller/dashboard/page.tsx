"use client";

import { useGetMyProductsQuery } from "@/store/productApi";

export default function SellerDashboard() {
  const { data: products, isLoading, isError } = useGetMyProductsQuery();

  if (isLoading) return <p>Loading your products...</p>;
  if (isError) return <p>Error loading products.</p>;
  if (!products || products.length === 0) return <p>No products yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p: any) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p>{p.description}</p>
            <p className="font-bold mt-2">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
