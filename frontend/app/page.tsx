"use client";

import { useGetProductsQuery } from "@/store/productApi";
import Image from "next/image";

export default function HomePage() {
  const { data: res, isLoading, error } = useGetProductsQuery();
  const products = res?.data || []; // <--- Make sure we use the correct field

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Something went wrong while loading products.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <h2 className="font-bold text-lg mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-1">{product.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                Category: {product.category}
              </p>
              <p className="text-lg font-semibold">
                ${product.price}{" "}
                {product.discountPrice && (
                  <span className="line-through text-red-500 ml-2">
                    ${product.discountPrice}
                  </span>
                )}
              </p>

              {product.images && product.images.length > 0 && (
                <Image
                  src={product.images[0].url || product.images[0]}
                  alt={product.title}
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
