// store/productApi.ts
import { apiSlice } from "./apiSlice";
import { Product } from "../types";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products (public)
    getProducts: builder.query<Product[], void>({
      query: () => "/public/products",
      transformResponse: (response: any) => response.data, // extract the array
      providesTags: ["Product"],
    }),

    // Get seller/admin products (private)
    getMyProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: any) => response.data,
      providesTags: ["Product"],
    }),

    // Create product
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update product
    updateProduct: builder.mutation<Product, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // Delete product
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery, // public products
  useGetMyProductsQuery, // seller/admin products
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
