"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProductMutation } from "@/store/productApi";
import { useState } from "react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be positive"),
  discountPrice: z.number().optional(),
  images: z.any(),
  video: z.any().optional(),
});

export default function AddProductPage() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price.toString());
      if (data.discountPrice)
        formData.append("discountPrice", data.discountPrice.toString());

      // Append multiple images
      Array.from(data.images).forEach((file: File) =>
        formData.append("files", file)
      );

      // Append video if exists
      if (data.video?.[0]) formData.append("files", data.video[0]);

      await createProduct(formData).unwrap();
      alert("Product added successfully!");
      reset();
    } catch (err: any) {
      setServerError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Title"
          className="border p-2 w-full"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          className="border p-2 w-full"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <input
          {...register("category")}
          placeholder="Category"
          className="border p-2 w-full"
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}

        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
          className="border p-2 w-full"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <input
          type="number"
          {...register("discountPrice", { valueAsNumber: true })}
          placeholder="Discount Price"
          className="border p-2 w-full"
        />

        <input type="file" {...register("images")} multiple accept="image/*" />
        <input type="file" {...register("video")} accept="video/*" />

        {serverError && <p className="text-red-500">{serverError}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
