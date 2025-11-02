"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetMyProductsQuery,
  useUpdateProductMutation,
} from "@/store/productApi";

export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data: products } = useGetMyProductsQuery();
  const [updateProduct] = useUpdateProductMutation();

  const [product, setProduct] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (products) {
      const p = products.find((item) => item._id === id);
      if (p) {
        setProduct(p);
        setTitle(p.title);
        setPrice(p.price);
      }
    }
  }, [products, id]);

  if (!product) return <div>Product not found</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct({ id, title, price }).unwrap();
      alert("Product updated!");
      router.push("/seller/dashboard/products");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h1>Edit Product: {product.title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
