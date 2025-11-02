"use client";

import { useGetAllProductsQuery } from "@/store/publicProductApi";
import Image from "next/image";
import Link from "next/link";

export default function ProductListPage() {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading)
    return <p className="text-center mt-10">Loading products...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load products.</p>
    );

  const products = data?.data || []; // backend returns { success, data: [...] }

  if (!products.length)
    return (
      <p className="text-center text-gray-500 mt-10">No products found.</p>
    );

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <Link
          key={product._id}
          href={`/product/${product._id}`}
          className="border rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
        >
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">
            {product.images?.length ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
          <p className="text-gray-600 mt-1">${product.price}</p>
          <p className="text-sm text-gray-500 mt-2">{product.category}</p>
        </Link>
      ))}
    </div>
  );
}
