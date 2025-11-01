"use client";

import { useGetProductsQuery } from "@/store/productApi";

export default function HomePage() {
  // Fetch products using RTK Query
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();

  if (isLoading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error && "Something went wrong while fetching products."}
      </p>
    );
  }

  if (products.length === 0) {
    return <p className="text-center mt-10">No products found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product: any) => (
        <div key={product._id} className="border rounded p-4 shadow">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h2 className="font-bold text-lg">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 font-semibold">${product.price}</p>
          {product.discountPrice && (
            <p className="text-green-600">Discount: ${product.discountPrice}</p>
          )}
        </div>
      ))}
    </div>
  );
}
