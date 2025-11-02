"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    control,
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
    try {
      // Handle files separately
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
