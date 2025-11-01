"use client";
import {
  useGetSellerProductsQuery,
  useDeleteProductMutation,
} from "@/store/productApi";
import Link from "next/link";

export default function SellerProductsPage() {
  const { data: products, isLoading } = useGetSellerProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Products</h1>
        <Link
          href="/seller/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      {products?.length === 0 && <p>No products yet.</p>}

      <div className="grid gap-4">
        {products?.map((p: any) => (
          <div
            key={p._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-gray-500">${p.price}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/seller/products/edit/${p._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
