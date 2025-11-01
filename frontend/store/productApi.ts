// api/productApi.ts
import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- PUBLIC ENDPOINTS ---
    getProducts: builder.query({
      query: () => "/public/products",
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id: string) => `/public/products/${id}`,
      providesTags: ["Product"],
    }),

    // --- PROTECTED ENDPOINTS (SELLER / ADMIN) ---
    getMyProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }: any) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  // Public
  useGetProductsQuery,
  useGetProductByIdQuery,
  // Protected
  useGetMyProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
