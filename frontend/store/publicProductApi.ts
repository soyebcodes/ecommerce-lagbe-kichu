import { apiSlice } from "./apiSlice";

export const publicProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, void>({
      query: () => "/public/products",
      providesTags: ["Product"],
    }),

    getProductById: builder.query<any, string>({
      query: (id) => `/public/products/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } =
  publicProductApi;
