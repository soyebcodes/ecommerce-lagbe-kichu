"use client";

import {
  useGetMyProductsQuery,
  useDeleteProductMutation,
} from "@/store/productApi";

export default function SellerProductsPage() {
  const { data: products, isLoading, error } = useGetMyProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <p>Loading your products...</p>;
  if (error) return <p>Something went wrong while loading your products.</p>;

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id).unwrap();
      alert("Product deleted successfully!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      {products && products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product: any) => (
            <li key={product._id} className="border p-4 rounded">
              <h2 className="font-bold text-lg">{product.title}</h2>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              {product.discountPrice && (
                <p>Discount: ${product.discountPrice}</p>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found. Add some!</p>
      )}
    </div>
  );
}
