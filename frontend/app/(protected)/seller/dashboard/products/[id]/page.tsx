"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { productSchema, ProductFormValues } from "@/types/productSchema";
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (products) {
      const p = products.find((item) => item._id === id);
      if (p) {
        setProduct(p);
        setValue("title", p.title);
        setValue("price", p.price);
        setValue("description", p.description);
        setValue("category", p.category);
      }
    }
  }, [products, id, setValue]);

  if (!product) return <div>Product not found</div>;

  const onSubmit = async (data: ProductFormValues) => {
    const result = await Swal.fire({
      title: "Confirm Update",
      text: "Do you want to save the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", data.price.toString());
      formData.append("description", data.description || "");
      formData.append("category", data.category);

      if (data.files) {
        Array.from(data.files).forEach((file: File) =>
          formData.append("files", file)
        );
      }
      if (data.video) {
        formData.append("video", data.video[0]);
      }

      await updateProduct({ id, body: formData }).unwrap();

      Swal.fire("Updated!", "Product updated successfully.", "success").then(
        () => router.push("/seller/dashboard/products")
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update product.", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product: {product.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input {...register("title")} className="border p-2 w-full" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="border p-2 w-full"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            {...register("description")}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Category:</label>
          <input {...register("category")} className="border p-2 w-full" />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Images:</label>
          <input
            type="file"
            {...register("files")}
            multiple
            accept="image/*"
            className="border p-2 w-full"
          />
          {errors.files && (
            <p className="text-red-500">{errors.files.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Video:</label>
          <input type="file" {...register("video")} accept="video/*" />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
