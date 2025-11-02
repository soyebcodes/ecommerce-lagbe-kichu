"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { productSchema, ProductFormValues } from "@/types/productSchema";
import { useCreateProductMutation } from "@/store/productApi";
import Image from "next/image";

export default function AddProductPage() {
  const router = useRouter();
  const [createProduct] = useCreateProductMutation();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const watchFiles = watch("files");
  const watchVideo = watch("video");

  // Generate previews
  useEffect(() => {
    if (watchFiles) {
      const filesArray = Array.from(watchFiles);
      setImagePreviews(filesArray.map((file) => URL.createObjectURL(file)));
    } else {
      setImagePreviews([]);
    }

    if (watchVideo && watchVideo.length > 0) {
      setVideoPreview(URL.createObjectURL(watchVideo[0]));
    } else {
      setVideoPreview(null);
    }
  }, [watchFiles, watchVideo]);

  const onSubmit = async (data: ProductFormValues) => {
    const confirm = await Swal.fire({
      title: "Add Product?",
      text: "Do you want to add this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

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

      await createProduct(formData).unwrap();
      await Swal.fire("Success!", "Product created successfully.", "success");
      router.push("/seller/dashboard/products");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to create product.", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
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

        {/* Previews */}
        <div className="flex flex-wrap mt-2 gap-2">
          {imagePreviews.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt="preview"
              width={100}
              height={100}
              className="rounded border"
            />
          ))}
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              width={300}
              className="rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
