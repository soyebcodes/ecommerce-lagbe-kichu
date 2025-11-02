"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/store/publicProductApi";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id as string);

  if (isLoading) return <p className="text-center mt-10">Loading product...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load product.</p>
    );

  const product = data?.data;

  if (!product)
    return (
      <p className="text-center text-gray-500 mt-10">Product not found.</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          {product.images?.length ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-lg font-medium mt-4">${product.price}</p>
          <p className="text-sm text-gray-500 mt-2">
            Category: {product.category}
          </p>

          {product.seller && (
            <div className="mt-4 text-sm text-gray-600">
              Sold by:{" "}
              <span className="font-medium">{product.seller.name}</span> (
              {product.seller.email})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
