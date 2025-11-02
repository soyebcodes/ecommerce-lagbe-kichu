"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateProductMutation } from "@/store/productApi";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  files: z.any(), // For file upload
});

export default function AddProductPage() {
  const router = useRouter();
  const [createProduct] = useCreateProductMutation();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    Array.from(data.files).forEach((file: File) =>
      formData.append("files", file)
    );

    await createProduct(formData);
    router.push("/seller/dashboard/products");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input placeholder="Title" {...register("title")} className="input" />
        <textarea
          placeholder="Description"
          {...register("description")}
          className="input"
        />
        <input
          placeholder="Category"
          {...register("category")}
          className="input"
        />
        <input
          type="number"
          placeholder="Price"
          {...register("price", { valueAsNumber: true })}
          className="input"
        />
        <input type="file" multiple {...register("files")} />
        <button type="submit" className="btn">
          Add Product
        </button>
      </form>
    </div>
  );
}
