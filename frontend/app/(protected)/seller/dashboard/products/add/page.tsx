"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    control,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const watchFiles = watch("files");
  const watchVideo = watch("video");

  // Generate previews
  useState(() => {
    if (watchFiles) {
      const filesArray = Array.from(watchFiles);
      setImagePreviews(filesArray.map((file) => URL.createObjectURL(file)));
    }
    if (watchVideo && watchVideo.length > 0) {
      setVideoPreview(URL.createObjectURL(watchVideo[0]));
    }
  }, [watchFiles, watchVideo]);

  const onSubmit = async (data: ProductFormValues) => {
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
      alert("Product created!");
      router.push("/seller/dashboard/products");
    } catch (err) {
      console.error(err);
      alert("Product creation failed");
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <input {...register("title")} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <label>Description:</label>
          <textarea {...register("description")} />
        </div>
        <div>
          <label>Category:</label>
          <input {...register("category")} />
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <div>
          <label>Images:</label>
          <input type="file" {...register("files")} multiple accept="image/*" />
          {errors.files && <p>{errors.files.message}</p>}
        </div>
        <div>
          <label>Video:</label>
          <input type="file" {...register("video")} accept="video/*" />
        </div>

        {/* Preview */}
        <div className="preview-section">
          {imagePreviews.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt="preview"
              width={100}
              className="m-2"
            />
          ))}
          {videoPreview && (
            <video src={videoPreview} controls width={300} className="m-2" />
          )}
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
