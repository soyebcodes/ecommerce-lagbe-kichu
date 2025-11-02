"use client";

import {
  useGetMyProductsQuery,
  useDeleteProductMutation,
} from "@/store/productApi";
import Link from "next/link";

export default function SellerProductsPage() {
  const { data, isLoading } = useGetMyProductsQuery([]);
  const products = data || [];
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Products</h1>
      <ul className="space-y-2">
        {products?.map((product: any) => (
          <li key={product._id} className="flex justify-between items-center">
            <span>
              {product.title} - ${product.price}
            </span>
            <div className="flex gap-2">
              <Link href={`/seller/dashboard/products/${product._id}`}>
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
