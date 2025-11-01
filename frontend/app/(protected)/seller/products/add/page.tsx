"use client";
import { useAddProductMutation } from "@/store/productApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [addProduct, { isLoading }] = useAddProductMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({ title, description, price, category }).unwrap();
    router.push("/seller/products");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        ></textarea>
        <button
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
