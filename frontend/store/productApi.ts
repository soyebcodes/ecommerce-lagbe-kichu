// api/productApi.ts
import { apiSlice } from "./apiSlice";

// Product API
export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // PUBLIC ENDPOINTS
    // =========================
    getProducts: builder.query({
      query: () => "/public/products",
      transformResponse: (response: any) => response.data, // <-- extract array
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id: string) => `/public/products/${id}`,
      providesTags: ["Product"],
    }),

    // =========================
    // SELLER / ADMIN ENDPOINTS (Protected)
    // =========================
    getMyProducts: builder.query({
      query: () => "/products", // protected route
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

// Export hooks
export const {
  // Public
  useGetProductsQuery,
  useGetProductByIdQuery,
  // Seller/Admin
  useGetMyProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
