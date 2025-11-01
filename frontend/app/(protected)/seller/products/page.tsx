"use client";

import {
  useGetMyProductsQuery,
  useDeleteProductMutation,
} from "@/store/productApi";

export default function SellerProductsPage() {
  const { data: products, isLoading, isError } = useGetMyProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id).unwrap();
      alert("Product deleted!");
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  if (!products || products.length === 0) return <p>No products found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product: any) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
